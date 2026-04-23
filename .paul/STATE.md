# Project State

## Current Position

Milestone: Inter-milestone polish (pre-Milestone 5)
Phase: 09-04 — Mobile + ex02 polish — **COMPLETE**
Status: PLAN ✓ — APPLY ✓ — UNIFY ✓
Last activity: 2026-04-23 — Mobile viewport fixes; ex02 UI trim; paused for numpad work

## Loop Position

```
PLAN ──▶ APPLY ──▶ UNIFY
  ✓        ✓        ✓     [Phase 07 complete]
  ✓        ✓        ✓     [Phase 08 complete]
  ✓        ✓        ✓     [Phase 09-01 — complete]
  ✓        ✓        ✓     [Phase 09-02 — code review — complete]
  ✓        ✓        ✓     [Phase 09-03 — bug fixes + testing — complete]
  ✓        ✓        ✓     [Phase 09-04 — mobile + ex02 polish — complete]
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
| Tolerances: EASY pct33=25%, MEDIUM pct33=5% | ROADMAP table; confirmed 05-05 |
| Tolerances: EASY quarter=5%, MEDIUM=2%, HARD=0% | ROADMAP table; confirmed 05-05 |
| Tolerances: EASY/MEDIUM growth=5%, HARD=0% | ROADMAP table; confirmed 05-05 |
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

## Session Continuity

Last session: 2026-04-22
Stopped at: Milestone 4 git push complete — paused before Milestone 5
Next action: Begin Milestone 5 — Phase 10 (Supabase Score Tracking); update git remote URL first
Resume file: `.paul/HANDOFF-2026-04-22-19-21-21.md`
Resume context:
- Milestone 4 COMPLETE and pushed to GitHub (commit eacdf62, 29 files)
- GitHub repo moved to https://github.com/collin-ai/8BitPitch.git — update remote before next push
- tests/tests.html created and passing — covers parseUserNumber, formatMoney, isCloseEnough, isCloseEnough2dp, ex06 scenarios, TAM categories
- Milestone 5 planned: Supabase scores, username/password auth, Google Form feedback, waitlist
- Milestone 6 planned: code review, cleanup, GitHub push + Vercel deploy
- Deferred items (C-5, R-1, R-3, R-4, R-5, E-2, W-4, T-4) remain for Milestone 6

## How to Resume (fresh context)

1. Read `.paul/HANDOFF-2026-04-22-19-21-21.md` for full session context
2. Read this STATE.md for decisions and plan history
3. Update git remote: `git remote set-url origin https://github.com/collin-ai/8BitPitch.git`
4. Confirm Supabase account status with user, then run `/paul:plan` for Phase 10

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
*Updated: 2026-04-22 — Phase 09-03 complete; Milestone 4 closed; Milestones 5 & 6 planned*
