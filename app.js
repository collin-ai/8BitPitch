// ============================================================
// app.js — Application controller
// This is the "brain" of BitPitch. It:
//   1. Manages which screen is visible (home / drill / summary)
//   2. Tracks the current mode (Drill vs Practice)
//   3. Launches exercises when the user picks one
//   4. Shows the summary screen after a session
// ============================================================

// Global application state — one object that holds everything
var AppState = {
  mode:            'drill',    // 'drill', 'practice', 'scores', 'settings'
  currentExercise: null,       // id string like 'ex01'
  session:         null,       // BitPitch.Session instance
  lastExercise:    null,       // for "Play Again"
  difficulty:      'EASY',     // 'EASY', 'MEDIUM', 'HARD'
  drillStarted:    false       // true once player clicks BEGIN past the ready screen
};

// Difficulty tolerance config — tolerances (%) per operation type per difficulty
var DIFFICULTY_CONFIG = {
  EASY:   { pct33: 25, quarter: 5,  growth: 5  },
  MEDIUM: { pct33: 5,  quarter: 2,  growth: 5  },
  HARD:   { pct33: 0,  quarter: 0,  growth: 0  }
};

// Exercise definitions — what shows on the home screen buttons
var EXERCISES = [
  { id: 'ex01', num: '01', name: 'PERCENTAGE\nSNAP',           color: '#39ff14', icon: '%'  },
  { id: 'ex02', num: '02', name: 'RULE OF THUMB\nMULTIPLES',  color: '#00d4ff', icon: '×'  },
  { id: 'ex03', num: '03', name: 'DOUBLE TRIPLE\nHALVE',      color: '#ffe600', icon: '↕'  },
  { id: 'ex04', num: '04', name: 'VALUE EQUITY\nASK TRIANGLE', color: '#bf5fff', icon: '▲'  },
  { id: 'ex05', num: '05', name: 'GROWTH RATE\nSNAP',         color: '#39ff14', icon: '↑'  },
  { id: 'ex06', num: '06', name: 'BREAK-EVEN\nREASONING',     color: '#00d4ff', icon: '='  },
  { id: 'ex07', num: '07', name: 'TAM\nESTIMATION',           color: '#ffe600', icon: '◎'  },
  { id: 'ex08', num: '08', name: 'PITCH\nTRIATHLON',          color: '#ff2d55', icon: '★'  }
];

// ---- Screen management ----

// Show one screen, hide all others
function showScreen(name) {
  var screens = document.querySelectorAll('.screen');
  screens.forEach(function (s) { s.classList.add('hidden'); });
  document.getElementById('screen-' + name).classList.remove('hidden');
}

// ---- Home screen ----

function renderHome() {
  var grid = document.getElementById('exercise-grid');
  grid.innerHTML = '';
  EXERCISES.forEach(function (ex) {
    var btn = document.createElement('button');
    btn.className = 'exercise-btn';
    btn.innerHTML =
      '<span class="ex-num">' + ex.num + '</span>' +
      '<span class="ex-icon" style="color:' + ex.color + '">' + ex.icon + '</span>' +
      ex.name.replace('\n', '<br>');
    btn.style.borderColor = ex.color;
    btn.onclick = function () { AppState.startExercise(ex.id); };
    grid.appendChild(btn);
  });
  // Sync active tab to current mode (drill or practice only on home grid)
  syncModeTabs();
  showScreen('home');
}

function syncModeTabs() {
  var modes = ['drill', 'practice', 'scores', 'settings'];
  modes.forEach(function (m) {
    var tab = document.getElementById('tab-' + m);
    if (tab) tab.classList.toggle('active', m === AppState.mode);
  });
}

// ---- Mode selection ----

AppState.setMode = function (mode) {
  AppState.mode = mode;
  if (mode === 'drill' || mode === 'practice') {
    renderHome();
  } else if (mode === 'scores') {
    AppState.showHighScores();
  } else if (mode === 'settings') {
    AppState.showDifficultyExplained();
  }
};

// Placeholder handlers — wired fully in later phases
AppState.showHighScores          = function () { syncModeTabs(); showScreen('home'); };
AppState.showDifficultyExplained = function () { syncModeTabs(); showScreen('difficulty'); };

// ---- Start an exercise ----

AppState.startExercise = function (exerciseId) {
  AppState.currentExercise = exerciseId;
  AppState.lastExercise    = exerciseId;
  AppState.drillStarted    = false;

  // Find exercise metadata for the title bar
  var meta  = EXERCISES.find(function (e) { return e.id === exerciseId; });
  var title = meta ? meta.name.replace('\n', ' ') : exerciseId.toUpperCase();

  // Update drill header
  document.getElementById('drill-title').textContent      = title;
  document.getElementById('drill-difficulty').textContent = AppState.difficulty;
  document.getElementById('drill-timer').textContent      = '';
  document.getElementById('drill-timer').className        = 'drill-timer';
  document.getElementById('drill-area').innerHTML         = '';

  showScreen('drill');

  // Render the "Are you ready?" pre-launch screen
  var iconColor = meta ? meta.color : 'var(--green)';
  var iconChar  = meta ? meta.icon  : '?';

  document.getElementById('drill-area').innerHTML =
    '<div class="ready-screen">' +
      '<div class="ready-icon" style="color:' + iconColor + '">' + iconChar + '</div>' +
      '<div class="ready-name">' + title + '</div>' +
      '<div class="diff-row" id="diff-row"></div>' +
      '<div class="ready-buttons">' +
        '<button class="btn btn-primary" id="begin-btn" onclick="AppState.beginDrill(\'' + exerciseId + '\')">BEGIN</button>' +
      '</div>' +
    '</div>';

  AppState._renderDiffButtons();
};

