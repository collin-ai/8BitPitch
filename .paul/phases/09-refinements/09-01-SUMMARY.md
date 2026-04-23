---
phase: 09-refinements
plan: 09-01
completed: 2026-04-22
duration: two sessions (base implementation + refinements)
---

# Summary: 09-01 Mobile Numberpad

## Objective

Provide a toggleable on-screen numberpad for mobile users so they can enter answers without the native keyboard opening (which zooms the viewport and obscures the drill question on iOS Safari).

## What Was Built

| File | Change | Notes |
|------|--------|-------|
| `utils/numpad.js` | NEW module — `window.BitPitch.Numpad` | init, toggle, onDrillEnd, pressKey, _syncToggleBtns |
| `index.html` | Added `#numpad-panel` (19 keys, 5-col grid) inside `.drill-body` | Loaded `utils/numpad.js` before exercise scripts |
| `style.css` | `.numpad-toggle-btn`, `#numpad-panel`, `.np-btn`, `.np-wide`, `.numpad-mode .drill-input` | Toggle changed from `position:absolute` to inline flex-row |
| `app.js` | `goHome` + `showSummary` call `onDrillEnd()`; `init()` at boot; toggle button in ready-screen HTML | |
| `exercises/ex01-percentage-snap.js` | Toggle button added to question-phase flex-row | |
| `exercises/ex02-multiples.js` | Toggle button added to question-phase flex-row | |
| `exercises/ex03-double-triple-halve.js` | Toggle button added to question-phase flex-row | |
| `exercises/ex04-triangle-drill.js` | Toggle button added to question-phase flex-row | |
| `exercises/ex05-growth-rate.js` | Toggle button added to question-phase flex-row | |
| `exercises/ex06-break-even.js` | Toggle button added to question-phase flex-row | |
| `exercises/ex07-tam-estimation.js` | Toggle button added to question-phase flex-row (not self-grade row) | |
| `exercises/ex08-valuation-challenge.js` | Toggle button added to `submit-all-btn`/`giveup-btn` flex-row | |

## Acceptance Criteria Results

| # | Criterion | Status |
|---|-----------|--------|
| A | Toggle `#` button appears in flex-row alongside SUBMIT/PASS (not absolute-positioned in card corner) | PASS |
| B | ENT key clicks submit button directly; falls back to Enter dispatch during feedback phase | PASS |
| C | Toggle `#` button appears on "Are you ready?" screen so user can enable numpad before BEGIN | PASS |
| D | `_on` state (numpad enabled/disabled) persists across drill questions and drills | PASS |
| E | Panel hides during feedback phase, re-shows on next question | PASS |
| F | `inputmode="none"` prevents native keyboard; `font-size:16px` prevents iOS Safari viewport zoom | PASS |
| G | All `.numpad-toggle-btn` elements reflect active state simultaneously (shared class, not single ID) | PASS |

## Deviations from Plan

| Deviation | Reason |
|-----------|--------|
| `_injectToggle` removed entirely | With toggle button now in static exercise HTML and ready-screen HTML, injection is redundant. `_syncToggleBtns()` handles active-class sync on DOM change. |
| Used `.numpad-toggle-btn` shared class (not IDs) throughout | Plan suggested this as preferred approach; cleaner than managing two IDs (`#numpad-toggle` + `#numpad-toggle-ready`). |

## Key Patterns / Decisions

- **`_syncToggleBtns()`** — replaces single-ID targeting in `toggle()` and `_onDomChange()`. Queries all `.numpad-toggle-btn` elements and sets `active` class to match `_on`. Works for any number of toggle buttons on screen simultaneously.
- **MutationObserver on `#drill-area` (childList, no subtree)** — fires when exercises rebuild via `innerHTML =`, not on timer text updates. `_syncToggleBtns()` runs on each change to restore active state after rebuild.
- **ENT submit logic** — `submit-btn` → `submit-all-btn` → first `.btn-primary` in `#drill-area`. Fallback dispatches Enter to `document` for Enter-to-NEXT during feedback phase. Handles all 8 exercise variants.

## Next Phase

Phase 09-02 — Code Review. Full review of all files changed in Phase 09 (and potentially broader) before any further feature work.
