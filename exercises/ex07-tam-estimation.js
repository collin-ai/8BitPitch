// ============================================================
// Exercise 7: Market-Size (TAM) Estimation Games
// Given a category, estimate: # customers × avg spend = total market.
// Self-graded — user sees their computed TAM vs the reference TAM
// and decides if their reasoning was on track.
// ============================================================

window.BitPitch = window.BitPitch || {};
window.BitPitch.exercises = window.BitPitch.exercises || {};

window.BitPitch.exercises['ex07'] = function (context) {
  var R = window.BitPitch.random;

  var QUESTIONS_PER_SESSION = 3;
  var qCount = 0;
  var timer  = new window.BitPitch.Timer();
  var usedIdx = [];

  function nextQuestion() {
    if (qCount >= QUESTIONS_PER_SESSION) { context.onSessionEnd(); return; }
    qCount++;

    var available = R.TAM_CATEGORIES.map(function (_, i) { return i; })
      .filter(function (i) { return usedIdx.indexOf(i) === -1; });
    if (available.length === 0) usedIdx = [];
    var idx = R.randFrom(available.length > 0 ? available : R.TAM_CATEGORIES.map(function (_, i) { return i; }));
    usedIdx.push(idx);
    var cat = R.TAM_CATEGORIES[idx];

    showQuestion(cat);
  }

  function showQuestion(cat) {
    context.container.innerHTML =
      '<div class="drill-card">' +
        '<div class="progress-row">' +
          '<div class="drill-progress">QUESTION <span class="current">' + qCount + '</span> / ' + QUESTIONS_PER_SESSION + '</div>' +
          '<span class="drill-timer-q" id="drill-timer-q"></span>' +
        '</div>' +
        '<div class="drill-question">' +
          'MARKET CATEGORY:<br><span class="highlight">' + cat.label.toUpperCase() + '</span>' +
        '</div>' +
        '<div style="font-size:8px;color:var(--text-dim);margin:8px 0 16px">' +
          'Estimate the total US market size.<br>' +
          'TAM = (# of customers) × (avg annual spend)' +
        '</div>' +
        '<div class="drill-input-row">' +
          '<label class="drill-input-label" style="min-width:160px"># CUSTOMERS:</label>' +
          '<input id="cust-input" class="drill-input" type="text" placeholder="e.g. 50M" autocomplete="off" style="width:120px" />' +
        '</div>' +
        '<div class="drill-input-row">' +
          '<label class="drill-input-label" style="min-width:160px">AVG SPEND / YR:</label>' +
          '<input id="spend-input" class="drill-input" type="text" placeholder="e.g. $200" autocomplete="off" style="width:120px" />' +
        '</div>' +
        '<div class="flex-row" style="gap:12px;margin-top:16px">' +
          '<button class="btn btn-primary" id="submit-btn">CALCULATE MY TAM</button>' +
          '<button class="btn btn-danger" id="pass-btn">PASS</button>' +
          '<button class="btn numpad-toggle-btn" type="button" onclick="BitPitch.Numpad.toggle()" onmousedown="return false">#</button>' +
        '</div>' +
      '</div>';

    var custInput  = document.getElementById('cust-input');
    var spendInput = document.getElementById('spend-input');
    custInput.focus();
    timer.start();

    function trySubmit07(e) {
      if (e.key !== 'Enter') return;
      e.stopPropagation();
      var ci = document.getElementById('cust-input');
      var si = document.getElementById('spend-input');
      if (ci && si && ci.value.trim() !== '' && si.value.trim() !== '') {
        var sb = document.getElementById('submit-btn');
        if (sb && !sb.disabled) sb.click();
      }
    }
    custInput.onkeydown  = trySubmit07;
    spendInput.onkeydown = trySubmit07;

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
      if (custInput.value.trim() === '' || spendInput.value.trim() === '') { document.getElementById('pass-btn').click(); return; }
      clearInterval(iv);
      var elapsed   = timer.stop();
      var userCust  = R.parseUserNumber(custInput.value);
      var userSpend = R.parseUserNumber(spendInput.value);
      var userTAM   = isNaN(userCust) || isNaN(userSpend) ? 0 : userCust * userSpend;

      var sb = document.getElementById('submit-btn');
      if (sb) { sb.disabled = true; sb.classList.add('btn-submitted'); }
      custInput.classList.add('input-submitted');
      spendInput.classList.add('input-submitted');

      showSelfGrade(cat, userCust, userSpend, userTAM, elapsed, false);
    };

    document.getElementById('pass-btn').onclick = function () {
      clearInterval(iv);
      var elapsed = timer.stop();
      var sb = document.getElementById('submit-btn');
      if (sb) { sb.disabled = true; sb.classList.add('btn-submitted'); }
      custInput.value  = 'PASS';
      spendInput.value = 'PASS';
      custInput.classList.add('input-submitted');
      spendInput.classList.add('input-submitted');
      context.onComplete({ exerciseId: 'ex07', question: cat.label, correct: false, timeMs: elapsed, selfGraded: true });
      showSelfGrade(cat, 0, 0, 0, elapsed, true);
    };
  }

  function showSelfGrade(cat, userCust, userSpend, userTAM, elapsed, isPassed) {
    var refCustStr  = cat.customers;
    var refSpendStr = cat.spend;

    if (isPassed) {
      context.container.innerHTML =
        '<div class="drill-card">' +
          '<div style="border-top:1px solid var(--border);padding-top:16px;font-size:9px;color:var(--blue)">' +
            'REFERENCE ANSWER:<br><br>' +
            '<span class="text-dim">' + refCustStr + ' customers × ' + refSpendStr + '</span><br>' +
            'REFERENCE TAM: <strong class="text-green">' + R.formatMoney(cat.answer) + '</strong>' +
          '</div>' +
          '<div style="font-size:9px;color:var(--red);margin-top:16px">PASSED — AUTO FAIL</div>' +
        '</div>';
      showNextBtn();
      return;
    }

    context.container.innerHTML =
      '<div class="drill-card">' +
        '<div style="font-size:9px;color:var(--yellow);margin-bottom:12px">YOUR ESTIMATE:</div>' +
        '<div class="drill-question">' +
          'CUSTOMERS: <span class="highlight">' + (isNaN(userCust) ? '?' : R.formatNumber(userCust)) + '</span><br>' +
          'AVG SPEND:&nbsp;&nbsp;<span class="highlight">' + (isNaN(userSpend) ? '?' : R.formatMoney(userSpend)) + '</span><br>' +
          'YOUR TAM:&nbsp;&nbsp;&nbsp;<span class="text-yellow">' + (userTAM ? R.formatMoney(userTAM) : '?') + '</span>' +
        '</div>' +
        '<div style="border-top:1px solid var(--border);margin:16px 0;padding-top:16px;font-size:9px;color:var(--blue)">' +
          'REFERENCE ANSWER:<br><br>' +
          '<span class="text-dim">' + refCustStr + ' customers × ' + refSpendStr + '</span><br>' +
          'REFERENCE TAM: <strong class="text-green">' + R.formatMoney(cat.answer) + '</strong>' +
        '</div>' +
        '<div style="font-size:9px;color:var(--text);margin-bottom:12px">' +
          'WAS YOUR REASONING IN THE RIGHT BALLPARK?' +
        '</div>' +
        '<div class="flex-row flex-center">' +
          '<button class="btn btn-self-grade btn-primary" id="thumb-up">👍 YES</button>' +
          '<button class="btn btn-self-grade btn-danger" id="thumb-down">👎 NO</button>' +
        '</div>' +
      '</div>';

    function grade(correct) {
      document.getElementById('thumb-up').disabled   = true;
      document.getElementById('thumb-down').disabled = true;
      context.onComplete({
        exerciseId: 'ex07',
        question:   cat.label,
        correct:    correct,
        timeMs:     elapsed,
        selfGraded: true
      });
      showNextBtn();
    }

    document.getElementById('thumb-up').onclick   = function () { grade(true);  };
    document.getElementById('thumb-down').onclick = function () { grade(false); };
  }

  function showNextBtn() {
    context.container.innerHTML +=
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
