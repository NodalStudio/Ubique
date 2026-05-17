# Benchmark Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace `docs/benchmark.html` with a scientific-instrument-aesthetic single page that adds an interactive size slider, live ops/sec oscilloscope, statistical rigor (n/σ/CI), and a hardware+code preview panel.

**Architecture:** Single self-contained static HTML file. Vanilla JS, no framework, no build step. Reuses existing ESM imports of `mathjs` and `rubique` and Chart.js. New SVG components for oscilloscope and scatter clouds; existing Canvas matrix rendering restyled. Reuses the existing 9 test definitions but rewires the presentation layer end-to-end.

**Tech Stack:** HTML5, CSS3 (custom properties, grid, SVG), vanilla ES modules, Chart.js 4.4 (restyled), Google Fonts (Fraunces, IBM Plex Serif, IBM Plex Mono).

**Source spec:** `docs/superpowers/specs/2026-05-17-benchmark-redesign-design.md`

**XSS / DOM safety:** All dynamic values inserted into the DOM (test names, library output strings, source code excerpts) originate from controlled developer code in this file — not from user input or a network response. Even so, prefer `textContent` + `createElement` for any interpolated value; reserve `.innerHTML = template` for fully static template strings with no interpolated data. The `formatSource` helper in Task 7 must run user-reachable strings through `escapeHtml` before insertion.

**Verification approach:** This is a pure frontend page with no unit-test harness. Each task's "test" is loading `docs/benchmark.html` via `file://` in Chrome (using `mcp__claude-in-chrome` tools) and visually verifying the change. Capture a screenshot of the relevant section and confirm the acceptance criterion listed in the task.

---

## File Structure

This redesign touches a single file. Keep it self-contained per the spec.

- **Modify:** `docs/benchmark.html` — full rewrite of `<style>`, `<body>`, and the inline `<script>` presentation layer. Preserves the ESM import block and the 9 test definitions (their `setup`, `rubique`, `mathjs` functions) verbatim.

If `<style>` grows beyond ~600 lines during implementation, split into `docs/benchmark.css` as a sibling file and link it. Otherwise keep inline. No other files are created.

---

## Task 1: Scaffold the new design system

**Files:**
- Modify: `docs/benchmark.html` — replace `<style>` block and `<body>` with a minimal scaffold; keep the two `<script>` blocks at the bottom unchanged for now.

- [ ] **Step 1: Note what must survive the rewrite**

Before editing, open `docs/benchmark.html` and confirm the following identifiers live in the second `<script>` tag (the non-module one) and must NOT be deleted: the `tests` array, `generateMatrix`, `generateArray`, `generateInvertibleMatrix`, `getFunctionArgs`, `nextFrame`, `sleep`. Everything else in that script is presentation logic and will be rewritten in later tasks.

- [ ] **Step 2: Replace the `<style>` block with the new design system**

Replace everything between `<style>` and `</style>` (the first one, roughly lines 7-559) with the system below. Leave the second `<style>` (which hides `#topnav`) intact.

```html
<style>
  :root {
    --paper:        #f4ede0;
    --paper-soft:   #ece3d0;
    --ink:          #1a1a17;
    --ink-soft:     #4a4640;
    --sepia:        #a89274;
    --sepia-soft:   #d8c9ad;
    --ubique:       #a4382a;
    --mathjs:       #2a3f6b;
    --rule:         rgba(26, 26, 23, 0.18);
    --grid:         rgba(26, 26, 23, 0.05);

    --font-display: "Fraunces", Georgia, serif;
    --font-serif:   "IBM Plex Serif", Georgia, serif;
    --font-mono:    "IBM Plex Mono", ui-monospace, monospace;

    --max-w: 1180px;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { background: var(--paper); color: var(--ink); }
  body {
    font-family: var(--font-serif);
    font-size: 16px;
    line-height: 1.55;
    min-height: 100vh;
    background-image:
      linear-gradient(var(--grid) 1px, transparent 1px),
      linear-gradient(90deg, var(--grid) 1px, transparent 1px);
    background-size: 8px 8px, 8px 8px;
    animation: paperDrift 30s linear infinite;
  }
  @keyframes paperDrift {
    from { background-position: 0 0, 0 0; }
    to   { background-position: 8px 8px, 8px 8px; }
  }
  .container {
    max-width: var(--max-w);
    margin: 0 auto;
    padding: 4rem 2rem 6rem;
  }
  .section-label {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--ink-soft);
    margin: 4rem 0 1.25rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--rule);
  }
  .rule-em {
    text-align: center;
    color: var(--sepia);
    margin: 3rem 0;
    letter-spacing: 0.5em;
  }
</style>
```

- [ ] **Step 3: Replace `<body>` markup with a minimal scaffold**

Replace the entire `<body>...</body>` block (keep the two `<script>` tags at the bottom) with:

```html
<body>
  <div class="container">
    <header id="page-header"></header>
    <section id="environment"></section>
    <div class="rule-em">— · —</div>
    <section id="tests">
      <div class="section-label">Tests</div>
      <div id="tests-list"></div>
    </section>
    <div class="rule-em">— · —</div>
    <section id="explore"></section>
    <div class="rule-em">— · —</div>
    <section id="source"></section>
    <div class="rule-em">— · —</div>
    <section id="summary"></section>
  </div>
  <!-- existing <script type="module"> ESM imports -->
  <!-- existing <script> with helpers and tests array -->
</body>
```

- [ ] **Step 4: Add Google Fonts link inside `<head>`**

Insert immediately before the first `<style>` tag:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,700&family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Serif:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet">
```

- [ ] **Step 5: Wrap the existing non-module `<script>` body in a guard so it tolerates missing IDs**

Wrap the whole script body so old code that references removed IDs doesn't throw during the scaffold:

```js
(function () {
  if (!document.getElementById('tests-list')) return;
  // ... existing code stays here unchanged ...
})();
```

Also delete the line `window.startBenchmark = startBenchmark;` if it would error (no button references it anymore).

- [ ] **Step 6: Visually verify in Chrome**

Use `mcp__claude-in-chrome__navigate` to `file:///C:/Users/mayer/Documents/Ubique/docs/benchmark.html`, then `mcp__claude-in-chrome__read_console_messages`. Confirm:
- Cream paper background with subtle grid
- Five empty sections separated by sepia em-dash rules
- No console errors
- Section labels render in IBM Plex Mono small caps

- [ ] **Step 7: Commit**

```bash
git add docs/benchmark.html
git commit -m "🎨 Scaffold scientific-instrument design system for benchmark"
```

---

## Task 2: Header + Environment panel

**Files:**
- Modify: `docs/benchmark.html` — add header markup and CSS; implement environment detection.

- [ ] **Step 1: Append header + environment CSS to the `<style>` block**

