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
  mode:            'drill',    // 'drill' or 'practice'
  currentExercise: null,       // id string like 'ex01'
  session:         null,       // BitPitch.Session instance
  lastExercise:    null        // for "Play Again"
};

// Exercise definitions — what shows on the home screen buttons
var EXERCISES = [
  { id: 'ex01', num: '01', name: 'PERCENTAGE\nSNAP DRILLS',   color: '#39ff14' },
  { id: 'ex02', num: '02', name: 'RULE OF THUMB\nMULTIPLES',  color: '#00d4ff' },
  { id: 'ex03', num: '03', name: 'DOUBLE TRIPLE\nHALVE',      color: '#ffe600' },
  { id: 'ex04', num: '04', name: 'SHARK TANK\nTRIANGLE',      color: '#bf5fff' },
  { id: 'ex05', num: '05', name: 'GROWTH RATE\nSNAP',         color: '#39ff14' },
  { id: 'ex06', num: '06', name: 'BREAK-EVEN\nREASONING',     color: '#00d4ff' },
  { id: 'ex07', num: '07', name: 'TAM\nESTIMATION',           color: '#ffe600' },
  { id: 'ex08', num: '08', name: '30-SEC\nCHALLENGE',        color: '#ff2d55' }
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
      ex.name.replace('\n', '<br>');
    btn.style.borderColor = ex.color;
    btn.onclick = function () { AppState.startExercise(ex.id); };
    grid.appendChild(btn);
  });
  showScreen('home');
}

// ---- Mode toggle ----

AppState.toggleMode = function () {
  AppState.mode = AppState.mode === 'drill' ? 'practice' : 'drill';
  var label = document.getElementById('mode-label');
  var btn   = document.getElementById('mode-toggle-btn');
  if (AppState.mode === 'drill') {
    label.textContent = 'DRILL MODE';
    btn.textContent   = 'SWITCH TO PRACTICE';
  } else {
    label.textContent = 'PRACTICE MODE';
    btn.textContent   = 'SWITCH TO DRILL';
  }
};

// ---- Start an exercise ----

AppState.startExercise = function (exerciseId) {
  AppState.currentExercise = exerciseId;
  AppState.lastExercise    = exerciseId;

  // Create a fresh session for this exercise run
  AppState.session = new window.BitPitch.Session();

  // Find exercise metadata for the title bar
  var meta = EXERCISES.find(function (e) { return e.id === exerciseId; });
  document.getElementById('drill-title').textContent =
    meta ? meta.name.replace('\n', ' ') : exerciseId.toUpperCase();

  // Clear the drill timer display
  document.getElementById('drill-timer').textContent = '';
  document.getElementById('drill-timer').className = 'drill-timer';

  // Clear the drill area
  document.getElementById('drill-area').innerHTML = '';

  // Show the drill screen
  showScreen('drill');

  // Build a context object and hand it to the exercise module.
  // The exercise uses this to render content and report results.
  var context = {
    container:  document.getElementById('drill-area'),
    timerEl:    document.getElementById('drill-timer'),
    mode:       AppState.mode,
    onComplete: function (result) {
      // Called by the exercise when one question is answered
      AppState.session.recordAnswer(result);
    },
    onSessionEnd: function () {
      // Called by the exercise when the full drill set is done
      AppState.showSummary();
    }
  };

  // Look up and call the correct exercise module
  var exerciseFn = window.BitPitch.exercises && window.BitPitch.exercises[exerciseId];
  if (exerciseFn) {
    exerciseFn(context);
  } else {
    context.container.innerHTML =
      '<p class="text-red" style="padding:24px">Exercise ' + exerciseId + ' not found.</p>';
  }
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

  var accuracyColor = summary.accuracy >= 80 ? 'var(--green)' :
                      summary.accuracy >= 50 ? 'var(--yellow)' : 'var(--red)';

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
      '<span class="stat-label">AVG TIME</span>' +
      '<span class="stat-value">' + summary.avgSec + 's</span>' +
    '</div>' +
    '<div class="stat-row">' +
      '<span class="stat-label">FASTEST</span>' +
      '<span class="stat-value text-yellow">' + summary.fastestSec + 's</span>' +
    '</div>';

  // Wire play again button to current exercise
  var meta = EXERCISES.find(function (e) { return e.id === AppState.lastExercise; });
  if (meta) {
    document.getElementById('play-again-btn').textContent = 'PLAY AGAIN';
  }

  showScreen('summary');
};

// ---- Boot ----

// Register the exercises namespace if not already created by exercise files
window.BitPitch = window.BitPitch || {};
window.BitPitch.exercises = window.BitPitch.exercises || {};

// Render the home screen when the page loads
renderHome();
