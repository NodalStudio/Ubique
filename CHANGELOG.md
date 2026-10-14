# 1.0.3 — performance and numerical correctness

This release includes resident WASM matrices, explicit backend selection and
reusable factorizations. It also changes numerical behavior and error handling;
review the compatibility notes below when upgrading from 1.0.2.

- Independent NumPy/SciPy and 80-digit mpmath validation (716 cases) exposed and fixed large-offset precision loss in variance, standard deviation, covariance and correlation, including the WASM covariance kernel.

## Faster paths and useful APIs

- `matmul(a, b, backend)` supports auto/JS/WASM. The current auto heuristic uses
  WASM when m*k*n >= 262144 and every dimension is at least 16. It is provisional;
  explicit overrides allow application measurements. `mtimes` shares this path.
- `DenseMatrix` owns column-major f64 WASM storage. Generate data directly in
  `view()` or upload once; reuse a distinct output with `multiplyInto`.
  Reacquire borrowed views after any possibly allocating WASM call. Dispose
  explicitly. Existing JavaScript buffers still require an initial copy.
- Rust multiplication borrows transposed input views and returns the owned
  result without a final Rust clone. Compilation favors speed over size.
  SIMD remains a separately measured experiment, not the default export.
- Variance/std use shifted Welford accumulation; vector correlation uses one pass;
  median sorts a copy numerically, avoiding the old shift-heavy merge sort.
- `factorize(A).solve(b)` reuses a row-equilibrated pivoted LU decomposition.
  Matrix division solves systems instead of multiplying by an explicit inverse.

## Correctness and compatibility

- Determinants preserve small nonzero magnitudes and accept 1×1 matrices.
  A floating-point determinant of a singular matrix can be a small residual;
  determinant magnitude is not a numerical rank test.
- `issingular` now tests pivots after row scaling. `linsolve` and both inverse
  paths use the same default threshold, n*EPSILON. Singular/near-singular systems
  can now throw instead of returning huge, misleading finite values. The
  threshold is a heuristic, not a condition estimate or an SVD rank computation.
- Rectangular LU returns L of shape m×min(m,n), U of shape min(m,n)×n, so
  L*U reconstructs the row-permuted input. Consumers assuming old padded shapes
  must adapt. Input matrices are preserved.
- Matrix powers support safe integers: zero gives identity, negatives invert,
  positives use exponentiation by squaring. Fractional/nonfinite powers throw.
- IRR uses a log-rate variable, bounded Newton steps, a bracketing fallback and
  a relative NPV residual gate. Rates must exceed -1. Multiple roots are possible;
  the supplied guess can select different roots, and not every root is enumerated.
- Drawdown includes initial wealth at period zero. `maxddrecov` denotes
  [peak, trough], not a future recovery date. First-period losses now affect
  pain/ulcer indices and derived ratios. Returns below -1 are rejected.
- Linear regression centers shifted data to handle large coordinate offsets.
  Constant predictors and overflowing moments throw; constant responses have
  undefined R² (NaN). `fun()` uses the centered prediction formula.
- Martin ratio now accepts matrix inputs as documented.

## Reproducibility and demonstrations

Seeded inputs, finite unrounded correctness gates, warmup, rotating/alternating
batches and raw JSON replace rounded-result comparisons and misleading confidence
claims. Separate nested-array and resident-memory contracts are explicit.
The interactive article teaches loops, layout, tiling and WASM with runnable code.
Regression and matrix experiments are embedded in the relevant
sections. It is built from local source, with no analytics or uploaded data.
The former standalone lab URL redirects to the article.

See `benchmarks/README.md` for retained historical measurements and their limits.


### Benchmark timing correction

Repeated-probe calibration targets 10 ms for the faster path. Batches shorter
than 1 ms or containing zero/nonfinite durations are unresolved and excluded
from speed ratios/aggregate summaries. The browser export retains unresolved
samples separately. Small durations use µs/ns labels; numerical agreement alone
no longer implies a trustworthy speed measurement. The CSV discovery flow was
removed; article experiments require no preparation. Nodal Studio is linked in
both article and benchmark footers.
