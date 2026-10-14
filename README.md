# Ubique

Numerical computing for JavaScript and TypeScript: matrices, linear systems,
statistics, regression and financial time series. Selected linear algebra
operations use Rust's nalgebra compiled to WebAssembly. Other operations run in
JavaScript. The API uses familiar MATLAB-style names such as `mtimes` and `std`.

[API reference](https://nodalstudio.github.io/Ubique/) ·
[Interactive guide](https://nodalstudio.github.io/Ubique/learn.html) ·
[Browser benchmark](https://nodalstudio.github.io/Ubique/benchmark.html)

## Install and run

### Node.js or a TypeScript application

```sh
npm install ubique@1.0.3
```

```ts
import { matmul } from "ubique";

const A = [[1, 2], [3, 4]];
const B = [[5, 6], [7, 8]];

console.log(matmul(A, B));
// [[19, 22], [43, 50]]
```

CommonJS is also supported: `const { matmul } = require("ubique");`.

### Deno

```sh
deno add jsr:@nodalstudio/ubique@1.0.3
```

Use the same example with `import { matmul } from "@nodalstudio/ubique";`.
Without an import map, import directly from `"jsr:@nodalstudio/ubique@1.0.3"`.

### Browser without a build step

```html
<script type="module">
  import { matmul } from "https://esm.sh/ubique@1.0.3";
  console.log(matmul([[1, 2]], [[3], [4]])); // [[11]]
</script>
```

WebAssembly is included in the package; there is no separate `.wasm` file to
serve. The browser example above loads the package through a third-party CDN.
See the [runtime checks](https://github.com/NodalStudio/Ubique/actions/workflows/runtime-compat.yml)
for the tested Deno, Node.js, Bun and browser environments.

## Choose an operation

| Task | Start with |
| --- | --- |
| Multiply two matrices | `matmul(A, B)` |
| Multiply scalars, vectors or matrices | `mtimes(A, B)` |
| Solve a linear system | `linsolve(A, b)` |
| Solve repeatedly with the same coefficient matrix | `factorize(A).solve(b)` |
| Reuse WASM buffers across matrix products | `DenseMatrix` |
| Summarize observations | `mean`, `median`, `std`, `corrcoef` |
| Fit a line or analyze returns | `linearreg`, `drawdown`, `sharpe` |

`matmul` returns nested arrays and selects JavaScript or WASM automatically.
Pass `"js"` or `"wasm"` as its third argument to choose explicitly. The automatic
threshold is a heuristic; measure representative shapes before overriding it.

## Reuse a factorization

When only the right-hand side changes, factor the coefficient matrix once:

```ts
import { factorize } from "ubique";

const system = factorize([[3, 1], [1, 2]]);
console.log(system.solve([9, 8])); // approximately [2, 3]
console.log(system.solve([4, 3])); // approximately [1, 1]
```

For a single solve, use `linsolve(A, b)` directly. Solving a system avoids
constructing an explicit inverse just to multiply it by the right-hand side.

## Reuse matrix buffers

Use `DenseMatrix` when repeated calculations can keep their data in WASM memory:

```ts
import { DenseMatrix } from "ubique";

const a = DenseMatrix.from([[1, 2], [3, 4]]);
const b = DenseMatrix.from([[5, 6], [7, 8]]);
const out = new DenseMatrix(2, 2);
try {
  a.multiplyInto(b, out); // reuse these buffers for subsequent products
  console.log(out.toArray()); // [[19, 22], [43, 50]]
} finally {
  out.dispose();
  b.dispose();
  a.dispose();
}
```

`from` and `setData` copy existing JavaScript data into WASM; `toArray` copies it
back. `multiplyInto` reuses resident inputs and output without those boundary
copies. The output must be distinct from both inputs.

To generate data directly in WASM memory, use `view()` after allocating your
matrices. Its layout is column-major: `column * rows + row`. Views are temporary
borrows: reacquire them after operations that can allocate or grow WASM memory,
and never use them after disposal. See the
[complete resident-matrix example](examples/resident_matrices.ts).

## Numerical behavior and upgrading from 1.0.2

**1.0.3 includes the new APIs and numerical corrections described here.** The
[website](https://nodalstudio.github.io/Ubique/) builds from the repository's
current source; npm and JSR distribute versioned releases.

Calculations use JavaScript numbers and WASM f64, not exact arithmetic. Function
contracts define shapes, dimensions, normalization and handling of invalid data.
For example, `std` defaults to sample normalization (N−1), and general matrix
multiplication can propagate NaN/infinity while linear solves reject nonfinite
inputs. See the [numerical contracts](docs-src/numerical-contract.md).

When upgrading from 1.0.2, review these changes:

- Singular or near-singular solves and inverses can now throw. The pivot
  tolerance is not a condition-number estimate.
- Rectangular `lu` returns compact factors: L is m×r and U is r×n, where
  r = min(m, n).
- Tiny nonzero determinants are preserved; they are not automatically zero.
- `mpower` supports integer powers only; invalid or fractional powers throw.
- Drawdown includes initial wealth, so first-period losses affect the result
  and dependent ratios.
- IRR and regression fixes can change results or reject inputs previously
  accepted. Check application-level numerical expectations when upgrading.

The [changelog](CHANGELOG.md) describes these changes in detail.

## Performance and learning

The [interactive guide](https://nodalstudio.github.io/Ubique/learn.html) develops
matrix multiplication from simple loops through memory layout, tiling and WASM
ownership. Teaching kernels are distinguished from Ubique's production kernels.

The [browser benchmark](https://nodalstudio.github.io/Ubique/benchmark.html)
compares checked results on seeded inputs, warms both implementations, and
reports medians from alternating batches. Unresolved timings are excluded from
speed ratios. Performance depends on shape, runtime and data ownership.

For local commands, raw historical measurements and their limitations, see the
[benchmark protocol](benchmarks/README.md). Historical before/after results are
not guarantees for the entire library or comparisons against math.js.

## Numerical validation

The revised numerical paths pass 716 deterministic comparisons and invariants
against NumPy/SciPy (BLAS/LAPACK) and mpmath at 80-digit precision. This covers
matrix products, solves, decompositions, statistics, regression and IRR; it is not
an exhaustive verification of every export or input. See the
[reproducible reference suite](docs-src/reference-validation.md) for coverage,
tolerances and commands.

## Develop locally

Clone the repository and use Deno to run the tests:

```sh
git clone https://github.com/NodalStudio/Ubique.git
cd Ubique
deno task test
deno task lint
deno task docs
python3 -m http.server 8873 --bind 127.0.0.1 --directory docs
```

Open `http://127.0.0.1:8873/` for the local API, guide and benchmark. The generated
WASM bindings are checked in. To change the Rust implementation, install Rust
with the `wasm32-unknown-unknown` target and run `deno task build`.

Use `deno task build:npm` and `deno task test:npm` to build and check the npm
package. See [examples and browser checks](examples/README.md) for the interactive
demonstrations. Report issues or propose changes through
[GitHub](https://github.com/NodalStudio/Ubique/issues).

## License and credits

[MIT](LICENSE). Maintained by [Nodal Studio](https://nodalstudio.io/).
Based on Max Todaro's [original Ubique](https://github.com/maxto/ubique), with
Rust linear algebra supplied by [nalgebra](https://nalgebra.org/).