```css
#page-header { margin-bottom: 3rem; }
#page-header h1 {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: clamp(2.5rem, 6vw, 4rem);
  letter-spacing: -0.02em;
  line-height: 1;
  font-variation-settings: "opsz" 144;
}
#page-header .subtitle {
  font-family: var(--font-serif);
  font-size: 1.05rem;
  color: var(--ink-soft);
  margin-top: 0.75rem;
}
#page-header .begin {
  display: inline-block;
  margin-top: 1.5rem;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--ubique);
  text-decoration: none;
  border-bottom: 1px solid var(--ubique);
  padding-bottom: 2px;
  cursor: pointer;
}
#page-header .begin:hover { color: var(--ink); border-bottom-color: var(--ink); }
#page-header .begin[disabled] { opacity: 0.4; cursor: default; pointer-events: none; }

#environment table {
  width: 100%;
  max-width: 640px;
  border-collapse: collapse;
  font-family: var(--font-mono);
  font-size: 0.88rem;
}
#environment th, #environment td {
  text-align: left;
  padding: 0.4rem 0.75rem 0.4rem 0;
  border-bottom: 1px dotted var(--rule);
  vertical-align: top;
}
#environment th {
  width: 12rem;
  font-weight: 400;
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink-soft);
}
#environment td { color: var(--ink); word-break: break-word; }
```

- [ ] **Step 2: Fill the header and environment markup**

Replace the empty `<header id="page-header"></header>` with:

```html
<header id="page-header">
  <h1>Ubique <span style="color:var(--sepia);">//</span> Benchmark</h1>
  <p class="subtitle">Matrix operations vs <em>math.js</em> · <span id="header-date"></span></p>
  <a class="begin" id="begin-link" href="#tests">Begin →</a>
</header>
```

Replace the empty `<section id="environment"></section>` with:

```html
<section id="environment">
  <div class="section-label">Environment</div>
  <table>
    <tbody id="env-rows"></tbody>
  </table>
</section>
```

- [ ] **Step 3: Implement environment detection — build rows via DOM methods (no innerHTML interpolation)**

Add at the top of the non-module `<script>` body (inside the IIFE guard, before the existing helpers):

```js
const headerDate = document.getElementById('header-date');
if (headerDate) headerDate.textContent = new Date().toISOString().slice(0, 10);

async function detectEnvironment() {
  const rows = [];
  rows.push(['CPU logical cores', String(navigator.hardwareConcurrency ?? 'unknown')]);
  rows.push(['Device memory (GB)', String(navigator.deviceMemory ?? 'unknown')]);
  rows.push(['Platform', navigator.platform || 'unknown']);
  rows.push(['User agent', navigator.userAgent]);

  let simd = 'no';
  try {
    const bytes = new Uint8Array([
      0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,
      10,10,1,8,0,65,0,253,15,253,98,11
    ]);
    if (await WebAssembly.validate(bytes)) simd = 'yes';
  } catch (_) {}
  rows.push(['WASM SIMD', simd]);

  let minDelta = Infinity;
  let last = performance.now();
  for (let i = 0; i < 1000; i++) {
    const now = performance.now();
    const d = now - last;
    if (d > 0 && d < minDelta) minDelta = d;
    last = now;
  }
  rows.push(['Timer resolution',
    minDelta === Infinity ? 'unknown' : `${minDelta.toFixed(3)} ms`]);

  const tbody = document.getElementById('env-rows');
  for (const [k, v] of rows) {
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    th.textContent = k;
    const td = document.createElement('td');
    td.textContent = v;
    tr.appendChild(th);
    tr.appendChild(td);
    tbody.appendChild(tr);
  }
}
detectEnvironment();
```

- [ ] **Step 4: Visually verify**

Reload. Confirm header, subtitle with today's date, "Begin →" link, and a six-row environment table populated. Console clean.

- [ ] **Step 5: Commit**

```bash
git add docs/benchmark.html
git commit -m "✨ Add header and environment panel to benchmark"
```

---

## Task 3: Tests section — figure shell + restyled matrix specimens

**Files:**
- Modify: `docs/benchmark.html` — add figure CSS; rewrite matrix Canvas rendering; build per-test figure DOM via `createElement` + `textContent`.

- [ ] **Step 1: Add figure CSS**

```css
.figure {
  display: grid;
  grid-template-columns: minmax(260px, 1fr) minmax(360px, 1.4fr);
  grid-template-rows: auto auto auto;
  gap: 1.25rem 2rem;
  padding: 1.5rem 0 2.5rem;
  border-bottom: 1px solid var(--rule);
}
.figure:last-child { border-bottom: none; }
.figure .fig-head { grid-column: 1 / -1; display: flex; align-items: baseline; gap: 1rem; }
.figure .fig-num {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--sepia);
  position: relative;
}
.figure .fig-num::after {
  content: ""; position: absolute; left: 0; right: 0; bottom: -3px;
  height: 1px; background: var(--sepia);
  transform: scaleX(0); transform-origin: left; transition: transform 240ms ease;
}
.figure:hover .fig-num::after { transform: scaleX(1); }
.figure .fig-title {
  font-family: var(--font-display);
  font-weight: 500; font-size: 1.5rem; letter-spacing: -0.01em;
}
.figure .fig-specimens {
  grid-column: 1; grid-row: 2;
  display: flex; gap: 1.25rem; align-items: center; flex-wrap: wrap;
}
.figure .fig-trace    { grid-column: 2; grid-row: 2; min-height: 180px; }
.figure .fig-scatter  { grid-column: 1; grid-row: 3; min-height: 120px; }
.figure .fig-speedup  { grid-column: 2; grid-row: 3; text-align: right; }

.fig-speedup .speedup-value {
  font-family: var(--font-display); font-weight: 500;
  font-size: clamp(3rem, 7vw, 5rem); line-height: 1;
  color: var(--ink); font-variation-settings: "opsz" 144;
}
.fig-speedup .speedup-label {
  font-family: var(--font-mono); font-size: 0.78rem;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--ink-soft); margin-top: 0.5rem;
}
.fig-speedup .speedup-stats {
  font-family: var(--font-mono); font-size: 0.72rem;
  color: var(--ink-soft); margin-top: 0.4rem;
}

.specimen { display: flex; flex-direction: column; align-items: center; gap: 0.35rem; }
.specimen-label {
  font-family: var(--font-mono); font-size: 0.7rem;
  letter-spacing: 0.15em; text-transform: uppercase; color: var(--ink-soft);
}
.specimen canvas { background: var(--paper-soft); border: 1px solid var(--rule); }
.specimen .specimen-dim { font-family: var(--font-mono); font-size: 0.7rem; color: var(--sepia); }
.specimen-op { font-family: var(--font-display); font-size: 1.4rem; color: var(--sepia); }

@keyframes stamp {
  0%   { transform: scale(0.85); opacity: 0; }
  60%  { transform: scale(1.04); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
.fig-speedup.stamped .speedup-value {
  animation: stamp 280ms cubic-bezier(.2,.7,.1,1) both;
}
```

