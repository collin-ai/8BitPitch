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

Status: **COMPLETE** (2026-04-04 → 2026-04-05)

### Phase 06: Refinement Plans

| Plan | Name | Status | Scope |
|------|------|--------|-------|
| 06-01 | Rebrand + Tab Cleanup + DTH Base Numbers | **DONE** | Rename to 8BitPitch; remove Tutorial tab; comma-format base numbers in ex03 |
| 06-02 | Hint Colour + Pitch Triathlon Timer | **DONE** | Yellow hint in ex02; remove countdown bar, count-up timer in ex08 |
| 06-03 | Drill Header Difficulty UI | **DONE** | Match difficulty span height to buttons; pin it right so title stays centred |
| 06-04 | Question Count Tuning | **DONE** | Reduce questions per exercise across the board (ex05 also reduced to 2 rounds / 3 rates) |
| 06-05 | Difficulty Explained Page | **DONE** | Rename Settings tab; new static info page with tolerance examples; Hard 2dp for ÷3 (deviation) |

---

## Milestone 4: Draft 4 — Refinements

Status: **IN PROGRESS** (2026-04-05 → )

### Phase 07: Refinement Plans

| Plan | Name | Status | Scope |
|------|------|--------|-------|
| 07-01 | Enter Key to Answer | **DONE** | Enter submits in ex02, ex06, ex07, ex08; Enter-to-next in ex08 |
| 07-02 | Session Timing | **DONE** | Drill name + total time on Session Complete; formatElapsed for all stats |
| 07-03 | Feedback-Box Updates | **DONE** | Remove feedback icon spans globally; fix ex04 wrong-answer display |
| 07-04 | Drill Card and Time Updates | **DONE** | Timer font size; 100ms interval; mm:ss.t above 60s globally |
| 07-05 | Remove time-goal + Brackets | **DONE** | Delete time-goal div in ex01/ex04; strip brackets from drill-difficulty |
| 07-06 | Restart Drill Updates | **DONE** | In-game restart modal; remove ready-hint div |

### Phase 08: Refinement Plans

| Plan | Name | Status | Scope |
|------|------|--------|-------|
| 08-01 | Center diff-exp-title | **DONE** | CSS: absolute-centre the Difficulty Explained title in its header |
| 08-02 | Feedback Box Overhaul | **DONE** | New 5-item order; Acceptable Range; Your Answer always shown; blank input → PASS |
| 08-03 | drill-timer-q in progress row | **DONE** | Move per-question timer into same flex row as drill-progress |
| 08-04 | pass-btn label | **DONE** | Rename I'LL PASS → PASS on all exercise pass buttons |

### Phase 09: Refinement Plans

| Plan | Name | Status | Scope |
|------|------|--------|-------|
| TBD | (next refinements) | **NOT PLANNED** | To be defined by user |

---

## Plan 08 Requirements Reference

### Plan 08-01: Center diff-exp-title
- `style.css`: add `position: relative` to `.diff-exp-header`; change `.diff-exp-title` to use `position: absolute; left: 50%; transform: translateX(-50%); white-space: nowrap`

### Plan 08-02: Feedback Box Overhaul
New feedback order for all exercises (except ex07 self-grade UI):
1. Status label (CORRECT! / WRONG / GOOD RANGE! / RANGE OFF / etc.)
2. Acceptable Range — computed bounds at current difficulty; "Correct Range" in ex02 renamed "Acceptable Range"
3. Math explained — existing calculation line, now third
4. Your Answer — shown for both correct AND incorrect; correct → raw input string; wrong → formatted; pass/blank → "PASS"
5. Time — drill mode only

Additional global changes:
- Blank input on submit → trigger pass flow (check before processing in every exercise)
- Raw input captured in submit handlers and passed through to showFeedback

### Plan 08-03: drill-timer-q in progress row
- All exercise JS: wrap `<div class="drill-progress">` and `<span class="drill-timer-q">` in `<div class="progress-row">` (progress first, timer second)
- `style.css`: remove `position: absolute; top: 12px; right: 12px` from `.drill-timer-q`; remove `margin-bottom` from `.drill-progress`; add `.progress-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }`

### Plan 08-04: pass-btn label
- All exercises: change button innerHTML from `I'LL PASS` to `PASS`

---

## Milestone 5 (Planned): Draft 5 — Pitch Simulator

**Goal:** Full scenario — user pitches a company, virtual Sharks negotiate
**Prerequisite:** Draft 4 refinements complete
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

## Plan 07 Requirements Reference

### Plan 07-01: Enter Key to Answer
- ex02 (Rule of Thumb): Enter on low-input or high-input → submit (no fill condition)
- ex06 (Break-Even): Enter on profit-input or units-input → submit (no fill condition)
- ex07 (TAM Estimation): Enter → submit only when BOTH inputs have non-empty values
- ex08 (Pitch Triathlon): Enter → submit only when ALL THREE inputs filled; add Enter-to-next in showFeedback

### Plan 07-02: Session Timing
- Session Complete header dynamically shows drill name above "SESSION COMPLETE!"
- Add TOTAL TIME stat row (sum of all question timeMs)
- AVG TIME and FASTEST adopt formatElapsed format
- scoring.js getSummary(): avgSec/fastestSec return raw floats; add totalMs field

### Plan 07-03: Feedback-Box Updates
- Remove `<span class="feedback-icon">✓/✗</span>` from all msg strings in ex01–ex06, ex08
- ex04 bug fix: submit() was passing null as userVal to showFeedback → wrong answer always shows "?" — pass formatted display value instead

### Plan 07-04: Drill Card and Time Updates
- style.css: `.drill-timer-q` font-size 10px → 8px (match `.drill-progress` at 8px)
- All exercises: timer setInterval 1000ms → 100ms
- Live timer text: `window.BitPitch.formatElapsed(s)` — integer below 60s, m:ss.t at/above 60s
- Feedback time: `window.BitPitch.formatElapsed(elapsed/1000, true)` — 1dp below 60s, m:ss.t at/above
- Summary stats: same formatElapsed with showDecimals=true
- formatElapsed already added to utils/timer.js

### Plan 07-05: Remove time-goal + Brackets
- ex01: delete time-goal div from showQuestion() HTML
- ex04: delete time-goal div from showQuestion() HTML; keep TIME_GOAL_SEC variable (still used for warning color threshold)
- app.js: remove brackets from drill-difficulty display (2 places: startExercise line ~107, _setDifficulty line ~146)

### Plan 07-06: Restart Drill Updates
- index.html: add #modal-overlay div before </body>
- style.css: add #modal-overlay, .modal-box, .modal-msg, .modal-btns styles
- app.js: replace confirm() in restartDrill() with AppState._showRestartModal()
- app.js: remove `<div class="ready-hint">` line from startExercise() innerHTML

---

*Updated: 2026-04-10 — Phase 08 complete (08-01 through 08-04); Phase 09 not yet planned*
