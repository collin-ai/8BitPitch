# Roadmap: BitPitch

---

## Milestone 1: Draft 1 — Core Drills (v0.1)

Status: **COMPLETE** (2026-03-06 → 2026-03-14)

| Phase | Name | Status |
|-------|------|--------|
| 1 | Foundation (HTML shell, CSS theme, utilities, app router) | Done |
| 2 | Exercises (all 8 exercise modules) | Done |
| 3 | Scoring & Summary screen | Done |
| 4 | Polish & cross-browser testing | Done |

---

## Milestone 2: Draft 2 — UAT Feedback (v0.2)

Status: **COMPLETE** (2026-03-15 → 2026-04-04)

### Phase 05: UAT Feedback Plans

| Plan | Name | Status | Scope |
|------|------|--------|-------|
| 05-01 | Quick Wins + Mode Bar | **DONE** | Branding, 5-tab mode bar, 8-bit icons, timer fix, feedback icon |
| 05-02 | Drill Launch + Navigation | **DONE** | "Are you ready?" screen, Begin button, Menu/Restart buttons, difficulty display |
| 05-03 | In-Drill Question UX | **DONE** | Timer (top-right, no flash, stops on submit), Submit lock, Enter key, "I'll Pass", Wrong shows submitted answer, "Menu" at drill end |
| 05-04 | Specific Drill Changes | **DONE** | Rename/rework drills (see details below) |
| 05-05 | Difficulty System | **DONE** | Difficulty selector (Easy/Medium/Hard) on ready screen; tolerance config; ex03 display bug fix |

---

## UAT Requirements Reference

All requirements from user UAT session (2026-03-15).

### Already Done (Plan 05-01)
- All "Shark Tank" text removed from player-facing screens
- Each drill has an 8-bit icon
- 5-tab mode bar (Drill / Practice / High Scores / Tutorial / Settings); selected tab inverts fill + text
- Timer clearInterval fix on all exercises
- Feedback ✓/✗ icon size adjusted

### Plan 05-02: Drill Launch + Navigation
- "Are you ready?" screen shown before every drill: displays drill icon + name
- BEGIN button starts timing; Settings locked after BEGIN
- MENU button (replace "Back"), RESTART DRILL button next to MENU
- TUTORIAL button on "Are you ready?" screen (enters tutorial for that drill)
- Difficulty shown after drill name (between MENU and Settings)

### Plan 05-03: In-Drill Question UX
- Timer: top-right of question box; no flashing units; stops on submit
- Submit button darkens after use; input box holds submitted answer (greyed)
- Enter key: submit answer / advance to next question
- "I'll Pass" button (opposite side of Submit) = auto-fail; shows WRONG + correct answer + player's submitted answer
- WRONG feedback also shows what the player submitted
- "Menu" at drill end (was "Home")
- ✓/✗ icon size to fully match CORRECT!/WRONG text height

### Plan 05-04: Specific Drill Changes
- **ex01 Percentage Snap**: remove "Drills" from name → "PERCENTAGE SNAP"
- **ex03 Double Triple Halve**: reduce to 3 operations per set
- **ex05 Growth Rate Snap**: more varied percentages (not just 10/20/30/50/100)
- **ex04 Investor Triangle** → **Value Equity Ask Triangle**: visual triangle layout (Valuation top, Equity bottom-left, Ask bottom-right); leave one value blank per question; no written question text
- **ex08 30-Second Challenge** → **Pitch Triathlon**:
  - Q2: ask for the multiple value (not whether it is reasonable)
  - Q3: break-even to cover the ASK amount specifically
  - Correct answer: "Sharp Investor!" (Ask questions) or "Sharp Founder!" (Offer questions)
  - Countdown bar matches difficulty goal time
  - Time running out does NOT stop the question — player continues until Submit or "Give Up"

### Plan 05-05: Difficulty System (confirm tolerances before implementing)
- Easy / Medium / Hard difficulty per drill
- **33% tolerance**: Easy ±~25%, Medium ±~5%, Hard exact
  - Example: 4k × 33% = 1,320 — Easy: 1K acceptable; Medium: 1.3K acceptable; Hard: 1,320 only
  - Example: 800 × 33% = 264 — Easy: 250 acceptable; Medium: 260–270; Hard: 264 only