- [ ] **Step 2: Replace the matrix-drawing helpers**

Find and remove the existing `drawMatrix`, `drawNumberMatrix`, `drawHeatmap`, `drawCornerPreview`, `getValueColor`, `getHeatmapColor` in the non-module `<script>`. Replace with:

```js
const INK = '#1a1a17';
const PAPER_SOFT = '#ece3d0';

function drawMatrix(canvas, matrix) {
  const rows = matrix.length;
  const cols = matrix[0]?.length || 1;
  if (rows <= 10 && cols <= 10) drawNumberMatrix(canvas, matrix);
  else drawBlueprintDots(canvas, matrix);
}

function drawNumberMatrix(canvas, matrix) {
  const rows = matrix.length, cols = matrix[0].length, cell = 26;
  canvas.width = cols * cell;
  canvas.height = rows * cell;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = PAPER_SOFT;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = 'rgba(168, 146, 116, 0.4)';
  ctx.lineWidth = 1;
  ctx.font = '11px "IBM Plex Mono", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = INK;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const x = j * cell, y = i * cell;
      ctx.strokeRect(x + 0.5, y + 0.5, cell, cell);
      ctx.fillText(matrix[i][j].toFixed(1), x + cell / 2, y + cell / 2);
    }
  }
}

function drawBlueprintDots(canvas, matrix) {
  const rows = matrix.length, cols = matrix[0].length, D = 140;
  canvas.width = D; canvas.height = D;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = PAPER_SOFT;
  ctx.fillRect(0, 0, D, D);

  let min = Infinity, max = -Infinity;
  for (const row of matrix) for (const v of row) {
    if (v < min) min = v;
    if (v > max) max = v;
  }
  const range = max - min || 1;
  const cw = D / cols, ch = D / rows;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const norm = (matrix[i][j] - min) / range;
      const r = Math.max(0.6, Math.min(cw, ch) * 0.45 * (0.3 + 0.7 * norm));
      ctx.fillStyle = `rgba(26, 26, 23, ${0.15 + 0.7 * norm})`;
      ctx.beginPath();
      ctx.arc(j * cw + cw / 2, i * ch + ch / 2, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
```

- [ ] **Step 3: Build figures via `createElement` (no untrusted innerHTML interpolation)**

Helper to make a labeled element:

```js
function el(tag, opts = {}, children = []) {
  const node = document.createElement(tag);
  if (opts.class) node.className = opts.class;
  if (opts.id)    node.id = opts.id;
  if (opts.text)  node.textContent = opts.text;
  if (opts.data)  for (const k in opts.data) node.dataset[k] = opts.data[k];
  for (const c of children) node.appendChild(c);
  return node;
}

function buildFigure(test, index) {
  const head = el('div', { class: 'fig-head' }, [
    el('span', { class: 'fig-num', text: `Fig. ${index}` }),
    el('h3',   { class: 'fig-title', text: test.name }),
  ]);
  const specimens = el('div', { class: 'fig-specimens', data: { role: 'specimens' } });
  const trace     = el('div', { class: 'fig-trace',     data: { role: 'trace' } });
  const scatter   = el('div', { class: 'fig-scatter',   data: { role: 'scatter' } });

  const speedupVal   = el('div', { class: 'speedup-value', text: '—' });
  const speedupLabel = el('div', { class: 'speedup-label', text: 'awaiting run' });
  const speedupStats = el('div', { class: 'speedup-stats', text: '' });
  const speedup = el('div', { class: 'fig-speedup', data: { role: 'speedup' } },
    [speedupVal, speedupLabel, speedupStats]);

  return el('article', { class: 'figure', id: `fig-${index}` },
    [head, specimens, trace, scatter, speedup]);
}

function renderSpecimens(figure, data) {
  const host = figure.querySelector('[data-role="specimens"]');
  host.replaceChildren();

  function specimen(label, matrix) {
    const canvas = document.createElement('canvas');
    const node = el('div', { class: 'specimen' }, [
      el('div', { class: 'specimen-label', text: label }),
      canvas,
      el('div', { class: 'specimen-dim', text: `${matrix.length}×${matrix[0].length}` }),
    ]);
    drawMatrix(canvas, matrix);
    return node;
  }

  if (data.matrixA) host.appendChild(specimen('Matrix A', data.matrixA));
  if (data.matrixB) {
    host.appendChild(el('div', { class: 'specimen-op', text: '×' }));
    host.appendChild(specimen('Matrix B', data.matrixB));
  }
}
```

- [ ] **Step 4: Render figures on load**

At the bottom of the IIFE body:

```js
const testsList = document.getElementById('tests-list');
tests.forEach((test, i) => {
  const fig = buildFigure(test, i + 1);
  testsList.appendChild(fig);
  try {
    renderSpecimens(fig, test.setup());
  } catch (_) { /* libraries may not be loaded yet for some tests */ }
});
```

- [ ] **Step 5: Visually verify**

Reload. 9 figures appear with sepia Fig. N labels, serif titles, blueprint or number specimens, em-dash placeholder speedup. Hover grows the sepia underline. Console clean.

- [ ] **Step 6: Commit**

```bash
git add docs/benchmark.html
git commit -m "🎨 Render per-test figure shells with blueprint specimens"
```

---

## Task 4: Oscilloscope trace + benchmark loop with statistical rigor

**Files:**
- Modify: `docs/benchmark.html` — add SVG trace component; rewrite the benchmark function to record per-iteration timings; orchestrate sequential runs.

- [ ] **Step 1: Add trace CSS**

```css
.trace-svg {
  width: 100%; height: 180px; display: block;
  background: var(--paper-soft); border: 1px solid var(--rule);
}
.trace-svg .axis-label {
  font-family: var(--font-mono); font-size: 9px;
  fill: var(--ink-soft); letter-spacing: 0.08em;
}
.trace-svg .gridline { stroke: var(--rule); stroke-width: 0.5; }
.trace-svg .channel-ubique { fill: none; stroke: var(--ubique); stroke-width: 1.4; }
.trace-svg .channel-mathjs { fill: none; stroke: var(--mathjs); stroke-width: 1.4; }

.trace-legend {
  display: flex; gap: 1.25rem;
  font-family: var(--font-mono); font-size: 0.72rem; color: var(--ink-soft);
  margin-top: 0.4rem;
}
.trace-legend span::before { content: "■ "; margin-right: 0.25rem; }
.trace-legend .leg-ubique::before { color: var(--ubique); }
.trace-legend .leg-mathjs::before { color: var(--mathjs); }
```

