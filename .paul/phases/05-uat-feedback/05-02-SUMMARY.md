---
phase: 05-uat-feedback
plan: 02
subsystem: navigation
tags: [drill-flow, ready-screen, restart, navigation, difficulty]

provides:
  - "Are you ready?" pre-drill screen before every exercise
  - BEGIN button gates exercise launch and timing
  - RESTART DRILL button in drill header
  - Drill title (blue, hoverable) acts as restart trigger
  - Confirmation prompt on restart after BEGIN
  - Difficulty label [ EASY ] in drill header
  - AppState.difficulty and AppState.drillStarted properties
  - AppState.beginDrill(), restartDrill(), tutorialForDrill() methods

affects: 05-uat-plans-03-through-08

tech-stack:
  added: []
  patterns:
    - AppState.drillStarted flag gates whether restart requires confirmation
    - startExercise() now renders ready screen; beginDrill() launches the exercise
    - AppState.difficulty = 'EASY' (default); switching UI in Plan 05-08

key-files:
  modified:
    - app.js
    - index.html
    - style.css

key-decisions:
  - "Session creation moved from startExercise() to beginDrill() — timing truly starts on BEGIN"
  - "confirm() used for restart prompt — styled confirmation deferred to later draft"
  - "TUTORIAL button on ready screen is a placeholder (routes to tutorial mode tab) — full wiring in Plan 05-07"

duration: 1 session
completed: 2026-03-15
---

# Phase 05 Plan 02: Drill Launch + Navigation Summary

**Added "Are you ready?" pre-drill screen, RESTART DRILL button, clickable drill title, and difficulty display across app.js, index.html, and style.css.**

## Performance

| Metric | Value |
|--------|-------|
| Duration | 1 session |
| Tasks | 3 of 3 complete |
| Files modified | 3 (app.js, index.html, style.css) |
| Exercise files touched | 0 |

## Acceptance Criteria Results

| Criterion | Status | Notes |
|-----------|--------|-------|
| Drill shows "Are you ready?" before exercise renders | Pass | |
| BEGIN launches exercise; timing only starts after BEGIN | Pass | Session created in beginDrill() |
| TUTORIAL button on ready screen | Pass | Placeholder — routes to tutorial tab |
| MENU returns to home | Pass | Unchanged behavior |
| RESTART DRILL shows confirmation after BEGIN | Pass | Uses browser confirm() |
| Clicking drill title shows same confirmation | Pass | onclick on #drill-title |
| Ready screen explains title-as-restart | Pass | Hint text visible |
| Difficulty label visible in header | Pass | Shows [ EASY ] by default |

## Files Modified

| File | Change |
|------|--------|
| `app.js` | Added difficulty/drillStarted to AppState; rewrote startExercise() to show ready screen; added beginDrill(), restartDrill(), tutorialForDrill() |
| `index.html` | Added RESTART button; added drill-title onclick; added #drill-difficulty span |
| `style.css` | Added .restart-btn, .ready-screen/.ready-icon/.ready-name/.ready-hint/.ready-buttons; updated .drill-header (gap), .drill-title (flex:1, cursor, hover), #drill-difficulty |

## Deviations

| Item | Change | Reason |
|------|--------|--------|
| Drill title click-to-restart | Removed post-unify | Redundant with RESTART button; user confirmed |

## Notes for Later Drafts

User noted some player experience items to revisit in Draft 3 (not blocking Draft 2).

## Next Phase Readiness

**Ready:** Drill launch flow is clean. All exercises gate behind BEGIN. Restart works with and without confirmation. Difficulty scaffolding in place for Plan 05-05.

**Pending Plans 05-03–05-08:** In-drill UX → Specific Drill Changes → Difficulty System → Score Entry → Tutorial → Settings

**Blockers:** None

---
*Phase: 05-uat-feedback, Plan: 02 — Completed: 2026-03-15*
