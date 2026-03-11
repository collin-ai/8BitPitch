// ============================================================
// Exercise 4: Shark Tank Triangle Drill
// Same math as ex01 but with a 15-second countdown timer shown
// prominently on screen — adds pressure to build speed.
// ============================================================

window.BitPitch = window.BitPitch || {};
window.BitPitch.exercises = window.BitPitch.exercises || {};

window.BitPitch.exercises['ex04'] = function (context) {
  var R     = window.BitPitch.random;
  var close = window.BitPitch.isCloseEnough;

  var QUESTIONS_PER_SESSION = 10;
  var TIME_GOAL_SEC         = 15;
  var qCount = 0;
  var timer  = new window.BitPitch.Timer();
  var timerIv;

  var TYPES = ['valuation', 'equity', 'ask'];

  function nextQuestion() {
    if (qCount >= QUESTIONS_PER_SESSION) { context.onSessionEnd(); return; }
    qCount++;
    var tri  = R.randTriangle();
    var type = R.randFrom(TYPES);
    showQuestion(tri, type);
  }

  function showQuestion(tri, type) {
    var given, solveFor, correctAnswer, placeholder;

    if (type === 'valuation') {
      given         = 'ASK: <span class="highlight">' + R.formatMoney(tri.ask) + '</span>' +
                      '&nbsp;&nbsp;&nbsp;EQUITY: <span class="highlight">' + tri.equity + '%</span>';
      solveFor      = 'VALUATION';
      correctAnswer = tri.valuation;
      placeholder   = 'e.g. $5M';

    } else if (type === 'equity') {
      given         = 'ASK: <span class="highlight">' + R.formatMoney(tri.ask) + '</span>' +
                      '&nbsp;&nbsp;&nbsp;VALUATION: <span class="highlight">' + R.formatMoney(tri.valuation) + '</span>';
      solveFor      = 'EQUITY %';
      correctAnswer = tri.equity;
      placeholder   = 'e.g. 20';

    } else {
      given         = 'VALUATION: <span class="highlight">' + R.formatMoney(tri.valuation) + '</span>' +
                      '&nbsp;&nbsp;&nbsp;EQUITY: <span class="highlight">' + tri.equity + '%</span>';
      solveFor      = 'ASK ($)';
      correctAnswer = tri.ask;
      placeholder   = 'e.g. $500K';
    }

    context.container.innerHTML =
      '<div class="drill-card">' +
        '<div class="drill-progress">QUESTION <span class="current">' + qCount + '</span> / ' + QUESTIONS_PER_SESSION + '</div>' +
        '<div class="time-goal">GOAL: UNDER <span class="goal-num">' + TIME_GOAL_SEC + ' SECONDS</span></div>' +
        '<div style="font-size:9px;color:var(--text-dim);margin-bottom:8px">GIVEN:</div>' +
        '<div class="drill-question">' + given + '</div>' +
        '<div style="font-size:9px;color:var(--yellow);margin:16px 0 8px">FIND THE ' + solveFor + ':</div>' +
        '<div class="drill-input-row">' +
          '<input id="tri-input" class="drill-input" type="text" placeholder="' + placeholder + '" autocomplete="off" />' +
        '</div>' +
        '<button class="btn btn-primary mt-16" id="submit-btn">SUBMIT</button>' +
      '</div>';

    var input = document.getElementById('tri-input');
    input.focus();
    timer.start();

    clearInterval(timerIv);
    timerIv = setInterval(function () {
      if (!document.getElementById('tri-input')) { clearInterval(timerIv); return; }
      var s = timer.getElapsedSeconds();
      context.timerEl.textContent = s + 's';
      context.timerEl.className = s > TIME_GOAL_SEC ? 'drill-timer warning' : 'drill-timer';
    }, 100);

    function submit() {
      clearInterval(timerIv);
      var elapsed = timer.stop();
      var userVal = R.parseUserNumber(input.value);
      var isOk    = close(userVal, correctAnswer, 5);
      var underGoal = elapsed <= TIME_GOAL_SEC * 1000;

      context.onComplete({
        exerciseId: 'ex04',
        question:   type + ' | ' + given.replace(/<[^>]+>/g, ''),
        correct:    isOk,
        timeMs:     elapsed
      });

      showFeedback(type, tri, correctAnswer, isOk, elapsed, underGoal);
    }

    document.getElementById('submit-btn').onclick = submit;
    input.onkeydown = function (e) { if (e.key === 'Enter') submit(); };
  }

  function showFeedback(type, tri, correct, isOk, elapsed, underGoal) {
    var cls = isOk ? 'feedback-correct' : 'feedback-wrong';
    var msg = isOk ? '✓ CORRECT!' : '✗ WRONG';
    var displayCorrect = type === 'equity' ? correct + '%' : R.formatMoney(correct);
    var timeMsg = (elapsed/1000).toFixed(1) + 's';
    var timeColor = underGoal ? 'var(--green)' : 'var(--red)';

    context.container.innerHTML +=
      '<div class="feedback-box ' + cls + '">' +
        msg + '&nbsp;&nbsp;Answer: <strong>' + displayCorrect + '</strong><br>' +
        '<span class="text-dim" style="font-size:8px">' +
          'Ask: ' + R.formatMoney(tri.ask) +
          ' &nbsp; Equity: ' + tri.equity + '%' +
          ' &nbsp; Valuation: ' + R.formatMoney(tri.valuation) +
        '</span><br>' +
        '<span style="font-size:8px;color:' + timeColor + '">TIME: ' + timeMsg +
          (underGoal ? ' ✓ UNDER GOAL' : ' — OVER 15s') + '</span>' +
      '</div>' +
      '<button class="btn btn-secondary mt-16" id="next-btn">NEXT &#9654;</button>';

    document.getElementById('next-btn').onclick = function () {
      timer.reset();
      context.timerEl.textContent = '';
      context.timerEl.className = 'drill-timer';
      nextQuestion();
    };
  }

  nextQuestion();
};
