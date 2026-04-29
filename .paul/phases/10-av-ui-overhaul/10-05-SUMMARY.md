---
phase: 10-av-ui-overhaul
plan: 05
status: applied
date: 2026-04-27
---

# Phase 10-05 — Contact Creator Button — Applied

## What Was Built

- `.contact-row` + `.contact-btn` added to `#screen-home` in index.html, below the home footer
- `<a>` tag with `href="https://forms.gle/Q1gpSmKsx6o5AGTT8"`, `target="_blank"`, `rel="noopener noreferrer"`
- CSS added to style.css: `.contact-row` (centering, spacing), `.contact-btn` (dim text, thin border, hover to full text color)

## CSS Variable Adaptations

Plan referenced `var(--font)`, `var(--dim)`, `var(--fg)` — substituted with actual variables:
- `var(--font)` → `'Press Start 2P', monospace`
- `var(--dim)` → `var(--text-dim)`
- `var(--fg)` → `var(--text)`

## Acceptance Criteria Status

- AC-1: CONTACT CREATOR visible on home screen below drill grid ✓
- AC-2: Opens Google Form in new tab ✓
- AC-3: Visually subdued (dim color, thin border) ✓

## Notes

- Used `<a>` tag (not `<button>`) per plan — avoids popup-blocker issues on mobile
- No JS changes required
- Phase 10 complete