- [ ] **Step 2: Implement the trace renderer using SVG DOM construction**

Add (above `buildFigure`):

```js
const SVG_NS = 'http://www.w3.org/2000/svg';

function svgEl(tag, attrs = {}) {
  const node = document.createElementNS(SVG_NS, tag);
  for (const k in attrs) node.setAttribute(k, attrs[k]);
  return node;
}

function createTrace(host) {
  host.replaceChildren();

  const svg = svgEl('svg', {
    class: 'trace-svg',
    viewBox: '0 0 600 180',
    preserveAspectRatio: 'none',
  });
  const gridG = svgEl('g', { class: 'grid' });
  for (let i = 1; i < 5; i++) {
    const y = (180 / 5) * i;
    gridG.appendChild(svgEl('line',
      { x1: 0, x2: 600, y1: y, y2: y, class: 'gridline' }));
  }
  svg.appendChild(gridG);

  const pathU = svgEl('path', { class: 'channel-ubique', d: '' });
  const pathM = svgEl('path', { class: 'channel-mathjs', d: '' });
  svg.appendChild(pathU);
  svg.appendChild(pathM);

  const opsLabel = svgEl('text', { class: 'axis-label', x: 4, y: 14 });
  opsLabel.textContent = 'ops/s';
  svg.appendChild(opsLabel);

  const iterLabel = svgEl('text', { class: 'axis-label', x: 596, y: 174, 'text-anchor': 'end' });
  iterLabel.textContent = 'iteration →';
  svg.appendChild(iterLabel);

  host.appendChild(svg);

  const legend = el('div', { class: 'trace-legend' }, [
    el('span', { class: 'leg-ubique', text: 'Ubique' }),
    el('span', { class: 'leg-mathjs', text: 'math.js' }),
  ]);
  host.appendChild(legend);

  const channels = { ubique: { points: [], path: pathU }, mathjs: { points: [], path: pathM } };
  let maxOps = 1;

  function redraw() {
    const W = 600, H = 180, pad = 6;
    for (const lib of ['ubique', 'mathjs']) {
      const pts = channels[lib].points;
      if (pts.length === 0) { channels[lib].path.setAttribute('d', ''); continue; }
      const n = pts.length;
      const d = pts.map((ops, i) => {
        const x = (n === 1) ? W / 2 : (i / (n - 1)) * W;
        const y = H - pad - (ops / maxOps) * (H - pad * 2);
        return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
      }).join(' ');
      channels[lib].path.setAttribute('d', d);
    }
  }

  return {
    addPoint(lib, ops) {
      channels[lib].points.push(ops);
      if (ops > maxOps) maxOps = ops;
      redraw();
    },
    reset() {
      channels.ubique.points = [];
      channels.mathjs.points = [];
      maxOps = 1;
      redraw();
    },
  };
}
```

- [ ] **Step 3: Replace the benchmark timing primitives**

Remove the old `benchmarkFunction` and old `calculateIterations`. Add:

```js
async function runTimedIterations(fn, data, totalIter, warmup, onIterTime) {
  const args = getFunctionArgs(data);
  for (let i = 0; i < warmup; i++) fn(...args);

  const times = [];
  for (let i = 0; i < totalIter; i++) {
    const start = performance.now();
    fn(...args);
    const dt = performance.now() - start;
    times.push(dt);
    if (onIterTime) onIterTime(i, dt);
    if (totalIter > 8 && (i + 1) % Math.max(1, Math.floor(totalIter / 20)) === 0) {
      await nextFrame();
    }
  }
  return times;
}

function summarizeTimes(times) {
  const n = times.length;
  const mean = times.reduce((a, b) => a + b, 0) / n;
  const variance = times.reduce((a, t) => a + (t - mean) ** 2, 0) / Math.max(1, n - 1);
  const sigma = Math.sqrt(variance);
  const ci95 = 1.96 * sigma / Math.sqrt(n);
  return { n, mean, sigma, ci95 };
}

async function pickIterations(test) {
  const target = test.targetDuration ?? 4000;
  const minIter = test.minIterations ?? 6;
  const sample = test.sampleIterations ?? 2;
  const warmup = test.warmupIterations ?? Math.min(3, sample);

  const dU = test.setup();
  const tU = await runTimedIterations(test.rubique, dU, sample, warmup, null);
  const dM = test.setup();
  const tM = await runTimedIterations(test.mathjs, dM, sample, warmup, null);

  const slowest = Math.max(
    tU.reduce((a, b) => a + b, 0) / tU.length,
    tM.reduce((a, b) => a + b, 0) / tM.length,
  );
  let iter = Math.round(target / Math.max(slowest, 0.01));
  if (!Number.isFinite(iter) || iter < 1) iter = minIter;
  return { iterations: Math.max(iter, minIter), warmup };
}
```

- [ ] **Step 4: Orchestrate the run sequence (stubs for renderScatter, renderSummary)**

```js
const allResults = [];

function renderScatter(_fig, _ubique, _mathjs) { /* Task 5 fills this */ }
function renderSummary() { /* Task 8 fills this */ }

async function runOneTest(test, fig, _index) {
  const trace = createTrace(fig.querySelector('[data-role="trace"]'));
  trace.reset();
  fig.scrollIntoView({ behavior: 'smooth', block: 'center' });

  const data = test.setup();
  renderSpecimens(fig, data);

  const { iterations, warmup } = await pickIterations(test);

  const uTimes = await runTimedIterations(
    test.rubique, data, iterations, warmup,
    (_i, dt) => trace.addPoint('ubique', 1000 / Math.max(dt, 0.001))
  );
  const mTimes = await runTimedIterations(
    test.mathjs, data, iterations, warmup,
    (_i, dt) => trace.addPoint('mathjs', 1000 / Math.max(dt, 0.001))
  );

  const u = summarizeTimes(uTimes);
  const m = summarizeTimes(mTimes);
  const speedup = m.mean / u.mean;

  const speedupHost = fig.querySelector('[data-role="speedup"]');
  const valEl   = speedupHost.querySelector('.speedup-value');
  const labEl   = speedupHost.querySelector('.speedup-label');
  const statsEl = speedupHost.querySelector('.speedup-stats');
  if (speedup >= 1) {
    valEl.textContent = `${speedup.toFixed(1)}×`;
    labEl.textContent = 'faster';
  } else {
    valEl.textContent = `${(1 / speedup).toFixed(1)}×`;
    labEl.textContent = 'slower';
  }
  statsEl.textContent =
    `n=${u.n}  σ=${u.sigma.toFixed(2)}ms  95% CI ±${u.ci95.toFixed(2)}ms`;
  speedupHost.classList.remove('stamped');
  void speedupHost.offsetWidth;
  speedupHost.classList.add('stamped');

  renderScatter(fig, uTimes, mTimes);

  allResults.push({
    name: test.name,
    rubiqueMean: u.mean, rubiqueSigma: u.sigma,
    mathjsMean: m.mean,  mathjsSigma: m.sigma,
    speedup, n: u.n,
  });

  await sleep(400);
}

async function runAllTests() {
  const figures = [...document.querySelectorAll('.figure')];
  for (let i = 0; i < tests.length; i++) {
    await runOneTest(tests[i], figures[i], i + 1);
  }
  renderSummary();
}
```

