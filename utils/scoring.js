// ============================================================
// utils/scoring.js
// Tracks answers during a session and computes summary stats.
// ============================================================

window.BitPitch = window.BitPitch || {};

window.BitPitch.Session = function () {
  var answers = [];

  // Record one answer after a question is submitted.
  // data = { exerciseId, question, correct, timeMs, selfGraded }
  this.recordAnswer = function (data) {
    answers.push({
      exerciseId: data.exerciseId || '?',
      question:   data.question   || '',
      correct:    !!data.correct,
      timeMs:     data.timeMs     || 0,
      selfGraded: !!data.selfGraded
    });
  };

  // Returns aggregate stats for the summary screen.
  this.getSummary = function () {
    var total    = answers.length;
    var correct  = answers.filter(function (a) { return a.correct; }).length;
    var times    = answers.map(function (a) { return a.timeMs; });
    var avgMs    = total > 0 ? Math.round(times.reduce(function (s, t) { return s + t; }, 0) / total) : 0;
    var fastestMs = total > 0 ? Math.min.apply(null, times) : 0;
    return {
      total:      total,
      correct:    correct,
      accuracy:   total > 0 ? Math.round((correct / total) * 100) : 0,
      avgSec:     (avgMs / 1000).toFixed(1),
      fastestSec: (fastestMs / 1000).toFixed(1),
      answers:    answers.slice()
    };
  };

  // Clear answers for a new session
  this.reset = function () {
    answers = [];
  };

  this.getAnswers = function () { return answers.slice(); };
};

// ---- Grading helpers (standalone functions, not part of Session) ----

// Returns true if userVal is within tolerancePct% of correctVal.
// Example: isCloseEnough(9800000, 10000000, 5) -> true (within 5%)
window.BitPitch.isCloseEnough = function (userVal, correctVal, tolerancePct) {
  if (isNaN(userVal) || isNaN(correctVal)) return false;
  if (correctVal === 0) return userVal === 0;
  var diff = Math.abs(userVal - correctVal) / Math.abs(correctVal);
  return diff <= (tolerancePct / 100);
};

// Returns true if userVal falls within [min, max] (inclusive).
window.BitPitch.isWithinRange = function (userVal, min, max) {
  if (isNaN(userVal)) return false;
  return userVal >= min && userVal <= max;
};
