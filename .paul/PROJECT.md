# BitPitch

## What This Is

BitPitch is a browser-based mental math practice game with an 8-bit retro aesthetic, inspired by Shark Tank. It presents 8 categories of financial drills — percentages, multiples, break-even, growth rates, market sizing, and valuation challenges — designed to train investors and entrepreneurs to evaluate deals faster and with more confidence. The app runs from a single HTML file with no server required.

## Core Value

Aspiring investors and entrepreneurs can sharpen their deal-math intuition through fast, gamified drills — practising the mental calculations that matter in real Shark Tank situations.

## Current State

| Attribute | Value |
|-----------|-------|
| Version | v0.1 (Draft 1) |
| Status | In Progress |
| Last Updated | 2026-03-06 |

## Requirements

### Active (In Progress)
- [ ] 8 exercise types implemented — Draft 1 scope
- [ ] 8-bit retro UI theme with Press Start 2P font
- [ ] Per-drill timer and scoring system
- [ ] Session summary screen
- [ ] Practice Mode / Drill Mode toggle

### Planned (Next Drafts)
- [ ] Investor AI opponent (Draft 2)
- [ ] Pitch simulator mode (Draft 3)
- [ ] Leaderboard / high scores (future)

### Out of Scope (Draft 1)
- Backend / database — no data persistence
- User accounts — anonymous only
- Mobile app — web only
- Sound effects — placeholder for Draft 2

## Target Users

**Primary:** Aspiring entrepreneurs and investors who watch Shark Tank
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
- No user data stored — all session data lives in memory only

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
