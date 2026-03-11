// ============================================================
// Exercise 8: The 30-Second Valuation Challenge
// Full pitch scenario: revenue, growth, margin, ask/equity.
// User answers 3 questions against a 30-second countdown.
// This is the "boss level" exercise — ties everything together.
// ============================================================

window.BitPitch = window.BitPitch || {};
window.BitPitch.exercises = window.BitPitch.exercises || {};

window.BitPitch.exercises['ex08'] = function (context) {
  var R     = window.BitPitch.random;
  var close = window.BitPitch.isCloseEnough;

  var TOTAL_TIME  = 30;   // seconds
  var ROUNDS      = 3;
  var round       = 0;
  var countdownIv = null;

  function nextRound() {
    if (round >= ROUNDS) { context.onSessionEnd(); return; }
    round++;
    var pitch = generatePitch();
    showPitch(pitch);
  }

  function generatePitch() {
    var tri       = R.randTriangle();
    var lastRev   = R.randFrom(R.NICE_REVENUES);
    var growthPct = R.randFrom([20, 30, 40, 50, 60, 80, 100]);
    var thisRev   = Math.round(lastRev * (1 + growthPct / 100));
    var margin    = R.randFrom([5, 10, 15, 20, 25, 30]);

    // Revenue multiple = Valuation / This Year Revenue
    var multiple = Math.round((tri.valuation / thisRev) * 10) / 10;

    // Break-even months: fixed costs / monthly profit
    // Simplified: assume monthly revenue = thisRev/12, monthly profit = revenue * margin%
    var monthlyProfit = Math.round((thisRev / 12) * (margin / 100));
    // Monthly fixed costs not given — estimate from a reasonable ratio
    var fixedMonthly  = Math.round(monthlyProfit * R.randFrom([4, 6, 8, 10, 12]));
    var breakEvenMonths = Math.round(fixedMonthly / monthlyProfit);

    return {
      tri:             tri,
      lastRev:         lastRev,
      thisRev:         thisRev,
      growthPct:       growthPct,
      margin:          margin,
      multiple:        multiple,
      multipleOk:      multiple >= 2 && multiple <= 12,  // reasonable range
      breakEvenMonths: breakEvenMonths,
      monthlyProfit:   monthlyProfit,
      fixedMonthly:    fixedMonthly
    };
  }

  function showPitch(pitch) {
    clearInterval(countdownIv);
    var secondsLeft = TOTAL_TIME;

    context.container.innerHTML =
      '<div class="drill-card">' +
        '<div class="drill-progress">ROUND <span class="current">' + round + '</span> / ' + ROUNDS +
          '&nbsp;&nbsp;&nbsp;<span class="text-yellow">30-SECOND CHALLENGE</span></div>' +

        // Countdown bar
        '<div class="countdown-bar"><div class="countdown-fill" id="cd-fill" style="width:100%"></div></div>' +
        '<div style="font-size:9px;color:var(--yellow);text-align:right;margin-bottom:12px" id="cd-text">' + TOTAL_TIME + 's</div>' +

        // Pitch brief
        '<div class="drill-question">' +
          'LAST YEAR REV: <span class="highlight">' + R.formatMoney(pitch.lastRev) + '</span><br>' +
          'THIS YEAR REV: <span class="highlight">' + R.formatMoney(pitch.thisRev) + '</span>&nbsp;' +
            '<span class="text-green">(+' + pitch.growthPct + '%)</span><br>' +
          'PROFIT MARGIN: <span class="highlight">' + pitch.margin + '%</span><br>' +
          'ASK: <span class="highlight">' + R.formatMoney(pitch.tri.ask) + '</span>&nbsp;&nbsp;' +
          'FOR: <span class="highlight">' + pitch.tri.equity + '%</span>' +
        '</div>' +

        '<div style="border-top:1px solid var(--border);padding-top:12px;margin-top:8px">' +
          // Q1: Implied Valuation
          '<div style="font-size:8px;color:var(--blue);margin-bottom:6px">Q1: IMPLIED VALUATION?</div>' +
          '<div class="drill-input-row">' +
            '<input id="val-input" class="drill-input" type="text" placeholder="e.g. $5M" autocomplete="off" style="width:140px" />' +
          '</div>' +

          // Q2: Is multiple reasonable?
          '<div style="font-size:8px;color:var(--blue);margin:12px 0 6px">Q2: IS THE REVENUE MULTIPLE REASONABLE?</div>' +
          '<div class="flex-row">' +
            '<button class="btn btn-secondary" id="yes-btn" style="font-size:8px;padding:8px 14px">YES</button>' +
            '<button class="btn btn-danger"     id="no-btn"  style="font-size:8px;padding:8px 14px">NO</button>' +
          '</div>' +
          '<div id="q2-answer" style="display:none;font-size:8px;color:var(--yellow);margin-top:4px"></div>' +

          // Q3: Break-even (self-graded)
          '<div style="font-size:8px;color:var(--blue);margin:12px 0 6px">Q3: ROUGH BREAK-EVEN (MONTHS)?</div>' +
          '<div class="drill-input-row">' +
            '<input id="be-input" class="drill-input" type="text" placeholder="e.g. 8" autocomplete="off" style="width:100px" />' +
          '</div>' +

          '<button class="btn btn-primary mt-16" id="submit-all-btn">SUBMIT ALL</button>' +
        '</div>' +
      '</div>';

    // Countdown timer
    var startMs = Date.now();
    countdownIv = setInterval(function () {
      var elapsed = Math.floor((Date.now() - startMs) / 1000);
      secondsLeft = Math.max(0, TOTAL_TIME - elapsed);
      var fill = document.getElementById('cd-fill');
      var cdTxt = document.getElementById('cd-text');
      if (!fill) { clearInterval(countdownIv); return; }
      var pct = (secondsLeft / TOTAL_TIME) * 100;
      fill.style.width = pct + '%';
      fill.className   = 'countdown-fill' + (secondsLeft <= 8 ? ' low' : '');
      cdTxt.textContent = secondsLeft + 's';
      if (secondsLeft === 0) {
        clearInterval(countdownIv);
        document.getElementById('submit-all-btn').click();
      }
    }, 500);

    // Q2 toggle
    var q2Answer = null;
    document.getElementById('yes-btn').onclick = function () {
      q2Answer = true;
      document.getElementById('q2-answer').style.display = 'block';
      document.getElementById('q2-answer').textContent = '→ SELECTED: YES';
      this.style.borderColor = 'var(--green)';
      document.getElementById('no-btn').style.borderColor = 'var(--border)';
    };
    document.getElementById('no-btn').onclick = function () {
      q2Answer = false;
      document.getElementById('q2-answer').style.display = 'block';
      document.getElementById('q2-answer').textContent = '→ SELECTED: NO';
      this.style.borderColor = 'var(--red)';
      document.getElementById('yes-btn').style.borderColor = 'var(--border)';
    };

    document.getElementById('val-input').focus();

    document.getElementById('submit-all-btn').onclick = function () {
      clearInterval(countdownIv);
      var elapsed    = (TOTAL_TIME - secondsLeft) * 1000;
      var userVal    = R.parseUserNumber(document.getElementById('val-input').value);
      var userBE     = R.parseUserNumber(document.getElementById('be-input').value);

      var q1Ok = close(userVal, pitch.tri.valuation, 10);
      var q2Ok = (q2Answer === pitch.multipleOk);
      var q3Ok = close(userBE, pitch.breakEvenMonths, 30);  // generous — self-grade flavour

      var allOk = q1Ok && q2Ok;

      context.onComplete({
        exerciseId: 'ex08',
        question:   '30s challenge round ' + round,
        correct:    allOk,
        timeMs:     elapsed,
        selfGraded: false
      });

      showFeedback(pitch, q1Ok, q2Ok, q3Ok, elapsed);
    };
  }

  function showFeedback(pitch, q1Ok, q2Ok, q3Ok, elapsed) {
    var overallOk = q1Ok && q2Ok;
    var cls = overallOk ? 'feedback-correct' : 'feedback-wrong';
    var msg = overallOk ? '✓ SHARP SHARK!' : '✗ KEEP PRACTISING';

    context.container.innerHTML +=
      '<div class="feedback-box ' + cls + '">' +
        msg + '<br><br>' +
        'Q1 VALUATION: <strong>' + R.formatMoney(pitch.tri.valuation) + '</strong> ' + (q1Ok ? '✓' : '✗') + '<br>' +
        'Q2 MULTIPLE (' + pitch.multiple + '×): <strong>' + (pitch.multipleOk ? 'REASONABLE' : 'HIGH/LOW') + '</strong> ' + (q2Ok ? '✓' : '✗') + '<br>' +
        'Q3 BREAK-EVEN: <strong>~' + pitch.breakEvenMonths + ' MONTHS</strong><br>' +
        '<span class="text-dim" style="font-size:7px">' +
          'Monthly profit ~' + R.formatMoney(pitch.monthlyProfit) + ' | ' +
          'Fixed costs ~' + R.formatMoney(pitch.fixedMonthly) + '/mo' +
        '</span>' +
        (context.mode === 'drill' ? '<br>Time: ' + (elapsed/1000).toFixed(1) + 's' : '') +
      '</div>' +
      '<button class="btn btn-secondary mt-16" id="next-btn">NEXT &#9654;</button>';

    document.getElementById('next-btn').onclick = function () {
      context.timerEl.textContent = '';
      nextRound();
    };
  }

  nextRound();
};
