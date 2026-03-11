// ============================================================
// utils/timer.js
// Simple timer for tracking how long each answer takes.
// WHY: We keep this in its own file so any exercise can use it
// without duplicating code.
// ============================================================

window.BitPitch = window.BitPitch || {};

window.BitPitch.Timer = function () {
  var startTime = null;

  // Call this when the question appears on screen
  this.start = function () {
    startTime = Date.now();
  };

  // Call this when the user submits their answer.
  // Returns elapsed milliseconds.
  this.stop = function () {
    if (!startTime) return 0;
    return Date.now() - startTime;
  };

  // Returns elapsed seconds rounded to 1 decimal (e.g. 4.7)
  this.getElapsedSeconds = function () {
    if (!startTime) return 0;
    return Math.round((Date.now() - startTime) / 100) / 10;
  };

  // Reset so the timer can be reused for the next question
  this.reset = function () {
    startTime = null;
  };
};
