---
phase: 10-av-ui-overhaul
plan: 02
status: complete
date: 2026-04-25
---

# 10-02 Summary — Sound + Vibration System

## What Was Done

Created `utils/sounds.js` — a self-contained Web Audio API module exposing `window.BitPitch.Sound`.

**Sounds:**
- Correct: ascending square-wave arpeggio (C5 → E5 → G5, 3 × 70ms staggered)
- Wrong: descending sawtooth buzz (220Hz → 80Hz, 300ms)
- Vibration: 80ms on correct; [100, 50, 100] on wrong (where supported)

**SFX toggle button:**
- Added to every drill flex-row, after the `#` numpad button
- Green border/text = sound on; dim = muted
- Clicking calls `BitPitch.Sound.toggle()` which updates all `.sound-toggle-btn` elements
- State persists in `localStorage` key `bp_sound`

## Files Modified

| File | Change |
|------|--------|
| `utils/sounds.js` | NEW — Sound module |
| `index.html` | Added `<script src="utils/sounds.js">` after numpad.js |
| `style.css` | Added `.sound-toggle-btn` and `.sound-toggle-btn.muted` rules |
| `exercises/ex01–ex06.js` | SFX button in flex-row; `Sound.play(isOk && !isPassed)` at start of showFeedback |
| `exercises/ex07-tam-estimation.js` | SFX button; `Sound.play(correct)` in grade(); `Sound.play(false)` in pass handler |
| `exercises/ex08-valuation-challenge.js` | SFX button; `Sound.play(overallOk)` after overallOk computed |

## Notes

- AudioContext created lazily on first play (browser autoplay policy compliance)
- `ctx.resume()` called before each sound in case context is suspended
- `navigator.vibrate` checked before use (not supported on all browsers)
