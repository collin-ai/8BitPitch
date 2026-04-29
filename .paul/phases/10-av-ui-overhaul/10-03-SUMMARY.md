---
phase: 10-av-ui-overhaul
plan: 03
status: complete
date: 2026-04-25
---

# 10-03 Summary — Mode Bar Redesign + News Screen

## What Was Done

Replaced the 4-tab mode bar with a 3-tab mode bar. Added three new screen shells.

**New mode bar tabs:**
| Tab | ID | Mode value | Navigates to |
|-----|----|------------|-------------|
| MODE SELECT | tab-mode-select | mode-select | #screen-mode-select (12-01 fills content) |
| PROFILE & SETTINGS | tab-profile | profile | #screen-profile (12-03 fills content) |
| 8BITPITCH NEWS | tab-news | news | #screen-news |

**Sub-label:** `<span id="tab-mode-sublabel" class="mode-tab-sub">DRILL</span>` inside MODE SELECT tab — updated by renderHome() to show active play mode (DRILL or PRACTICE).

**syncModeTabs() logic:** drill/practice/mode-select all highlight tab-mode-select; profile highlights tab-profile; news highlights tab-news.

**DIFFICULTY EXPLAINED screen:** No longer on the mode bar. Kept in HTML; still accessible via `AppState.showDifficultyExplained()`. Will be linked from Profile & Settings screen in Phase 12-03.

## Files Modified

| File | Change |
|------|--------|
| `index.html` | Mode bar replaced (4→3 tabs); 3 new screen shells added |
| `app.js` | syncModeTabs() updated; setMode() updated; new nav handlers added; renderHome() updates sub-label |
| `style.css` | Added .mode-tab-sub rule |

## IDs for 12-01

12-01 expects these to exist (all confirmed present):
- `#screen-mode-select` ✓
- `id="tab-mode-sublabel"` ✓
- `AppState.setMode('mode-select')` ✓
- `AppState.showNews()` ✓
