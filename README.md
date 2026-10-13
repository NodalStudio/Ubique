<p align="center">
  <a href="https://nodalstudio.github.io/Ubique/">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset=".github/assets/banner-dark.svg">
      <img alt="Ubique — mathematical and quantitative library for TypeScript, by Nodal Studio" src=".github/assets/banner-light.svg" width="100%">
    </picture>
  </a>
</p>

<p align="center">
  <a href="https://nodalstudio.github.io/Ubique/"><img alt="API reference" src="https://img.shields.io/badge/API_reference_→-030406?style=for-the-badge"></a>
  <a href="https://nodalstudio.github.io/Ubique/learn.html"><img alt="Interactive article" src="https://img.shields.io/badge/Interactive_article_→-030406?style=for-the-badge"></a>
  <a href="https://nodalstudio.github.io/Ubique/benchmark.html"><img alt="Benchmark" src="https://img.shields.io/badge/Benchmark_→-030406?style=for-the-badge"></a>
</p>

<p align="center">
  <a href="https://jsr.io/@nodalstudio/ubique"><img alt="JSR" src="https://img.shields.io/jsr/v/@nodalstudio/ubique?style=for-the-badge&label=JSR&labelColor=030406&color=FFFDE9"></a>
  <a href="https://www.npmjs.com/package/ubique"><img alt="npm" src="https://img.shields.io/npm/v/ubique?style=for-the-badge&label=npm&labelColor=030406&color=FFFDE9"></a>
  <a href="https://www.npmjs.com/package/ubique"><img alt="npm downloads" src="https://img.shields.io/npm/d18m/ubique?style=for-the-badge&label=downloads&labelColor=030406&color=FFFDE9"></a>
  <a href="LICENSE"><img alt="MIT License" src="https://img.shields.io/badge/license-MIT-FFFDE9?style=for-the-badge&labelColor=030406"></a>
</p>

<br>

