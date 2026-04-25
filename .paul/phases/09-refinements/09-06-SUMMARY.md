---
phase: 09-refinements
plan: 09-06
completed: 2026-04-25
duration: ~1 session
---

# Summary: Phase 09-06 — Scoring Overhaul + EXACT ANSWER + ex03 Restructure

## Objective

Three connected changes:
1. Fix Easy tolerance from ±25% to ±10% across all exercises; make tolerances consistent
2. Add `EXACT ANSWER:` line to every feedback box (Hard rules: 2dp for ÷3, integer/money for all else)
3. Flatten ex03 Double Triple Halve from 2 rounds × 3 ops to 5 independent questions with fresh base each time

## What Was Built

| File | Change | Lines Δ |
|------|--------|---------|
| `app.js` | DIFFICULTY_CONFIG: EASY → 10% all tolerances; added `general` field | +4 |
| `exercises/ex01-percentage-snap.js` | Use `cfg.general` for non-33% scoring; EXACT ANSWER in feedback | +16 |
| `exercises/ex02-multiples.js` | Added EXACT RANGE line in feedback | +1 |
| `exercises/ex03-double-triple-halve.js` | Flattened to 5 questions; use `cfg.general`; EXACT ANSWER; Your Answer shows raw input | -18 net |
| `exercises/ex04-triangle-drill.js` | Use `cfg.general`; difficulty-aware acceptable range; EXACT ANSWER | +22 |
| `exercises/ex05-growth-rate.js` | EXACT ANSWER in feedback; default tol fallback updated to 10 | +5 |
| `exercises/ex06-break-even.js` | EXACT ANSWER in feedback | +4 |
| `exercises/ex08-valuation-challenge.js` | EXACT line with all 3 Q answers | +6 |
| `index.html` | Difficulty Explained: ±25% → ±10%; updated example table ranges | +6 |

## Acceptance Criteria Results

| AC | Description | Status |
|----|-------------|--------|
| AC-1 | EASY tolerance = ±10% across all exercises | PASS |
| AC-2 | DIFFICULTY_CONFIG has `general` field for standard ops | PASS |
| AC-3 | `EXACT ANSWER:` appears above `ACCEPTABLE:` in all feedback boxes | PASS |
| AC-4 | Exact answer uses Hard rules (2dp for ÷3, rounded otherwise) | PASS |
| AC-5 | ex03 has 5 independent questions, fresh base each time | PASS |
| AC-6 | ex03 progress shows Q X / 5 (no ROUND / OP) | PASS |
| AC-7 | ex03 Your Answer shows raw input string (not formatted) | PASS |
| AC-8 | Difficulty Explained page updated to show ±10% | PASS |

## Deviations

- No formal PLAN.md was written; changes were applied directly from user instruction.
- ex07 (TAM Estimation) intentionally excluded from EXACT ANSWER — self-graded exercise with reference answer already shown in the self-grade UI.
- ex02 EXACT RANGE duplicates the ACCEPTABLE RANGE (they are the same for this exercise since the exact range IS the acceptable range). Noted as acceptable — user may want to differentiate later.

## Key Decisions

| Decision | Reason |
|----------|--------|
| EASY = ±10% for all op types | User explicitly requested; ±25% was too loose |
| `general` tolerance field added to DIFFICULTY_CONFIG | Separates standard ops (valuation, equity, growth) from special ops (÷3, ÷4) |
| Exact answer uses Hard rules regardless of current difficulty | User requested: "Exact follows the same scoring rules as Hard difficulty" |
| ex03: pick random op per question (not shuffle-without-repeat) | Simpler; repeats acceptable across 5 questions |

## Next Phase

No formal next phase defined. Pre-Milestone 5 polish continues on an ad-hoc basis.

Next milestone when ready:
- Phase 10: Supabase Score Tracking
- Prerequisite: confirm Supabase account + project status with user
