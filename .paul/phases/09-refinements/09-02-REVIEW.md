# Phase 09-02: Code Review

**Date:** 2026-04-22
**Reviewer:** Claude (adversarial senior engineer pass)
**Scope:** Full codebase — all 8 exercises, utils, app.js, index.html, style.css, numpad.js

---

## Overview

**What the app does:** BitPitch is a browser-based mental math trainer for startup finance concepts (valuation triangles, growth rates, break-even, TAM, multiples). 8 exercises, 3–5 questions per session. Graded as correct/wrong with a session summary. Mobile numpad added in Phase 09.

**Architecture:**
```
index.html          — entry point; static numpad panel HTML; script load order
style.css           — all styling; 8-bit retro
app.js              — AppState controller; screen management; exercise dispatch
utils/random.js     — curated number pools; parseUserNumber; formatMoney/Number
utils/timer.js      — per-question Timer class; formatElapsed
utils/scoring.js    — Session (answer recording, summary); isCloseEnough variants
utils/numpad.js     — mobile numpad; MutationObserver; focus tracking
exercises/ex01–08   — individual drill modules; fully self-contained HTML rendering
```

**Key user flows:**
1. Home → select exercise → ready screen (difficulty picker) → BEGIN → N questions → session summary
2. Each question: render → timer start → submit/pass → feedback → NEXT
3. Mobile: toggle numpad with `#` button to suppress native keyboard

**Fragile / high-risk areas (before diving into findings):**
- `document.onkeydown` is assigned and cleared directly — no `addEventListener`, so any conflict or missed cleanup breaks Enter-to-NEXT for the rest of the session
- Every exercise is a copy-paste of the same ~150-line structure; a bug fixed in one is silently not fixed in others
- `DIFFICULTY_CONFIG` is a global in `app.js` accessed by exercises as an ambient variable — load order is the only thing keeping this working
- The numpad `pressKey('enter')` fallback (dispatching a `KeyboardEvent` to `document`) overlaps with the exercises' own `document.onkeydown` handler — interaction between the two is implicit

---

## 1. Correctness

---

**Finding C-1: ex04 ignores DIFFICULTY_CONFIG entirely**
- File: `exercises/ex04-triangle-drill.js:98`
- `isOk = close(userVal, correctAnswer, 5)` is hardcoded. ex04 is the same valuation triangle as ex01, but ex01 properly reads `DIFFICULTY_CONFIG[context.difficulty].pct33` for the `÷3` case. ex04 always grades at ±5% regardless of what the player selects. The difficulty buttons appear and look active, but do nothing.
- **Severity: medium** — stated core feature silently broken for one of eight exercises
- **Fix:** Apply the same DIFFICULTY_CONFIG lookup from ex01 lines 97–106. On HARD, use `isCloseEnough2dp` for equity=33 cases.

---

**Finding C-2: ex08 Q3 (break-even months) is shown but not scored**
- File: `exercises/ex08-valuation-challenge.js:146`
- `var allOk = q1Ok && q2Ok;` — Q3 is computed, highlighted in feedback, shown with its acceptable range, but has zero effect on whether the round is marked correct. A player can answer Q3 wildly wrong and still get "SHARP INVESTOR!" — and the session records it as a win.
- **Severity: medium** — player-facing behaviour contradicts what the UI implies
- **Fix:** Either include Q3 in `allOk` (`q1Ok && q2Ok && q3Ok`), or visually mark Q3 as "bonus / unscored" so the UI matches the logic.

---

**Finding C-3: ex07 self-grade buttons are not disabled after first click**
- File: `exercises/ex07-tam-estimation.js:172–173`
- `grade(true)` and `grade(false)` each call `context.onComplete(...)` and then `showNextBtn()`. The buttons are never disabled before the call. A fast double-click on the same thumb (or one click each) records two results for one question. The session will show more answers than questions, breaking accuracy maths.
- **Severity: medium** — corrupts session stats on accidental double-click
- **Fix:** Disable both buttons immediately on first click, before calling `grade()`.

---