- **Quarter calculation**: Easy: 6K for 25K; Medium: 6,200; Hard: 6,250
- **Growth rate**: Easy/Medium accept rounded (1.4M for +20% on 1.2M); Hard exact (1.44M for +20%)
  - Growth rate 30%: Easy/Medium 1.6M; Hard 1.56M
- Goal times: new table for Easy/Medium/Hard per drill (to confirm in Plan 05-05)
- Difficulty badge shown on each score entry

---

## Milestone 3: Draft 3 — UX Refinements (v0.3)

Status: **IN PROGRESS** (2026-04-04 → )

### Phase 06: Refinement Plans

| Plan | Name | Status | Scope |
|------|------|--------|-------|
| 06-01 | Rebrand + Tab Cleanup + DTH Base Numbers | Planned | Rename to 8BitPitch; remove Tutorial tab; comma-format base numbers in ex03 |
| 06-02 | Hint Colour + Pitch Triathlon Timer | Planned | Yellow hint in ex02; remove countdown bar, count-up timer in ex08 |
| 06-03 | Drill Header Difficulty UI | Planned | Match difficulty span height to buttons; pin it right so title stays centred |
| 06-04 | Question Count Tuning | Planned | Reduce questions per exercise across the board |
| 06-05 | Difficulty Explained Page | Planned | Rename Settings tab; new static info page with tolerance examples |

---

## Milestone 4 (Planned): Draft 4 — Pitch Simulator

**Goal:** Full scenario — user pitches a company, virtual Sharks negotiate
**Prerequisite:** Draft 3 complete
**Phases:** TBD

---

## Plan 06 Requirements Reference

### Plan 06-01: Rebrand + Tab Cleanup + DTH Base Numbers
- App name: "BitPitch Lite" → "8BitPitch Lite" everywhere (`<title>`, `<h1>`)
- Remove TUTORIAL tab from mode bar
- ex03 base number display: comma formatting (e.g. 4,000 not 4000)

### Plan 06-02: Hint Colour + Pitch Triathlon Timer
- ex02 (Rule of Thumb Multiples): HINT line colour changed from dim to yellow
- ex08 (Pitch Triathlon):
  - Remove countdown bar and all associated JS
  - Replace with count-up timer using the standard drill-timer-q pattern (same as ex01–ex07)

### Plan 06-03: Drill Header Difficulty UI
- `#drill-difficulty` span styled to match MENU/RESTART button height (same padding + border)
- Difficulty badge pinned to the right; drill title stays centred

### Plan 06-04: Question Count Tuning
| Exercise | Before | After |
|----------|--------|-------|
| ex01 Percentage Snap | 8 questions | 5 questions |
| ex02 Rule of Thumb Multiples | 6 questions | 5 questions |
| ex03 Double Triple Halve | 5 rounds | 2 rounds (6 ops total) |
| ex04 Value Equity Ask Triangle | 10 questions | 5 questions |
| ex05 Growth Rate Snap | (no change) | — |
| ex06 Break-Even Reasoning | 5 questions | 3 questions |
| ex07 TAM Estimation | 5 questions | 3 questions |
| ex08 Pitch Triathlon | 3 rounds | (no change) |

### Plan 06-05: Difficulty Explained Page
- SETTINGS tab renamed to DIFFICULTY EXPLAINED
- Clicking the tab opens a new info page (not home)
- Page shows tolerance system with 3 worked "Calculate the 33%" examples:

| Example | Easy (±25%) | Medium (±5%) | Hard (exact) |
|---------|-------------|--------------|--------------|
| 33% of 4,000 = 1,320 | ~1,000 acceptable | ~1,300 acceptable | 1,320 only |
| 33% of 800 = 264 | ~250 acceptable | ~260–270 acceptable | 264 only |
| 33% of 25,000 = 8,250 | ~8,000 acceptable | ~8,200 acceptable | 8,250 only |

Page includes a MENU button to return to the home screen.

---

*Updated: 2026-04-04 — Milestone 3 (Draft 3) planned; Plans 06-01 through 06-05 defined*
