# BitPitch

## What This Is

BitPitch is a browser-based mental math practice game with an 8-bit retro aesthetic. It presents 8 categories of financial drills — percentages, multiples, break-even, growth rates, market sizing, and valuation challenges — designed to train investors and entrepreneurs to evaluate deals faster and with more confidence. The app runs from a single HTML file with no server required.

## Core Value

Aspiring investors and entrepreneurs can sharpen their deal-math intuition through fast, gamified drills — practising the mental calculations that matter in real investment situations.

## Current State

| Attribute | Value |
|-----------|-------|
| Version | v0.3 (Draft 3 — In Progress) |
| Status | Draft 3 in progress — Plans 06-01 to 06-05 defined, not yet started |
| Last Updated | 2026-04-04 |

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

### Draft 3 — UX Refinements (In Progress)
- [ ] Rebrand app name to 8BitPitch; remove Tutorial tab (Plan 06-01)
- [ ] ex03 base numbers show commas (Plan 06-01)
- [ ] ex02 hint text in yellow; ex08 countdown bar removed, count-up timer (Plan 06-02)
- [ ] Difficulty badge in drill header matches button height, pinned right (Plan 06-03)
- [ ] Question counts reduced across all exercises (Plan 06-04)
- [ ] Settings tab renamed Difficulty Explained; new tolerance info page (Plan 06-05)

### Draft 4 — Planned
- [ ] Pitch simulator mode — full scenario with virtual Sharks

### Out of Scope
- Backend / database
- User accounts / passwords
- Mobile app — web only

## Target Users

**Primary:** Aspiring entrepreneurs and investors
- Want to improve deal math speed and confidence
- Beginner to intermediate numeracy
- Practice in short sessions (5–15 minutes)

## Constraints

### Technical
- Must open directly from filesystem (file:// protocol — no local server required)
- No frameworks, no build tools, no npm
- No external API calls
- Must work in Chrome, Firefox, Safari

### Privacy
- No user data stored server-side — localStorage only

## Tech Stack

| Layer | Technology | Notes |
|-------|------------|-------|
| Markup | HTML5 | Single index.html |
| Styling | CSS3 | Custom pixel theme, CSS variables |
| Logic | Vanilla JavaScript (ES5/ES6) | Global namespace pattern (no modules) |
| Font | Press Start 2P (Google Fonts CDN) | Requires internet on first load |

## Success Metrics

| Metric | Target |
|--------|--------|
| All 8 exercises working | Yes |
| App opens without a server | Yes |
| Timer accuracy | ±100ms |
| Numbers always mentally solvable | Yes (curated pools) |
