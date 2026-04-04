# Project State

## Current Position

Milestone: Milestone 3 (Draft 3 — UX Refinements) — **IN PROGRESS**
Phase: 6 (Refinements) — **PLANNED** (5 plans, none started)
Plan: 06-01 next — Rebrand + Tab Cleanup + DTH Base Numbers
Status: Plans 06-01 to 06-05 defined; ready to begin 06-01
Last activity: 2026-04-04 — Milestone 3 scoped; STATE and PROJECT updated

## Loop Position

```
PLAN ──▶ APPLY ──▶ UNIFY
  ✓        …        …     [Plan 06-01 planned — awaiting APPLY]
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
| Tolerances: EASY pct33=25%, MEDIUM pct33=5%, HARD pct33=0% | ROADMAP table; confirmed 05-05 |
| Tolerances: EASY quarter=5%, MEDIUM=2%, HARD=0% | ROADMAP table; confirmed 05-05 |
| Tolerances: EASY/MEDIUM growth=5%, HARD=0% | ROADMAP table; confirmed 05-05 |
| Difficulty selector on "Are you ready?" screen (3 inline buttons) | User confirmed 05-05 |
| Tutorial button removed from ready screen | User confirmed 05-05 |
| Goal times: not implemented | User scrapped during 05-05 planning |
| ex03 shows raw base numbers (no K abbreviation) | Fixes scoring mismatch; user confirmed 05-05 |
| e.stopPropagation() on Enter-to-submit inputs | Prevents keydown bubbling to document.onkeydown for NEXT |
| ex04 triangle: nodeHTML() helper renders blank node with input | Keeps showQuestion() clean |
| ex05 rate pool: all multiples of 10 (10–100%), 4 random per round | User confirmed multiples of 10 only |
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

## Phase 06 Plan Progress

| Plan | Name | Status |
|------|------|--------|
| 06-01 | Rebrand + Tab Cleanup + DTH Base Numbers | PLANNED |
| 06-02 | Hint Colour + Pitch Triathlon Timer | PLANNED |
| 06-03 | Drill Header Difficulty UI | PLANNED |
| 06-04 | Question Count Tuning | PLANNED |
| 06-05 | Difficulty Explained Page | PLANNED |

## Session Continuity

Last session: 2026-04-04
Stopped at: Milestone 3 scoped — all docs updated — ready for Plan 06-01 APPLY
Next action: `/paul:apply` to begin Plan 06-01 (Rebrand + Tab Cleanup + DTH Base Numbers)
Resume file: `.paul/HANDOFF-2026-04-04.md`
Resume context:
- No code changed this session — documentation only
- 3 changes queued for 06-01: rename to 8BitPitch Lite, remove Tutorial tab, comma-format ex03 base numbers
- Loop is at PLAN ✓ → APPLY is next

## How to Resume (fresh context)

1. Open new chat in `Claude Projects/` or `BitPitch/` folder
2. Read `.paul/HANDOFF-2026-04-04.md` for full context
3. Run `/paul:apply` to begin Plan 06-01

## Tooling Setup

| Tool | Location | Purpose |
|------|----------|---------|
| PAUL v1.0.3 | `.claude/commands/paul/` | Plan-Apply-Unify loop |
| CARL v1.0.8 | `.carl/` | Dynamic rule injection |
| BitPitch domain | `.carl/bitpitch` | Auto-loads project conventions |
| CARL manifest | `.carl/manifest` | Controls domain loading |

## Deferred Items

- Cross-browser visual check (Firefox, Safari) — cosmetic, not blocking
- High Scores, Tutorial Mode, Settings — scrapped for Draft 2; may revisit in Draft 3

---
*Updated: 2026-04-04 — Milestone 3 scoped; Phase 6 planned (Plans 06-01 to 06-05); ready for 06-01*
