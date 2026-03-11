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

  var RATES = [
    { label: '+20% GROWTH',  rate: 0.20 },
    { label: '+30% GROWTH',  rate: 0.30 },
    { label: '+50% GROWTH',  rate: 0.50 },
    { label: '+100% GROWTH', rate: 1.00 }
  ];

  var ROUNDS = 5;
  var round  = 0;
  var rateIdx = 0;
  var baseRev;
  var timer = new window.BitPitch.Timer();

  function nextRound() {
    if (round >= ROUNDS) { context.onSessionEnd(); return; }
    baseRev = R.randFrom(R.NICE_REVENUES);
    rateIdx = 0;
    round++;
    showRate();
  }

  function showRate() {
    if (rateIdx >= RATES.length) { nextRound(); return; }
    var r       = RATES[rateIdx];
    var correct = baseRev * (1 + r.rate);

    context.container.innerHTML =
      '<div class="drill-card">' +
        '<div class="drill-progress">ROUND <span class="current">' + round + '</span> / ' + ROUNDS +
          ' &nbsp;|&nbsp; RATE <span class="current">' + (rateIdx + 1) + '</span> / ' + RATES.length + '</div>' +
        '<div class="drill-question">' +
          'CURRENT REVENUE: <span class="highlight">' + R.formatMoney(baseRev) + '</span><br><br>' +
          'WHAT IS THE REVENUE AFTER <span class="text-yellow">' + r.label + '</span>?' +
        '</div>' +
        '<div class="drill-input-row">' +
          '<label class="drill-input-label">ANSWER:</label>' +
          '<input id="rate-input" class="drill-input" type="text" placeholder="e.g. $1.5M" autocomplete="off" />' +
        '</div>' +
        '<button class="btn btn-primary mt-16" id="submit-btn">SUBMIT</button>' +
      '</div>';

    var input = document.getElementById('rate-input');
    input.focus();
    timer.start();

    if (context.mode === 'drill') {
      var iv = setInterval(function () {
        if (!document.getElementById('rate-input')) { clearInterval(iv); return; }
        context.timerEl.textContent = timer.getElapsedSeconds() + 's';
      }, 100);
    }

    function submit() {
      var elapsed = timer.stop();
      var userVal = R.parseUserNumber(input.value);
      var isOk    = close(userVal, correct, 5);

      context.onComplete({
        exerciseId: 'ex05',
        question:   R.formatMoney(baseRev) + ' ' + r.label,
        correct:    isOk,
        timeMs:     elapsed
      });

      showFeedback(r.label, baseRev, correct, userVal, isOk, elapsed);
    }

    document.getElementById('submit-btn').onclick = submit;
    input.onkeydown = function (e) { if (e.key === 'Enter') submit(); };
  }

  function showFeedback(rateLabel, base, correct, userVal, isOk, elapsed) {
    var cls = isOk ? 'feedback-correct' : 'feedback-wrong';
    var msg = isOk ? '✓ CORRECT!' : '✗ WRONG';
    context.container.innerHTML +=
      '<div class="feedback-box ' + cls + '">' +
        msg + '<br><br>' +
        R.formatMoney(base) + ' ' + rateLabel + ' = ' +
        '<strong>' + R.formatMoney(Math.round(correct)) + '</strong>' +
        (context.mode === 'drill' ? '&nbsp;&nbsp;(' + (elapsed/1000).toFixed(1) + 's)' : '') +
      '</div>' +
      '<button class="btn btn-secondary mt-16" id="next-btn">NEXT &#9654;</button>';

    document.getElementById('next-btn').onclick = function () {
      timer.reset();
      rateIdx++;
      showRate();
    };
  }

  nextRound();
};
