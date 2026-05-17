# Benchmark Page Redesign — Design Spec

**Date:** 2026-05-17
**Target file:** `docs/benchmark.html` (replaces existing)
**Scope:** Visual redesign + four content additions. Existing benchmark logic (test definitions, timing, Chart.js) is preserved and rewired into the new presentation layer.

## Goal

Replace the current generic dark-dashboard benchmark page with a distinctive, restrained **scientific-instrument** aesthetic that reads as a single scrolling document — and turn it from a passive demo into something the user can interact with via a live size-slider instrument.

## Aesthetic System

- **Surface:** cream paper `#f4ede0`, very faint 8px engineering grid overlay, subtle static grain texture
- **Ink palette:**
  - Ink black `#1a1a17` — text, rules, axes
  - Oxidized red `#a4382a` — Ubique data
  - Muted indigo `#2a3f6b` — math.js data
  - Faded sepia `#a89274` — secondary rules, margin gutter
- **Typography:**
  - Fraunces (display serif) — page title, section headers, speedup numbers
  - IBM Plex Serif — body prose
  - IBM Plex Mono — all numbers, code, tables, axis labels
  - No system sans, no Inter, no emoji
- **Texture details:** "Fig. N" figure numbering as wayfinding, small-caps section labels, sepia em-dash rules between sections, statistical footnotes (`n=24  σ=0.04ms`) tucked under each chart
- **No:** report numbers, classifications, mock institutional headers, fake p-values, formal § section sigils, bouncy springs, glassmorphism

## Document Structure

A single scrolling page laid out as:

```
Title block
  "Ubique // Benchmark"  (Fraunces)
  "Matrix operations vs math.js · <date>"  (Plex Serif, small)

Environment    auto-detected hardware/runtime panel
Tests          per-test figures with live oscilloscope + scatter + speedup
Explore        interactive operation+size instrument
Source         per-test code preview (collapsible)
Summary        aggregated bar chart + summary stats + replay button
```

Sections separated by sepia rules. Section labels in small-caps Plex Mono.

## Section-by-Section

### Title block
- Fraunces title at ~64px, ink black
- One-line subtitle in Plex Serif: operation + date
- A small text "Begin" link in the header starts the test sequence (no pill button, no hero CTA)

### Environment
Two-column table, row labels in small-caps. Detected values:
- CPU logical cores — `navigator.hardwareConcurrency`
- Device memory (GB) — `navigator.deviceMemory` (fallback "unknown")
- Platform / User agent — `navigator.userAgent` (truncated, full on hover)
- WASM SIMD support — probe via short WASM module
- Timer resolution — `performance.now()` granularity probe

Treated as the experiment's instruments and conditions; reinforces credibility without LARP-y framing.

### Tests
The core. Each of the 9 existing tests renders as a numbered Figure ("Fig. 1", "Fig. 2", …) with an asymmetric four-part layout:

- **Top-left:** matrix specimens rendered as faint blueprint dot-grids (replacing the current rainbow heatmap, which is too aggressive for the aesthetic). For small matrices (≤10×10) keep numeric cells but in Plex Mono on cream with sepia hairlines. For larger, use density dots in ink.
- **Right:** live SVG oscilloscope trace of ops/second during the run. Two channels — red (Ubique), indigo (math.js). Plex Mono axis labels, sepia gridlines, measurement ticks. Draws point-by-point as iterations complete.
- **Bottom-left:** per-iteration scatter cloud (small dots) with horizontal mean line and ±σ shaded band, ink-style.
- **Bottom-right:** speedup printed huge in Fraunces (e.g. `39.5×`), footnoted with `n=24  σ=0.04ms  95% CI [1.18, 1.24]`.

Tests run sequentially, scrolling auto-snaps to the active figure.

### Explore (interactive instrument)
The "instrument they play with":
- Operation dropdown: transpose, add, mtimes, inv, det
- Log-scale slider: matrix size 2 → 500
- As the user drags, two horizontal bars (Ubique vs math.js) and a small live trace retune. Use debounced commit (~150ms) on slider release to actually run; show interpolated/cached estimates during the drag for responsiveness.
- Result line beneath: `<op>(N=128)  Ubique 1.21ms  ·  math.js 47.8ms  ·  39.5× faster`

### Source
Collapsible block per test, off by default. Shows the call signature for both libraries side-by-side in Plex Mono with a sepia line-number gutter:
```
rubique.mtimes(A, B)   |   mathjs.multiply(A, B)
```
Plus a 3-line excerpt of the actual function call from the benchmark.

### Summary
- Aggregated vertical bar chart via Chart.js, restyled: thin red strokes on cream, ink error bars (±σ), Plex Mono labels, no fills, no gradients
- Three summary stats:
  - Mean speedup (Fraunces, large)
  - Tests won / total
  - Best result (test name + factor)
- Methodology footnote (single small paragraph, Plex Serif italic): browser timing precision, single-thread JS, hardware variance disclaimer
- "↻ Repeat experiment" link/button styled as a typewriter character, not a pill button

## Statistical Rigor

For every measured test:
- Discard first `warmupIterations` runs (default: 3, configurable per test)
- Measure next `iterations` runs with `performance.now()` per call
- Report mean μ, standard deviation σ, 95% CI (`μ ± 1.96·σ/√n`)
- Show n, σ in the figure footnote
- All four show up in tooltips on the summary chart

This replaces the current code's simple average-only timing.

## Motion

- **Page load:** title fades in (300ms), figures lazy-fade-up as they enter viewport with 80ms stagger
- **During a test:** oscilloscope trace draws point-by-point in real time; speedup number "stamps" in (scale 0.85→1 + slight opacity ramp, 250ms, ink-spread feel)
- **Explore slider:** bars retune with `cubic-bezier(.2,.7,.1,1)` 400ms easing
- **Hover on a figure number:** faint sepia underline grows under "Fig. N"
- **Background grain:** very slow (~30s loop) background-position drift, subliminal
- No bouncy springs, no parallax, no scroll-jacking beyond the auto-snap to active test

## Implementation

- Single self-contained `docs/benchmark.html` replacing the current file
- Keep current ESM imports of mathjs and rubique
- Keep Chart.js (restyled)
- Add Google Fonts links: Fraunces, IBM Plex Serif, IBM Plex Mono
- Use **SVG** (not Canvas) for the oscilloscope and scatter clouds — sharper, easier to style as ink, animatable via CSS
- Keep Canvas for matrix specimens (existing logic, restyled palette)
- All state and logic in vanilla JS; no framework, no build step
- CSS custom properties for the full palette and type scale

## Out of scope

- Run history / localStorage persistence
- Share-as-image / permalink export
- Comparison with a 3rd library (numeric.js)
- Mobile redesign — make it readable on mobile but the asymmetric figure layout is desktop-first

## Acceptance

- Page loads with no console errors in latest Chrome
- All 9 existing tests run to completion sequentially
- Explore section responds to slider changes within ~200ms perceived latency
- Environment panel populates correctly on Chrome, Firefox, Safari (or shows graceful "unknown")
- Visually matches the aesthetic system above on a 1440px-wide cream canvas
- No emoji, no Inter, no purple gradients, no rounded pill cards anywhere