**Finding C-4: `name.replace('\n', '<br>')` only replaces the first newline**
- File: `app.js:59`, `app.js:103`
- `String.replace` with a string literal, not a regex, stops after the first match. Exercise names like `'DOUBLE TRIPLE\nHALVE'` have only one `\n` so this works today — but it's a latent bug for any future name with two.
- **Severity: low**
- **Fix:** `ex.name.replace(/\n/g, '<br>')`

---

**Finding C-5: `context.timerEl` reset is inconsistently applied**
- Files: `exercises/ex01`, `ex04`, `ex08` reset `context.timerEl.textContent`; ex02, ex03, ex05, ex06, ex07 do not.
- Since nothing writes to `#drill-timer` during a drill in any exercise, this is currently harmless. But it creates a false expectation in the API and will trip up anyone who ever wires a real session-level timer.
- **Severity: low**
- **Fix:** Either use `timerEl` consistently (start/stop/reset in every exercise) or remove it from the `context` object entirely.

---

## 2. Redundancy and Simplification

---

**Finding R-1: Per-question timer interval is copy-pasted 8 times**
- Files: every exercise file
- The `setInterval` that updates `#drill-timer-q` is identical across all 8 exercises (same element ID, same `>10` warning threshold, same `formatElapsed` call) with only the variable name changing (`iv`, `timerInterval`, `timerIv`). A change to timing behaviour (e.g. threshold from 10s to 15s) requires 8 edits.
- **Severity: low** (maintenance risk)
- **Fix:** Move this to a `utils/timer.js` helper: `BitPitch.startQuestionTimer(timerId, timer, threshold)` returning the interval handle.

---

**Finding R-2: CSS loads the Google Font twice**
- Files: `index.html:9`, `style.css:8`
- `<link>` in HTML and `@import` in CSS both fetch the same Google Fonts URL. On most browsers this results in two separate requests (or at best one network fetch + one cache lookup that still triggers a request).
- **Severity: low** (performance on first load)
- **Fix:** Remove the `@import` from `style.css`. The `<link>` in `<head>` is the right place — it loads earlier and is more cache-friendly.

---

**Finding R-3: Fisher-Yates shuffle duplicated in ex03 and ex05**
- Files: `exercises/ex03:38–44`, `exercises/ex05:31–38`
- Both exercises inline the same shuffle implementation. `random.js` already exports utility functions.
- **Severity: low**
- **Fix:** Add `randShuffle(arr)` to `window.BitPitch.random` and call it from both exercises.

---

**Finding R-4: `usedIdx` no-repeat pattern duplicated in ex06 and ex07**
- Files: `exercises/ex06:39–43`, `exercises/ex07:23–27`
- Identical logic for picking non-repeating random indexes from a pool.
- **Severity: low**
- **Fix:** Extract to `random.js` as `randNonRepeating(pool, usedArr)`.

---

**Finding R-5: PASS handler is structurally duplicated 8 times**
- Files: all exercise files
- Every pass handler does the same sequence: clear interval → stop timer → disable submit → set value to `'PASS'` → add `.input-submitted` → call `onComplete(correct: false)` → call `showFeedback(..., isPassed=true)`. Any change to pass logic requires touching 8 files.
- **Severity: low** (no immediate bug; maintenance risk)
- **Note:** Given this is a flat-file app, a shared `handlePass(opts)` helper in `app.js` or a new `utils/drill.js` would consolidate this without adding indirection.

---

## 3. Edge Cases and Failure Handling

---

**Finding E-1: `document.onkeydown` is not cleaned up on navigation**
- Files: all exercise `showFeedback` functions (e.g. `ex01:183`)
- After feedback is shown, each exercise assigns `document.onkeydown = function(e) { if (e.key === 'Enter') nb.click(); }`. This is cleared when NEXT is clicked. But if the user clicks MENU or RESTART while feedback is visible, the handler persists. On the home screen, pressing Enter will attempt to click `#next-btn`, which doesn't exist — so it's currently harmless. But if any home-screen button ever gets that ID, it will fire unexpectedly.
- **Severity: low** (harmless now, latent risk)
- **Fix:** Call `document.onkeydown = null` in `AppState.goHome()` and at the start of `AppState.startExercise()`.

---