- [ ] **Step 5: Wire the Begin link**

```js
const beginLink = document.getElementById('begin-link');
if (beginLink) {
  beginLink.addEventListener('click', (e) => {
    e.preventDefault();
    beginLink.setAttribute('disabled', '');
    const waitReady = setInterval(() => {
      if (window.rubique && window.mathjs) {
        clearInterval(waitReady);
        runAllTests();
      }
    }, 100);
  });
}
```

- [ ] **Step 6: Visually verify**

Reload, click Begin. Page auto-scrolls through each figure; two SVG traces draw live during each test (red Ubique, indigo math.js); after each test, the speedup number stamps in; the footnote shows `n=… σ=…ms 95% CI ±…ms`. No console errors.

- [ ] **Step 7: Commit**

```bash
git add docs/benchmark.html
git commit -m "✨ Wire benchmark loop with live oscilloscope and statistics"
```

---

## Task 5: Scatter cloud per figure

**Files:**
- Modify: `docs/benchmark.html` — replace `renderScatter` stub.

- [ ] **Step 1: Add scatter CSS**

```css
.scatter-svg {
  width: 100%; height: 120px; display: block;
  background: var(--paper-soft); border: 1px solid var(--rule);
}
.scatter-svg .lane-label {
  font-family: var(--font-mono); font-size: 9px;
  fill: var(--ink-soft); letter-spacing: 0.08em;
}
.scatter-svg .mean-line { stroke-width: 1.2; }
.scatter-svg .mean-ubique { stroke: var(--ubique); }
.scatter-svg .mean-mathjs { stroke: var(--mathjs); }
.scatter-svg .sigma-band  { opacity: 0.18; }
.scatter-svg .sigma-ubique { fill: var(--ubique); }
.scatter-svg .sigma-mathjs { fill: var(--mathjs); }
.scatter-svg .pt-ubique { fill: var(--ubique); }
.scatter-svg .pt-mathjs { fill: var(--mathjs); }
```

- [ ] **Step 2: Replace `renderScatter` body using SVG DOM construction**

```js
function renderScatter(fig, ubiqueTimes, mathjsTimes) {
  const host = fig.querySelector('[data-role="scatter"]');
  host.replaceChildren();

  const W = 600, H = 120, padL = 60, padR = 12, padY = 22;
  const innerW = W - padL - padR;
  const laneH = (H - padY * 2) / 2;
  const all = [...ubiqueTimes, ...mathjsTimes];
  const max = Math.max(...all);
  const xFor = (t) => padL + (t / (max || 1)) * innerW;
  const laneY = (idx) => padY + laneH / 2 + idx * laneH;

  const svg = svgEl('svg', {
    class: 'scatter-svg', viewBox: `0 0 ${W} ${H}`, preserveAspectRatio: 'none',
  });

  function lane(label, times, klass, idx) {
    const mean = times.reduce((a, b) => a + b, 0) / times.length;
    const sigma = Math.sqrt(
      times.reduce((a, t) => a + (t - mean) ** 2, 0) / Math.max(1, times.length - 1)
    );
    const y = laneY(idx);
    const xMean = xFor(mean);
    const xLo = xFor(Math.max(0, mean - sigma));
    const xHi = xFor(Math.min(max, mean + sigma));

    const labelEl = svgEl('text', {
      class: 'lane-label', x: padL - 8, y: y + 3, 'text-anchor': 'end',
    });
    labelEl.textContent = label;
    svg.appendChild(labelEl);

    svg.appendChild(svgEl('rect', {
      class: `sigma-band sigma-${klass}`,
      x: xLo, y: y - laneH * 0.4,
      width: Math.max(1, xHi - xLo), height: laneH * 0.8,
    }));

    for (const t of times) {
      const jitter = (Math.random() - 0.5) * (laneH * 0.5);
      svg.appendChild(svgEl('circle', {
        class: `pt-${klass}`, cx: xFor(t).toFixed(1),
        cy: (y + jitter).toFixed(1), r: 2,
      }));
    }

    svg.appendChild(svgEl('line', {
      class: `mean-line mean-${klass}`,
      x1: xMean, x2: xMean,
      y1: y - laneH * 0.45, y2: y + laneH * 0.45,
    }));
  }

  lane('UBIQUE',  ubiqueTimes, 'ubique', 0);
  lane('MATH.JS', mathjsTimes, 'mathjs', 1);

  const axis = svgEl('text', { class: 'lane-label', x: W - padR, y: H - 6, 'text-anchor': 'end' });
  axis.textContent = 'ms per iter →';
  svg.appendChild(axis);

  host.appendChild(svg);
}
```

- [ ] **Step 3: Visually verify**

Reload, click Begin. After each test, a scatter with two lanes appears under the specimens: dot cloud, mean line, ±σ band.

- [ ] **Step 4: Commit**

```bash
git add docs/benchmark.html
git commit -m "📊 Add per-iteration scatter clouds with mean and σ"
```

---

## Task 6: Explore section — interactive size slider

**Files:**
- Modify: `docs/benchmark.html` — fill `<section id="explore">` and wire the runner.

- [ ] **Step 1: Add explore CSS**

```css
.explore-controls {
  display: flex; gap: 2rem; align-items: flex-end; flex-wrap: wrap;
  margin-bottom: 1.5rem;
}
.explore-field {
  display: flex; flex-direction: column; gap: 0.4rem;
  font-family: var(--font-mono); font-size: 0.78rem;
  letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-soft);
}
.explore-field strong { color: var(--ink); font-weight: 500; }
.explore-field select,
.explore-field input[type="range"] {
  font-family: var(--font-mono); font-size: 0.9rem;
  background: var(--paper-soft); border: 1px solid var(--rule);
  color: var(--ink); padding: 0.4rem 0.6rem;
}
.explore-slider { flex: 1; min-width: 320px; }
.explore-slider input[type="range"] { width: 100%; accent-color: var(--ubique); padding: 0; }

.explore-bars { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1rem; }
.bar-row {
  display: grid; grid-template-columns: 80px 1fr 120px;
  align-items: center; gap: 1rem;
  font-family: var(--font-mono); font-size: 0.85rem;
}
.bar-label { font-size: 0.78rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ink-soft); }
.bar-track { height: 22px; background: var(--paper-soft); border: 1px solid var(--rule); position: relative; overflow: hidden; }
.bar-fill  { height: 100%; width: 0%; transition: width 400ms cubic-bezier(.2,.7,.1,1); }
.bar-ubique { background: var(--ubique); }
.bar-mathjs { background: var(--mathjs); }
.bar-time  { text-align: right; color: var(--ink); }

.explore-result { font-family: var(--font-mono); font-size: 0.82rem; color: var(--ink-soft); }
.explore-result strong { color: var(--ink); }
```

