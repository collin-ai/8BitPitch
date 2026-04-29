# Project State

## Current Position

Milestone: Milestone 5 — Draft 5: New Features
Phase: 10 of 17 (AV Feedback + UI Overhaul) — In Progress
Plan: 11-01 (Beta Auth Workflow) — blocked on pre-flight (see Handoff)
Status: Phase 10 complete; Phase 11 blocked on Vercel + Supabase pre-flight
Last activity: 2026-04-28 — Phases 10-04 and 10-05 applied and unified; ad-hoc splash timing +30% and login-entry logo split to two lines

## Loop Position

```
PLAN ──▶ APPLY ──▶ UNIFY
  ✓        ✓        ✓     [Phase 07 complete]
  ✓        ✓        ✓     [Phase 08 complete]
  ✓        ✓        ✓     [Phase 09-01 — complete]
  ✓        ✓        ✓     [Phase 09-02 — code review — complete]
  ✓        ✓        ✓     [Phase 09-03 — bug fixes + testing — complete]
  ✓        ✓        ✓     [Phase 09-04 — mobile + ex02 polish — complete]
  ✓        ✓        ✓     [Phase 09-05 — numpad polish + ex05 restructure — complete]
  ✓        ✓        ✓     [Phase 09-06 — scoring overhaul + EXACT ANSWER + ex03 restructure — complete]
  ✓        ✓        ✓     [Ad-hoc — Difficulty Explained page legibility overhaul — complete]
  ✓        ✓        ✓     [Phase 10-01 — Favicon — complete]
  ✓        ✓        ✓     [Phase 10-02 — Sound + Vibration System — complete]
  ✓        ✓        ✓     [Phase 10-03 — Mode Bar Redesign + News Screen — complete]
  ✓        ✓        ✓     [Milestone 5 full planning — all PLAN.md files written (10-04 through 13-04)]
  ✓        ✓        ✓     [Phase 10-04 — Splash + Log-In Entry Screen — complete]
  ✓        ✓        ✓     [Phase 10-05 — Contact Creator Button — complete]
  ✓        ○        ○     [Phase 11-01 — Beta Auth Workflow]
  ✓        ○        ○     [Phase 11-02 — Supabase Score Tracking]
  ✓        ○        ○     [Phase 11-03 — Profile & Settings Screen]
  ✓        ○        ○     [Phase 11-04 — Ads System]
  ✓        ○        ○     [Phase 11-05 — Extended Sound System]
  ✓        ○        ○     [Phase 12-01 — Mode Select Screen]
  ✓        ○        ○     [Phase 12-02 — Profile Widget Component]
  ✓        ○        ○     [Phase 12-03 — Profile & Settings Full Build]
  ✓        ○        ○     [Phase 12-04 — Exercise Leveling System]
  ✓        ○        ○     [Phase 12-05 — Local Leaderboard & Upload]
  ✓        ○        ○     [Phase 12-06 — Settings Screen]
  ✓        ○        ○     [Phase 13-01 — Teaser Screen]
  ✓        ○        ○     [Phase 13-02 — Profile Widget in Main Menu]
  ✓        ○        ○     [Phase 13-03 — 8BitPitch News Content]
```

## Key Decisions

