# Summary: Plan 05-05 — Difficulty System + ex03 Bug Fix

**Date:** 2026-04-04
**Status:** DONE

---

## Files Changed

| File | Change |
|------|--------|
| `app.js` | Added `DIFFICULTY_CONFIG` global; added `_renderDiffButtons` + `_setDifficulty` helpers; replaced Tutorial button with EASY/MEDIUM/HARD selector on ready screen; added `difficulty` to exercise context |
| `exercises/ex03-double-triple-halve.js` | Raw base number display (no K abbreviation); difficulty-aware tolerance for 33% and QUARTER ops |
| `exercises/ex05-growth-rate.js` | Difficulty-aware tolerance for growth rate |
| `style.css` | Added `.diff-row`, `.diff-btn`, `.diff-btn.active`, `.diff-btn:disabled` |

---

## Acceptance Criteria Results

| Criterion | Result |
|-----------|--------|
| ex03 base numbers show raw (no K rounding) | PASS |
| half of 1200 = 600, double of 2500 = 5000 score correctly | PASS |
| "Are you ready?" screen has EASY/MEDIUM/HARD buttons | PASS |
| Tutorial button removed from ready screen | PASS |
| Selected difficulty highlights; drill header updates | PASS |
| `DIFFICULTY_CONFIG` accessible from exercise files | PASS |
| ex03 33% op tolerance varies by difficulty | PASS |
| ex03 QUARTER op tolerance varies by difficulty | PASS |
| ex05 growth rate tolerance varies by difficulty (Hard = exact) | PASS |

---

## Deviations

- **Goal times**: Scrapped by user before APPLY — removed from scope entirely.
- **Difficulty badge on score entry**: Scrapped (05-06 removed from roadmap).
- **Tutorial button**: Removed from ready screen per user instruction during planning.
- **ex03 bug fix approach**: User chose to show raw base numbers instead of removing 1200/2500 from the pool.

---

## Key Decisions Added

| Decision | Reason |
|----------|--------|
| ex03 shows raw base numbers (not K-abbreviated) | Prevents scoring mismatch; user confirmed approach |
| EASY pct33=25%, MEDIUM pct33=5%, HARD pct33=0% | From ROADMAP tolerance table |
| EASY quarter=5%, MEDIUM quarter=2%, HARD quarter=0% | From ROADMAP tolerance table |
| EASY/MEDIUM growth=5%, HARD growth=0% | From ROADMAP; Easy/Medium accept rounded |
| Goal times not implemented | User scrapped during planning |
