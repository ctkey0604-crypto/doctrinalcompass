/* Doctrinal Compass — app.js
 * Renders every view from content.js. Add content there, not here.
 */

(function () {
  'use strict';

  var D = window.DATA;
  var app = document.getElementById('app');
  var dlg = document.getElementById('glossary-dialog');

  /* ---------- helpers ---------- */

  function byId(list, id) {
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }

  function trad(id) { return byId(D.traditions, id); }
  function axis(id) { return byId(D.axes, id); }
  function pos(t, a) { return D.positions[t + ':' + a] || null; }

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function go(hash) { location.hash = hash; }

  /* ---------- glossary ---------- */

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-term]');
    if (!el) return;
    var entry = D.glossary[el.getAttribute('data-term')];
    if (!entry) return;
    dlg.innerHTML =
      '<h4>' + esc(entry.term) + '</h4>' +
      '<p>' + entry.body + '</p>' +
      (entry.also ? '<p class="also">' + entry.also + '</p>' : '') +
      '<div class="row"><button class="ghost" data-close>Close</button></div>';
    dlg.showModal();
  });

  dlg.addEventListener('click', function (e) {
    if (e.target.hasAttribute('data-close') || e.target === dlg) dlg.close();
  });

  /* Make every glossary span behave like a button for keyboard and screen readers. */
  function wireTerms(root) {
    root.querySelectorAll('[data-term]').forEach(function (el) {
      if (el.dataset.wired) return;
      el.dataset.wired = '1';
      el.className = 'term';
      el.setAttribute('role', 'button');
      el.setAttribute('tabindex', '0');
      el.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.click(); }
      });
    });
  }

  /* ---------- shared fragments ---------- */

  function verifyBadge(src) {
    return src.verify ? ' <span class="verify" title="Not yet checked against the source">VERIFY</span>' : '';
  }

  function positionBlock(tId, aId, seat) {
    var t = trad(tId), p = pos(tId, aId);
    var cls = 'position' + (seat ? ' ' + seat : '');
    if (!p) {
      return '<div class="' + cls + '"><div class="who">' + esc(t.name) + '</div>' +
             '<p class="unwritten">Not written yet. This axis is declared unwritten rather than filled with a guess.</p></div>';
    }
    var html = '<div class="' + cls + '">';
    html += '<div class="who">' + esc(t.name) + '</div>';
    html += '<p class="what">' + p.what + '</p>';
    html += '<p class="why"><b>Why they hold it</b>' + p.why + '</p>';
    if (p.texts && p.texts.length) {
      html += '<div class="refs"><span>Texts: ' + p.texts.map(esc).join(' &middot; ') + '</span></div>';
    }
    if (p.sources && p.sources.length) {
      html += '<div class="refs">' + p.sources.map(function (s) {
        return '<span>' + esc(s.ref) + verifyBadge(s) + '</span>';
      }).join('') + '</div>';
    }
    if (p.caution) {
      html += '<div class="divergence" style="margin-top:8px">Editorial note: ' + p.caution + '</div>';
    }
    html += '</div>';
    return html;
  }

  function spectrum(aId, bId) {
    var marks = D.traditions.map(function (t) {
      var cls = t.id === aId ? ' a' : (t.id === bId ? ' b' : '');
      return '<div class="spectrum-mark' + cls + '" style="left:' + t.spectrum + '%" title="' + esc(t.name) + '"></div>';
    }).join('');
    return '<div class="spectrum">' +
      '<div class="spectrum-track">' + marks + '</div>' +
      '<div class="spectrum-ends"><span>The text alone</span><span>A living voice</span></div>' +
      '<p class="footnote">Every tradition on the site is marked here. One line cannot capture a question this size — treat it as a way in, not a verdict.</p>' +
      '</div>';
  }

  /* ---------- views ---------- */

  function viewHome() {
    return '' +
      '<p class="eyebrow">What this is</p>' +
      '<h2>See how Christians divide, and why each side holds what it holds.</h2>' +
      '<p class="lede">' + esc(D.meta.promise) + '</p>' +
      '<div class="card stack">' +
        '<a class="btn" href="#/compare">Compare two traditions</a>' +
        '<a class="btn ghost" href="#/traditions">Read one tradition</a>' +
        '<a class="btn ghost" href="#/test">Take the assessment</a>' +
      '</div>' +
      '<h3>Start with authority</h3>' +
      '<p>Nearly every other disagreement runs downstream of one question: when Christians disagree, what settles it? Where a tradition puts authority — in the text, in the Church\'s continuous reading, in a teaching office, or in a living voice — predicts most of what else it will hold.</p>' +
      spectrum() +
      '<p class="footnote">The assessment is the smallest part of this site on purpose. Knowing which label fits you is much less useful than understanding why the people who disagree with you find their own position obvious.</p>';
  }

  function viewTraditions() {
    var items = D.traditions.slice().sort(function (x, y) { return x.spectrum - y.spectrum; });
    return '' +
      '<p class="eyebrow">Traditions</p>' +
      '<h2>Sixteen traditions</h2>' +
      '<p class="lede">Ordered by where each places final authority, from the text alone to a living voice.</p>' +
      '<ul class="tradition-list">' +
      items.map(function (t) {
        return '<li><button onclick="location.hash=\'#/tradition/' + t.id + '\'">' +
          '<span class="name">' + esc(t.name) + '</span>' +
          '<span class="locus">' + esc(t.locus) + '</span>' +
          '</button></li>';
      }).join('') +
      '</ul>';
  }

  function viewTradition(id) {
    var t = trad(id);
    if (!t) return '<p>Unknown tradition.</p>';
    var html = '<p class="eyebrow">' + esc(t.family) + '</p><h2>' + esc(t.name) + '</h2>' +
      '<p class="lede">' + esc(t.locus) + '</p>' + spectrum(t.id);
    D.axes.forEach(function (a) {
      html += '<div class="axis-block"><h3>' + esc(a.name) + '</h3>' +
              '<p class="axis-question">' + esc(a.question) + '</p>' +
              positionBlock(t.id, a.id, 'a') + '</div>';
    });
    html += '<div class="row" style="margin-top:20px"><a class="btn ghost" href="#/compare?a=' + t.id + '">Compare with another tradition</a></div>';
    return html;
  }

  function viewCompare(params) {
    var aId = params.a || 'reformed';
    var bId = params.b || 'catholic';
    if (aId === bId) bId = aId === 'reformed' ? 'catholic' : 'reformed';

    function sel(which, current) {
      return '<select data-seat="' + which + '">' + D.traditions.map(function (t) {
        return '<option value="' + t.id + '"' + (t.id === current ? ' selected' : '') + '>' + esc(t.name) + '</option>';
      }).join('') + '</select>';
    }

    var html = '<p class="eyebrow">Compare</p><h2>Two traditions, side by side</h2>' +
      '<p class="lede">No test required. Pick any two and read what each holds and why.</p>' +
      '<div class="seats">' +
        '<div><div class="seat-label a">Seat A</div>' + sel('a', aId) + '</div>' +
        '<div><div class="seat-label b">Seat B</div>' + sel('b', bId) + '</div>' +
      '</div>' +
      spectrum(aId, bId);

    D.axes.forEach(function (ax) {
      var pa = pos(aId, ax.id), pb = pos(bId, ax.id);
      html += '<div class="axis-block"><h3>' + esc(ax.name) + '</h3>' +
              '<p class="axis-question">' + esc(ax.question) + '</p>';
      if (pa && pb) {
        var same = pa.what === pb.what;
        html += '<div class="divergence">' + (same
          ? 'These two hold materially the same position here.'
          : 'These two diverge here. Read both cases before deciding which is stronger.') + '</div>';
      }
      html += positionBlock(aId, ax.id, 'a');
      html += positionBlock(bId, ax.id, 'b');
      html += '</div>';
    });

    return html;
  }

  function viewAxis(id) {
    var ax = axis(id);
    if (!ax) return '<p>Unknown axis.</p>';
    var html = '<p class="eyebrow">Axis</p><h2>' + esc(ax.name) + '</h2>' +
               '<p class="lede">' + esc(ax.question) + '</p>';
    if (ax.id === 'authority') html += spectrum();
    D.traditions.slice().sort(function (x, y) { return x.spectrum - y.spectrum; }).forEach(function (t) {
      html += '<div class="axis-block">' + positionBlock(t.id, ax.id, null) + '</div>';
    });
    return html;
  }

  /* ---------- the assessment ---------- */

  var answers = [];   // index of chosen option per question, -1 = unanswered
  var step = 0;

  function resetTest() {
    answers = D.questions.map(function () { return -1; });
    step = 0;
  }

  function viewTest() {
    if (!answers.length) resetTest();
    if (step >= D.questions.length) { go('#/result'); return ''; }

    var q = D.questions[step];
    var pct = Math.round(step / D.questions.length * 100);

    return '' +
      '<div class="progress">Question ' + (step + 1) + ' of ' + D.questions.length + '</div>' +
      '<div class="progress-track"><span style="width:' + pct + '%"></span></div>' +
      '<p class="eyebrow">' + esc(axis(q.axis).name) + '</p>' +
      '<h2>' + esc(q.text) + '</h2>' +
      q.options.map(function (o, i) {
        return '<button class="choice" data-answer="' + i + '" aria-pressed="' + (answers[step] === i) + '">' + esc(o.label) + '</button>';
      }).join('') +
      '<div class="row" style="margin-top:14px">' +
        (step > 0 ? '<button class="ghost small" data-back>Back</button>' : '') +
        '<button class="ghost small" data-skip>Skip this one</button>' +
      '</div>' +
      '<p class="footnote">Pick the option closest to what you actually think, not what you think you are supposed to think. Skipping is fine — a skipped question is simply left out of the comparison.</p>';
  }

  function score() {
    var tally = {};
    D.traditions.forEach(function (t) { tally[t.id] = 0; });
    var answered = 0;

    D.questions.forEach(function (q, qi) {
      var pick = answers[qi];
      if (pick < 0) return;
      answered++;
      q.options[pick].t.forEach(function (id) {
        if (tally[id] !== undefined) tally[id]++;
      });
    });

    var best = null;
    Object.keys(tally).forEach(function (id) {
      if (!best || tally[id] > tally[best]) best = id;
    });

    var ties = Object.keys(tally).filter(function (id) { return tally[id] === tally[best]; });
    return { tally: tally, best: best, ties: ties, answered: answered };
  }

  function viewResult() {
    var s = score();
    if (!s.answered) return '<h2>Nothing answered yet.</h2><div class="row"><a class="btn" href="#/test">Take the assessment</a></div>';

    var bestT = trad(s.best);

    var html = '<p class="eyebrow">Your result</p>';
    html += '<div class="result-headline">' + esc(bestT.name) + '</div>';
    html += '<p class="result-sub">Your answers line up with this tradition more often than with any other — ' +
            s.tally[s.best] + ' of ' + s.answered + ' questions.</p>';

    if (s.ties.length > 1) {
      html += '<div class="divergence">You tied with ' +
        s.ties.filter(function (id) { return id !== s.best; }).map(function (id) { return esc(trad(id).name); }).join(', ') +
        '. A tie usually means the questions you answered do not yet separate these traditions — the axes that would are further down the site.</div>';
    }

    html += '<p class="result-caveat">This is a label, and a label is the least interesting thing here. It does not mean you belong in this tradition, and it does not mean the tradition you already belong to is wrong. What follows is the part worth your time: the places your own answers do not match, and who else answers the way you did.</p>';

    /* Divergences — the part he actually cares about */
    var diverged = [];
    D.questions.forEach(function (q, qi) {
      var pick = answers[qi];
      if (pick < 0) return;
      if (q.options[pick].t.indexOf(s.best) === -1) diverged.push({ q: q, qi: qi, pick: pick });
    });

    if (diverged.length) {
      html += '<h3>Where you differ from ' + esc(bestT.name) + '</h3>';
      html += '<p class="lede">Worth reading the tradition\'s own reasoning here. It may be that you have not yet heard the case it makes — or that you have, and disagree. Both are worth knowing about yourself.</p>';
      diverged.forEach(function (d) {
        var theirs = null;
        d.q.options.forEach(function (o) { if (o.t.indexOf(s.best) !== -1) theirs = o; });
        var company = d.q.options[d.pick].t.map(function (id) {
          var t = trad(id); return t ? t.name : null;
        }).filter(Boolean);

        html += '<div class="diverge-item">' +
          '<div class="axis-name">' + esc(axis(d.q.axis).name) + '</div>' +
          '<p class="mine"><span class="tag">You said</span><br>' + esc(d.q.options[d.pick].label) + '</p>' +
          (theirs ? '<p class="theirs"><span class="tag">' + esc(bestT.name) + ' holds</span><br>' + esc(theirs.label) + '</p>' : '') +
          (company.length ? '<p class="company">Answering as you did: ' + company.map(esc).join(', ') + '</p>' : '') +
          '<div class="row" style="margin-top:8px"><a class="btn ghost small" href="#/axis/' + d.q.axis + '">Read every position on this</a></div>' +
          '</div>';
      });
    } else {
      html += '<h3>No divergences in what you answered</h3>' +
              '<p>Every answer you gave matches this tradition\'s stated position. The axes not yet written on this site are where a difference would most likely show up.</p>';
    }

    html += '<h3>Keep this result</h3>' +
      '<p class="lede">Nothing here is stored on a server. Your save code holds your answers and lives only on your device unless you copy it somewhere.</p>' +
      '<div class="card">' +
        '<textarea id="code-out" readonly placeholder="Generating..."></textarea>' +
        '<div class="row"><button class="small" id="copy-code">Copy save code</button>' +
        '<button class="ghost small" id="clear-code">Clear saved data</button></div>' +
      '</div>' +
      '<div class="card">' +
        '<label class="eyebrow" for="code-in">Restore a save code</label>' +
        '<textarea id="code-in" placeholder="Paste a save code"></textarea>' +
        '<div class="row"><button class="ghost small" id="load-code">Restore</button></div>' +
        '<p class="footnote" id="code-msg" hidden></p>' +
      '</div>' +
      '<div class="row" style="margin-top:16px">' +
        '<a class="btn ghost" href="#/compare?a=' + s.best + '">Compare ' + esc(bestT.name) + ' with someone else</a>' +
      '</div>';

    return html;
  }

  function viewGlossary() {
    var keys = Object.keys(D.glossary).sort(function (a, b) {
      return D.glossary[a].term.localeCompare(D.glossary[b].term);
    });
    return '<p class="eyebrow">Glossary</p><h2>The words this argument uses</h2>' +
      '<p class="lede">These terms are precise. Most disagreements about them are really disagreements about which one is being used.</p>' +
      keys.map(function (k) {
        var g = D.glossary[k];
        return '<div class="axis-block"><h3>' + esc(g.term) + '</h3><p>' + g.body + '</p>' +
               (g.also ? '<p class="footnote">' + g.also + '</p>' : '') + '</div>';
      }).join('');
  }

  /* ---------- routing ---------- */

  function parseHash() {
    var raw = location.hash.replace(/^#\/?/, '');
    var qs = {};
    var qi = raw.indexOf('?');
    if (qi >= 0) {
      raw.slice(qi + 1).split('&').forEach(function (pair) {
        var kv = pair.split('=');
        qs[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1] || '');
      });
      raw = raw.slice(0, qi);
    }
    return { parts: raw.split('/').filter(Boolean), qs: qs };
  }

  function render() {
    var r = parseHash();
    var head = r.parts[0] || '';
    var html;

    switch (head) {
      case '':            html = viewHome(); break;
      case 'traditions':  html = viewTraditions(); break;
      case 'tradition':   html = viewTradition(r.parts[1]); break;
      case 'compare':     html = viewCompare(r.qs); break;
      case 'axis':        html = viewAxis(r.parts[1]); break;
      case 'test':        html = viewTest(); break;
      case 'result':      html = viewResult(); break;
      case 'glossary':    html = viewGlossary(); break;
      default:            html = viewHome();
    }

    app.innerHTML = html;
    wireTerms(app);
    window.scrollTo(0, 0);

    document.querySelectorAll('nav.tabs a').forEach(function (a) {
      var target = a.getAttribute('href').replace(/^#\/?/, '').split('/')[0];
      if (target === head) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });

    if (head === 'result') wireResult();
    if (head === 'compare') wireCompare();
  }

  function wireCompare() {
    app.querySelectorAll('select[data-seat]').forEach(function (sel) {
      sel.addEventListener('change', function () {
        var a = app.querySelector('select[data-seat="a"]').value;
        var b = app.querySelector('select[data-seat="b"]').value;
        go('#/compare?a=' + a + '&b=' + b);
      });
    });
  }

  function wireResult() {
    var out = document.getElementById('code-out');
    var msg = document.getElementById('code-msg');

    function say(text) {
      if (!msg) return;
      msg.textContent = text;
      msg.hidden = !text;
    }

    /* Compact payload: answers as one positional string, not verbose keys.
       "-" marks a skipped question. */
    var payload = {
      v: 1,
      a: answers.map(function (n) { return n < 0 ? '-' : String(n); }).join('')
    };

    window.SaveCode.saveLocal(payload);

    window.SaveCode.create(payload).then(function (code) {
      if (out) out.value = code;
    }).catch(function () {
      if (out) out.value = '';
      say('Could not build a save code in this browser.');
    });

    var copyBtn = document.getElementById('copy-code');
    if (copyBtn) copyBtn.addEventListener('click', function () {
      if (!out.value) return;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(out.value).then(function () { say('Save code copied.'); },
          function () { say('Copying was blocked. Select the code and copy it manually.'); });
      } else {
        out.select();
        say('Select the code and copy it manually.');
      }
    });

    var loadBtn = document.getElementById('load-code');
    if (loadBtn) loadBtn.addEventListener('click', function () {
      var input = document.getElementById('code-in');
      window.SaveCode.read(input.value).then(function (obj) {
        if (!obj || typeof obj.a !== 'string') throw new Error('bad shape');
        answers = obj.a.split('').map(function (ch) { return ch === '-' ? -1 : Number(ch); });
        while (answers.length < D.questions.length) answers.push(-1);
        window.SaveCode.saveLocal(obj);
        render();
      }).catch(function (err) {
        say(err && err.message ? err.message : 'That save code could not be read.');
      });
    });

    var clearBtn = document.getElementById('clear-code');
    if (clearBtn) clearBtn.addEventListener('click', function () {
      window.SaveCode.clearLocal();
      resetTest();
      say('Cleared from this device.');
    });
  }

  /* ---------- test interactions ---------- */

  app.addEventListener('click', function (e) {
    var choice = e.target.closest('[data-answer]');
    if (choice) {
      answers[step] = Number(choice.getAttribute('data-answer'));
      step++;
      if (step >= D.questions.length) go('#/result');
      else app.innerHTML = viewTest(), wireTerms(app), window.scrollTo(0, 0);
      return;
    }
    if (e.target.closest('[data-skip]')) {
      answers[step] = -1;
      step++;
      if (step >= D.questions.length) go('#/result');
      else app.innerHTML = viewTest(), wireTerms(app), window.scrollTo(0, 0);
      return;
    }
    if (e.target.closest('[data-back]')) {
      step = Math.max(0, step - 1);
      app.innerHTML = viewTest();
      wireTerms(app);
      window.scrollTo(0, 0);
    }
  });

  /* ---------- boot ---------- */

  resetTest();

  var saved = window.SaveCode.loadLocal();
  if (saved && typeof saved.a === 'string') {
    answers = saved.a.split('').map(function (ch) { return ch === '-' ? -1 : Number(ch); });
    while (answers.length < D.questions.length) answers.push(-1);
  }

  window.addEventListener('hashchange', render);
  render();
})();
