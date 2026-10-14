import { marked } from "npm:marked@15.0.12";

import { brandHead, siteFooter, siteHeader } from "./brand_chrome.ts";

/** Renders only the checked-in editorial source, never uploaded/user Markdown. */
export async function buildLearn(output: string) {
  const markdown = (await Deno.readTextFile("docs-src/matrix-engine.md"))
    .replace(/^---\n[\s\S]*?\n---\n/, "");
  let html = await marked.parse(markdown);
  const experiments = await Deno.readTextFile(
    "scripts/assets/article_experiments.html",
  );
  const experiment = (id: string): string => {
    const block = experiments.match(
      new RegExp(`<section\\s+id="${id}"[\\s\\S]*?</section>`),
    )?.[0];
    if (!block) throw new Error(`Missing article experiment: ${id}`);
    return block;
  };
  const blocks: Record<string, string> = {
    "Start with one output cell":
      `<div class="card"><h3>Follow one dot product</h3><p>A = [[1,2],[3,4]] · B = [[5,6],[7,8]]</p><div class="controls"><label>Output row <select id="dot-row"><option>0</option><option>1</option></select></label><label>Output column <select id="dot-col"><option>0</option><option>1</option></select></label><button id="dot-next">Next term</button></div><p id="dot-result" role="status" aria-live="polite"></p></div>`,
    "Change the walk through memory":
      `<div class="card"><h3>Watch B's row-major addresses</h3><label>Inner loop <select id="walk-mode"><option value="column">i → j → p: visit a column</option><option value="row">i → p → j: visit a row</option></select></label><div class="controls"><button id="walk-next">Next address</button><span id="walk-status" role="status"></span></div><div id="memory" class="memory" aria-label="A four by four row-major buffer"></div><p class="muted">One inner-loop sweep, with outer coordinates fixed at zero. The grid shows element offsets, not cache lines. Cache behavior depends on the machine and working set.</p></div>`,
    "Work on smaller regions":
      `<div class="card"><h3>Run the three teaching kernels</h3><div class="controls"><label>m <input id="teach-m" type="number" min="1" max="128" value="31" style="width:75px"></label><label>k <input id="teach-k" type="number" min="1" max="128" value="65" style="width:75px"></label><label>n <input id="teach-n" type="number" min="1" max="128" value="32" style="width:75px"></label><label>Tile <select id="teach-tile"><option>4</option><option>8</option><option>16</option><option selected>32</option><option>64</option></select></label><button class="primary" id="teach-run">Measure kernels</button></div><p id="teach-result" role="status" aria-live="polite">Seeded inputs · 10 warmups · 9 rotating, adaptively sized batches · packing excluded, output allocation included.</p><button id="teach-download" disabled>Download raw samples</button><p class="muted">These kernels explain the technique. Ubique's production WASM product uses nalgebra; it does not call this JavaScript tiler. Small inputs may not benefit from tiling.</p></div>`,
    "Understand what WebAssembly receives":
      `<div class="card"><h3>Call the scalar WASM function</h3><div class="controls"><label>a <input id="wasm-a" type="number" value="6" style="width:90px"></label><label>b <input id="wasm-b" type="number" value="7" style="width:90px"></label><button id="wasm-run">Run f64.mul</button></div><p id="wasm-result" role="status" aria-live="polite"></p><p class="muted">The page instantiates the binary encoding of the WAT above. Two numbers cross the boundary; a matrix also needs a memory layout and lifetime contract.</p></div>`,
    "Keep reusable data close to the calculation": experiment("matrix"),
    "Make correctness part of each step": experiment("regression"),
  };
  for (const [heading, block] of Object.entries(blocks)) {
    const marker = `<h2>${heading}</h2>`;
    const start = html.indexOf(marker),
      next = html.indexOf("<h2>", start + marker.length);
    if (start < 0) throw new Error(`Missing tutorial section: ${heading}`);
    const end = next < 0 ? html.length : next;
    html = html.slice(0, end) + block + html.slice(end);
  }
  html = chapters(html);
  // Keep old shared links useful without maintaining a second experience.
  await Deno.writeTextFile(
    `${output}/lab.html`,
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=learn.html"><title>Experiments moved into the article</title></head><body><p><a href="learn.html">Continue to the interactive article</a></p><script>location.replace("learn.html" + location.hash);</script></body></html>`,
  );
  await Deno.writeTextFile(`${output}/learn.html`, page(html));
}

const slug = (text: string) =>
  text.toLowerCase().replace(/<[^>]+>/g, "").replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

type Chapter = { id: string; title: string };
const toc: Chapter[] = [];
let intro = "";

/** Splits the rendered article into numbered chapters (§01, §02…). */
function chapters(html: string): string {
  const parts = html.split(/(?=<h2>)/);
  intro = parts[0].startsWith("<h2>") ? "" : parts.shift()!;
  toc.length = 0;
  return parts.map((part) => {
    const title = part.match(/^<h2>([\s\S]*?)<\/h2>/)![1];
    const id = slug(title);
    toc.push({ id, title });
    return `<section class="chapter" aria-labelledby="${id}"><h2 id="${id}">${title}</h2>${
      part.replace(/^<h2>[\s\S]*?<\/h2>/, "")
    }</section>`;
  }).join("");
}

function page(body: string): string {
  const index = toc.map((c) => `<li><a href="#${c.id}">${c.title}</a></li>`)
    .join("");
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="Matrix multiplication from JavaScript to WebAssembly, with runnable examples."><title>Making matrix multiplication fast — Ubique</title>${brandHead()}<link rel="stylesheet" href="article.css"><link rel="stylesheet" href="docs.css"></head><body class="ns">${
    siteHeader("learn")
  }
  <div class="docs-layout"><aside class="docs-sidebar"><nav aria-label="Article contents"><p class="docs-label">Matrix multiplication</p><ol>${index}</ol></nav></aside>
  <main id="main" class="docs-content"><header class="docs-intro"><p class="docs-label">Under the hood / Linear algebra</p><h1>Making matrix multiplication fast</h1><p>From JavaScript loops to reusable WebAssembly memory.</p><p class="docs-meta">${toc.length} sections · Runnable examples · Ubique 1.0.4</p></header>
  <div class="docs-overview">${intro}</div><article class="article">${body}</article>
  <section class="docs-evidence"><h2>Export your results</h2><p>Download the inputs, timings and regression results. Calculations stay in your browser.</p><button id="download" class="primary" disabled>Download experiment JSON</button> <a href="benchmark.html">Open the benchmark →</a></section>
  </main></div>${
    siteFooter(
      "Teaching kernels explain the techniques; production matrix kernels use nalgebra.",
    )
  }<script type="module" src="learn.js"></script><script type="module" src="article_experiments.js"></script></body></html>`;
}
