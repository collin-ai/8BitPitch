// ============================================================
// Exercise 8: Pitch Triathlon
// Full pitch scenario: revenue, growth, margin, ask/equity.
// User answers 3 questions against a countdown timer.
// Timer hitting 0 does NOT auto-submit — player continues
// until SUBMIT ALL or GIVE UP.
// ============================================================

window.BitPitch = window.BitPitch || {};
window.BitPitch.exercises = window.BitPitch.exercises || {};

window.BitPitch.exercises['ex08'] = function (context) {
  var R     = window.BitPitch.random;
  var close = window.BitPitch.isCloseEnough;

  var ROUNDS = 3;
  var round  = 0;
  var timer  = new window.BitPitch.Timer();

  function nextRound() {
    if (round >= ROUNDS) { context.onSessionEnd(); return; }
    round++;
    var pitch = generatePitch();
    showPitch(pitch);
  }

  function generatePitch() {
    var tri          = R.randTriangle();
    var lastRev      = R.randFrom(R.NICE_REVENUES);
    var growthPct    = R.randFrom([20, 30, 40, 50, 60, 80, 100]);
    var thisRev      = Math.round(lastRev * (1 + growthPct / 100));
    var margin       = R.randFrom([5, 10, 15, 20, 25, 30]);

    // Revenue multiple = Valuation / This Year Revenue (1 decimal)
    var multiple     = Math.round((tri.valuation / thisRev) * 10) / 10;

    // Monthly profit = thisRev / 12 * margin%
    var monthlyProfit = Math.round((thisRev / 12) * (margin / 100));

    // Break-even to recoup ASK = ASK / monthly profit
    var breakEvenOnAsk = monthlyProfit > 0 ? Math.round(tri.ask / monthlyProfit) : 0;

    return {
      tri:            tri,
      lastRev:        lastRev,
      thisRev:        thisRev,
      growthPct:      growthPct,
      margin:         margin,
      multiple:       multiple,
      monthlyProfit:  monthlyProfit,
      breakEvenOnAsk: breakEvenOnAsk
    };
  }

  function showPitch(pitch) {
    var timerInterval;

    context.container.innerHTML =
      '<div class="drill-card">' +
        '<div class="progress-row">' +
          '<div class="drill-progress">ROUND <span class="current">' + round + '</span> / ' + ROUNDS +
            '&nbsp;&nbsp;&nbsp;<span class="text-yellow">PITCH TRIATHLON</span></div>' +
          '<span class="drill-timer-q" id="drill-timer-q"></span>' +
        '</div>' +

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

          // Q2: Revenue Multiple (input, not YES/NO)
          '<div style="font-size:8px;color:var(--blue);margin:12px 0 6px">Q2: REVENUE MULTIPLE?</div>' +
          '<div class="drill-input-row">' +
            '<input id="mult-input" class="drill-input" type="text" placeholder="e.g. 4.2" autocomplete="off" style="width:100px" />' +
          '</div>' +

          // Q3: Break-even to recoup ASK
          '<div style="font-size:8px;color:var(--blue);margin:12px 0 6px">Q3: MONTHS TO RECOUP THE ASK?</div>' +
          '<div class="drill-input-row">' +
            '<input id="be-input" class="drill-input" type="text" placeholder="e.g. 18" autocomplete="off" style="width:100px" />' +
          '</div>' +

          '<div class="flex-row" style="gap:12px;margin-top:16px">' +
            '<button class="btn btn-primary" id="submit-all-btn">SUBMIT ALL</button>' +
            '<button class="btn btn-danger"  id="giveup-btn">GIVE UP</button>' +
          '</div>' +
        '</div>' +
      '</div>';

    document.getElementById('val-input').focus();
    timer.start();

    function trySubmit08(e) {
      if (e.key !== 'Enter') return;
      e.stopPropagation();
      var vi = document.getElementById('val-input');
      var mi = document.getElementById('mult-input');
      var bi = document.getElementById('be-input');
      if (vi && mi && bi && vi.value.trim() !== '' && mi.value.trim() !== '' && bi.value.trim() !== '') {
        var sb = document.getElementById('submit-all-btn');
        if (sb && !sb.disabled) sb.click();
      }
    }
    document.getElementById('val-input').onkeydown  = trySubmit08;
    document.getElementById('mult-input').onkeydown = trySubmit08;
    document.getElementById('be-input').onkeydown   = trySubmit08;

    if (context.mode === 'drill') {
      timerInterval = setInterval(function () {
        var tq = document.getElementById('drill-timer-q');
        if (!tq) { clearInterval(timerInterval); return; }
        var s = timer.getElapsedSeconds();
        tq.textContent = window.BitPitch.formatElapsed(s);
        tq.className = s > 10 ? 'drill-timer-q warning' : 'drill-timer-q';
      }, 100);
    }

    document.getElementById('submit-all-btn').onclick = function () {
      var rawVal  = document.getElementById('val-input').value.trim();
      var rawMult = document.getElementById('mult-input').value.trim();
      var rawBE   = document.getElementById('be-input').value.trim();
      if (rawVal === '' || rawMult === '' || rawBE === '') { document.getElementById('giveup-btn').click(); return; }
      clearInterval(timerInterval);
      var elapsed    = timer.stop();
      var userVal    = R.parseUserNumber(rawVal);
      var userMult   = parseFloat(rawMult) || 0;
      var userBE     = R.parseUserNumber(rawBE);

      var q1Ok = close(userVal,  pitch.tri.valuation,  10);
      var q2Ok = close(userMult, pitch.multiple,        20);
      var q3Ok = close(userBE,   pitch.breakEvenOnAsk,  30);

      var allOk = q1Ok && q2Ok;

      context.onComplete({
        exerciseId: 'ex08',
        question:   'pitch triathlon round ' + round,
        correct:    allOk,
        timeMs:     elapsed,
        selfGraded: false
      });

      showFeedback(pitch, q1Ok, q2Ok, q3Ok, elapsed, false, rawVal, rawMult, rawBE);
    };

    document.getElementById('giveup-btn').onclick = function () {
      clearInterval(timerInterval);
      var elapsed = timer.stop();
      context.onComplete({
        exerciseId: 'ex08',
        question:   'pitch triathlon round ' + round,
        correct:    false,
        timeMs:     elapsed,
        selfGraded: false
      });
      showFeedback(pitch, false, false, false, elapsed, true, null, null, null);
    };
  }

  function showFeedback(pitch, q1Ok, q2Ok, q3Ok, elapsed, gaveUp, rawVal, rawMult, rawBE) {
    var overallOk = !gaveUp && q1Ok && q2Ok;
    var cls = overallOk ? 'feedback-correct' : 'feedback-wrong';
    var msg = overallOk ? 'SHARP INVESTOR!' : (gaveUp ? 'GAVE UP' : 'KEEP TRAINING');

    // Acceptable ranges
    var v = pitch.tri.valuation;
    var m = pitch.multiple;
    var b = pitch.breakEvenOnAsk;
    var acceptableLine =
      'Q1 VALUATION: ' + R.formatMoney(v * 0.90) + ' \u2013 ' + R.formatMoney(v * 1.10) + ' <span class="text-dim" style="font-size:7px">(\u00b110%)</span><br>' +
      'Q2 MULTIPLE: ' + (m * 0.80).toFixed(1) + '\u00d7 \u2013 ' + (m * 1.20).toFixed(1) + '\u00d7 <span class="text-dim" style="font-size:7px">(\u00b120%)</span><br>' +
      'Q3 MONTHS: ' + Math.round(b * 0.70) + ' \u2013 ' + Math.round(b * 1.30) + ' <span class="text-dim" style="font-size:7px">(\u00b130%)</span>';

    // Your answers
    var yourAnswers;
    if (gaveUp || rawVal === null) {
      yourAnswers = 'PASS / PASS / PASS';
    } else if (overallOk) {
      yourAnswers = rawVal + ' / ' + rawMult + ' / ' + rawBE;
    } else {
      yourAnswers = (rawVal || '?') + ' / ' + (rawMult || '?') + ' / ' + (rawBE || '?');
    }

    context.container.innerHTML +=
      '<div class="feedback-box ' + cls + '">' +
        msg + '<br><br>' +
        acceptableLine + '<br>' +
        '<span class="text-dim" style="font-size:7px">' +
          'Monthly profit ~' + R.formatMoney(pitch.monthlyProfit) + '/mo' +
        '</span><br>' +
        'YOUR ANSWERS: <span class="text-dim">' + yourAnswers + '</span>' +
        (context.mode === 'drill' ? '<br>Time: ' + window.BitPitch.formatElapsed(elapsed/1000, true) : '') +
      '</div>' +
      '<button class="btn btn-secondary mt-16" id="next-btn">NEXT &#9654;</button>';

    document.getElementById('next-btn').onclick = function () {
      document.onkeydown = null;
      context.timerEl.textContent = '';
      timer.reset();
      nextRound();
    };

    document.onkeydown = function (e) {
      if (e.key === 'Enter') { var nb = document.getElementById('next-btn'); if (nb) nb.click(); }
    };
  }

  nextRound();
};
