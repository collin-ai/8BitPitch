---
phase: 09-refinements
plan: 03
type: summary
status: complete
date: 2026-04-22
---

# Phase 09-03 Summary — Bug Fixes + Testing

## What Was Done

Applied all code review fixes scoped to Milestone 4. All 12 tasks completed across three groups.

---

## Group A — Medium Severity (Correctness Bugs)

**C-1: ex04 difficulty grading fixed**
- File: `exercises/ex04-triangle-drill.js`
- Was: `close(userVal, correctAnswer, 5)` — hardcoded ±5% regardless of difficulty
- Now: mirrors ex01 lines 97–106 — DIFFICULTY_CONFIG lookup for `ask` + equity=33 questions; HARD uses `isCloseEnough2dp`; MEDIUM/EASY use `cfg.pct33`
- All other question types retain ±5%

**C-2: ex08 Q3 now counted in score**
- File: `exercises/ex08-valuation-challenge.js`
- Was: `var allOk = q1Ok && q2Ok` (Q3 graded visually but ignored in score)
- Now: `var allOk = q1Ok && q2Ok && q3Ok`
- Also fixed `overallOk` in `showFeedback` (line 174) — was the same bug, would show "SHARP INVESTOR!" with wrong Q3

**C-3: ex07 thumb buttons disabled on first click**
- File: `exercises/ex07-tam-estimation.js`
- Was: both thumb buttons stayed enabled after first click — double-click could fire `onComplete` twice
- Now: first two statements in `grade()` disable both buttons before `onComplete` fires

---

## Group B — Low Severity

**C-4: regex newline fix**
- File: `app.js`
- All 3 occurrences of `replace('\n', ...)` changed to `replace(/\n/g, ...)`

**R-2: @import removed from style.css**
- Font loaded once via `<link>` in index.html — duplicate CSS `@import` removed

**W-1: favicon suppression**
- `<link rel="icon" href="data:,">` added to `<head>` in index.html — suppresses browser's automatic favicon.ico 404

**W-2: meta description and OG tags**
- `<meta name="description">`, `og:title`, `og:description`, `og:type` added to `<head>` in index.html

**S-1: XSS protection via esc()**
- `esc(s)` helper added to app.js (uses `textContent`/`innerHTML` round-trip for safe HTML escaping)
- All 7 exercises with text input wrap `rawInput` (and equivalent variables) in `esc()` before inserting into innerHTML
- ex07 skipped — self-graded, no raw text input

**S-2: AppState rename warning comment**
- Comment added above `AppState` declaration in app.js noting it is referenced by name in inline onclick attributes in index.html

**E-1: document.onkeydown cleared on navigation**
- `document.onkeydown = null` added as first statement in both `AppState.goHome()` and `AppState.startExercise()`
- Prevents stale Enter-to-NEXT handler from a feedback screen persisting across navigation

**E-3: parseUserNumber guards non-finite and negative values**
- File: `utils/random.js`
- After `parseFloat(s)`, added: `if (!isFinite(n) || n < 0) return NaN;`
- Rejects: scientific notation overflows (e.g. `1e309` → Infinity), negative inputs

---

## Group C — Testing Harness

**tests/tests.html created**
- Loads `utils/random.js`, `utils/scoring.js`, `utils/timer.js` via relative paths
- Inline test harness: `assert()` and `assertClose()` helpers; results render as green/red list; summary count at bottom
- Test groups:
  - T-1a: `parseUserNumber` — 9 cases including E-3 guard cases
  - T-1b: `formatMoney` — 6 cases
  - T-1c: `isCloseEnough` — 5 cases including zero case
  - T-2: boundary inclusivity — exactly at tolerance passes; 0.01 beyond fails
  - T-1d: `isCloseEnough2dp` — 3 cases
  - T-3a: ex06 scenario math — all 10 scenarios, profit and break-even verified
  - T-3b: TAM category math — all 8 categories, customers × spend === answer

**Test fix:** Initial test used `1e308` expecting NaN but `1e308` is finite (below JS max). Changed to `1e309` which overflows to Infinity and correctly returns NaN.

---

## Acceptance Criteria — All Passed

- [x] AC-1: ex04 difficulty applies correct tolerance per DIFFICULTY_CONFIG
- [x] AC-2: ex08 allOk includes q3Ok
- [x] AC-3: ex07 thumb buttons disabled before onComplete
- [x] AC-4: All low-severity items resolved (C-4, R-2, W-1, W-2, S-1, S-2, E-1, E-3)
- [x] AC-5: tests/tests.html created; all assertions pass

---

## Files Changed

| File | Change |
|------|--------|
| `exercises/ex04-triangle-drill.js` | C-1: DIFFICULTY_CONFIG grading + esc() in showFeedback |
| `exercises/ex08-valuation-challenge.js` | C-2: allOk + overallOk include q3Ok; esc() in showFeedback |
| `exercises/ex07-tam-estimation.js` | C-3: thumb buttons disabled in grade() |
| `exercises/ex01-percentage-snap.js` | S-1: esc(rawInput) in showFeedback |
| `exercises/ex02-multiples.js` | S-1: esc() in showFeedback |
| `exercises/ex03-double-triple-halve.js` | S-1: esc() in showFeedback |
| `exercises/ex05-growth-rate.js` | S-1: esc() in showFeedback |
| `exercises/ex06-break-even.js` | S-1: esc() in showFeedback |
| `app.js` | C-4: regex newlines; S-1: esc() helper; S-2: AppState comment; E-1: onkeydown null |
| `utils/random.js` | E-3: isFinite/negative guard in parseUserNumber |
| `style.css` | R-2: @import removed |
| `index.html` | W-1: favicon link; W-2: meta + OG tags |
| `tests/tests.html` | Created — full test harness |

---

## Milestone 4 Status

**COMPLETE.** All Phase 09 plans done (09-01 Mobile Numberpad, 09-02 Code Review, 09-03 Bug Fixes + Testing). Draft 4 is closed.
