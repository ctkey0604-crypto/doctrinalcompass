/* savecode.js — portable save codes for a static site.
 *
 * createSaveCode(obj)  ->  Promise<string>   a code the user can copy
 * readSaveCode(str)    ->  Promise<object>   the original object back
 * saveLocal(obj) / loadLocal() / clearLocal()  localStorage persistence
 *
 * No dependencies. No build step. Drop it in and add:
 *   <script src="savecode.js"></script>
 *
 * Pipeline: object -> JSON -> UTF-8 bytes -> deflate -> header+checksum -> base64url
 *
 * The header means old codes keep working after you change the site.
 * The checksum means a mistyped code fails loudly instead of loading garbage.
 */

(function (global) {
  'use strict';

  var FORMAT = 1;          // bump only if the byte layout itself changes
  var FLAG_COMPRESSED = 1; // bit 0 of the flags byte

  /* ---------- errors ---------------------------------------------------- */

  // Thrown for every bad-code case, so your UI can catch one type and show
  // err.message directly to the user. Messages are written to be read.
  function SaveCodeError(message) {
    this.name = 'SaveCodeError';
    this.message = message;
  }
  SaveCodeError.prototype = Object.create(Error.prototype);
  SaveCodeError.prototype.constructor = SaveCodeError;

  /* ---------- base64url -------------------------------------------------- */
  /* Standard base64 uses + / = which get mangled in URLs and look like typos.
     base64url swaps them for - _ and drops the padding. */

  function bytesToBase64Url(bytes) {
    var bin = '';
    var CHUNK = 0x8000; // apply() has an argument-count ceiling; chunk to stay under it
    for (var i = 0; i < bytes.length; i += CHUNK) {
      bin += String.fromCharCode.apply(null, bytes.subarray(i, i + CHUNK));
    }
    return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }

  function base64UrlToBytes(text) {
    var b64 = text.replace(/-/g, '+').replace(/_/g, '/');
    while (b64.length % 4) b64 += '='; // restore padding atob may want
    var bin = atob(b64);
    var bytes = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return bytes;
  }

  /* ---------- checksum --------------------------------------------------- */
  /* FNV-1a, truncated to 16 bits. Not security — it catches a dropped or
     swapped character so the user gets "that code looks incomplete" instead
     of a half-restored quiz. */

  function checksum16(bytes) {
    var h = 0x811c9dc5;
    for (var i = 0; i < bytes.length; i++) {
      h ^= bytes[i];
      h = Math.imul(h, 0x01000193) >>> 0;
    }
    return h & 0xffff;
  }

  /* ---------- compression ------------------------------------------------ */
  /* CompressionStream is built into the browser — no library needed.
     'deflate-raw' omits the gzip header, which saves ~18 bytes.
     If it is missing (very old browser), we store the JSON uncompressed and
     record that in the flags byte, so decoding still works either way. */

  var canCompress = typeof global.CompressionStream === 'function' &&
                    typeof global.DecompressionStream === 'function';

  function streamThrough(bytes, transform) {
    var stream = new Blob([bytes]).stream().pipeThrough(transform);
    return new Response(stream).arrayBuffer().then(function (buf) {
      return new Uint8Array(buf);
    });
  }

  function deflate(bytes) {
    return streamThrough(bytes, new global.CompressionStream('deflate-raw'));
  }

  function inflate(bytes) {
    return streamThrough(bytes, new global.DecompressionStream('deflate-raw'));
  }

  /* ---------- encode ----------------------------------------------------- */

  /**
   * Turn a plain object into a save code.
   * Async because the browser's compressor is stream-based.
   *
   *   var code = await createSaveCode({ v: 1, answers: '31042...' });
   */
  function createSaveCode(data) {
    var raw;
    try {
      raw = new TextEncoder().encode(JSON.stringify(data));
    } catch (e) {
      return Promise.reject(new SaveCodeError('That data could not be turned into a code.'));
    }

    var packed = canCompress
      ? deflate(raw).catch(function () { return null; })
      : Promise.resolve(null);

    return packed.then(function (body) {
      var flags = 0;
      // Compression can make tiny payloads bigger. Keep whichever won.
      if (body && body.length < raw.length) {
        flags |= FLAG_COMPRESSED;
      } else {
        body = raw;
      }

      var sum = checksum16(body);
      var out = new Uint8Array(4 + body.length);
      out[0] = FORMAT;
      out[1] = flags;
      out[2] = (sum >> 8) & 0xff;
      out[3] = sum & 0xff;
      out.set(body, 4);

      return bytesToBase64Url(out);
    });
  }

  /* ---------- decode ----------------------------------------------------- */

  /**
   * Turn a save code back into the original object.
   * Rejects with a SaveCodeError carrying a message you can show as-is.
   *
   *   try { state = await readSaveCode(input.value); }
   *   catch (err) { showError(err.message); }
   */
  function readSaveCode(code) {
    return Promise.resolve().then(function () {
      // Users paste with stray spaces and line breaks. Strip them first.
      var cleaned = String(code == null ? '' : code).replace(/\s+/g, '');
      if (!cleaned) throw new SaveCodeError('Paste a save code first.');

      var bytes;
      try {
        bytes = base64UrlToBytes(cleaned);
      } catch (e) {
        throw new SaveCodeError('That does not look like a save code.');
      }
      if (bytes.length < 5) throw new SaveCodeError('That save code is incomplete.');

      var version = bytes[0];
      if (version > FORMAT) {
        throw new SaveCodeError('That code came from a newer version of this site.');
      }

      var flags = bytes[1];
      var expected = (bytes[2] << 8) | bytes[3];
      var body = bytes.subarray(4);

      if (checksum16(body) !== expected) {
        throw new SaveCodeError('That save code looks mistyped or incomplete.');
      }

      if (!(flags & FLAG_COMPRESSED)) return body;
      if (!canCompress) {
        throw new SaveCodeError('This browser cannot read compressed save codes.');
      }
      return inflate(body).catch(function () {
        throw new SaveCodeError('That save code could not be read.');
      });
    }).then(function (raw) {
      var text = new TextDecoder().decode(raw);
      try {
        return JSON.parse(text);
      } catch (e) {
        throw new SaveCodeError('That save code could not be read.');
      }
    });
  }

  /* ---------- localStorage ----------------------------------------------- */
  /* Every call is wrapped: localStorage throws in some private-browsing modes
     and when the origin's quota is full. A site that cannot remember state is
     annoying; a site that crashes because it cannot remember state is broken. */

  var STORAGE_KEY = 'cdt:state:v1';

  function saveLocal(state) {
    try {
      global.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      return true;
    } catch (e) {
      return false;
    }
  }

  function loadLocal() {
    try {
      var text = global.localStorage.getItem(STORAGE_KEY);
      return text ? JSON.parse(text) : null;
    } catch (e) {
      return null; // corrupt or unreadable: treat as no saved state
    }
  }

  function clearLocal() {
    try {
      global.localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (e) {
      return false;
    }
  }

  /* ---------- exports ---------------------------------------------------- */

  global.SaveCode = {
    create: createSaveCode,
    read: readSaveCode,
    saveLocal: saveLocal,
    loadLocal: loadLocal,
    clearLocal: clearLocal,
    Error: SaveCodeError,
    STORAGE_KEY: STORAGE_KEY,
    canCompress: canCompress
  };
})(typeof window !== 'undefined' ? window : this);