Ubique is a mathematical and quantitative library for TypeScript, Deno, Node.js
and the browser. Vectors, matrices, linear algebra, statistics, time series and
computational finance — with the heavy linear algebra delegated to Rust's
[nalgebra](https://nalgebra.org/), compiled to WebAssembly. Its API mirrors the
MATLAB vocabulary: `mtimes`, `inv`, `linsolve`, `std`, `sharpe`, `drawdown`.

| Linear algebra | Runs on | Lineage |
| :-- | :-- | :-- |
| Rust **nalgebra**, compiled to WebAssembly and inlined — no `.wasm` file to ship | Deno · Node.js · browsers (ESM) | A complete rewrite of Max Todaro's [original Ubique](https://github.com/maxto/ubique) |

> [!NOTE]
> **Development preview.** This branch adds APIs that are not published yet:
> resident WASM matrices, backend dispatch and reusable factorizations. Open the
> [interactive article](https://nodalstudio.github.io/Ubique/learn.html) (its
> source is [`docs-src/matrix-engine.md`](docs-src/matrix-engine.md)) or read
> the [changes and numerical contracts](CHANGELOG.md). Sections marked
> *unreleased* below describe this checkout only.

## §01 — Install

**Deno**, from [JSR](https://jsr.io/@nodalstudio/ubique):

```bash
deno add jsr:@nodalstudio/ubique
```

```ts
import * as ubique from "jsr:@nodalstudio/ubique";
```

**Node.js / npm**:

```bash
npm install ubique
```

```ts
import { mtimes } from "ubique";
```

The JSR build is also installable from npm, either as
`npm install @jsr/nodalstudio__ubique` or, on Node.js 20.6+, as
`npm install jsr:@nodalstudio/ubique`.

**Browsers**, through the esm.sh CDN:

```html
<script type="module">
  import * as ubique from "https://esm.sh/jsr/@nodalstudio/ubique@1.0.0";

  console.log(ubique.inv([[1, 2], [3, 4]]));
</script>
```

**From source**, to contribute or explore:

```bash
git clone https://github.com/NodalStudio/Ubique.git
cd Ubique
```

## §02 — Use

```ts
import * as ubique from "jsr:@nodalstudio/ubique"; // or "ubique" on Node.js

const A = [[1, 2], [3, 4]];
const B = [[5, 6], [7, 8]];

ubique.mtimes(A, B); // [[19, 22], [43, 50]]
```

Every function is documented, with runnable examples, in the
[API reference](https://nodalstudio.github.io/Ubique/): data types, element-wise
operations, elementary math, linear algebra, matrix and array operations,
probability distributions, quantitative finance, regression and statistics.

### Repeated matrix work · *unreleased*

`matmul(a, b, "auto")` accepts nested arrays and chooses a backend; `"js"` and
`"wasm"` force one. Small products skip the packing overhead. `mtimes` uses the
same dispatch for matrix inputs.

`DenseMatrix` keeps f64 data in WASM memory across calls. Allocate once, fill
or copy once, and reuse a separate output:

```ts
import { DenseMatrix } from "./index.ts"; // this checkout; not yet published

const a = DenseMatrix.from([[1, 2], [3, 4]]);
const b = DenseMatrix.from([[5, 6], [7, 8]]);
const out = new DenseMatrix(2, 2);
try {
  a.multiplyInto(b, out);
  console.log(out.toArray()); // [[19, 22], [43, 50]]
} finally {
  a.dispose(); b.dispose(); out.dispose();
}
```

For a producer that can write directly into WASM, allocate every matrix first,
then fill `matrix.view()`. Storage is column-major: `column * rows + row`. An
existing JS array or typed buffer needs a copy (`from` / `setData`).
`multiplyInto` makes no JS input/output copies; the numerical kernel may still
use scratch storage. `toArray()` copies back to JS.

> [!WARNING]
> **Views are temporary borrows.** Reacquire them after any WASM call that can
> allocate or grow memory; never keep them across async work or use them after
> `dispose()`. Do not use an input as the output. See
> [the runnable example](examples/resident_matrices.ts).

### Reuse a factorization · *unreleased*

```ts
import { factorize } from "./index.ts"; // unreleased checkout

const system = factorize([[0, 2], [1, 3]]);
system.solve([4, 7]); // [1, 2]
system.solve([[4, 8], [7, 14]]); // [[1, 2], [2, 4]]
```

`linsolve` uses the same row-equilibrated LU policy. Singular pivots are tested
against `n * Number.EPSILON` after row scaling; `factorize` and `issingular`
accept an explicit relative tolerance. This is a pivot heuristic, not an SVD
rank or condition-number estimate. See the
[compatibility notes](CHANGELOG.md) and
[numerical contracts](docs-src/numerical-contract.md).

## §03 — Measure

Performance depends on matrix shape, runtime and whether the data already sits
in WASM memory. The benchmark checks unrounded results before timing, uses
seeded inputs and a pinned math.js, warms both implementations and reports
medians from alternating batches. Earlier headline ratios have been replaced by
scoped, reproducible measurements.

| Command | What it measures |
| :-- | :-- |
| `deno task benchmark` | End-to-end public API against math.js; raw samples and runtime metadata in `benchmark-unified-results.json` |
| `deno run -A scripts/benchmark_matrices.ts` | JS, WASM and resident matrix paths — see [the protocol](benchmarks/README.md) |
| `deno task docs` | Builds the site with the interactive [benchmark](https://nodalstudio.github.io/Ubique/benchmark.html) on the **local source**; serve `docs/` over HTTP |

One local Deno/V8 run on an Intel i7-1065G7 measured these medians against the
previous implementation, on identical seeded inputs:

| Workload | Before | After | Ratio |
| :-- | --: | --: | --: |
| Median, 100,000 values | 8,420.55 ms | 212.54 ms | **39.62×** |
| Correlation, 100,000 paired values | 314.13 ms | 21.88 ms | **14.36×** |
| 1,000 changing 10×10 products, resident API | 18.10 ms | 2.37 ms | **7.65×** |

[Raw samples and scope](benchmarks/workloads-2026-10-13.json). These are
historical measurements on a busy machine, not universal guarantees or math.js
comparisons. Statistics keep the same input/output contract. The repeated
matrix workload includes allocation, upload and cleanup but reads one output
value per step instead of downloading the full result each time. Repeat on your
own workload.

## §04 — Contribute

Contributions are welcome. Fork the repository and open a pull request; for
bugs and feature requests, use
[GitHub Issues](https://github.com/NodalStudio/Ubique/issues).

```bash
deno task test    # format check, doc tests, numerics and correctness suites
deno task lint
deno task docs    # API reference, article and benchmark in docs/
```

Ubique is released under the [MIT License](LICENSE).

<br>

<p align="center">
  <a href="https://nodalstudio.io/">
    <img alt="Built and maintained by Nodal Studio — independent software studio, Barcelona and Paris" src=".github/assets/footer.svg" width="100%">
  </a>
</p>