// Renders the EASY / MEDIUM / HARD buttons into #diff-row on the ready screen
AppState._renderDiffButtons = function () {
  var row = document.getElementById('diff-row');
  if (!row) return;
  var levels = ['EASY', 'MEDIUM', 'HARD'];
  row.innerHTML = levels.map(function (lvl) {
    var active = AppState.difficulty === lvl ? ' active' : '';
    return '<button class="diff-btn' + active + '" onclick="AppState._setDifficulty(\'' + lvl + '\')">' + lvl + '</button>';
  }).join('');
};

// Sets difficulty and refreshes the button row
AppState._setDifficulty = function (lvl) {
  AppState.difficulty = lvl;
  document.getElementById('drill-difficulty').textContent = lvl;
  AppState._renderDiffButtons();
};

// Called when the player clicks BEGIN on the ready screen
AppState.beginDrill = function (exerciseId) {
  AppState.drillStarted = true;
  AppState.session      = new window.BitPitch.Session();

  document.getElementById('drill-area').innerHTML = '';

  var context = {
    container:    document.getElementById('drill-area'),
    timerEl:      document.getElementById('drill-timer'),
    mode:         AppState.mode,
    difficulty:   AppState.difficulty,
    onComplete:   function (result) { AppState.session.recordAnswer(result); },
    onSessionEnd: function ()       { AppState.showSummary(); }
  };

  var exerciseFn = window.BitPitch.exercises && window.BitPitch.exercises[exerciseId];
  if (exerciseFn) {
    exerciseFn(context);
  } else {
    context.container.innerHTML =
      '<p class="text-red" style="padding:24px">Exercise ' + exerciseId + ' not found.</p>';
  }
};

// Called from RESTART button or drill title click
AppState.restartDrill = function () {
  if (!AppState.currentExercise) return;
  if (AppState.drillStarted) {
    AppState._showRestartModal();
  } else {
    AppState.startExercise(AppState.currentExercise);
  }
};

AppState._showRestartModal = function () {
  var overlay = document.getElementById('modal-overlay');
  overlay.classList.remove('hidden');
  document.getElementById('modal-confirm-btn').onclick = function () {
    overlay.classList.add('hidden');
    AppState.startExercise(AppState.currentExercise);
  };
  document.getElementById('modal-cancel-btn').onclick = function () {
    overlay.classList.add('hidden');
  };
};

// ---- Navigation ----

AppState.goHome = function () {
  renderHome();
};

AppState.playAgain = function () {
  if (AppState.lastExercise) {
    AppState.startExercise(AppState.lastExercise);
  } else {
    renderHome();
  }
};

// ---- Summary screen ----

AppState.showSummary = function () {
  var summary = AppState.session.getSummary();
  var statsEl = document.getElementById('summary-stats');
  var fe      = window.BitPitch.formatElapsed;

  var accuracyColor = summary.accuracy >= 80 ? 'var(--green)' :
                      summary.accuracy >= 50 ? 'var(--yellow)' : 'var(--red)';

  var meta      = EXERCISES.find(function (e) { return e.id === AppState.lastExercise; });
  var drillName = meta ? meta.name.replace('\n', ' ') : '';
  document.querySelector('.summary-header').innerHTML =
    '<p class="summary-drill-name">' + drillName + '</p>' +
    '<h2 class="summary-title">SESSION COMPLETE!</h2>';

  statsEl.innerHTML =
    '<div class="stat-row">' +
      '<span class="stat-label">QUESTIONS</span>' +
      '<span class="stat-value accent">' + summary.total + '</span>' +
    '</div>' +
    '<div class="stat-row">' +
      '<span class="stat-label">CORRECT</span>' +
      '<span class="stat-value">' + summary.correct + ' / ' + summary.total + '</span>' +
    '</div>' +
    '<div class="stat-row">' +
      '<span class="stat-label">ACCURACY</span>' +
      '<span class="stat-value" style="color:' + accuracyColor + '">' + summary.accuracy + '%</span>' +
    '</div>' +
    '<div class="stat-row">' +
      '<span class="stat-label">TOTAL TIME</span>' +
      '<span class="stat-value">' + fe(summary.totalMs / 1000, true) + '</span>' +
    '</div>' +
    '<div class="stat-row">' +
      '<span class="stat-label">AVG TIME</span>' +
      '<span class="stat-value">' + fe(summary.avgSec, true) + '</span>' +
    '</div>' +
    '<div class="stat-row">' +
      '<span class="stat-label">FASTEST</span>' +
      '<span class="stat-value text-yellow">' + fe(summary.fastestSec, true) + '</span>' +
    '</div>';

  document.getElementById('play-again-btn').textContent = 'PLAY AGAIN';

  showScreen('summary');
};

// ---- Boot ----

// Register the exercises namespace if not already created by exercise files
window.BitPitch = window.BitPitch || {};
window.BitPitch.exercises = window.BitPitch.exercises || {};

// Render the home screen when the page loads
renderHome();
