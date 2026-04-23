# BitPitch

## What This Is

BitPitch is a browser-based mental math practice game with an 8-bit retro aesthetic. It presents 8 categories of financial drills — percentages, multiples, break-even, growth rates, market sizing, and valuation challenges — designed to train investors and entrepreneurs to evaluate deals faster and with more confidence. The app runs from a single HTML file with no server required.

## Core Value

Aspiring investors and entrepreneurs can sharpen their deal-math intuition through fast, gamified drills — practising the mental calculations that matter in real investment situations.

## Current State

| Attribute | Value |
|-----------|-------|
| Version | v0.4 (Draft 4 — Complete) |
| Status | Milestone 4 complete — all Phase 09 done |
| Last Updated | 2026-04-22 |

## Requirements

### Draft 1 — Complete
- [x] 8 exercise types implemented
- [x] 8-bit retro UI theme with Press Start 2P font
- [x] Per-drill timer and scoring system
- [x] Session summary screen
- [x] Practice Mode / Drill Mode toggle (mode bar)

### Draft 2 — UAT Feedback (Complete)
- [x] Shark Tank branding removed from all player-facing screens
- [x] 8-bit icons on each drill
- [x] 5-tab mode bar (Drill / Practice / High Scores / Tutorial / Settings)
- [x] "Are you ready?" pre-drill screen with Begin button (Plan 05-02)
- [x] Menu / Restart Drill navigation buttons (Plan 05-02)
- [x] In-drill UX: Submit lock, Enter key, I'll Pass, timer top-right (Plan 05-03)
- [x] Specific drill reworks: Percentage Snap rename, DTH 3-ops, Triangle visual layout, Growth varied rates, Pitch Triathlon (Plan 05-04)
- [x] Easy / Medium / Hard difficulty system with confirmed tolerances (Plan 05-05)
- [x] ex03 display bug fixed — raw base numbers shown, no K rounding (Plan 05-05)
- ~~Score entry + High Scores screen~~ (scrapped)
- ~~Tutorial Mode~~ (scrapped)
- ~~Settings Screens~~ (scrapped)

### Draft 3 — UX Refinements (Complete)
- [x] Rebrand app name to 8BitPitch; remove Tutorial tab (Plan 06-01)
- [x] ex03 base numbers show commas (Plan 06-01)
- [x] ex02 hint text in yellow; ex08 countdown bar removed, count-up timer (Plan 06-02)
- [x] Difficulty badge in drill header matches button height, pinned right (Plan 06-03)
- [x] Question counts reduced across all exercises (Plan 06-04)
- [x] Settings tab renamed Difficulty Explained; new tolerance info page (Plan 06-05)
- [x] Hard 2dp scoring for ÷3 questions; ex03/ex01 equity=33 uses n/3 (Plan 06-05 deviation)

### Draft 4 — Refinements (Phase 07 — Complete)
- [x] Enter key submits answer in ex02, ex06, ex07, ex08 (Plan 07-01)
- [x] Enter key advances to next question in ex08 (Plan 07-01)
- [x] Session Complete shows drill name and total time (Plan 07-02)
- [x] Feedback icons (✓/✗ spans) removed from all exercises (Plan 07-03)
- [x] ex04 wrong feedback shows user's actual answer, not "?" (Plan 07-03)
- [x] drill-timer-q font size reduced to match drill-progress (Plan 07-04)
- [x] Timer interval changed to 100ms; mm:ss.t format above 60s (Plan 07-04)
- [x] Feedback and summary times adopt formatElapsed format (Plan 07-04)
- [x] time-goal div removed from ex01 and ex04 (Plan 07-05)
- [x] Brackets removed from drill-difficulty span (Plan 07-05)
- [x] Restart confirmation uses in-game modal instead of browser confirm() (Plan 07-06)
- [x] ready-hint div removed from "Are you ready?" screen (Plan 07-06)

