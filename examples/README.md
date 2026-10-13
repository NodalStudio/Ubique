# Examples

Run `deno run examples/resident_matrices.ts` for repeated matrix transforms
with reused WASM input/output. Fill direct views after allocations, reacquire
them after possible memory growth, and dispose matrices in `finally`.

## Interactive article

```sh
deno task docs
python3 -m http.server 8873 --bind 127.0.0.1 --directory docs
```

Open http://127.0.0.1:8873/learn.html. Experiments are embedded where they explain
the text: JS/WASM/resident products after memory ownership, and playful regression
after numerical correctness. Readers can add points, step a dot product, explore
memory traversal and time teaching kernels. No CSV, upload or preparation required.
The benchmark remains a separate page at `benchmark.html` on the same library site.

The source article is `docs-src/matrix-engine.md`. The former `lab.html` URL
redirects to the article. Assets live in `scripts/assets/`; calculations are in
`scripts/article_core.ts` and `scripts/tutorial_kernels.ts`. Worker computation
keeps the interface responsive. Experiment reports can be downloaded locally.

## Repeat the browser checks

With the server above running, install the pinned Playwright browser once and run:

```sh
deno run -A npm:playwright@1.59.1 install chromium
deno task test:browser
```

`UBIQUE_BASE_URL` overrides the server URL. `PLAYWRIGHT_EXECUTABLE_PATH` can point
to an existing Chromium executable. `UBIQUE_BROWSER_ARTIFACTS` selects a writable
screenshot/report directory (default `/tmp`). Tests cover embedded experiments, exports, tutorial controls, redirects and mobile overflow.