| Decision | Reason |
|----------|--------|
| No ES modules — global `window.BitPitch` namespace | Works on file:// without CORS errors |
| Curated number pools | Ensures mental math always solvable |
| Context object pattern for exercises | Decouples exercises from DOM and scoring |
| type="text" inputs | Lets users type "$1.2M" format |
| Derive triangle third value | Always produces round, solvable numbers |
| PAUL + CARL installed locally in Claude Projects/ | Scoped to workspace |
| BitPitch CARL domain | Auto-loads project conventions |
| App title: "BitPitch Lite — Valuation Mental Math Trainer" | User confirmed |
| ex04: "VALUE EQUITY ASK TRIANGLE" | Shark Tank trademark removed; user confirmed 05-04 |
| Difficulty: Easy/Medium/Hard (default Easy) | User confirmed |
| Tolerances: EASY all=10%, MEDIUM pct33=5%/quarter=2%/general=5%, HARD=0% | Updated 09-06; EASY was ±25% |
| DIFFICULTY_CONFIG `general` field for standard ops (valuation, equity, growth, DTH) | Added 09-06 |
| EXACT ANSWER shown in all feedback boxes regardless of difficulty | User confirmed 2026-04-25 |
| Exact answer uses Hard scoring rules (2dp for ÷3, rounded otherwise) | User confirmed 2026-04-25 |
| Hard pct33: 2dp precision required (not integer exact) | User confirmed 06-05 session |
| 33% operations use ÷ 3 (not × 0.33) | True thirds; enables 2dp Hard scoring; user confirmed 06-05 |
| randTriangle: equity=33 uses valuation/3 for ask | Consistent with ÷3 rule |
| isCloseEnough2dp: Math.round(×100) integer comparison | Avoids float equality issues |
| Difficulty selector on "Are you ready?" screen (3 inline buttons) | User confirmed 05-05 |
| Tutorial button removed from ready screen | User confirmed 05-05 |
| Goal times: not implemented | User scrapped during 05-05 planning |
| ex03 shows raw base numbers (no K abbreviation) | Fixes scoring mismatch; user confirmed 05-05 |
| e.stopPropagation() on Enter-to-submit inputs | Prevents keydown bubbling to document.onkeydown for NEXT |
| ex04 triangle: nodeHTML() helper renders blank node with input | Keeps showQuestion() clean |
| ex05 rate pool: all multiples of 10 (10–100%), 3 random per round | Reduced from 4 in Plan 06-04 |
| ex08 timer: hits 0 but no auto-submit; GIVE UP exits round | UAT feedback |
| Plans 05-06, 05-07, 05-08 scrapped | User decision 2026-04-04 |
| localStorage for High Scores | No server; works on file:// — deferred to Draft 4 |
| App renamed 8BitPitch Lite | User confirmed Plan 06-01 |
| Tutorial tab removed | Scrapped in Draft 2; removed from UI in Plan 06-01 |
| Difficulty Explained replaces Settings tab | Settings scrapped; new info page instead; Plan 06-05 |
| Difficulty Explained page opened by tab only | Easy/Medium/Hard buttons on ready screen unchanged; user confirmed Plan 06-05 |

## Phase 05 Plan Progress (all done)

| Plan | Name | Status |
|------|------|--------|
| 05-01 | Quick Wins + Mode Bar | DONE |
| 05-02 | Drill Launch + Navigation | DONE |
| 05-03 | In-Drill Question UX | DONE |
| 05-04 | Specific Drill Changes | DONE |
| 05-05 | Difficulty System | DONE |

## Phase 06 Plan Progress (all done)

| Plan | Name | Status |
|------|------|--------|
| 06-01 | Rebrand + Tab Cleanup + DTH Base Numbers | DONE |
| 06-02 | Hint Colour + Pitch Triathlon Timer | DONE |
| 06-03 | Drill Header Difficulty UI | DONE |
| 06-04 | Question Count Tuning | DONE |
| 06-05 | Difficulty Explained Page | DONE |

## Phase 07 Plan Progress (all done)

| Plan | Name | Status |
|------|------|--------|
| 07-01 | Enter Key to Answer | DONE |
| 07-02 | Session Timing | DONE |
| 07-03 | Feedback-Box Updates | DONE |
| 07-04 | Drill Card and Time Updates | DONE |
| 07-05 | Remove time-goal + Brackets | DONE |
| 07-06 | Restart Drill Updates | DONE |

## Phase 08 Plan Progress

| Plan | Name | Status |
|------|------|--------|
| 08-01 | Center diff-exp-title | DONE |
| 08-02 | Feedback Box Overhaul | DONE |
| 08-03 | drill-timer-q in progress row | DONE |
| 08-04 | pass-btn label | DONE |

## Phase 09 Plan Progress