**Finding E-2: Timer intervals are not explicitly cleared on navigation**
- Files: all exercise files
- Per-question intervals check `if (!tq) { clearInterval(iv); return; }` — they self-clear one tick after the DOM is replaced. This works, but means one stale tick fires after navigation. The bigger risk: if an exercise is running when `AppState.goHome()` is called, the interval keeps its reference to `iv`/`timerInterval` inside a closed-over scope that is now unreachable. The interval will fire once more, find no `#drill-timer-q`, and stop. No crash, but it is sloppy.
- **Severity: low**
- **Fix:** Expose a cleanup function on the context object (`context.cleanup = function(){ clearInterval(iv); }`) and call it in `AppState.goHome()` and `AppState.restartDrill()`.

---

**Finding E-3: `parseUserNumber` does not guard against scientific notation or multiple decimal points**
- File: `utils/random.js:86`
- `parseFloat("1e6")` → 1000000 (will silently accept scientific notation). `parseFloat("1.5.5")` → 1.5 (ignores the second dot). Neither is catastrophic but they are invisible entry points for unexpected values.
- **Severity: low**
- **Fix:** After parsing, add a sanity check: `if (!isFinite(n) || n < 0) return NaN;`. The app has no use for negative or infinite answers.

---

**Finding E-4: ex06 `acceptableLine` tolerance display may confuse players**
- File: `exercises/ex06:113`, `ex06:151–157`
- This is correct as coded — the tolerance is 2% of the correct value. But the feedback label says `±2%` alongside a dollar range. For a profit of $30, ±2% = $0.60, so only $29.40–$30.60 is accepted. Users who type `30` will always pass, but anyone who reads the range carefully might be confused by how narrow it is.
- **Severity: low** (UX clarity)

---

## 4. Security

---

**Finding S-1: Raw user input is inserted into `innerHTML` in all feedback functions**
- Files: all 8 exercise `showFeedback` functions — e.g. `ex01:163–169`
- `yourAnswer = rawInput` (the exact string the user typed) is concatenated into an innerHTML string. Input like `<img src=x onerror=alert(1)>` would execute. Since this is a local `file://` app with no other users, the attacker is the player — low real-world risk. But it is a bad pattern, and if this is ever hosted on a server where URL parameters or localStorage are used, it becomes a real XSS vector.
- **Severity: low** for file:// use, **medium** if deployed to the web
- **Fix:** Sanitize before display. Simplest: `function esc(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }` — wrap `rawInput` in `esc()` wherever it enters innerHTML.

---

**Finding S-2: Inline `onclick` attributes in `index.html` reference globals by name**
- File: `index.html:24–27`, `index.html:53–74`
- Buttons like `onclick="AppState.setMode('drill')"` and `onclick="BitPitch.Numpad.pressKey('7')"` are tied to specific global variable names. If any minifier or future refactor renames these, the buttons silently break with no JS error until the user clicks them.
- **Severity: low**
- **Note:** Not suggesting a rewrite — just flag it as a maintenance gotcha. Add a comment in `app.js` near the `AppState` declaration: "name is referenced by inline onclick in index.html — do not rename without updating HTML."

---

## 5. Web Deployment Readiness

---

**Finding W-1: No favicon**
- File: `index.html`
- Browsers make a request to `/favicon.ico` on every page load. On GitHub Pages this will return a 404, which is logged in the console.
- **Severity: low**
- **Fix:** Add `<link rel="icon" href="data:,">` to suppress the request with one line, or create a real favicon.

---

**Finding W-2: No `<meta name="description">` or Open Graph tags**
- File: `index.html`
- When linked from GitHub or shared on social media, the page preview will show no description or thumbnail.
- **Severity: low**

---

**Finding W-3: App is functional on GitHub Pages as-is; no path issues**
- All script `src` attributes are relative (`utils/random.js`, `exercises/ex01...`), CSS is relative, fonts are CDN-absolute. This will work identically on file:// and on GitHub Pages. No changes needed for deployment.
- **Severity: none** — clean pass.

---

**Finding W-4: Font dependency on CDN means offline use degrades silently**
- Files: `index.html:7–9`, `style.css:8`
- The entire aesthetic depends on `Press Start 2P` from Google Fonts. Offline or behind a restrictive firewall, the font falls back to `monospace` and the layout may break (font metrics differ significantly). The CSS fallback is `font-family: 'Press Start 2P', monospace` which is correct but the visual result will be quite different.
- **Severity: low** (for a training tool, not a critical path)
- **Fix:** Self-host the font if offline use is a requirement.

