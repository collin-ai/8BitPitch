---
phase: 10-av-ui-overhaul
plan: 04
status: applied
date: 2026-04-27
---

# Phase 10-04 — Splash + Log-In Entry Screen — Applied

## What Was Built

- `#screen-splash` added to index.html (before `#screen-home`): four `.splash-word` elements (`8`, `BIT`, `PITCH`, `LITE`)
- `#screen-login-entry` added to index.html (after splash): PLAY AS GUEST + CREATE BETA ACCOUNT buttons
- `#screen-home` given `hidden` class — no longer shown on boot
- Splash + login-entry CSS added to style.css: `.splash-word`, `.splash-word.landed`, `#screen-splash.fading`, `.login-entry-logo`, `.login-entry-tagline`, `.login-entry-buttons`
- `.btn-dim` class added to style.css (used by CREATE BETA ACCOUNT)
- `runSplash()` function added to app.js — 4-word sequential drop-in, fade-out, advance to login-entry
- `AppState.playAsGuest()` added — sets `currentUser = null`, calls `renderHome()`
- `AppState.showRegister()` added — stub for Phase 11-01
- `showScreen()` updated — hides mode bar for `splash` and `login-entry`, restores it for all other screens
- Boot sequence updated: `document.getElementById('mode-bar').style.display = 'none'` + `runSplash()` instead of `renderHome()`

## CSS Variable Adaptations

Plan referenced `var(--accent)`, `var(--font)`, `var(--dim)` — substituted with actual variables:
- `var(--accent)` → `var(--yellow)`
- `var(--font)` → `'Press Start 2P', monospace`
- `var(--dim)` → `var(--text-dim)`

## Acceptance Criteria Status

- AC-1: Splash plays on page load ✓
- AC-2: Words drop in sequentially ✓
- AC-3: Splash fades to log-in entry ✓
- AC-4: PLAY AS GUEST calls renderHome() → showScreen('home') ✓
- AC-5: CREATE BETA ACCOUNT stub present, no crash ✓
- AC-6: No regression — all drill/nav logic untouched ✓

## Pending

- Human verify checkpoint (see plan task 4)
- Phase 10-05 is next after approval
