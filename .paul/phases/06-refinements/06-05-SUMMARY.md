---
phase: 06-refinements
plan: 05
completed: 2026-04-05
duration: single session
---

# Plan 06-05 Summary — Difficulty Explained Page

## Objective

Replace the non-functional SETTINGS tab with a static info page that explains the tolerance system to the player.

## What Was Built

### Planned changes

| File | Change |
|------|--------|
| `index.html` | SETTINGS tab label → `DIFFICULTY<br>EXPLAINED` |
| `index.html` | Added `#screen-difficulty` — new static screen with header, table, and notes |
| `app.js` | `showMenuSettings` renamed to `showDifficultyExplained`; routes to `showScreen('difficulty')` |
| `style.css` | Added all `.diff-exp-*` styles for new screen |

### Difficulty Explained page structure

- **Header bar:** MENU button (returns to drill grid) + yellow "DIFFICULTY EXPLAINED" title
- **Intro:** two-line summary of difficulty system
- **Section: EXAMPLE: DIVIDE BY 3 (33%)** — 3-row table showing Easy/Medium/Hard tolerances
- **Section: 2 DECIMAL PLACE RULE ON HARD** — note explaining full-number typing requirement
- **Section: SETTING YOUR DIFFICULTY** — note pointing to the "Are you ready?" screen

## Deviations

**Hard ÷3 scoring changed to 2dp — not in original plan scope.**

During apply, the user requested that Hard difficulty for all "33% / divide by 3" questions require a 2-decimal-place answer (e.g. 8,333.33 rather than integer). This triggered a chain of related changes:

| File | Change |
|------|--------|
| `utils/scoring.js` | Added `isCloseEnough2dp(userVal, correctVal)` — passes if values round to same 2dp |
| `utils/random.js` | `randTriangle`: equity=33 now uses `valuation / 3` (was `Math.round(0.33 * valuation)`) |
| `utils/random.js` | Added `formatMoneyDp(n, dp)` and `formatNumberDp(n, dp)` helpers |
| `exercises/ex03-double-triple-halve.js` | `33%` op fn changed from `n * 0.33` to `n / 3`; symbol `× 33%` → `÷ 3`; Hard uses `isCloseEnough2dp`; feedback shows 2dp on Hard, rounded integer on Easy/Medium |
| `exercises/ex01-percentage-snap.js` | `ask` question when equity=33: Hard uses `isCloseEnough2dp`; Easy/Medium use `cfg.pct33` tolerance; feedback shows `formatMoneyDp(correct, 2)` on Hard |

**Difficulty Explained table updated** to reflect ÷3 (not ×0.33) examples:
- Old: 4,000 × 33% = 1,320 / 25,000 × 33% = 8,250
- New: 4,000 ÷ 3 = 1,333.33 / 25,000 ÷ 3 = 8,333.33

**Additional styling iterations post-apply:**
- Table row shading changed from `nth-child(odd)` to all `tbody td` (consistent background)
- Section labels added above both notes
- `border-top` removed from `.diff-exp-note` (was double-lining with section label's `border-bottom`)

## Key Notes

- Hard 2dp note in the Difficulty Explained page warns players that `$3.33M` shorthand won't satisfy 2dp precision — full number required
- `isCloseEnough2dp` uses integer comparison: `Math.round(userVal * 100) === Math.round(correctVal * 100)`
- Easy/Medium tolerances for ex03 33% questions unchanged (use `cfg.pct33`: Easy 25%, Medium 5%)
- ex01 non-33% questions still use hardcoded 5% tolerance

## Next

Phase 06 complete → Milestone 3 (Draft 3) complete.
Next milestone: Milestone 4 (Draft 4 — Pitch Simulator), phases TBD.
