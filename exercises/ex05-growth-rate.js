// ============================================================
// Exercise 5: Growth Rate Snap-Estimates
// Given a revenue figure, apply growth rates (+20%, +30%, +50%, +100%).
// Builds intuition for projecting "next year revenue" during a pitch.
// ============================================================

window.BitPitch = window.BitPitch || {};
window.BitPitch.exercises = window.BitPitch.exercises || {};

window.BitPitch.exercises['ex05'] = function (context) {
  var R     = window.BitPitch.random;
  var close = window.BitPitch.isCloseEnough;

  var RATE_POOL       = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  var TOTAL_QUESTIONS = 5;
  var questionNum     = 0;
  var timer = new window.BitPitch.Timer();

  function showRate() {
    if (questionNum >= TOTAL_QUESTIONS) { context.onSessionEnd(); return; }
    questionNum++;

    var baseRev = R.randFrom(R.NICE_REVENUES);
    var pct     = RATE_POOL[Math.floor(Math.random() * RATE_POOL.length)];
    var r       = { label: '+' + pct + '% GROWTH', rate: pct / 100 };
    var correct = baseRev * (1 + r.rate);

    context.container.innerHTML =
      '<div class="drill-card">' +
        '<div class="progress-row">' +
          '<div class="drill-progress">Q <span class="current">' + questionNum + '</span> / ' + TOTAL_QUESTIONS + '</div>' +
          '<span class="drill-timer-q" id="drill-timer-q"></span>' +
        '</div>' +
        '<div class="drill-question">' +
          'CURRENT REVENUE: <span class="highlight">' + R.formatMoney(baseRev) + '</span><br><br>' +
          'WHAT IS THE REVENUE AFTER <span class="text-yellow">' + r.label + '</span>?' +
        '</div>' +
        '<div class="drill-input-row">' +
          '<label class="drill-input-label">ANSWER:</label>' +
          '<input id="rate-input" class="drill-input" type="text" placeholder="e.g. $1.5M" autocomplete="off" />' +
        '</div>' +
        '<div class="flex-row" style="gap:12px;margin-top:16px">' +
          '<button class="btn btn-primary" id="submit-btn">SUBMIT</button>' +
          '<button class="btn btn-danger" id="pass-btn">PASS</button>' +
          '<button class="btn numpad-toggle-btn" type="button" onclick="BitPitch.Numpad.toggle()" onmousedown="return false">#</button>' +
        '</div>' +
      '</div>';

    var input = document.getElementById('rate-input');
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
      var userVal = R.parseUserNumber(rawInput);
      var tol     = ((DIFFICULTY_CONFIG && DIFFICULTY_CONFIG[context.difficulty]) || { growth: 5 }).growth;
      var isOk    = close(userVal, correct, tol);

      var sb = document.getElementById('submit-btn');
      if (sb) { sb.disabled = true; sb.classList.add('btn-submitted'); }
      input.classList.add('input-submitted');

      context.onComplete({
        exerciseId: 'ex05',
        question:   R.formatMoney(baseRev) + ' ' + r.label,
        correct:    isOk,
        timeMs:     elapsed
      });

      showFeedback(r.label, baseRev, correct, userVal, isOk, elapsed, false, rawInput);
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
      context.onComplete({ exerciseId: 'ex05', question: R.formatMoney(baseRev) + ' ' + r.label, correct: false, timeMs: elapsed });
      showFeedback(r.label, baseRev, correct, null, false, elapsed, true, null);
    };
  }

  function showFeedback(rateLabel, base, correct, userVal, isOk, elapsed, isPassed, rawInput) {
    var cls = isOk ? 'feedback-correct' : 'feedback-wrong';
    var msg = isOk ? 'CORRECT!' : 'WRONG';

    // Acceptable range (difficulty-based growth tolerance)
    var tol = ((DIFFICULTY_CONFIG && DIFFICULTY_CONFIG[context.difficulty]) || { growth: 5 }).growth;
    var acceptableLine;
    if (tol === 0) {
      acceptableLine = 'ACCEPTABLE: ' + R.formatMoney(Math.round(correct)) + ' <span class="text-dim" style="font-size:8px">(HARD exact)</span>';
    } else {
      var lo = R.formatMoney(Math.round(correct * (1 - tol / 100)));
      var hi = R.formatMoney(Math.round(correct * (1 + tol / 100)));
      acceptableLine = 'ACCEPTABLE: ' + lo + ' \u2013 ' + hi + ' <span class="text-dim" style="font-size:8px">(' + context.difficulty + ' \u00b1' + tol + '%)</span>';
    }

    // Your answer
    var yourAnswer;
    if (isPassed || rawInput === null || rawInput === '') {
      yourAnswer = 'PASS';
    } else if (isOk) {
      yourAnswer = esc(rawInput);
    } else {
      yourAnswer = userVal !== null ? R.formatMoney(Math.round(userVal)) : '?';
    }

    context.container.innerHTML +=
      '<div class="feedback-box ' + cls + '">' +
        msg + '<br><br>' +
        acceptableLine + '<br>' +
        '<span class="text-dim" style="font-size:8px">' + R.formatMoney(base) + ' ' + rateLabel + ' = ' + R.formatMoney(Math.round(correct)) + '</span><br>' +
        'YOUR ANSWER: <span class="text-dim">' + yourAnswer + '</span>' +
        (context.mode === 'drill' ? '<br>Time: ' + window.BitPitch.formatElapsed(elapsed/1000, true) : '') +
      '</div>' +
      '<button class="btn btn-secondary mt-16" id="next-btn">NEXT &#9654;</button>';

    document.getElementById('next-btn').onclick = function () {
      document.onkeydown = null;
      timer.reset();
      showRate();
    };

    document.onkeydown = function (e) {
      if (e.key === 'Enter') { var nb = document.getElementById('next-btn'); if (nb) nb.click(); }
    };
  }

  showRate();
};
