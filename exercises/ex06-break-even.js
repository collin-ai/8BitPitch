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

  var QUESTIONS_PER_SESSION = 5;
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
        '<div class="drill-progress">QUESTION <span class="current">' + qCount + '</span> / ' + QUESTIONS_PER_SESSION + '</div>' +
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
        '<button class="btn btn-primary mt-16" id="submit-btn">SUBMIT</button>' +
      '</div>';

    var profitInput = document.getElementById('profit-input');
    var unitsInput  = document.getElementById('units-input');
    profitInput.focus();
    timer.start();

    if (context.mode === 'drill') {
      var iv = setInterval(function () {
        if (!document.getElementById('profit-input')) { clearInterval(iv); return; }
        context.timerEl.textContent = timer.getElapsedSeconds() + 's';
      }, 100);
    }

    document.getElementById('submit-btn').onclick = function () {
      var elapsed      = timer.stop();
      var userProfit   = R.parseUserNumber(profitInput.value);
      var userUnits    = R.parseUserNumber(unitsInput.value);
      var profitOk     = close(userProfit, profitPerUnit, 2);
      var unitsOk      = close(userUnits, breakEvenUnits, 5);
      var isOk         = profitOk && unitsOk;

      context.onComplete({
        exerciseId: 'ex06',
        question:   'Price $' + s.price + ' Cost $' + s.cost + ' Fixed ' + R.formatMoney(s.fixed),
        correct:    isOk,
        timeMs:     elapsed
      });

      showFeedback(s, profitPerUnit, breakEvenUnits, profitOk, unitsOk, isOk, elapsed);
    };
  }

  function showFeedback(s, profitPerUnit, breakEvenUnits, profitOk, unitsOk, isOk, elapsed) {
    var cls = isOk ? 'feedback-correct' : 'feedback-wrong';
    var msg = isOk ? '✓ CORRECT!' : '✗ CHECK BELOW';
    context.container.innerHTML +=
      '<div class="feedback-box ' + cls + '">' +
        msg + '<br><br>' +
        'PROFIT / UNIT: <strong>$' + profitPerUnit + '</strong>' +
        (profitOk ? ' ✓' : ' ✗') + '<br>' +
        'BREAK-EVEN: <strong>' + breakEvenUnits.toLocaleString() + ' UNITS</strong>' +
        (unitsOk ? ' ✓' : ' ✗') + '<br>' +
        '<span class="text-dim" style="font-size:8px">' +
          '$' + s.price + ' - $' + s.cost + ' = $' + profitPerUnit + ' profit &nbsp; ' +
          R.formatMoney(s.fixed) + ' ÷ $' + profitPerUnit + ' = ' + breakEvenUnits.toLocaleString() + ' units' +
        '</span>' +
        (context.mode === 'drill' ? '<br>Time: ' + (elapsed/1000).toFixed(1) + 's' : '') +
      '</div>' +
      '<button class="btn btn-secondary mt-16" id="next-btn">NEXT &#9654;</button>';

    document.getElementById('next-btn').onclick = function () {
      timer.reset();
      context.timerEl.textContent = '';
      nextQuestion();
    };
  }

  nextQuestion();
};
