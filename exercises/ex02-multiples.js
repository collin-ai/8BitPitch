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

  var QUESTIONS_PER_SESSION = 5;
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
        '<div class="progress-row">' +
          '<div class="drill-progress">QUESTION <span class="current">' + qCount + '</span> / ' + QUESTIONS_PER_SESSION + '</div>' +
          '<span class="drill-timer-q" id="drill-timer-q"></span>' +
        '</div>' +
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
        '<div class="text-yellow mt-8" style="font-size:8px">' +
          'HINT: ' + industry.label + ' = ' + industry.minMult + '–' + industry.maxMult + '× revenue' +
        '</div>' +
        '<div class="flex-row" style="gap:12px;margin-top:16px">' +
          '<button class="btn btn-primary" id="submit-btn">SUBMIT</button>' +
          '<button class="btn btn-danger" id="pass-btn">PASS</button>' +
          '<button class="btn numpad-toggle-btn" type="button" onclick="BitPitch.Numpad.toggle()" onmousedown="return false">#</button>' +
        '</div>' +
      '</div>';

    var lowInput  = document.getElementById('low-input');
    var highInput = document.getElementById('high-input');
    lowInput.focus();
    timer.start();

    [lowInput, highInput].forEach(function (inp) {
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
      var rawLow  = lowInput.value.trim();
      var rawHigh = highInput.value.trim();
      if (rawLow === '' || rawHigh === '') { document.getElementById('pass-btn').click(); return; }
      clearInterval(iv);
      var elapsed  = timer.stop();
      var userLow  = R.parseUserNumber(rawLow);
      var userHigh = R.parseUserNumber(rawHigh);

      var lowOk  = inRange(userLow, minVal * 0.6, maxVal * 1.2);
      var highOk = inRange(userHigh, minVal * 0.8, maxVal * 1.5);
      var isOk   = lowOk && highOk && userLow <= userHigh;

      var sb = document.getElementById('submit-btn');
      if (sb) { sb.disabled = true; sb.classList.add('btn-submitted'); }
      lowInput.classList.add('input-submitted');
      highInput.classList.add('input-submitted');

      context.onComplete({ exerciseId: 'ex02', question: company + ' ' + industry.label + ' ' + R.formatMoney(revenue), correct: isOk, timeMs: elapsed });
      showFeedback(company, industry, revenue, minVal, maxVal, userLow, userHigh, isOk, elapsed, false, rawLow, rawHigh);
    };

    document.getElementById('pass-btn').onclick = function () {
      clearInterval(iv);
      var elapsed = timer.stop();
      var sb = document.getElementById('submit-btn');
      if (sb) { sb.disabled = true; sb.classList.add('btn-submitted'); }
      lowInput.value  = 'PASS';
      highInput.value = 'PASS';
      lowInput.classList.add('input-submitted');
      highInput.classList.add('input-submitted');
      context.onComplete({ exerciseId: 'ex02', question: company + ' ' + industry.label + ' ' + R.formatMoney(revenue), correct: false, timeMs: elapsed });
      showFeedback(company, industry, revenue, minVal, maxVal, 0, 0, false, elapsed, true, null, null);
    };
  }

  function showFeedback(company, industry, revenue, minVal, maxVal, userLow, userHigh, isOk, elapsed, isPassed, rawLow, rawHigh) {
    var cls = isOk ? 'feedback-correct' : 'feedback-wrong';
    var msg = isOk ? 'GOOD RANGE!' : 'RANGE OFF';

    // Your answer
    var yourAnswer;
    if (isPassed || rawLow === null) {
      yourAnswer = 'PASS / PASS';
    } else if (isOk) {
      yourAnswer = esc(rawLow) + ' \u2013 ' + esc(rawHigh);
    } else {
      yourAnswer = R.formatMoney(userLow) + ' \u2013 ' + R.formatMoney(userHigh);
    }

    context.container.innerHTML +=
      '<div class="feedback-box ' + cls + '">' +
        msg + '<br><br>' +
        'ACCEPTABLE RANGE: <strong>' + R.formatMoney(minVal) + ' \u2013 ' + R.formatMoney(maxVal) + '</strong><br>' +
        '<span class="text-dim" style="font-size:8px">' +
          industry.minMult + '\u00d7 \u2013 ' + industry.maxMult + '\u00d7 of ' + R.formatMoney(revenue) +
        '</span><br>' +
        'YOUR ANSWER: <span class="text-dim">' + yourAnswer + '</span>' +
        (context.mode === 'drill' ? '<br>Time: ' + window.BitPitch.formatElapsed(elapsed/1000, true) : '') +
      '</div>' +
      '<button class="btn btn-secondary mt-16" id="next-btn">NEXT &#9654;</button>';

    document.getElementById('next-btn').onclick = function () {
      document.onkeydown = null;
      timer.reset();
      context.timerEl.textContent = '';
      nextQuestion();
    };

    document.onkeydown = function (e) {
      if (e.key === 'Enter') { var nb = document.getElementById('next-btn'); if (nb) nb.click(); }
    };
  }

  nextQuestion();
};