- [ ] **Step 2: Build the explore section via DOM construction**

Add inside the IIFE, before the explore runner code:

```js
const exploreSection = document.getElementById('explore');
exploreSection.replaceChildren(
  el('div', { class: 'section-label', text: 'Explore' })
);

const opSelect = el('select', { id: 'explore-op' });
for (const [val, lbl] of [
  ['transpose', 'transpose'], ['plus', 'add'], ['mtimes', 'multiply'],
  ['inv', 'inverse'], ['det', 'determinant'],
]) {
  const o = document.createElement('option');
  o.value = val; o.textContent = lbl;
  if (val === 'mtimes') o.selected = true;
  opSelect.appendChild(o);
}
const opField = el('label', { class: 'explore-field' }, [
  el('span', { text: 'Operation' }),
  opSelect,
]);

const sizeSpan = el('span', { text: 'Size N = ' });
const sizeStrong = el('strong', { id: 'explore-size', text: '64' });
sizeSpan.appendChild(sizeStrong);
const range = el('input', { id: 'explore-range' });
range.type = 'range'; range.min = '2'; range.max = '500'; range.step = '1'; range.value = '64';
const sliderField = el('label', { class: 'explore-field explore-slider' }, [sizeSpan, range]);

exploreSection.appendChild(el('div', { class: 'explore-controls' }, [opField, sliderField]));

function bar(libLabel, fillClass, fillId, timeId) {
  const fill = el('div', { class: `bar-fill ${fillClass}`, id: fillId });
  const track = el('div', { class: 'bar-track' }, [fill]);
  return el('div', { class: 'bar-row' }, [
    el('div', { class: 'bar-label', text: libLabel }),
    track,
    el('div', { class: 'bar-time', id: timeId, text: '—' }),
  ]);
}

exploreSection.appendChild(el('div', { class: 'explore-bars' }, [
  bar('Ubique',  'bar-ubique', 'bar-ubique',  'bar-ubique-time'),
  bar('math.js', 'bar-mathjs', 'bar-mathjs', 'bar-mathjs-time'),
]));

const resultEl = el('div', { class: 'explore-result', id: 'explore-result',
  text: 'Drag the slider to run.' });
exploreSection.appendChild(resultEl);
```

- [ ] **Step 3: Wire the explore runner**

```js
const exploreOps = {
  transpose: { args: 1, ubique: 'transpose', mathjs: 'transpose' },
  plus:      { args: 2, ubique: 'plus',      mathjs: 'add' },
  mtimes:    { args: 2, ubique: 'mtimes',    mathjs: 'multiply' },
  inv:       { args: 1, ubique: 'inv',       mathjs: 'inv', wellCond: true },
  det:       { args: 1, ubique: 'det',       mathjs: 'det' },
};

function exploreSetup(opKey, N) {
  const spec = exploreOps[opKey];
  const A = spec.wellCond ? generateInvertibleMatrix(N) : generateMatrix(N, N);
  if (spec.args === 1) return [A];
  return [A, generateMatrix(N, N)];
}

async function timeExplore(opKey, N, iter = 5) {
  if (!window.rubique || !window.mathjs) return null;
  const spec = exploreOps[opKey];
  const fnU = window.rubique[spec.ubique];
  const fnM = window.mathjs[spec.mathjs];
  const argsU = exploreSetup(opKey, N);
  const argsM = exploreSetup(opKey, N);
  fnU(...argsU); fnM(...argsM);  // warmup

  let tU = 0;
  for (let i = 0; i < iter; i++) {
    const s = performance.now(); fnU(...argsU); tU += performance.now() - s;
  }
  let tM = 0;
  for (let i = 0; i < iter; i++) {
    const s = performance.now(); fnM(...argsM); tM += performance.now() - s;
  }
  return { ubique: tU / iter, mathjs: tM / iter };
}

let exploreTimer = null;
function scheduleExplore() {
  clearTimeout(exploreTimer);
  exploreTimer = setTimeout(runExplore, 180);
}

async function runExplore() {
  const op = document.getElementById('explore-op').value;
  const N = parseInt(document.getElementById('explore-range').value, 10);
  document.getElementById('explore-size').textContent = String(N);
  const r = await timeExplore(op, N);
  if (!r) return;

  const maxT = Math.max(r.ubique, r.mathjs);
  document.getElementById('bar-ubique').style.width = `${(r.ubique / maxT) * 100}%`;
  document.getElementById('bar-mathjs').style.width = `${(r.mathjs / maxT) * 100}%`;
  document.getElementById('bar-ubique-time').textContent = `${r.ubique.toFixed(2)} ms`;
  document.getElementById('bar-mathjs-time').textContent = `${r.mathjs.toFixed(2)} ms`;

  const speedup = r.mathjs / r.ubique;
  const node = document.getElementById('explore-result');
  node.replaceChildren();
  node.append(
    `${op}(N=${N})  ·  Ubique `,
    Object.assign(document.createElement('strong'), { textContent: `${r.ubique.toFixed(2)}ms` }),
    `  ·  math.js `,
    Object.assign(document.createElement('strong'), { textContent: `${r.mathjs.toFixed(2)}ms` }),
    `  ·  `,
    Object.assign(document.createElement('strong'), {
      textContent: speedup >= 1 ? `${speedup.toFixed(1)}×` : `${(1/speedup).toFixed(1)}×`,
    }),
    speedup >= 1 ? ' faster' : ' slower',
  );
}

document.getElementById('explore-op').addEventListener('change', scheduleExplore);
document.getElementById('explore-range').addEventListener('input', scheduleExplore);
```

- [ ] **Step 4: Visually verify**

Reload. Scroll to Explore. Changing the op or dragging the slider updates bars and the result line after a brief debounce; bars retune with smooth easing.

- [ ] **Step 5: Commit**

```bash
git add docs/benchmark.html
git commit -m "🎚️ Add interactive Explore section with size slider"
```

---

## Task 7: Source section — per-test code preview

**Files:**
- Modify: `docs/benchmark.html` — render `<section id="source">` with collapsible per-test items.

- [ ] **Step 1: Add source CSS**

