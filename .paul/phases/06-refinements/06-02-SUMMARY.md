# SUMMARY: Plan 06-02 — Hint Colour + Pitch Triathlon Timer

**Date:** 2026-04-04
**Status:** DONE

---

## Files Changed

| File | Change |
|------|--------|
| `exercises/ex02-multiples.js` | HINT line class: `text-dim` → `text-yellow` |
| `exercises/ex08-valuation-challenge.js` | Removed `TOTAL_TIME`, `countdownIv` variables |
| `exercises/ex08-valuation-challenge.js` | Removed countdown bar HTML (`countdown-bar`, `cd-fill`, `cd-text`) |
| `exercises/ex08-valuation-challenge.js` | Removed countdown `setInterval` block |
| `exercises/ex08-valuation-challenge.js` | Added `var timer = new window.BitPitch.Timer()` |
| `exercises/ex08-valuation-challenge.js` | Added `drill-timer-q` span to drill-card |
| `exercises/ex08-valuation-challenge.js` | Added count-up timer `setInterval` (drill mode only, same pattern as ex01–ex07) |
| `exercises/ex08-valuation-challenge.js` | `elapsed` now from `timer.stop()` in both submit-all and give-up handlers |
| `exercises/ex08-valuation-challenge.js` | Added `timer.reset()` in next-btn handler |

---

## Acceptance Criteria Results

| Criterion | Result |
|-----------|--------|
| ex02 HINT line displays in yellow (not grey) | PASS |
| ex08 has no countdown bar or countdown text | PASS |
| ex08 count-up timer appears top-right in drill mode | PASS |
| ex08 timer stops on SUBMIT ALL and GIVE UP | PASS |
| ex08 elapsed time recorded correctly | PASS |

---

## Deviations

None — all tasks completed as scoped.

---

*Loop closed: PLAN ✓ → APPLY ✓ → UNIFY ✓*
