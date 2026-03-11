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

  // The 7 operations every round
  var OPERATIONS = [
    { label: 'DOUBLE',   fn: function (n) { return n * 2; },     symbol: '× 2' },
    { label: 'TRIPLE',   fn: function (n) { return n * 3; },     symbol: '× 3' },
    { label: 'HALF',     fn: function (n) { return n / 2; },     symbol: '÷ 2' },
    { label: 'QUARTER',  fn: function (n) { return n / 4; },     symbol: '÷ 4' },
    { label: '10%',      fn: function (n) { return n * 0.10; },  symbol: '× 10%' },
    { label: '33%',      fn: function (n) { return n * 0.33; },  symbol: '× 33%' },
    { label: '1%',       fn: function (n) { return n * 0.01; },  symbol: '× 1%' }
  ];

  var ROUNDS = 5;   // how many base numbers per session
  var round  = 0;
  var opIdx  = 0;
  var baseNum;
  var timer  = new window.BitPitch.Timer();

  function nextRound() {
    if (round >= ROUNDS) {
      context.onSessionEnd();
      return;
    }
    baseNum = R.randFrom(R.NICE_BASE_NUMBERS);
    opIdx   = 0;
    round++;
    showOp();
  }

  function showOp() {
    if (opIdx >= OPERATIONS.length) {
      nextRound();
      return;
    }
    var op      = OPERATIONS[opIdx];
    var correct = op.fn(baseNum);

    context.container.innerHTML =
      '<div class="drill-card">' +
        '<div class="drill-progress">ROUND <span class="current">' + round + '</span> / ' + ROUNDS +
          ' &nbsp;|&nbsp; OP <span class="current">' + (opIdx + 1) + '</span> / ' + OPERATIONS.length + '</div>' +
        '<div class="drill-question">' +
          'BASE NUMBER: <span class="highlight">' + R.formatNumber(baseNum) + '</span><br><br>' +
          'CALCULATE THE <span class="text-yellow">' + op.label + '</span>&nbsp;&nbsp;' +
          '<span class="text-dim">(' + op.symbol + ')</span>' +
        '</div>' +
        '<div class="drill-input-row">' +
          '<label class="drill-input-label">ANSWER:</label>' +
          '<input id="op-input" class="drill-input" type="text" placeholder="e.g. 25000" autocomplete="off" />' +
        '</div>' +
        '<button class="btn btn-primary mt-16" id="submit-btn">SUBMIT</button>' +
      '</div>';

    var input = document.getElementById('op-input');
    input.focus();
    timer.start();

    function submit() {
      var elapsed = timer.stop();
      var userVal = R.parseUserNumber(input.value);
      var isOk    = close(userVal, correct, 2);  // within 2%

      context.onComplete({
        exerciseId: 'ex03',
        question:   op.label + ' of ' + R.formatNumber(baseNum),
        correct:    isOk,
        timeMs:     elapsed
      });

      showFeedback(op.label, baseNum, correct, userVal, isOk, elapsed);
    }

    document.getElementById('submit-btn').onclick = submit;
    input.onkeydown = function (e) { if (e.key === 'Enter') submit(); };

    // Update drill timer display (if in drill mode)
    if (context.mode === 'drill') {
      var timerInterval = setInterval(function () {
        if (!document.getElementById('op-input')) { clearInterval(timerInterval); return; }
        context.timerEl.textContent = timer.getElapsedSeconds() + 's';
      }, 100);
    }
  }

  function showFeedback(opLabel, base, correct, userVal, isOk, elapsed) {
    var feedbackClass = isOk ? 'feedback-correct' : 'feedback-wrong';
    var feedbackMsg   = isOk ? '✓ CORRECT!' : '✗ WRONG';
    context.container.innerHTML +=
      '<div class="feedback-box ' + feedbackClass + '">' +
        feedbackMsg + '<br><br>' +
        opLabel + ' of ' + R.formatNumber(base) + ' = ' +
        '<strong>' + R.formatNumber(Math.round(correct)) + '</strong>' +
        (context.mode === 'drill' ? '&nbsp;&nbsp;(' + (elapsed/1000).toFixed(1) + 's)' : '') +
      '</div>' +
      '<button class="btn btn-secondary mt-16" id="next-btn">NEXT &#9654;</button>';

    document.getElementById('next-btn').onclick = function () {
      timer.reset();
      opIdx++;
      showOp();
    };
  }

  nextRound();
};
