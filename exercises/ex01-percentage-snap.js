// ============================================================
// Exercise 1: Daily Percentage Snap Drills
// Practices the core Shark Tank triangle: Ask / Equity% / Valuation.
// Three question types — always derived from clean numbers so the
// math is mentally solvable.
// ============================================================

window.BitPitch = window.BitPitch || {};
window.BitPitch.exercises = window.BitPitch.exercises || {};

window.BitPitch.exercises['ex01'] = function (context) {
  var R     = window.BitPitch.random;
  var close = window.BitPitch.isCloseEnough;

  var QUESTIONS_PER_SESSION = 5;
  var qCount = 0;
  var timer  = new window.BitPitch.Timer();

  var TYPES = ['valuation', 'equity', 'ask'];

  function nextQuestion() {
    if (qCount >= QUESTIONS_PER_SESSION) { context.onSessionEnd(); return; }
    qCount++;
    var tri  = R.randTriangle();
    var type = R.randFrom(TYPES);
    showQuestion(tri, type);
  }

  function showQuestion(tri, type) {
    var questionText, correctAnswer, answerLabel, placeholder;

    if (type === 'valuation') {
      questionText  = 'A founder asks for <span class="highlight">' + R.formatMoney(tri.ask) + '</span>' +
                      ' in exchange for <span class="highlight">' + tri.equity + '%</span> equity.<br><br>' +
                      'What is the <span class="text-yellow">IMPLIED VALUATION</span>?';
      correctAnswer = tri.valuation;
      answerLabel   = 'VALUATION';
      placeholder   = 'e.g. $2M';

    } else if (type === 'equity') {
      questionText  = 'A founder asks for <span class="highlight">' + R.formatMoney(tri.ask) + '</span>' +
                      ' from a company valued at <span class="highlight">' + R.formatMoney(tri.valuation) + '</span>.<br><br>' +
                      'What <span class="text-yellow">EQUITY %</span> does that represent?';
      correctAnswer = tri.equity;
      answerLabel   = 'EQUITY %';
      placeholder   = 'e.g. 15 (just the number)';

    } else {
      questionText  = 'A company is valued at <span class="highlight">' + R.formatMoney(tri.valuation) + '</span>.' +
                      ' The founder offers <span class="highlight">' + tri.equity + '%</span> equity.<br><br>' +
                      'What is the <span class="text-yellow">INVESTMENT ASK</span>?';
      correctAnswer = tri.ask;
      answerLabel   = 'ASK ($)';
      placeholder   = 'e.g. $500K';
    }

    context.container.innerHTML =
      '<div class="drill-card">' +
        '<div class="progress-row">' +
          '<div class="drill-progress">QUESTION <span class="current">' + qCount + '</span> / ' + QUESTIONS_PER_SESSION + '</div>' +
          '<span class="drill-timer-q" id="drill-timer-q"></span>' +
        '</div>' +
        '<div class="drill-question">' + questionText + '</div>' +
        '<div class="drill-input-row">' +
          '<label class="drill-input-label">' + answerLabel + ':</label>' +
          '<input id="snap-input" class="drill-input" type="text" placeholder="' + placeholder + '" autocomplete="off" />' +
        '</div>' +
        '<div class="flex-row" style="gap:12px;margin-top:16px">' +
          '<button class="btn btn-primary" id="submit-btn">SUBMIT</button>' +
          '<button class="btn btn-danger" id="pass-btn">PASS</button>' +
          '<button class="btn numpad-toggle-btn" type="button" onclick="BitPitch.Numpad.toggle()" onmousedown="return false">#</button>' +
        '</div>' +
      '</div>';

    var input = document.getElementById('snap-input');
    input.focus();
    timer.start();

    var iv;
    if (context.mode === 'drill') {
      iv = setInterval(function () {
        var tq = document.getElementById('drill-timer-q');
        if (!tq) { clearInterval(iv); return; }
        var s = timer.getElapsedSeconds();
        tq.textContent = window.BitPitch.formatElapsed(s);
        tq.className = s > 10 ? 'drill-timer-q warning' : 'drill-timer-q';
      }, 100);
    }

    function submit() {
      var rawInput = input.value.trim();
      if (rawInput === '') { document.getElementById('pass-btn').click(); return; }
      clearInterval(iv);
      var elapsed = timer.stop();
      var rawVal  = R.parseUserNumber(rawInput);
      var isOk;
      if (type === 'ask' && tri.equity === 33) {
        var cfg = (DIFFICULTY_CONFIG && DIFFICULTY_CONFIG[context.difficulty]) || { pct33: 5 };
        if (context.difficulty === 'HARD') {
          isOk = window.BitPitch.isCloseEnough2dp(rawVal, correctAnswer);
        } else {
          isOk = close(rawVal, correctAnswer, cfg.pct33);
        }
      } else {
        isOk = close(rawVal, correctAnswer, 5);
      }

      var sb = document.getElementById('submit-btn');
      if (sb) { sb.disabled = true; sb.classList.add('btn-submitted'); }
      input.classList.add('input-submitted');

      context.onComplete({ exerciseId: 'ex01', question: type + ' drill', correct: isOk, timeMs: elapsed });
      showFeedback(type, tri, correctAnswer, isOk, elapsed, rawInput, false);
    }

    document.getElementById('submit-btn').onclick = submit;
    input.onkeydown = function (e) { if (e.key === 'Enter') { e.stopPropagation(); submit(); } };

    document.getElementById('pass-btn').onclick = function () {
      clearInterval(iv);
      var elapsed = timer.stop();
      var sb = document.getElementById('submit-btn');
      if (sb) { sb.disabled = true; sb.classList.add('btn-submitted'); }
      input.value = 'PASS';
      input.classList.add('input-submitted');
      context.onComplete({ exerciseId: 'ex01', question: type + ' drill', correct: false, timeMs: elapsed });
      showFeedback(type, tri, correctAnswer, false, elapsed, null, true);
    };
  }

  function showFeedback(type, tri, correct, isOk, elapsed, rawInput, isPassed) {
    var cls = isOk ? 'feedback-correct' : 'feedback-wrong';
    var msg = isOk ? 'CORRECT!' : 'WRONG';
    var dp = (type === 'ask' && tri.equity === 33 && context.difficulty === 'HARD') ? 2 : 0;
    var displayCorrect = (type === 'equity') ? correct + '%' :
                         dp > 0 ? R.formatMoneyDp(correct, dp) : R.formatMoney(correct);

    // Acceptable range
    var tol = (type === 'ask' && tri.equity === 33)
      ? (context.difficulty === 'HARD' ? null : ((DIFFICULTY_CONFIG && DIFFICULTY_CONFIG[context.difficulty]) || { pct33: 5 }).pct33)
      : 5;
    var acceptableLine;
    if (tol === null) {
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
