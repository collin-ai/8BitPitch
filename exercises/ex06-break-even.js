// ============================================================
// Exercise 6: Quick Break-Even Reasoning
// Given price, cost, and fixed costs → calculate profit per unit
// and the number of units needed to break even.
// Sharks love this question. Fast subtraction and division.
// ============================================================

window.BitPitch = window.BitPitch || {};
window.BitPitch.exercises = window.BitPitch.exercises || {};

window.BitPitch.exercises['ex06'] = function (context) {
  var R     = window.BitPitch.random;
  var close = window.BitPitch.isCloseEnough;

  // Curated scenarios: price and cost chosen so profit is a round number
  var SCENARIOS = [
    { price: 50,  cost: 20,  fixed: 150000 },
    { price: 100, cost: 40,  fixed: 180000 },
    { price: 30,  cost: 10,  fixed: 200000 },
    { price: 80,  cost: 50,  fixed: 120000 },
    { price: 200, cost: 80,  fixed: 360000 },
    { price: 25,  cost: 10,  fixed: 75000  },
    { price: 60,  cost: 15,  fixed: 225000 },
    { price: 150, cost: 100, fixed: 250000 },
    { price: 40,  cost: 16,  fixed: 144000 },
    { price: 120, cost: 45,  fixed: 300000 }
  ];

  var QUESTIONS_PER_SESSION = 3;
  var qCount = 0;
  var timer  = new window.BitPitch.Timer();
  var usedIdx = [];

  function nextQuestion() {
    if (qCount >= QUESTIONS_PER_SESSION) { context.onSessionEnd(); return; }
    qCount++;

    // Pick a scenario we haven't used yet this session
    var available = SCENARIOS.map(function (_, i) { return i; })
      .filter(function (i) { return usedIdx.indexOf(i) === -1; });
    if (available.length === 0) usedIdx = [];
    var idx = R.randFrom(available.length > 0 ? available : SCENARIOS.map(function (_, i) { return i; }));
    usedIdx.push(idx);
    var s = SCENARIOS[idx];

    var profitPerUnit  = s.price - s.cost;
    var breakEvenUnits = Math.round(s.fixed / profitPerUnit);

    showQuestion(s, profitPerUnit, breakEvenUnits);
  }

  function showQuestion(s, profitPerUnit, breakEvenUnits) {
    context.container.innerHTML =
      '<div class="drill-card">' +
        '<div class="progress-row">' +
          '<div class="drill-progress">QUESTION <span class="current">' + qCount + '</span> / ' + QUESTIONS_PER_SESSION + '</div>' +
          '<span class="drill-timer-q" id="drill-timer-q"></span>' +
        '</div>' +
        '<div class="drill-question">' +
          'PRICE PER UNIT: <span class="highlight">$' + s.price + '</span><br>' +
          'COST PER UNIT:&nbsp;&nbsp;<span class="highlight">$' + s.cost + '</span><br>' +
          'FIXED MONTHLY COSTS: <span class="highlight">' + R.formatMoney(s.fixed) + '</span>' +
        '</div>' +
        '<div style="font-size:9px;color:var(--yellow);margin:16px 0 8px">CALCULATE:</div>' +
        '<div class="drill-input-row">' +
          '<label class="drill-input-label" style="min-width:140px">PROFIT / UNIT ($):</label>' +
          '<input id="profit-input" class="drill-input" type="text" placeholder="e.g. 30" autocomplete="off" style="width:120px" />' +
        '</div>' +
        '<div class="drill-input-row">' +
          '<label class="drill-input-label" style="min-width:140px">BREAK-EVEN UNITS:</label>' +
          '<input id="units-input" class="drill-input" type="text" placeholder="e.g. 5000" autocomplete="off" style="width:120px" />' +
        '</div>' +
        '<div class="flex-row" style="gap:12px;margin-top:16px">' +
          '<button class="btn btn-primary" id="submit-btn">SUBMIT</button>' +
          '<button class="btn btn-danger" id="pass-btn">PASS</button>' +
          '<button class="btn numpad-toggle-btn" type="button" onclick="BitPitch.Numpad.toggle()" onmousedown="return false">#</button>' +
          '<button class="btn sound-toggle-btn' + (window.BitPitch.Sound && !window.BitPitch.Sound.isEnabled() ? ' muted' : '') + '" type="button" onclick="BitPitch.Sound.toggle()" onmousedown="return false">SFX</button>' +
        '</div>' +
      '</div>';

    var profitInput = document.getElementById('profit-input');
    var unitsInput  = document.getElementById('units-input');
    profitInput.focus();
    timer.start();

    [profitInput, unitsInput].forEach(function (inp) {
      inp.onkeydown = function (e) {
        if (e.key !== 'Enter') return;
        e.stopPropagation();
        var sb = document.getElementById('submit-btn');
        if (sb && !sb.disabled) sb.click();
      };
    });

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

    document.getElementById('submit-btn').onclick = function () {
      var rawProfit = profitInput.value.trim();
      var rawUnits  = unitsInput.value.trim();
      if (rawProfit === '' || rawUnits === '') { document.getElementById('pass-btn').click(); return; }
      clearInterval(iv);
      var elapsed      = timer.stop();
      var userProfit   = R.parseUserNumber(rawProfit);
      var userUnits    = R.parseUserNumber(rawUnits);
      var profitOk     = close(userProfit, profitPerUnit, 2);
      var unitsOk      = close(userUnits, breakEvenUnits, 5);
      var isOk         = profitOk && unitsOk;

      var sb = document.getElementById('submit-btn');
      if (sb) { sb.disabled = true; sb.classList.add('btn-submitted'); }
      profitInput.classList.add('input-submitted');
      unitsInput.classList.add('input-submitted');

      context.onComplete({
        exerciseId: 'ex06',
        question:   'Price $' + s.price + ' Cost $' + s.cost + ' Fixed ' + R.formatMoney(s.fixed),
        correct:    isOk,
        timeMs:     elapsed
      });

      showFeedback(s, profitPerUnit, breakEvenUnits, profitOk, unitsOk, isOk, elapsed, userProfit, userUnits, false, rawProfit, rawUnits);
    };

    document.getElementById('pass-btn').onclick = function () {
      clearInterval(iv);
      var elapsed = timer.stop();
      var sb = document.getElementById('submit-btn');
      if (sb) { sb.disabled = true; sb.classList.add('btn-submitted'); }
      profitInput.value = 'PASS';
      unitsInput.value  = 'PASS';
      profitInput.classList.add('input-submitted');
      unitsInput.classList.add('input-submitted');
      context.onComplete({ exerciseId: 'ex06', question: 'Price $' + s.price + ' Cost $' + s.cost + ' Fixed ' + R.formatMoney(s.fixed), correct: false, timeMs: elapsed });
      showFeedback(s, profitPerUnit, breakEvenUnits, false, false, false, elapsed, null, null, true, null, null);
    };
  }

  function showFeedback(s, profitPerUnit, breakEvenUnits, profitOk, unitsOk, isOk, elapsed, userProfit, userUnits, isPassed, rawProfit, rawUnits) {
    if (window.BitPitch.Sound) window.BitPitch.Sound.play(isOk && !isPassed);
    var cls = isOk ? 'feedback-correct' : 'feedback-wrong';
    var msg = isOk ? 'CORRECT!' : 'CHECK BELOW';

    // Exact answer
    var exactLine = 'EXACT ANSWER: $' + profitPerUnit + ' profit / ' + breakEvenUnits.toLocaleString() + ' units';

    // Acceptable ranges (profit ±2%, units ±5% — fixed, no difficulty config)
    var profLo = (profitPerUnit * 0.98).toFixed(1);
    var profHi = (profitPerUnit * 1.02).toFixed(1);
    var unitsLo = Math.round(breakEvenUnits * 0.95).toLocaleString();
    var unitsHi = Math.round(breakEvenUnits * 1.05).toLocaleString();
    var acceptableLine =
      'PROFIT: $' + profLo + ' \u2013 $' + profHi + ' <span class="text-dim" style="font-size:8px">(\u00b12%)</span><br>' +
      'UNITS: ' + unitsLo + ' \u2013 ' + unitsHi + ' <span class="text-dim" style="font-size:8px">(\u00b15%)</span>';

    // Your answer
    var yourAnswer;
    if (isPassed || rawProfit === null) {
      yourAnswer = 'PASS';
    } else if (isOk) {
      yourAnswer = '$' + esc(rawProfit) + ' profit / ' + esc(rawUnits) + ' units';
    } else {
      yourAnswer = '$' + (userProfit !== null ? userProfit : '?') + ' profit / ' + (userUnits !== null ? userUnits : '?') + ' units';
    }

    context.container.innerHTML +=
      '<div class="feedback-box ' + cls + '">' +
        msg + '<br><br>' +
        exactLine + '<br>' +
        acceptableLine + '<br>' +
        '<span class="text-dim" style="font-size:8px">' +
          '$' + s.price + ' \u2212 $' + s.cost + ' = $' + profitPerUnit + ' profit &nbsp; ' +
          R.formatMoney(s.fixed) + ' \u00f7 $' + profitPerUnit + ' = ' + breakEvenUnits.toLocaleString() + ' units' +
        '</span><br>' +
        'YOUR ANSWER: <span class="text-dim">' + yourAnswer + '</span>' +
        (context.mode === 'drill' ? '<br>Time: ' + window.BitPitch.formatElapsed(elapsed/1000, true) : '') +
      '</div>' +
      '<button class="btn btn-secondary mt-16" id="next-btn">NEXT &#9654;</button>';

    document.getElementById('next-btn').onclick = function () {
      document.onkeydown = null;
      timer.reset();
      nextQuestion();
    };

    document.onkeydown = function (e) {
      if (e.key === 'Enter') { var nb = document.getElementById('next-btn'); if (nb) nb.click(); }
    };
  }

  nextQuestion();
};
