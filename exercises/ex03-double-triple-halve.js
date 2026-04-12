// ============================================================
// Exercise 3: Double-Triple-Halve Speed Sets
// Given a base number, the user calculates 7 operations one at a time.
// This builds the mental reflexes needed for quick valuations.
// ============================================================

window.BitPitch = window.BitPitch || {};
window.BitPitch.exercises = window.BitPitch.exercises || {};

window.BitPitch.exercises['ex03'] = function (context) {
  var R      = window.BitPitch.random;
  var close  = window.BitPitch.isCloseEnough;

  var OPERATIONS = [
    { label: 'DOUBLE',   fn: function (n) { return n * 2; },     symbol: '× 2' },
    { label: 'TRIPLE',   fn: function (n) { return n * 3; },     symbol: '× 3' },
    { label: 'HALF',     fn: function (n) { return n / 2; },     symbol: '÷ 2' },
    { label: 'QUARTER',  fn: function (n) { return n / 4; },     symbol: '÷ 4' },
    { label: '10%',      fn: function (n) { return n * 0.10; },  symbol: '× 10%' },
    { label: '33%',      fn: function (n) { return n / 3; },     symbol: '÷ 3' },
    { label: '1%',       fn: function (n) { return n * 0.01; },  symbol: '× 1%' }
  ];

  var OPS_PER_ROUND = 3;
  var ROUNDS    = 2;
  var round     = 0;
  var opIdx     = 0;
  var roundOps  = [];
  var baseNum;
  var timer     = new window.BitPitch.Timer();

  function nextRound() {
    if (round >= ROUNDS) { context.onSessionEnd(); return; }
    baseNum  = R.randFrom(R.NICE_BASE_NUMBERS);
    opIdx    = 0;
    round++;
    // Shuffle a copy of OPERATIONS and take the first OPS_PER_ROUND
    var shuffled = OPERATIONS.slice();
    for (var i = shuffled.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = shuffled[i]; shuffled[i] = shuffled[j]; shuffled[j] = tmp;
    }
    roundOps = shuffled.slice(0, OPS_PER_ROUND);
    showOp();
  }

  function showOp() {
    if (opIdx >= roundOps.length) { nextRound(); return; }
    var op      = roundOps[opIdx];
    var correct = op.fn(baseNum);

    context.container.innerHTML =
      '<div class="drill-card">' +
        '<div class="progress-row">' +
          '<div class="drill-progress">ROUND <span class="current">' + round + '</span> / ' + ROUNDS +
            ' &nbsp;|&nbsp; OP <span class="current">' + (opIdx + 1) + '</span> / ' + OPS_PER_ROUND + '</div>' +
          '<span class="drill-timer-q" id="drill-timer-q"></span>' +
        '</div>' +
        '<div class="drill-question">' +
          'BASE NUMBER: <span class="highlight">' + baseNum.toLocaleString() + '</span><br><br>' +
          'CALCULATE THE <span class="text-yellow">' + op.label + '</span>&nbsp;&nbsp;' +
          '<span class="text-dim">(' + op.symbol + ')</span>' +
        '</div>' +
        '<div class="drill-input-row">' +
          '<label class="drill-input-label">ANSWER:</label>' +
          '<input id="op-input" class="drill-input" type="text" placeholder="e.g. 25000" autocomplete="off" />' +
        '</div>' +
        '<div class="flex-row" style="gap:12px;margin-top:16px">' +
          '<button class="btn btn-primary" id="submit-btn">SUBMIT</button>' +
          '<button class="btn btn-danger" id="pass-btn">PASS</button>' +
        '</div>' +
      '</div>';

    var input = document.getElementById('op-input');
    input.focus();
    timer.start();

    function submit() {
      var rawInput = input.value.trim();
      if (rawInput === '') { document.getElementById('pass-btn').click(); return; }
      clearInterval(timerInterval);
      var elapsed = timer.stop();
      var userVal = R.parseUserNumber(rawInput);
      var cfg     = (DIFFICULTY_CONFIG && DIFFICULTY_CONFIG[context.difficulty]) || { pct33: 5, quarter: 2, growth: 5 };
      var isOk;
      if (op.label === '33%' && context.difficulty === 'HARD') {
        isOk = window.BitPitch.isCloseEnough2dp(userVal, correct);
      } else {
        var tol = op.label === '33%' ? cfg.pct33 : op.label === 'QUARTER' ? cfg.quarter : 2;
        isOk = close(userVal, correct, tol);
      }

      var sb = document.getElementById('submit-btn');
      if (sb) { sb.disabled = true; sb.classList.add('btn-submitted'); }
      input.classList.add('input-submitted');

      context.onComplete({ exerciseId: 'ex03', question: op.label + ' of ' + baseNum, correct: isOk, timeMs: elapsed });
      showFeedback(op.label, baseNum, correct, userVal, isOk, elapsed, false, rawInput);
    }

    document.getElementById('submit-btn').onclick = submit;
    input.onkeydown = function (e) { if (e.key === 'Enter') { e.stopPropagation(); submit(); } };

    document.getElementById('pass-btn').onclick = function () {
      clearInterval(timerInterval);
      var elapsed = timer.stop();
      var sb = document.getElementById('submit-btn');
      if (sb) { sb.disabled = true; sb.classList.add('btn-submitted'); }
      input.value = 'PASS';
      input.classList.add('input-submitted');
      context.onComplete({ exerciseId: 'ex03', question: op.label + ' of ' + baseNum, correct: false, timeMs: elapsed });
      showFeedback(op.label, baseNum, correct, null, false, elapsed, true, null);
    };

    var timerInterval;
    if (context.mode === 'drill') {
      timerInterval = setInterval(function () {
        var tq = document.getElementById('drill-timer-q');
        if (!tq) { clearInterval(timerInterval); return; }
        var s = timer.getElapsedSeconds();
        tq.textContent = window.BitPitch.formatElapsed(s);
        tq.className = s > 10 ? 'drill-timer-q warning' : 'drill-timer-q';
      }, 100);
    }
  }

  function showFeedback(opLabel, base, correct, userVal, isOk, elapsed, isPassed, rawInput) {
    var feedbackClass = isOk ? 'feedback-correct' : 'feedback-wrong';
    var feedbackMsg   = isOk ? 'CORRECT!' : 'WRONG';

    var dp = (opLabel === '33%' && context.difficulty === 'HARD') ? 2 : 0;
    var displayCorrect = R.formatNumberDp(correct, dp);

    // Acceptable range
    var cfg = (DIFFICULTY_CONFIG && DIFFICULTY_CONFIG[context.difficulty]) || { pct33: 5, quarter: 2 };
    var tol;
    if (opLabel === '33%') {
      tol = context.difficulty === 'HARD' ? null : cfg.pct33;
    } else if (opLabel === 'QUARTER') {
      tol = context.difficulty === 'HARD' ? 0 : cfg.quarter;
    } else {
      tol = 2;
    }
    var acceptableLine;
    if (tol === null) {
      acceptableLine = 'ACCEPTABLE: ' + displayCorrect + ' <span class="text-dim" style="font-size:8px">(HARD exact)</span>';
    } else if (tol === 0) {
      acceptableLine = 'ACCEPTABLE: ' + displayCorrect + ' <span class="text-dim" style="font-size:8px">(HARD exact)</span>';
    } else {
      var lo = R.formatNumberDp(correct * (1 - tol / 100), dp);
      var hi = R.formatNumberDp(correct * (1 + tol / 100), dp);
      acceptableLine = 'ACCEPTABLE: ' + lo + ' \u2013 ' + hi + ' <span class="text-dim" style="font-size:8px">(' + context.difficulty + ' \u00b1' + tol + '%)</span>';
    }

    // Your answer
    var yourAnswer;
    if (isPassed || rawInput === null || rawInput === '') {
      yourAnswer = 'PASS';
    } else if (isOk) {
      yourAnswer = rawInput;
    } else {
      yourAnswer = userVal !== null ? R.formatNumber(Math.round(userVal)) : '?';
    }

    context.container.innerHTML +=
      '<div class="feedback-box ' + feedbackClass + '">' +
        feedbackMsg + '<br><br>' +
        acceptableLine + '<br>' +
        '<span class="text-dim" style="font-size:8px">' + opLabel + ' of ' + base.toLocaleString() + ' = ' + displayCorrect + '</span><br>' +
        'YOUR ANSWER: <span class="text-dim">' + yourAnswer + '</span>' +
        (context.mode === 'drill' ? '<br>Time: ' + window.BitPitch.formatElapsed(elapsed/1000, true) : '') +
      '</div>' +
      '<button class="btn btn-secondary mt-16" id="next-btn">NEXT &#9654;</button>';

    document.getElementById('next-btn').onclick = function () {
      document.onkeydown = null;
      timer.reset();
      opIdx++;
      showOp();
    };

    document.onkeydown = function (e) {
      if (e.key === 'Enter') { var nb = document.getElementById('next-btn'); if (nb) nb.click(); }
    };
  }

  nextRound();
};
