---
phase: 06-refinements
plan: 03
completed: 2026-04-04
duration: ~1 session
---

# Plan 06-03 Summary — Drill Header Difficulty UI

## Objective

Style `#drill-difficulty` to match MENU/RESTART button height (same border + padding), and place it at the rightmost edge of the drill header while keeping the drill title readable and centred.

---

## What Was Built

| File | Rule | Change |
|------|------|--------|
| style.css | `.drill-header` | Added `position: relative` (harmless residual from reverted approach) |
| style.css | `.drill-title` | Retained `flex: 1; text-align: center` — absolute centring reverted (see Deviations) |
| style.css | `#drill-difficulty` | Added `order: 1`, `border: 2px solid var(--text-dim)`, `padding: 6px 10px`, `box-shadow: 2px 2px 0 #000`, `font-size: 8px`, `line-height: 1`; removed `margin-left: auto` |

---

## Acceptance Criteria Results

| AC | Description | Status | Notes |
|----|-------------|--------|-------|
| AC-1 | Difficulty badge matches button height | PASS | `line-height: 1` was required to neutralise inherited `line-height: 1.8` from body |
| AC-2 | Drill title centred in header | PASS | Approximate centring via `flex: 1` — absolute approach reverted (see Deviations) |
| AC-3 | Difficulty badge at right edge | PASS | `order: 1` places badge after timer in visual flex order |

---

## Deviations

**1. `.drill-title` centring approach changed**
- Planned: `position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%)`
- Applied: `flex: 1; text-align: center` (original, retained)
- Reason: Absolute positioning caused overlap between title text and buttons/badge at narrow window widths. User requested revert.
- Impact: Title is centred within its flex-allocated space, not pixel-perfect centred across full header width. Visually acceptable since MENU+RESTART left side (~130px) and timer+difficulty right side (~150px) are roughly balanced.

**2. Difficulty pinning method changed**
- Planned: `margin-left: auto`
- Applied: `order: 1`
- Reason: `margin-left: auto` has no effect when the preceding flex item has `flex: 1` (title already consumes all available space). `order: 1` visually places the badge last in the flex row (after timer, which defaults to `order: 0`), achieving rightmost-edge placement.

**3. Additional `line-height: 1` fix required**
- Not in plan. `<span>` elements inherit `line-height: 1.8` from `body`. `<button>` elements get `line-height: normal` from the browser UA stylesheet (~1×). This caused `#drill-difficulty` to render at 30.39px vs 24px for the buttons. Fix: `line-height: 1` on the span.

---

## Verification

- Difficulty badge: bordered box, same visual height as MENU/RESTART buttons ✓
- Difficulty badge: at the rightmost edge of the header row ✓
- Drill title: readable, approximately centred ✓
- Timer: unaffected, still adjacent to difficulty badge on the right ✓
- User confirmed: "It works!"

---

## Next Phase

Plan 06-04 — Question Count Tuning
Reduce question counts across all exercises (see ROADMAP.md for per-exercise targets).
