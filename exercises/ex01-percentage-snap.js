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

  var QUESTIONS_PER_SESSION = 8;
  var qCount = 0;
  var timer  = new window.BitPitch.Timer();

  // 3 question types, randomly chosen each time
  var TYPES = ['valuation', 'equity', 'ask'];

  function nextQuestion() {
    if (qCount >= QUESTIONS_PER_SESSION) { context.onSessionEnd(); return; }
    qCount++;

    var tri  = R.randTriangle();   // { ask, equity, valuation }
    var type = R.randFrom(TYPES);

    showQuestion(tri, type);
  }

  function showQuestion(tri, type) {
    var questionText, correctAnswer, answerLabel, placeholder;

    if (type === 'valuation') {
      // Given Ask + Equity% → find Valuation
      questionText  = 'A founder asks for <span class="highlight">' + R.formatMoney(tri.ask) + '</span>' +
                      ' in exchange for <span class="highlight">' + tri.equity + '%</span> equity.<br><br>' +
                      'What is the <span class="text-yellow">IMPLIED VALUATION</span>?';
      correctAnswer = tri.valuation;
      answerLabel   = 'VALUATION';
      placeholder   = 'e.g. $2M';

    } else if (type === 'equity') {
      // Given Ask + Valuation → find Equity%
      questionText  = 'A founder asks for <span class="highlight">' + R.formatMoney(tri.ask) + '</span>' +
                      ' from a company valued at <span class="highlight">' + R.formatMoney(tri.valuation) + '</span>.<br><br>' +
                      'What <span class="text-yellow">EQUITY %</span> does that represent?';
      correctAnswer = tri.equity;
      answerLabel   = 'EQUITY %';
      placeholder   = 'e.g. 15 (just the number)';

    } else {
      // Given Equity% + Valuation → find Ask
      questionText  = 'A company is valued at <span class="highlight">' + R.formatMoney(tri.valuation) + '</span>.' +
                      ' The founder offers <span class="highlight">' + tri.equity + '%</span> equity.<br><br>' +
                      'What is the <span class="text-yellow">INVESTMENT ASK</span>?';
      correctAnswer = tri.ask;
      answerLabel   = 'ASK ($)';
      placeholder   = 'e.g. $500K';
    }

    context.container.innerHTML =
      '<div class="drill-card">' +
        '<div class="drill-progress">QUESTION <span class="current">' + qCount + '</span> / ' + QUESTIONS_PER_SESSION + '</div>' +
        (context.mode === 'drill' ? '<div class="time-goal">GOAL: UNDER <span class="goal-num">10 SECONDS</span></div>' : '') +
        '<div class="drill-question">' + questionText + '</div>' +
        '<div class="drill-input-row">' +
          '<label class="drill-input-label">' + answerLabel + ':</label>' +
          '<input id="snap-input" class="drill-input" type="text" placeholder="' + placeholder + '" autocomplete="off" />' +
        '</div>' +
        '<button class="btn btn-primary mt-16" id="submit-btn">SUBMIT</button>' +
      '</div>';

    var input = document.getElementById('snap-input');
    input.focus();
    timer.start();

    if (context.mode === 'drill') {
      var iv = setInterval(function () {
        if (!document.getElementById('snap-input')) { clearInterval(iv); return; }
        var s = timer.getElapsedSeconds();
        context.timerEl.textContent = s + 's';
        context.timerEl.className = s > 10 ? 'drill-timer warning' : 'drill-timer';
      }, 100);
    }

    function submit() {
      var elapsed = timer.stop();
      var rawVal  = R.parseUserNumber(input.value);
      // For equity%, user types a plain number like "20" (not 0.20)
      var userVal = (type === 'equity') ? rawVal : rawVal;
      var isOk    = close(userVal, correctAnswer, 5);

      context.onComplete({
        exerciseId: 'ex01',
        question:   type + ' drill',
        correct:    isOk,
        timeMs:     elapsed
      });

      showFeedback(type, tri, correctAnswer, isOk, elapsed);
    }

    document.getElementById('submit-btn').onclick = submit;
    input.onkeydown = function (e) { if (e.key === 'Enter') submit(); };
  }

  function showFeedback(type, tri, correct, isOk, elapsed) {
    var cls = isOk ? 'feedback-correct' : 'feedback-wrong';
    var msg = isOk ? '✓ CORRECT!' : '✗ WRONG';
    var displayCorrect = (type === 'equity')
      ? correct + '%'
      : R.formatMoney(correct);

    context.container.innerHTML +=
      '<div class="feedback-box ' + cls + '">' +
        msg + '&nbsp;&nbsp;Answer: <strong>' + displayCorrect + '</strong>' +
        '<br><span class="text-dim" style="font-size:8px">Ask: ' + R.formatMoney(tri.ask) +
        '&nbsp; Equity: ' + tri.equity + '%&nbsp; Valuation: ' + R.formatMoney(tri.valuation) + '</span>' +
        (context.mode === 'drill' ? '<br>Time: ' + (elapsed/1000).toFixed(1) + 's' : '') +
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
