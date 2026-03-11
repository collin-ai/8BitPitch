// ============================================================
// Exercise 2: Rule-of-Thumb Multiples Practice
// Generate a fake company with revenue and an industry type.
// User estimates the valuation range using standard multiples.
// Teaches: Consumer 1-3×, SaaS 4-10×, High-growth 8-15×.
// ============================================================

window.BitPitch = window.BitPitch || {};
window.BitPitch.exercises = window.BitPitch.exercises || {};

window.BitPitch.exercises['ex02'] = function (context) {
  var R    = window.BitPitch.random;
  var inRange = window.BitPitch.isWithinRange;

  var INDUSTRIES = [
    {
      label:   'CONSUMER PRODUCT',
      desc:    'Physical goods, food, retail',
      minMult: 1, maxMult: 3,
      color:   'var(--blue)'
    },
    {
      label:   'RECURRING SaaS',
      desc:    'Software with monthly/annual subscriptions',
      minMult: 4, maxMult: 10,
      color:   'var(--green)'
    },
    {
      label:   'HIGH-GROWTH SUBSCRIPTION',
      desc:    'Fast-growing SaaS or subscription business',
      minMult: 8, maxMult: 15,
      color:   'var(--yellow)'
    }
  ];

  var QUESTIONS_PER_SESSION = 6;
  var qCount = 0;
  var timer  = new window.BitPitch.Timer();

  function nextQuestion() {
    if (qCount >= QUESTIONS_PER_SESSION) { context.onSessionEnd(); return; }
    qCount++;

    var industry = R.randFrom(INDUSTRIES);
    var revenue  = R.randFrom(R.NICE_REVENUES);
    var minVal   = revenue * industry.minMult;
    var maxVal   = revenue * industry.maxMult;
    var company  = R.randFrom(R.FAKE_COMPANIES);

    showQuestion(company, industry, revenue, minVal, maxVal);
  }

  function showQuestion(company, industry, revenue, minVal, maxVal) {
    context.container.innerHTML =
      '<div class="drill-card">' +
        '<div class="drill-progress">QUESTION <span class="current">' + qCount + '</span> / ' + QUESTIONS_PER_SESSION + '</div>' +
        '<div class="drill-question">' +
          'COMPANY: <span class="highlight">' + company + '</span><br><br>' +
          'INDUSTRY: <span style="color:' + industry.color + '">' + industry.label + '</span><br>' +
          '<span class="text-dim" style="font-size:8px">(' + industry.desc + ')</span><br><br>' +
          'ANNUAL REVENUE: <span class="highlight">' + R.formatMoney(revenue) + '</span>' +
        '</div>' +
        '<div style="font-size:9px;color:var(--yellow);margin:16px 0 8px">ESTIMATE THE VALUATION RANGE:</div>' +
        '<div class="drill-input-row">' +
          '<label class="drill-input-label">LOW ($):</label>' +
          '<input id="low-input" class="drill-input" type="text" placeholder="e.g. $1M" autocomplete="off" style="width:140px" />' +
        '</div>' +
        '<div class="drill-input-row">' +
          '<label class="drill-input-label">HIGH ($):</label>' +
          '<input id="high-input" class="drill-input" type="text" placeholder="e.g. $3M" autocomplete="off" style="width:140px" />' +
        '</div>' +
        '<div class="text-dim mt-8" style="font-size:8px">' +
          'HINT: ' + industry.label + ' = ' + industry.minMult + '–' + industry.maxMult + '× revenue' +
        '</div>' +
        '<button class="btn btn-primary mt-16" id="submit-btn">SUBMIT</button>' +
      '</div>';

    var lowInput  = document.getElementById('low-input');
    var highInput = document.getElementById('high-input');
    lowInput.focus();
    timer.start();

    if (context.mode === 'drill') {
      var iv = setInterval(function () {
        if (!document.getElementById('low-input')) { clearInterval(iv); return; }
        context.timerEl.textContent = timer.getElapsedSeconds() + 's';
      }, 100);
    }

    document.getElementById('submit-btn').onclick = function () {
      var elapsed  = timer.stop();
      var userLow  = R.parseUserNumber(lowInput.value);
      var userHigh = R.parseUserNumber(highInput.value);

      // Correct if: user's range overlaps with the correct multiple range
      // Simple check: low >= minVal*0.5 && high <= maxVal*1.5 && range is sensible
      var lowOk  = inRange(userLow, minVal * 0.6, maxVal * 1.2);
      var highOk = inRange(userHigh, minVal * 0.8, maxVal * 1.5);
      var isOk   = lowOk && highOk && userLow <= userHigh;

      context.onComplete({
        exerciseId: 'ex02',
        question:   company + ' ' + industry.label + ' ' + R.formatMoney(revenue),
        correct:    isOk,
        timeMs:     elapsed
      });

      showFeedback(company, industry, revenue, minVal, maxVal, userLow, userHigh, isOk, elapsed);
    };
  }

  function showFeedback(company, industry, revenue, minVal, maxVal, userLow, userHigh, isOk, elapsed) {
    var cls = isOk ? 'feedback-correct' : 'feedback-wrong';
    var msg = isOk ? '✓ GOOD RANGE!' : '✗ RANGE OFF';
    context.container.innerHTML +=
      '<div class="feedback-box ' + cls + '">' +
        msg + '<br><br>' +
        'CORRECT RANGE: <strong>' + R.formatMoney(minVal) + ' – ' + R.formatMoney(maxVal) + '</strong><br>' +
        '<span class="text-dim" style="font-size:8px">' +
          industry.minMult + '× – ' + industry.maxMult + '× of ' + R.formatMoney(revenue) +
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
