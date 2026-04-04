# Summary: Plan 05-04 — Specific Drill Changes

## Objective

Apply 5 targeted changes to individual drills per UAT feedback: rename ex01, reduce ex03 ops per set, expand ex05 rate variety, redesign ex04 as a visual triangle, and rework ex08 into the Pitch Triathlon format.

---

## Files Changed

| File | Change |
|------|--------|
| `app.js` | Renamed ex01, ex04, ex08 in EXERCISES array |
| `exercises/ex03-double-triple-halve.js` | 3 random ops per round (from 7-op pool) |
| `exercises/ex04-triangle-drill.js` | Full rewrite — visual triangle layout, compliance fixes |
| `exercises/ex05-growth-rate.js` | Expanded rate pool (all multiples of 10); 4 random per round |
| `exercises/ex08-valuation-challenge.js` | Full rewrite — Pitch Triathlon format |
| `style.css` | Added `.tri-*` CSS classes for triangle layout |

---

## Criteria Results

| Task | Criterion | Result |
|------|-----------|--------|
| T1 | ex01 → "PERCENTAGE SNAP"; ex04 → "VALUE EQUITY ASK TRIANGLE"; ex08 → "PITCH TRIATHLON" in app.js | PASS |
| T2 | ex03: 3 random ops per round from 7-op pool; progress shows `OP X / 3` | PASS |
| T3 | ex05: pool = [10%,20%,...,100%]; 4 random rates per round; progress shows `RATE X / 4` | PASS |
| T4 | ex04 triangle renders (Valuation top, Equity BL, Ask BR); blank node has input; drill-timer-q, I'll Pass, stopPropagation, Enter-to-NEXT present | PASS |
| T5 | ex08: Q2 = multiple value input; Q3 = months to recoup ASK; timer hits 0 but no auto-submit; GIVE UP button; "SHARP INVESTOR!" on all-correct | PASS |

---

## Deviations

None.

---

*Closed: 2026-04-04*