```css
.source-list { display: flex; flex-direction: column; gap: 0.5rem; }
.source-item {
  border: 1px solid var(--rule); background: var(--paper-soft);
  font-family: var(--font-mono); font-size: 0.82rem;
}
.source-item summary {
  cursor: pointer; padding: 0.6rem 0.9rem; list-style: none;
  display: flex; justify-content: space-between; align-items: center;
  color: var(--ink-soft); letter-spacing: 0.05em;
}
.source-item summary::-webkit-details-marker { display: none; }
.source-item summary::after { content: "+ show"; color: var(--sepia); }
.source-item[open] summary::after { content: "− hide"; }
.source-body {
  display: grid; grid-template-columns: 1fr 1fr;
  border-top: 1px solid var(--rule);
}
.source-col {
  padding: 0.75rem 1rem;
  border-right: 1px solid var(--rule);
  white-space: pre;
  color: var(--ink);
}
.source-col:last-child { border-right: none; }
.source-col .gutter {
  display: inline-block; width: 1.5em;
  color: var(--sepia); user-select: none;
}
.source-col .lib {
  display: block; font-size: 0.7rem;
  letter-spacing: 0.15em; text-transform: uppercase;
  color: var(--ink-soft); margin-bottom: 0.5rem;
}
```

- [ ] **Step 2: Build source items via DOM construction**

```js
const sourceSection = document.getElementById('source');
sourceSection.replaceChildren(
  el('div', { class: 'section-label', text: 'Source' }),
);
const sourceList = el('div', { class: 'source-list', id: 'source-list' });
sourceSection.appendChild(sourceList);

function sourceColumn(libName, codeText) {
  const col = el('div', { class: 'source-col' });
  col.appendChild(el('span', { class: 'lib', text: libName }));
  const lines = codeText.split('\n');
  lines.forEach((line, idx) => {
    const g = el('span', { class: 'gutter', text: String(idx + 1) });
    col.appendChild(g);
    col.appendChild(document.createTextNode(line + (idx < lines.length - 1 ? '\n' : '')));
  });
  return col;
}

tests.forEach((test, i) => {
  const uSrc = test.rubique.toString().split('\n').slice(0, 3).join('\n');
  const mSrc = test.mathjs.toString().split('\n').slice(0, 3).join('\n');

  const item = document.createElement('details');
  item.className = 'source-item';
  const summary = document.createElement('summary');
  summary.textContent = `Fig. ${i + 1} · ${test.name}`;
  item.appendChild(summary);
  const body = el('div', { class: 'source-body' }, [
    sourceColumn('Ubique', uSrc),
    sourceColumn('math.js', mSrc),
  ]);
  item.appendChild(body);
  sourceList.appendChild(item);
});
```

- [ ] **Step 3: Visually verify**

Reload. 9 collapsed source items. Opening one reveals two columns with line numbers and the call source.

- [ ] **Step 4: Commit**

```bash
git add docs/benchmark.html
git commit -m "📝 Add per-test source preview panel"
```

---

## Task 8: Summary section — restyled chart + stats + replay

**Files:**
- Modify: `docs/benchmark.html` — fill `<section id="summary">` and implement `renderSummary`.

- [ ] **Step 1: Add summary CSS**

```css
.summary-grid {
  display: grid; grid-template-columns: 1fr 2fr;
  gap: 2.5rem; align-items: start;
}
.summary-stats { display: flex; flex-direction: column; gap: 1.5rem; }
.summary-stat .big {
  font-family: var(--font-display); font-weight: 500;
  font-size: clamp(2.5rem, 6vw, 4rem); line-height: 1;
  color: var(--ink); font-variation-settings: "opsz" 144;
}
.summary-stat .label {
  font-family: var(--font-mono); font-size: 0.72rem;
  letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--ink-soft); margin-top: 0.4rem;
}
.summary-chart-wrap {
  background: var(--paper-soft); border: 1px solid var(--rule);
  padding: 1rem; position: relative; height: 360px;
}
.summary-foot {
  font-family: var(--font-serif); font-style: italic;
  font-size: 0.85rem; color: var(--ink-soft);
  margin-top: 2rem; max-width: 720px; line-height: 1.6;
}
.replay {
  margin-top: 1.5rem;
  font-family: var(--font-mono); font-size: 0.85rem;
  letter-spacing: 0.15em; text-transform: uppercase;
  color: var(--ubique); background: transparent; border: none;
  border-bottom: 1px solid var(--ubique);
  padding: 2px 0; cursor: pointer;
}
.replay:hover { color: var(--ink); border-bottom-color: var(--ink); }
```

- [ ] **Step 2: Build summary markup via DOM construction**

```js
const summarySection = document.getElementById('summary');
summarySection.replaceChildren(
  el('div', { class: 'section-label', text: 'Summary' }),
);

function statBlock(bigId, labelText) {
  return el('div', { class: 'summary-stat' }, [
    el('div', { class: 'big', id: bigId, text: '—' }),
    el('div', { class: 'label', text: labelText }),
  ]);
}

const statsCol = el('div', { class: 'summary-stats' }, [
  statBlock('sum-mean', 'Mean speedup'),
  statBlock('sum-won',  'Tests where Ubique was faster'),
  statBlock('sum-best', 'Best result'),
]);

const canvasEl = document.createElement('canvas');
canvasEl.id = 'summary-chart';
const chartWrap = el('div', { class: 'summary-chart-wrap' }, [canvasEl]);

summarySection.appendChild(el('div', { class: 'summary-grid' }, [statsCol, chartWrap]));

const foot = el('p', { class: 'summary-foot' });
foot.append(
  'Browser ',
  Object.assign(document.createElement('code'), { textContent: 'performance.now()' }),
  ' precision is capped (typically 5 µs–1 ms depending on isolation context). JS is single-threaded; results vary with hardware, browser, and ambient load. Each measurement reports the mean over n iterations after warmup discards; σ and 95% confidence interval are computed assuming approximately normal residuals.',
);
summarySection.appendChild(foot);

const replay = el('button', { class: 'replay', id: 'replay-btn', text: '↻ Repeat experiment' });
summarySection.appendChild(replay);
```

- [ ] **Step 3: Replace `renderSummary` stub**