---

## 6. Testing Gaps

---

**Finding T-1: No tests exist anywhere**
- The grading functions (`isCloseEnough`, `isCloseEnough2dp`, `isWithinRange`, `parseUserNumber`, `formatMoney`, `formatElapsed`) are pure functions with zero dependencies — they are trivially testable with a plain JS test runner or even a `<script>` test harness in a separate HTML file. These functions are the correctness backbone of the app and any regression here silently grades players wrong.
- **Highest-priority gap:** `parseUserNumber` — it handles `$`, `,`, `K`, `M`, `B` suffixes, mixed input, empty strings, and NaN. Cover at minimum: `"$1.5M"`, `"500K"`, `"1,000"`, `""`, `"abc"`, `"0"`, `"1.2B"`.

---

**Finding T-2: `isCloseEnough` tolerance boundary behaviour is untested**
- File: `utils/scoring.js:54–59`
- The function uses `diff <= tolerancePct / 100` (inclusive). An answer exactly at the boundary (e.g. exactly 5% off) passes. This is the right call for a game, but it should be explicitly tested so no future refactor accidentally changes it to `<`.

---

**Finding T-3: Curated scenario math is not verified programmatically**
- Files: `exercises/ex06:16–27`, `utils/random.js:52–59`
- The ex06 scenarios claim to produce round break-even numbers. The TAM categories have hardcoded `answer` fields that must equal `customers × spend`. These are correct as written, but they were authored by hand and are not verified anywhere. A quick sanity-check loop in a test file would catch any future edits that introduce drift.

---

**Finding T-4: No reproducibility — `Math.random()` is not seeded**
- All random generation uses `Math.random()`. There is no way to replay a specific session for debugging. If a player reports an unexpected grading result, it cannot be reproduced.
- **Severity: low** (this is a drill tool, not a high-stakes exam)
- **Fix if needed:** A seeded PRNG (a 4-line LCG) passed through `window.BitPitch.random` would allow session seeds to be displayed and logged.

---

## Summary Table

| ID | File(s) | Severity | Description |
|----|---------|----------|-------------|
| C-1 | ex04 | medium | Difficulty setting has no effect on grading |
| C-2 | ex08:146 | medium | Q3 scored in UI but not counted in session |
| C-3 | ex07:172 | medium | Self-grade buttons allow double-submission |
| C-4 | app.js:59,103 | low | `replace('\n', '<br>')` misses 2nd newline |
| C-5 | ex02,03,05,06,07 | low | `context.timerEl` not reset on NEXT |
| R-1 | all exercises | low | Timer interval copy-pasted 8× |
| R-2 | index.html+style.css | low | Google Font loaded twice |
| R-3 | ex03, ex05 | low | Fisher-Yates shuffle duplicated |
| R-4 | ex06, ex07 | low | Non-repeat index pattern duplicated |
| R-5 | all exercises | low | PASS handler duplicated 8× |
| E-1 | all showFeedback | low | `document.onkeydown` not cleaned on nav |
| E-2 | all exercises | low | Intervals not cleared on navigation |
| E-3 | random.js:86 | low | `parseUserNumber` accepts scientific notation |
| S-1 | all showFeedback | low→medium | Raw user input in innerHTML (XSS) |
| S-2 | index.html:24–74 | low | Globals referenced by name in inline onclick |
| W-1 | index.html | low | No favicon (404 on every load) |
| W-2 | index.html | low | No meta description / OG tags |
| W-4 | index.html | low | CDN font breaks offline |
| T-1 | utils/ | gap | No tests for pure grading functions |
| T-2 | scoring.js | gap | Tolerance boundary behaviour untested |
| T-3 | ex06, random.js | gap | Curated scenario math not verified |
| T-4 | random.js | gap | No seeded RNG; sessions unreproducible |

**The three findings worth addressing before web deployment:** C-1 (difficulty broken in ex04), C-2 (Q3 scoring inconsistency in ex08), and S-1 (user input in innerHTML). The rest are cleanup and long-term maintenance concerns.
