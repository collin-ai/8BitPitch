// ============================================================
// Exercise 4: Value Equity Ask Triangle
// Visual triangle layout — one corner is blank each question.
// Valuation top, Equity bottom-left, Ask bottom-right.
// No written question text; the blank corner says it all.
// ============================================================

window.BitPitch = window.BitPitch || {};
window.BitPitch.exercises = window.BitPitch.exercises || {};

window.BitPitch.exercises['ex04'] = function (context) {
  var R     = window.BitPitch.random;
  var close = window.BitPitch.isCloseEnough;

  var QUESTIONS_PER_SESSION = 5;
  var TIME_GOAL_SEC         = 15;
  var qCount  = 0;
  var timer   = new window.BitPitch.Timer();
  var timerIv = null;

  var TYPES = ['valuation', 'equity', 'ask'];

  function nextQuestion() {
    if (qCount >= QUESTIONS_PER_SESSION) { context.onSessionEnd(); return; }
    qCount++;
    var tri  = R.randTriangle();
    var type = R.randFrom(TYPES);
    showQuestion(tri, type);
  }

  function nodeHTML(label, value, isBlank, placeholder) {
    var blankClass = isBlank ? ' tri-node-blank' : '';
    var valueHTML  = isBlank
      ? '<input id="tri-input" class="drill-input" type="text" placeholder="' + placeholder + '" autocomplete="off" />'
      : '<div class="tri-node-value">' + value + '</div>';
    return '<div class="tri-node' + blankClass + '">' +
      '<div class="tri-node-label">' + label + (isBlank ? ' (?)' : '') + '</div>' +
      valueHTML +
      '</div>';
  }

  function showQuestion(tri, type) {
    var correctAnswer, placeholder;

    if (type === 'valuation') {
      correctAnswer = tri.valuation;
      placeholder   = 'e.g. $5M';
    } else if (type === 'equity') {
      correctAnswer = tri.equity;
      placeholder   = 'e.g. 20';
    } else {
      correctAnswer = tri.ask;
      placeholder   = 'e.g. $500K';
    }

    var valHTML = nodeHTML('VALUATION', R.formatMoney(tri.valuation), type === 'valuation', placeholder);
    var eqHTML  = nodeHTML('EQUITY',    tri.equity + '%',             type === 'equity',    placeholder);
    var askHTML = nodeHTML('ASK',       R.formatMoney(tri.ask),       type === 'ask',       placeholder);

    context.container.innerHTML =
      '<div class="drill-card">' +
        '<div class="progress-row">' +
          '<div class="drill-progress">QUESTION <span class="current">' + qCount + '</span> / ' + QUESTIONS_PER_SESSION + '</div>' +
          '<span class="drill-timer-q" id="drill-timer-q"></span>' +
        '</div>' +
        '<div class="tri-layout">' +
          '<div class="tri-row-top">' + valHTML + '</div>' +
          '<div class="tri-row-bottom">' + eqHTML + askHTML + '</div>' +
        '</div>' +
        '<div class="flex-row" style="gap:12px;margin-top:16px">' +
          '<button class="btn btn-primary" id="submit-btn">SUBMIT</button>' +
          '<button class="btn btn-danger"  id="pass-btn">PASS</button>' +
          '<button class="btn numpad-toggle-btn" type="button" onclick="BitPitch.Numpad.toggle()" onmousedown="return false">#</button>' +
          '<button class="btn sound-toggle-btn' + (window.BitPitch.Sound && !window.BitPitch.Sound.isEnabled() ? ' muted' : '') + '" type="button" onclick="BitPitch.Sound.toggle()" onmousedown="return false">SFX</button>' +
        '</div>' +
      '</div>';

    var input = document.getElementById('tri-input');
    input.focus();
    timer.start();

    clearInterval(timerIv);
    if (context.mode === 'drill') {
      timerIv = setInterval(function () {
        var tq = document.getElementById('drill-timer-q');
        if (!tq) { clearInterval(timerIv); return; }
        var s = timer.getElapsedSeconds();
        tq.textContent = window.BitPitch.formatElapsed(s);
        tq.className = s > TIME_GOAL_SEC ? 'drill-timer-q warning' : 'drill-timer-q';
      }, 100);
    }

    function submit() {
      var rawInput = input.value.trim();
      if (rawInput === '') { document.getElementById('pass-btn').click(); return; }
      clearInterval(timerIv);
      var elapsed = timer.stop();
      var userVal = R.parseUserNumber(rawInput);
      var isOk;
      var cfg = (DIFFICULTY_CONFIG && DIFFICULTY_CONFIG[context.difficulty]) || { pct33: 10, general: 10 };
      if (type === 'ask' && tri.equity === 33) {
        if (context.difficulty === 'HARD') {
          isOk = window.BitPitch.isCloseEnough2dp(userVal, correctAnswer);
        } else {
          isOk = close(userVal, correctAnswer, cfg.pct33);
        }
      } else {
        isOk = close(userVal, correctAnswer, context.difficulty === 'HARD' ? 0 : cfg.general);
      }

      var sb = document.getElementById('submit-btn');
      if (sb) { sb.disabled = true; sb.classList.add('btn-submitted'); }
      input.classList.add('input-submitted');

      context.onComplete({
        exerciseId: 'ex04',
        question:   type + ' triangle',
        correct:    isOk,
        timeMs:     elapsed
      });

      showFeedback(type, tri, correctAnswer, isOk, elapsed, false, rawInput);
    }

    document.getElementById('submit-btn').onclick = submit;
    input.onkeydown = function (e) { if (e.key === 'Enter') { e.stopPropagation(); submit(); } };

    document.getElementById('pass-btn').onclick = function () {
      clearInterval(timerIv);
      var elapsed = timer.stop();
      var sb = document.getElementById('submit-btn');
      if (sb) { sb.disabled = true; sb.classList.add('btn-submitted'); }
      input.value = 'PASS';
      input.classList.add('input-submitted');
      context.onComplete({ exerciseId: 'ex04', question: type + ' triangle', correct: false, timeMs: elapsed });
      showFeedback(type, tri, correctAnswer, false, elapsed, true, null);
    };
  }

  function showFeedback(type, tri, correct, isOk, elapsed, isPassed, rawInput) {
    if (window.BitPitch.Sound) window.BitPitch.Sound.play(isOk && !isPassed);
    var cls = isOk ? 'feedback-correct' : 'feedback-wrong';
    var msg = isOk ? 'CORRECT!' : 'WRONG';
    var displayCorrect = type === 'equity' ? correct + '%' : R.formatMoney(correct);

    // Exact answer (always Hard rules: 2dp for 33% ask, otherwise rounded)
    var exactCorrect;
    if (type === 'equity') {
      exactCorrect = correct + '%';
    } else if (type === 'ask' && tri.equity === 33) {
      exactCorrect = R.formatMoneyDp(correct, 2);
    } else {
      exactCorrect = R.formatMoney(Math.round(correct));
    }
    var exactLine = 'EXACT ANSWER: ' + exactCorrect;

    // Acceptable range
    var cfg = (DIFFICULTY_CONFIG && DIFFICULTY_CONFIG[context.difficulty]) || { pct33: 10, general: 10 };
    var tol = (type === 'ask' && tri.equity === 33)
      ? (context.difficulty === 'HARD' ? null : cfg.pct33)
      : (context.difficulty === 'HARD' ? 0 : cfg.general);
    var acceptableLine;
    if (tol === null || tol === 0) {
      var displayCorrect = type === 'equity' ? correct + '%' : R.formatMoney(correct);
      acceptableLine = 'ACCEPTABLE: ' + displayCorrect + ' <span class="text-dim" style="font-size:8px">(HARD exact)</span>';
    } else {
      var lo = correct * (1 - tol / 100);
      var hi = correct * (1 + tol / 100);
      var loFmt = (type === 'equity') ? Math.round(lo) + '%' : R.formatMoney(lo);
      var hiFmt = (type === 'equity') ? Math.round(hi) + '%' : R.formatMoney(hi);
      acceptableLine = 'ACCEPTABLE: ' + loFmt + ' \u2013 ' + hiFmt + ' <span class="text-dim" style="font-size:8px">(' + context.difficulty + ' \u00b1' + tol + '%)</span>';
    }

    // Your answer
    var yourAnswer;
    if (isPassed || rawInput === null || rawInput === '') {
      yourAnswer = 'PASS';
    } else if (isOk) {
      yourAnswer = esc(rawInput);
    } else {
      var pv = R.parseUserNumber(rawInput);
      yourAnswer = (type === 'equity') ? (isNaN(pv) ? '?' : pv + '%') : R.formatMoney(pv);
    }

    context.container.innerHTML +=
      '<div class="feedback-box ' + cls + '">' +
        msg + '<br><br>' +
        exactLine + '<br>' +
        acceptableLine + '<br>' +
        '<span class="text-dim" style="font-size:8px">Ask: ' + R.formatMoney(tri.ask) +
        '&nbsp; Equity: ' + tri.equity + '%&nbsp; Valuation: ' + R.formatMoney(tri.valuation) + '</span><br>' +
        'YOUR ANSWER: <span class="text-dim">' + yourAnswer + '</span>' +
        (context.mode === 'drill' ? '<br>Time: ' + window.BitPitch.formatElapsed(elapsed/1000, true) : '') +
      '</div>' +
      '<button class="btn btn-secondary mt-16" id="next-btn">NEXT &#9654;</button>';

    document.getElementById('next-btn').onclick = function () {
      document.onkeydown = null;
      timer.reset();
      context.timerEl.textContent = '';
      context.timerEl.className = 'drill-timer';
      nextQuestion();
    };

    document.onkeydown = function (e) {
      if (e.key === 'Enter') { var nb = document.getElementById('next-btn'); if (nb) nb.click(); }
    };
  }

  nextQuestion();
};
