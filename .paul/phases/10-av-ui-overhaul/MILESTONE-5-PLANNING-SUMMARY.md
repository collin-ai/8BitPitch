---
phase: milestone-5-planning
plan: meta
subsystem: planning
tags: [roadmap, state, phases, milestone-5]

requires:
  - phase: 09-refinements
    provides: All Milestone 4 work complete; STATE.md confirmed ready for Milestone 5

provides:
  - Phase 10–13 sub-plan breakdowns documented in ROADMAP.md
  - 10-01-PLAN.md and 12-01-PLAN.md created and ready for Apply
  - Phase directories created for Phases 10–13
  - PROJECT.md and STATE.md updated to reflect Milestone 5 in-progress

affects: [10-av-ui-overhaul, 11-auth-ads-backend, 12-mode-profile, 13-teaser-news]

key-files:
  created:
    - .paul/phases/10-av-ui-overhaul/10-01-PLAN.md
    - .paul/phases/12-mode-profile/12-01-PLAN.md
  modified:
    - .paul/ROADMAP.md
    - .paul/STATE.md
    - .paul/PROJECT.md

key-decisions:
  - "Phase 10 scope: AV feedback + UI overhaul (not Supabase — that moved to Phase 11)"
  - "Phase 11 scope: Beta auth (username ≤10 chars, 6-digit PIN) + Supabase scores + ads"
  - "Phase 12 scope: Mode Select screen content + Profile widget + leveling system"
  - "Phase 13 scope: Teaser screen (hold-to-confirm) + profile widget in menu + News content"
  - "Old Phase 12 (Feedback + Waitlist) moved to Phase 14"
  - "Milestone 6 phases renumbered 15–17"
  - "Supabase project ID: cfllnyvnktuxgiebgryd confirmed by user"
  - "Leveling: Level 1 = 25 correct for 5-question exercises; 15 correct for 3-question exercises"
  - "Google Form trigger in Phase 13 TBD — incomplete instruction, flagged for clarification"

duration: 1 session
started: 2026-04-25
completed: 2026-04-25
---

# Milestone 5 Planning Summary

**Phase breakdowns for Phases 10–13 defined, Paul tracking documents updated, first PLAN.md files ready for Apply.**

## Performance

| Metric | Value |
|--------|-------|
| Duration | 1 session |
| Date | 2026-04-25 |
| Planning units | 4 phases (16 sub-plans) |
| Files created | 2 PLAN.md files, 4 phase directories |
| Files modified | ROADMAP.md, STATE.md, PROJECT.md |

## What Was Planned

### Phase 10: AV Feedback + UI Overhaul (5 plans)

| Plan | Name |
|------|------|
| 10-01 | Favicon — inline SVG |
| 10-02 | Sound + Vibration System — Web Audio API, all 8 exercises |
| 10-03 | Mode Bar Redesign + News Screen |
| 10-04 | Splash Animation + Log-In Entry Screen |
| 10-05 | Contact Creator Button → Google Form |

### Phase 11: Auth + Ads + Backend (4 plans)

| Plan | Name |
|------|------|
| 11-01 | Beta Auth Workflow (Supabase Auth, username + 6-digit PIN) |
| 11-02 | Supabase Score Tracking (scores table, RLS, saveScore hook) |
| 11-03 | Profile & Settings Screen (stub — full build in Phase 12) |
| 11-04 | Ads System (exercise counter, ad screen) |

### Phase 12: Mode Select Menu + Profile & Settings (4 plans)

| Plan | Name |
|------|------|
| 12-01 | Mode Select Screen (3 boxes: Practice/Drill/Coming Soon) |
| 12-02 | Profile Widget Component (108px, 8-bit character, swipeable stats) |
| 12-03 | Profile & Settings Full Build (widget + menu boxes) |
| 12-04 | Exercise Leveling System (XP + level per exercise) |

### Phase 13: Teaser Screen + Profile Widget + News (3 plans)

| Plan | Name |
|------|------|
| 13-01 | Teaser Screen (Value Equity Ask, hold-to-confirm 3s, anti-bot) |
| 13-02 | Profile Widget in Main Menu (above drill grid, long-press) |
| 13-03 | 8BitPitch News Content (Battle Pass, Gauntlet Mode, etc.) |

## Files Created / Modified

| File | Action | Purpose |
|------|--------|---------|
| `.paul/ROADMAP.md` | Modified | Milestone 5 expanded; Phases 10–14 sub-plans; Milestone 6 renumbered 15–17 |
| `.paul/STATE.md` | Modified | Current position updated; Phase 10–13 progress tables added |
| `.paul/PROJECT.md` | Modified | Draft 5 requirements rewritten for actual Phase 10–14 scope |
| `.paul/phases/10-av-ui-overhaul/` | Created | Phase 10 directory |
| `.paul/phases/10-av-ui-overhaul/10-01-PLAN.md` | Created | Favicon plan — ready for Apply |
| `.paul/phases/11-auth-ads-backend/` | Created | Phase 11 directory |
| `.paul/phases/12-mode-profile/` | Created | Phase 12 directory |
| `.paul/phases/12-mode-profile/12-01-PLAN.md` | Created | Mode Select Screen plan |
| `.paul/phases/13-teaser-news/` | Created | Phase 13 directory |

## Decisions Made

| Decision | Rationale | Impact |
|----------|-----------|--------|
| Phase 10 = AV + UI only (no Supabase) | Supabase API calls need HTTPS; Phase 10 tests locally first | Supabase deferred cleanly to Phase 11 |
| Username → `u@bitpitch.local` email internally | Supabase Auth requires email; user never sees it | Keeps UX clean — user only types username + PIN |
| Level 1 = 25 correct (5-Q exercises), 15 correct (3-Q exercises) | User-specified; ratio reflects session depth | Consistent progression curve across all 8 exercises |
| Google Form trigger in 13-03 flagged TBD | Instruction was cut off ("After hitting...") | Needs follow-up before 13-03 PLAN phase |
| Feedback + Waitlist moved to Phase 14 | New Phases 12/13 inserted before it | Milestone 5 now has 14 phases |
| Milestone 6 renumbered 15–17 | Phases 12/13 inserted, old numbering would conflict | Roadmap now coherent 10–17 across two milestones |

## Deviations

None — this was a planning session, not code execution.

## Issues / TBD

| Item | Status |
|------|--------|
| Google Form trigger in Phase 13-03 (Phase 13 instructions cut off: "After hitting...") | TBD — needs clarification before 13-03 PLAN phase |

## Next Phase Readiness

**Ready:**
- 10-01-PLAN.md ready to Apply immediately (single tag replacement in index.html)
- 12-01-PLAN.md ready once Phase 10-03 (Mode Bar) is complete
- All phase directories created

**Blockers:**
- None for Phase 10 execution
- Vercel deploy required before Phase 11
- Supabase anon key required before Phase 11-01
- Google Form trigger wording TBD before Phase 13-03

---
*Phase: Milestone 5 Planning — Completed: 2026-04-25*
