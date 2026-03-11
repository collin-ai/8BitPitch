# Project State

## Current Position

Milestone: Draft 1 — Core Drills (v0.1)
Phase: 4 of 4 — COMPLETE
Status: UAT in progress — awaiting user findings before Draft 2 planning
Last activity: 2026-03-10 — CARL installed, BitPitch domain created, UAT underway

## Loop Position

```
PLAN ──▶ APPLY ──▶ UNIFY
  ✓        ✓        ✓     [Draft 1 loop CLOSED — UAT phase active]
```

## Key Decisions

| Decision | Reason |
|----------|--------|
| No ES modules — use global `window.BitPitch` namespace | Works on file:// protocol without CORS errors |
| Curated number pools (not pure Math.random) | Ensures mental math is always solvable without a calculator |
| Context object passed to each exercise | Exercises stay decoupled from the DOM and scoring logic |
| `type="text"` inputs (not `type="number"`) | Avoids browser quirks; lets users type "$1.2M" format |
| Derive triangle third value (ask = equity × valuation) | Always produces round, mentally solvable numbers |
| All 4 phases in one session | Beginner user — maintaining momentum over strict phase separation |
| PAUL installed locally in Claude Projects/ | Scoped to this workspace, not global |
| CARL installed locally in Claude Projects/ | Scoped to this workspace alongside PAUL |
| BitPitch CARL domain created | Project conventions auto-load on keyword match; not wasted on unrelated tasks |

## Session Continuity

Last session: 2026-03-10
Stopped at: UAT in progress — user testing Draft 1, findings not yet logged
Next action: User shares UAT findings → log to ISSUES.md → run /paul:consider-issues → fix loop

## Tooling Setup (completed this milestone)

| Tool | Location | Purpose |
|------|----------|---------|
| PAUL v1.0.3 | `.claude/commands/paul/` | Plan-Apply-Unify loop, project state management |
| CARL v1.0.8 | `.carl/` | Dynamic rule injection, context management |
| BitPitch domain | `.carl/bitpitch` | Auto-loads project conventions on keyword match |
| CARL manifest | `.carl/manifest` | Controls domain loading triggers |

## Accumulated Context

### Deferred Items
- Cross-browser visual check (Firefox, Safari) — cosmetic only, not blocking
- UAT findings — not yet logged, pending user feedback

### How to Resume (fresh context)
1. Open new chat in `Claude Projects/` or `BitPitch/` folder
2. Say "I want to work on the BitPitch game" → CARL BitPitch domain auto-loads
3. Run `/paul:resume` → restores full project state from this file + SUMMARY.md
4. Share UAT findings → I'll log them to ISSUES.md and triage with /paul:consider-issues

### Draft 2 Scope (from ROADMAP.md)
- Phase 5: Shark AI logic (rule-based decision tree)
- Phase 6: Pitch conversation UI
- Phase 7: Scoring + leaderboard integration

---
*Updated: 2026-03-10*