```js
function renderSummary() {
  if (allResults.length === 0) return;

  const mean = allResults.reduce((a, r) => a + r.speedup, 0) / allResults.length;
  const won = allResults.filter(r => r.speedup > 1).length;
  const best = allResults.reduce((b, r) => r.speedup > b.speedup ? r : b);

  document.getElementById('sum-mean').textContent =
    mean >= 1 ? `${mean.toFixed(1)}×` : `${(1 / mean).toFixed(1)}× slower`;
  document.getElementById('sum-won').textContent = `${won}/${allResults.length}`;
  document.getElementById('sum-best').textContent =
    `${best.name.replace(/\s*\(.*$/, '')} ${best.speedup.toFixed(1)}×`;

  const ctx = document.getElementById('summary-chart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: allResults.map(r => r.name),
      datasets: [{
        label: 'Speedup ×',
        data: allResults.map(r => r.speedup),
        backgroundColor: 'rgba(164, 56, 42, 0.0)',
        borderColor: '#a4382a',
        borderWidth: 1.2,
        borderSkipped: false,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#f4ede0',
          titleColor: '#1a1a17',
          bodyColor: '#1a1a17',
          borderColor: '#a89274',
          borderWidth: 1,
          titleFont: { family: 'IBM Plex Mono', size: 11 },
          bodyFont:  { family: 'IBM Plex Mono', size: 11 },
          padding: 10,
          displayColors: false,
          callbacks: {
            label: (cx) => {
              const r = allResults[cx.dataIndex];
              return [
                `Speedup: ${r.speedup.toFixed(2)}×`,
                `Ubique:  ${r.rubiqueMean.toFixed(2)} ± ${r.rubiqueSigma.toFixed(2)} ms`,
                `math.js: ${r.mathjsMean.toFixed(2)} ± ${r.mathjsSigma.toFixed(2)} ms`,
                `n = ${r.n}`,
              ];
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(26,26,23,0.06)' },
          ticks: {
            color: '#4a4640',
            font: { family: 'IBM Plex Mono', size: 10 },
            callback: (v) => v + '×',
          },
        },
        x: {
          grid: { display: false },
          ticks: {
            color: '#4a4640',
            font: { family: 'IBM Plex Mono', size: 9 },
            maxRotation: 45, minRotation: 45, autoSkip: false,
          },
        },
      },
    },
  });
}

document.getElementById('replay-btn').addEventListener('click', () => location.reload());
```

- [ ] **Step 4: Visually verify**

Reload, click Begin, let all tests finish. Confirm summary stats, ink-stroke bar chart, Plex Mono tooltips with µ ± σ, replay reloads the page.

- [ ] **Step 5: Commit**

```bash
git add docs/benchmark.html
git commit -m "📈 Add restyled summary chart and stats card"
```

---

## Task 9: Motion + polish pass

**Files:**
- Modify: `docs/benchmark.html` — fade-up on scroll, grain overlay.

- [ ] **Step 1: Add CSS for scroll reveal + grain**

```css
.figure {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 600ms ease, transform 600ms ease;
}
.figure.in-view { opacity: 1; transform: translateY(0); }

body::after {
  content: ""; position: fixed; inset: 0; pointer-events: none;
  background-image: radial-gradient(rgba(26,26,23,0.025) 1px, transparent 1px);
  background-size: 3px 3px;
  mix-blend-mode: multiply;
  z-index: 1;
}
.container { position: relative; z-index: 2; }
```

- [ ] **Step 2: Add IntersectionObserver**

After the figures-building loop:

```js
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) {
      e.target.classList.add('in-view');
      io.unobserve(e.target);
    }
  }
}, { threshold: 0.15 });
document.querySelectorAll('.figure').forEach(f => io.observe(f));
```

- [ ] **Step 3: Visually verify**

Reload. Scrolling fades figures up as they enter. A very faint grain texture is visible against the cream paper. Speedup stamp still animates; hover sepia underline still works.

- [ ] **Step 4: Commit**

```bash
git add docs/benchmark.html
git commit -m "✨ Add fade-up scroll reveal and grain texture polish"
```

---

## Task 10: Dead-code cleanup + acceptance walk-through

**Files:**
- Modify: `docs/benchmark.html` — remove unused identifiers.

- [ ] **Step 1: Remove dead identifiers**

Search the file and delete the definitions of any identifier that is no longer referenced:
- `transitionToSlide`, `currentSlide`
- `prepareComputeRows`, `resetRace`, `startComputeRow`, `updateComputeRow`, `completeComputeRow`
- `formatMillis`, `animateRace`, `animateNumber`, `easeOutCubic`
- `visualizeMatrices`, `createMatrixBox`
- the old `createChart`, the old `showResults`
- the old `benchmarkFunction`, the old `calculateIterations`

Keep: `generateMatrix`, `generateArray`, `generateInvertibleMatrix`, `getFunctionArgs`, `nextFrame`, `sleep`, `runTimedIterations`, `summarizeTimes`, `pickIterations`, `runOneTest`, `runAllTests`, `createTrace`, `renderScatter`, `renderSummary`, `buildFigure`, `renderSpecimens`, `drawMatrix`, `drawNumberMatrix`, `drawBlueprintDots`, `el`, `svgEl`, `detectEnvironment`, explore helpers.

- [ ] **Step 2: Acceptance walk-through using Chrome**

Confirm each spec acceptance item:
- Page loads with no console errors → `mcp__claude-in-chrome__read_console_messages` (no errors)
- All 9 tests run sequentially after Begin
- Explore section responds to slider within ~200ms perceived latency
- Environment populates correctly on Chrome
- No emoji, no Inter, no purple gradients, no rounded pill cards. Verify via:

  ```powershell
  Select-String -Path docs/benchmark.html -Pattern "Inter[\"',]|#8b5cf6|border-radius:\s*999|🚀|🎉|✅"
  ```

  Expected: no matches (or only the SIMD/UTF probe constants — visually inspect any hits).

- [ ] **Step 3: Commit cleanup**

```bash
git add docs/benchmark.html
git commit -m "🧹 Remove dead code from old benchmark presentation layer"
```

---

## Self-Review Notes

**Spec coverage:** Each spec section maps to a task — design system → Task 1; header + Environment → Task 2; Tests figure layout → Task 3; oscilloscope + statistical rigor → Task 4; scatter cloud → Task 5; Explore → Task 6; Source → Task 7; Summary → Task 8; motion → Task 9; QA → Task 10. The four spec additions (interactive size slider, live ops/sec oscilloscope, statistical rigor, hardware+code preview panels) are covered by Tasks 6, 4, 4, and 2+7 respectively.

**Type consistency:** `runTimedIterations` returns `times[]`; `summarizeTimes` consumes that. `createTrace` returns `{addPoint, reset}` used by `runOneTest`. `allResults` items use the same keys (`rubiqueMean`, `mathjsMean`, `rubiqueSigma`, `mathjsSigma`, `speedup`, `n`, `name`) at producer (Task 4) and at consumers (Tasks 5, 8).

**Sequencing note:** Task 4 introduces `runOneTest` which calls `renderScatter` (Task 5) and `renderSummary` (Task 8). Both are stubbed as no-ops in Task 4 so each task remains independently runnable.

**XSS posture:** All DOM construction uses `createElement` + `textContent`. No template-string interpolation into `.innerHTML`. The only `.innerHTML`-style assignments anywhere are static template strings with no interpolated data (none remain after this plan). Test names and source code text reach the DOM through `textContent` only, so even if a malicious test name were ever introduced, it would render as text.
