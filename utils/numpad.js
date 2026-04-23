// ============================================================
// utils/numpad.js — Mobile Numberpad
// Provides a toggleable on-screen numberpad so mobile users
// can enter answers without the native keyboard opening
// (which zooms the viewport and obscures the drill question).
//
// Works by:
//   - Injecting a toggle button into each .drill-card via
//     MutationObserver (exercises own their own HTML, so the
//     button is re-injected after every question render)
//   - Setting inputmode="none" on .drill-input elements so
//     the native keyboard never opens when numpad is active
//   - Adding .numpad-mode to <body> so CSS sets font-size:16px
//     on inputs (prevents iOS Safari viewport zoom on focus)
//   - Showing #numpad-panel (static HTML in index.html)
//     below the drill card; hiding it during feedback phase
// ============================================================

window.BitPitch = window.BitPitch || {};

window.BitPitch.Numpad = (function () {
  'use strict';

  var _on          = false;   // numpad mode currently active?
  var _activeInput = null;    // last .drill-input to receive focus

  // ---- init: called once at app boot -------------------------

  function init() {
    var drillArea = document.getElementById('drill-area');
    if (!drillArea) return;

    // Track the last focused drill input
    drillArea.addEventListener('focusin', function (e) {
      if (e.target && e.target.classList.contains('drill-input')) {
        _activeInput = e.target;
      }
    });

    // Watch for question / feedback transitions.
    // childList (no subtree) avoids triggering on timer text updates.
    var observer = new MutationObserver(function () {
      setTimeout(_onDomChange, 0);
    });
    observer.observe(drillArea, { childList: true });
  }

  // ---- DOM change handler ------------------------------------

  function _onDomChange() {
    // Sync active class on all toggle buttons (ready-screen + in-drill)
    _syncToggleBtns();

    if (_on) {
      _applyInputMode();
      _syncPanel();
    }
  }

  // ---- Sync active class on all toggle buttons ---------------

  function _syncToggleBtns() {
    var btns = document.querySelectorAll('.numpad-toggle-btn');
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.toggle('active', _on);
    }
  }

  // ---- Panel show / hide -------------------------------------

  function _syncPanel() {
    var panel = document.getElementById('numpad-panel');
    if (!panel) return;

    // Hide panel when feedback is visible (#next-btn or .feedback-box present)
    var feedbackVisible = !!(
      document.querySelector('#drill-area #next-btn') ||
      document.querySelector('#drill-area .feedback-box')
    );
    panel.classList.toggle('hidden', feedbackVisible);
  }

  // ---- inputmode management ----------------------------------

  function _applyInputMode() {
    var inputs = document.querySelectorAll('#drill-area .drill-input');
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].setAttribute('inputmode', 'none');
    }
  }

  function _removeInputMode() {
    var inputs = document.querySelectorAll('#drill-area .drill-input');
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].removeAttribute('inputmode');
    }
  }

  // ---- Public: toggle numpad mode ----------------------------

  function toggle() {
    _on = !_on;

    _syncToggleBtns();

    // .numpad-mode on body drives the CSS font-size:16px fix for iOS zoom
    document.body.classList.toggle('numpad-mode', _on);

    var panel = document.getElementById('numpad-panel');

    if (_on) {
      // Close native keyboard if open: blur then re-focus with inputmode=none
      if (document.activeElement &&
          document.activeElement !== document.body &&
          document.activeElement.tagName !== 'BUTTON') {
        document.activeElement.blur();
      }
      _applyInputMode();

      // Re-focus first available input after native keyboard has time to close
      setTimeout(function () {
        var first = document.querySelector(
          '#drill-area .drill-input:not(.input-submitted):not([disabled])'
        );
        if (first) { first.focus(); _activeInput = first; }
      }, 100);

      if (panel) _syncPanel();
    } else {
      _removeInputMode();
      if (panel) panel.classList.add('hidden');
    }
  }

  // ---- Public: hide panel when leaving drill screen ----------
  // Does NOT reset _on — numpad stays enabled across drills so
  // mobile users don't need to re-enable it each time.

  function onDrillEnd() {
    _activeInput = null;
    var panel = document.getElementById('numpad-panel');
    if (panel) panel.classList.add('hidden');
  }

  // ---- Public: handle a key press from the numpad panel ------

  function pressKey(key) {
    // Resolve target input (fall back to first available if needed)
    var input = _activeInput;
    if (!input ||
        input.disabled ||
        input.classList.contains('input-submitted') ||
        !document.body.contains(input)) {
      input = document.querySelector(
        '#drill-area .drill-input:not(.input-submitted):not([disabled])'
      );
    }
    if (!input) return;

    var val   = input.value;
    var start = (input.selectionStart != null) ? input.selectionStart : val.length;
    var end   = (input.selectionEnd   != null) ? input.selectionEnd   : val.length;

    switch (key) {

      case 'backspace':
        if (start !== end) {
          input.value = val.slice(0, start) + val.slice(end);
          input.setSelectionRange(start, start);
        } else if (start > 0) {
          input.value = val.slice(0, start - 1) + val.slice(start);
          input.setSelectionRange(start - 1, start - 1);
        }
        break;

      case 'left': {
        var lp = Math.max(0, start - 1);
        input.setSelectionRange(lp, lp);
        break;
      }

      case 'right': {
        var rp = Math.min(val.length, start + 1);
        input.setSelectionRange(rp, rp);
        break;
      }

      case 'tab': {
        var inputs = Array.from(document.querySelectorAll(
          '#drill-area .drill-input:not(.input-submitted):not([disabled])'
        ));
        var idx = inputs.indexOf(input);
        if (idx >= 0 && idx < inputs.length - 1) {
          var next = inputs[idx + 1];
          next.focus();
          _activeInput = next;
        }
        return; // skip re-focus at end of switch
      }

      case 'enter': {
        // Try to click the submit button directly (question phase)
        var submitBtn =
          document.getElementById('submit-btn') ||
          document.getElementById('submit-all-btn') ||
          document.querySelector('#drill-area .btn-primary:not([disabled])');
        if (submitBtn && !submitBtn.disabled) {
          submitBtn.click();
        } else {
          // Fallback: dispatch Enter for Enter-to-NEXT (feedback phase)
          var evt = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true });
          document.dispatchEvent(evt);
        }
        return;
      }

      default:
        // Insert character at cursor position
        input.value = val.slice(0, start) + key + val.slice(end);
        input.setSelectionRange(start + key.length, start + key.length);
        break;
    }

    input.focus();
  }

  return {
    init:       init,
    toggle:     toggle,
    onDrillEnd: onDrillEnd,
    pressKey:   pressKey
  };

})();
