// ============================================================
// Sound + Vibration System
// Web Audio API — no external files required.
// Correct: ascending 3-tone chime (square wave).
// Wrong:   descending buzzer (sawtooth wave).
// State persists in localStorage ('bp_sound': '0' = muted).
// ============================================================

window.BitPitch = window.BitPitch || {};

window.BitPitch.Sound = (function () {
  var _enabled = localStorage.getItem('bp_sound') !== '0';
  var _ctx = null;

  function _getCtx() {
    if (!_ctx) {
      try {
        _ctx = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) { _ctx = null; }
    }
    return _ctx;
  }

  function _playCorrect(ctx) {
    var t = ctx.currentTime;
    var freqs = [523, 659, 784]; // C5, E5, G5
    freqs.forEach(function (freq, i) {
      var osc  = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'square';
      osc.frequency.value = freq;
      var start = t + i * 0.07;
      gain.gain.setValueAtTime(0.25, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.12);
      osc.start(start);
      osc.stop(start + 0.12);
    });
  }

  function _playWrong(ctx) {
    var t = ctx.currentTime;
    var osc  = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, t);
    osc.frequency.exponentialRampToValueAtTime(80, t + 0.3);
    gain.gain.setValueAtTime(0.35, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
    osc.start(t);
    osc.stop(t + 0.3);
  }

  function play(correct) {
    if (!_enabled) return;
    var ctx = _getCtx();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();
    if (correct) {
      _playCorrect(ctx);
      if (navigator.vibrate) navigator.vibrate(80);
    } else {
      _playWrong(ctx);
      if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
    }
  }

  function toggle() {
    _enabled = !_enabled;
    localStorage.setItem('bp_sound', _enabled ? '1' : '0');
    var btns = document.querySelectorAll('.sound-toggle-btn');
    for (var i = 0; i < btns.length; i++) {
      if (_enabled) {
        btns[i].classList.remove('muted');
      } else {
        btns[i].classList.add('muted');
      }
    }
  }

  function isEnabled() {
    return _enabled;
  }

  return { play: play, toggle: toggle, isEnabled: isEnabled };
})();