| Plan | Name | Status |
|------|------|--------|
| 09-01 | Mobile Numberpad | DONE |
| 09-02 | Code Review | DONE |
| 09-03 | Bug Fixes + Testing | DONE |
| 09-04 | Mobile + ex02 Polish | DONE |
| 09-05 | Numpad Polish + ex05 Restructure | DONE |
| 09-06 | Scoring Overhaul + EXACT ANSWER + ex03 Restructure | DONE |

## Phase 10 Plan Progress

| Plan | Name | Status |
|------|------|--------|
| 10-01 | Favicon | DONE |
| 10-02 | Sound + Vibration System | DONE |
| 10-03 | Mode Bar Redesign + News Screen | DONE |
| 10-04 | Splash + Log-In Entry Screen | DONE |
| 10-05 | Contact Creator Button | DONE |

## Phase 11 Plan Progress

| Plan | Name | Status |
|------|------|--------|
| 11-01 | Beta Auth Workflow | PLANNED |
| 11-02 | Supabase Score Tracking | PLANNED |
| 11-03 | Profile & Settings Screen | PLANNED |
| 11-04 | Ads System (pre-score interstitial) | PLANNED |
| 11-05 | Extended Sound System | PLANNED |

## Phase 12 Plan Progress

| Plan | Name | Status |
|------|------|--------|
| 12-01 | Mode Select Screen | PLANNED |
| 12-02 | Profile Widget Component | PLANNED |
| 12-03 | Profile & Settings Full Build | PLANNED |
| 12-04 | Exercise Leveling System | PLANNED |
| 12-05 | Local Leaderboard & Upload | PLANNED |
| 12-06 | Settings Screen | PLANNED |

## Phase 13 Plan Progress

| Plan | Name | Status |
|------|------|--------|
| 13-01 | Teaser Screen | PLANNED |
| 13-02 | Profile Widget in Main Menu | PLANNED |
| 13-03 | 8BitPitch News Content | PLANNED |
| 13-04 | → MOVED to 12-06 | — |

## Session Continuity

Last session: 2026-04-27
Stopped at: Phase 10 fully complete; paused before Phase 11
Next action: Apply Phase 11-01 (Beta Auth Workflow) — requires Vercel + Supabase pre-flight first
Resume file: `.paul/HANDOFF-2026-04-27.md`
Resume context:
- All Milestone 5 plans written (10-04 through 13-03); loop position is PLAN ✓ for all
- 11-04 amended: ad plays before score screen (not before home screen); uses proceedFn callback pattern
- 12-05 added: Local Leaderboard & Upload (40-session cap, ad-gated upload, bp_local_sessions)
- 11-05 added: Extended sounds (click, splash jingle, level-up fanfare, session complete flourish)
- 12-06 added (was 13-04): Settings screen (account, audio/input, gameplay, data, about)
- 13-03 has a BLOCKING gate: Google Form CTA trigger condition ("After hitting...") must be confirmed before that plan can be applied
- Pre-apply prerequisites for Phase 11+: Vercel deploy live + Supabase anon key retrieved + email confirmation disabled

## How to Resume (fresh context)

1. Read `.paul/HANDOFF-2026-04-27.md` for full session context
2. Read this STATE.md for decisions and plan history
3. Apply Phase 10-04 (Splash + Log-In Entry Screen)

## Tooling Setup

| Tool | Location | Purpose |
|------|----------|---------|
| PAUL v1.0.3 | `.claude/commands/paul/` | Plan-Apply-Unify loop |
| CARL v1.0.8 | `.carl/` | Dynamic rule injection |
| BitPitch domain | `.carl/bitpitch` | Auto-loads project conventions |
| CARL manifest | `.carl/manifest` | Controls domain loading |

## Deferred Items

- Cross-browser visual check (Firefox, Safari) — cosmetic, deferred to Milestone 6
- C-5, R-1, R-3, R-4, R-5, E-2, W-4 — low-severity, deferred to Milestone 6 code cleanup
- Seeded RNG (T-4) — deferred; not needed until debugging is a problem
- Pitch Simulator — removed from Milestone 5 scope; indefinitely deferred

---
*Updated: 2026-04-25 — Phases 10-01/02/03 complete; 10-04 next*