### Draft 4 — Refinements (Phase 08 — Complete)
- [x] diff-exp-title centred over full Difficulty Explained header (Plan 08-01)
- [x] Feedback box restructured: status → acceptable range → math → your answer → time (Plan 08-02)
- [x] "Correct Range" renamed "Acceptable Range"; computed tolerance bounds shown (Plan 08-02)
- [x] Your Answer shown for both correct AND incorrect results (Plan 08-02)
- [x] Correct results display user's raw input string as Your Answer (Plan 08-02)
- [x] Blank input on submit triggers pass flow (Plan 08-02)
- [x] drill-timer-q moved to same flex row as drill-progress; no longer absolute-positioned (Plan 08-03)
- [x] pass button label changed from I'LL PASS to PASS (Plan 08-04)

### Draft 4 — Refinements (Phase 09 — Complete)
- [x] Mobile numberpad — toggle button, panel below drill card, inputmode=none (Plan 09-01)
- [x] Numberpad toggle in flex-row alongside SUBMIT/PASS (Plan 09-01 refinement A)
- [x] ENT key directly submits (Plan 09-01 refinement B)
- [x] Numberpad toggle on "Are you ready?" screen (Plan 09-01 refinement C)
- [x] Code review — full adversarial review; 22 findings documented (Plan 09-02)

### Draft 4 — Phase 09-03 (Complete)
- [x] C-1: ex04 difficulty setting has no effect on grading (always ±5%) — apply DIFFICULTY_CONFIG like ex01
- [x] C-2: ex08 Q3 (break-even months) shown in UI but not counted in session score — include in allOk
- [x] C-3: ex07 self-grade buttons allow double-submission — disable on first click
- [x] C-4: app.js `replace('\n', '<br>')` only replaces first newline — use regex /\n/g
- [x] R-2: Google Font loaded twice (HTML link + CSS @import) — remove @import from style.css
- [x] W-1: No favicon — add `<link rel="icon" href="data:,">` to suppress 404
- [x] W-2: No meta description or OG tags — add to index.html head
- [x] S-1: Raw user input in innerHTML (XSS) — add esc() helper; wrap rawInput in all showFeedback functions
- [x] S-2: Globals referenced by name in inline onclick — add comment in app.js
- [x] E-1: document.onkeydown not cleaned up on navigation — clear in goHome() and startExercise()
- [x] E-3: parseUserNumber accepts scientific notation / negative values — add isFinite/negative guard
- [x] Testing: create tests/tests.html covering pure utility functions (T-1, T-2, T-3)

### Draft 5 — Milestone 5 (Planned)
- [ ] Supabase integration — write session scores to database; display on High Scores screen
- [ ] User authentication — username + password login/register via Supabase Auth; scores linked to user
- [ ] Google Form — embedded feedback form on a new Feedback tab or modal
- [ ] Waitlist — email capture form for interested users

### Draft 6 — Milestone 6 (Planned)
- [ ] Code cleanup — deferred refactors (R-1, R-3, R-4, R-5, C-5, E-2, W-4)
- [ ] Final code review — adversarial pass post-features; cross-browser check
- [ ] GitHub push + Vercel deploy — live at production URL

### Out of Scope
- Mobile app — web only

## Target Users

**Primary:** Aspiring entrepreneurs and investors
- Want to improve deal math speed and confidence
- Beginner to intermediate numeracy
- Practice in short sessions (5–15 minutes)

## Constraints

### Technical
- Milestone 4 and earlier: file:// compatible (no local server required)
- Milestone 5+: requires web hosting (Vercel); Supabase API calls need HTTPS
- No frameworks, no build tools, no npm
- Must work in Chrome, Firefox, Safari

### Privacy
- Milestone 4: no user data stored server-side — localStorage only
- Milestone 5+: session scores and user credentials stored in Supabase (user-consented)

## Tech Stack

| Layer | Technology | Notes |
|-------|------------|-------|
| Markup | HTML5 | Single index.html |
| Styling | CSS3 | Custom pixel theme, CSS variables |
| Logic | Vanilla JavaScript (ES5/ES6) | Global namespace pattern (no modules) |
| Font | Press Start 2P (Google Fonts CDN) | Requires internet on first load |
| Backend (M5+) | Supabase | Score storage + user auth; requires HTTPS |
| Hosting (M5+) | Vercel | Static deploy from GitHub |

## Success Metrics

| Metric | Target |
|--------|--------|
| All 8 exercises working | Yes |
| App opens without a server | Yes |
| Timer accuracy | ±100ms |
| Numbers always mentally solvable | Yes (curated pools) |
