/* ============================================================
   DOCTRINAL COMPASS — API Worker
   Serves the static site AND handles accounts, badge claims and
   friend-code trades. Everything security-critical happens here,
   never in index.html, because index.html is readable by anyone.

   Bindings required (wrangler.jsonc):
     KV namespace  ->  DC          (users, codes, sessions)
     assets        ->  ASSETS      (the ./public folder)
   ============================================================ */

const COOLDOWN_MS   = 24 * 60 * 60 * 1000;   // badge swap cooldown
const SESSION_DAYS  = 60;
/* Cloudflare's runtime refuses PBKDF2 above 100,000 iterations and throws
   NotSupportedError. 100,000 is therefore the ceiling available to us, even
   though OWASP asks for 600,000 on SHA-256. Every hash record stores the
   iteration count it was made with, so this number can be raised later
   without locking out existing accounts. */
const PBKDF2_ITER   = 100000;
const CODE_ALPHA    = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';   // no 0 O 1 I L
const MAX_FAILS     = 8;
const FAIL_WINDOW_S = 900;                   // 15 minutes

/* ---------------- helpers ---------------- */
const json = (obj, status = 200) => new Response(JSON.stringify(obj), {
  status,
  headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' }
});
const bad = (msg, status = 400) => json({ error: msg }, status);

const b64 = buf => btoa(String.fromCharCode(...new Uint8Array(buf)));
const unb64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));
const rand = n => crypto.getRandomValues(new Uint8Array(n));

const userKey = name => 'user:' + name.toLowerCase();
const codeKey = code => 'code:' + code.toUpperCase();
const sessKey = tok  => 'sess:' + tok;
const failKey = name => 'fail:' + name.toLowerCase();

/* Constant-time compare so a wrong password can't be timed character by character. */
function safeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function hashPassword(password, saltB64, iter) {
  const salt = saltB64 ? unb64(saltB64) : rand(16);
  const iterations = iter || PBKDF2_ITER;
  const key = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt, iterations, hash: 'SHA-256' }, key, 256);
  return { salt: b64(salt), hash: b64(bits), iter: iterations };
}

function newCode() {
  const b = rand(6);
  let s = '';
  for (let i = 0; i < 6; i++) s += CODE_ALPHA[b[i] % CODE_ALPHA.length];
  return s;
}

/* Usernames: 6-24 chars, letters/digits/_/- only, must start with a letter or digit. */
function validUsername(u) {
  return typeof u === 'string' && /^[A-Za-z0-9][A-Za-z0-9_-]{5,23}$/.test(u);
}
function validPassword(p) {
  return typeof p === 'string' && p.length >= 6 && p.length <= 200;
}

/* What the browser is allowed to see about a user. Never the password record. */
function publicUser(u) {
  return {
    username: u.u,
    code: u.badge ? u.code : null,          // no badge, no code
    badge: u.badge || null,
    nextClaimAt: u.badge ? (u.badge.at + COOLDOWN_MS) : 0,
    collection: u.coll || {},
    notices: u.notices || []
  };
}

async function getUser(env, name) {
  const raw = await env.DC.get(userKey(name));
  return raw ? JSON.parse(raw) : null;
}
const putUser = (env, u) => env.DC.put(userKey(u.u), JSON.stringify(u));

async function auth(env, request) {
  const h = request.headers.get('authorization') || '';
  const tok = h.startsWith('Bearer ') ? h.slice(7) : '';
  if (!tok) return null;
  const name = await env.DC.get(sessKey(tok));
  if (!name) return null;
  const u = await getUser(env, name);
  return u ? { user: u, token: tok } : null;
}

async function startSession(env, username) {
  const tok = b64(rand(24)).replace(/[+/=]/g, c => ({ '+': '-', '/': '_', '=': '' }[c]));
  await env.DC.put(sessKey(tok), username, { expirationTtl: SESSION_DAYS * 86400 });
  return tok;
}

/* ---------------- routes ---------------- */

async function signup(env, body) {
  const { username, password } = body;
  if (!validUsername(username))
    return bad('Username must be 6–24 characters, letters, numbers, _ or - only.');
  if (!validPassword(password))
    return bad('Password must be at least 6 characters.');
  if (await getUser(env, username)) return bad('That username is taken.', 409);

  const pw = await hashPassword(password);

  /* Claim a unique friend code. The code is reserved now and never changes,
     but it is not shown to anyone until a badge is claimed. */
  let code = null;
  for (let i = 0; i < 8; i++) {
    const c = newCode();
    if (!(await env.DC.get(codeKey(c)))) { code = c; break; }
  }
  if (!code) return bad('Could not allocate a friend code. Try again.', 503);

  const u = { u: username, pw, code, badge: null, coll: {}, notices: [], created: Date.now() };
  await env.DC.put(codeKey(code), username);
  await putUser(env, u);
  const token = await startSession(env, username);
  return json({ token, user: publicUser(u) });
}

