---
phase: 05-uat-feedback
plan: 03
name: In-Drill Question UX
status: done
files: [style.css, exercises/ex01-percentage-snap.js, exercises/ex02-multiples.js, exercises/ex03-double-triple-halve.js, exercises/ex05-growth-rate.js, exercises/ex06-break-even.js, exercises/ex07-tam-estimation.js]
---

# Plan 05-03 Summary: In-Drill Question UX

## What Was Done

Applied six UX changes across all six in-scope exercises (ex01–ex03, ex05–ex07).
ex04 and ex08 excluded — both are being fully rewritten in Plan 05-04.

### Task 1 — style.css
- `.feedback-icon`: `font-size` 14px → 10px (matches feedback text height)
- `.drill-card`: added `position: relative` (required for in-card timer)
- `.drill-timer-q`: new rule — absolute positioned top-right inside card, yellow text, 10px
- `.drill-timer-q.warning`: red when over goal time
- `.btn-submitted`: darkens submit button after use, disables pointer events
- `.input-submitted`: greys out input after submit

### Task 2 — ex01, ex02, ex03
- In-card timer span added to drill-card HTML
- setInterval targets `drill-timer-q`, 1000ms, whole seconds, red after 10s
- Submit button locked with `.btn-submitted` on use
- Input(s) locked with `.input-submitted` on use
- I'LL PASS button added alongside SUBMIT
- `showFeedback` updated with `userVal` and `isPassed` parameters
- WRONG feedback shows `YOUR ANSWER: [value]` or `YOUR ANSWER: PASS`
- Enter-for-NEXT: `document.onkeydown` set in `showFeedback`, cleared in next-btn handler
- `e.stopPropagation()` added to input keydown handlers (see Deviations)

### Task 3 — ex05, ex06, ex07
- Same A–F pattern as Task 2
- **ex06**: two inputs (profit/units) both locked; YOUR ANSWER shows `$X profit / Y units`
- **ex07**: I'LL PASS skips self-grade entirely; calls `showSelfGrade` with `isPassed=true`; shows reference answer + "PASSED — AUTO FAIL"; goes straight to NEXT

## Deviations from Plan

### e.stopPropagation() — UAT Bug Fix
**Exercises:** ex01, ex03, ex05

During UAT, pressing Enter to submit caused feedback to disappear instantly. Root cause: the Enter keydown event fired `input.onkeydown → submit() → showFeedback()`, which set `document.onkeydown` for NEXT. The same bubbling keydown event then reached `document.onkeydown` and immediately clicked NEXT — the user never saw the feedback.

**Fix applied:** `e.stopPropagation()` added to each input's keydown handler, preventing Enter from reaching `document.onkeydown` for the submission event.

```js
// Before
input.onkeydown = function (e) { if (e.key === 'Enter') submit(); };
// After
input.onkeydown = function (e) { if (e.key === 'Enter') { e.stopPropagation(); submit(); } };
```

This fix was not in the original plan but is required for correct behaviour. ex02, ex06, ex07 are not affected (no Enter-to-submit).

## Verification
All checklist items confirmed by user UAT.

---
*Phase: 05-uat-feedback, Plan: 03 — Closed: 2026-03-15*