async function login(env, body) {
  const { username, password } = body;
  if (typeof username !== 'string' || typeof password !== 'string')
    return bad('Enter a username and password.');

  /* Rate limit before touching the password, so guessing costs time. */
  const fails = parseInt(await env.DC.get(failKey(username)) || '0', 10);
  if (fails >= MAX_FAILS)
    return bad('Too many failed attempts. Wait fifteen minutes and try again.', 429);

  const u = await getUser(env, username);
  const generic = 'That username and password do not match.';
  if (!u) {
    /* Spend the time anyway so a missing user is not faster than a wrong password. */
    await hashPassword(password);
    await env.DC.put(failKey(username), String(fails + 1), { expirationTtl: FAIL_WINDOW_S });
    return bad(generic, 401);
  }
  const got = await hashPassword(password, u.pw.salt, u.pw.iter);
  if (!safeEqual(got.hash, u.pw.hash)) {
    await env.DC.put(failKey(username), String(fails + 1), { expirationTtl: FAIL_WINDOW_S });
    return bad(generic, 401);
  }
  await env.DC.delete(failKey(username));
  const token = await startSession(env, u.u);
  return json({ token, user: publicUser(u) });
}

/* Claim or swap the badge you wear. Cooldown is enforced HERE — a check in the
   browser is a suggestion, not a rule. */
async function claimBadge(env, session, body) {
  const u = session.user;
  const { id, exc, pct, band } = body;
  if (typeof id !== 'string' || !id) return bad('No badge given.');

  const now = Date.now();
  if (u.badge && now < u.badge.at + COOLDOWN_MS) {
    const left = u.badge.at + COOLDOWN_MS - now;
    return json({
      error: 'cooldown',
      message: 'You can change your badge once a day. Try again in '
        + Math.ceil(left / 3600000) + ' hour' + (Math.ceil(left / 3600000) === 1 ? '' : 's') + '.',
      nextClaimAt: u.badge.at + COOLDOWN_MS
    }, 429);
  }

  u.badge = {
    id,
    exc: typeof exc === 'string' ? exc.slice(0, 200) : null,
    pct: Number(pct) || 0,
    band: typeof band === 'string' ? band.slice(0, 40) : '',
    at: now
  };
  await putUser(env, u);
  return json({ user: publicUser(u) });
}

/* Friend-code trade. Mutual and symmetric: each side ends holding the other's
   current badge. One slot per person — trading again with someone you have
   already traded with UPDATES their slot rather than adding a second badge. */
async function trade(env, session, body) {
  const me = session.user;
  const code = String(body.code || '').trim().toUpperCase();

  if (!/^[A-Z0-9]{6}$/.test(code)) return bad('That code does not look right. Six characters.');
  if (!me.badge) return bad('Claim your own badge before you trade.', 403);
  if (code === me.code) return bad('That is your own code.');

  const otherName = await env.DC.get(codeKey(code));
  if (!otherName) return bad('No one has that code.', 404);

  const them = await getUser(env, otherName);
  if (!them) return bad('No one has that code.', 404);
  if (!them.badge) return bad('That person has not claimed a badge yet.', 409);

  const now = Date.now();
  me.coll = me.coll || {}; them.coll = them.coll || {};
  const had = !!me.coll[them.u];

  /* One slot per person, each way. Re-trading refreshes what they are wearing. */
  me.coll[them.u]  = { id: them.badge.id, exc: them.badge.exc || null, at: now };
  them.coll[me.u]  = { id: me.badge.id,   exc: me.badge.exc   || null, at: now };

  /* The other side is offline right now, so their congratulations waits for them. */
  them.notices = (them.notices || []).slice(-19);
  them.notices.push({ from: me.u, id: me.badge.id, at: now, updated: !!them.coll && had });

  await putUser(env, them);
  await putUser(env, me);

  return json({
    user: publicUser(me),
    got: { from: them.u, id: them.badge.id, exc: them.badge.exc || null, updated: had }
  });
}

async function seenNotices(env, session) {
  const u = session.user;
  u.notices = [];
  await putUser(env, u);
  return json({ user: publicUser(u) });
}

async function logout(env, session) {
  await env.DC.delete(sessKey(session.token));
  return json({ ok: true });
}

/* ---------------- entry ---------------- */
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (!url.pathname.startsWith('/api/')) {
      return env.ASSETS.fetch(request);       // everything else is the static site
    }
    if (request.method !== 'POST' && request.method !== 'GET')
      return bad('Method not allowed.', 405);
    if (!env.DC)
      return bad('Storage is not configured on this deployment.', 503);

    let body = {};
    if (request.method === 'POST') {
      try { body = await request.json(); } catch (e) { body = {}; }
    }

    try {
      switch (url.pathname) {
        case '/api/signup': return await signup(env, body);
        case '/api/login':  return await login(env, body);
      }

      const session = await auth(env, request);
      if (!session) return bad('Sign in again.', 401);

      switch (url.pathname) {
        case '/api/me':     return json({ user: publicUser(session.user) });
        case '/api/badge':  return await claimBadge(env, session, body);
        case '/api/trade':  return await trade(env, session, body);
        case '/api/seen':   return await seenNotices(env, session);
        case '/api/logout': return await logout(env, session);
      }
      return bad('No such endpoint.', 404);
    } catch (err) {
      /* Name the failure. A generic message here cost a debugging session. */
      return json({ error: 'server', message: 'Server error: ' + (err && err.message ? err.message : String(err)) }, 500);
    }
  }
};
