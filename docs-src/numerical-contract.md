# Numerical contracts for the revised paths

Ubique uses JavaScript numbers and WASM f64, not exact arithmetic. These contracts
cover the revised paths; older exports retain their documented conventions.

| API | Shape / storage | Defined behavior |
| --- | --- | --- |
| `matmul` | nonempty rectangular nested matrices | m×k times k×n returns m×n; neither input is mutated; malformed or sparse matrices throw |
| `mtimes` | scalar, vector, matrix | vector-vector is a dot product; matrix-vector treats the right vector as a column; vector-matrix treats the left vector as a row |
| `DenseMatrix` | owned column-major f64 | index `column * rows + row`; output cannot alias an input; views borrow memory and must be refreshed after possible growth |
| `linsolve`, `factorize().solve` | finite square A; vector or matrix RHS | result preserves RHS shape; inputs preserved; finite-output check; singular pivots throw |
| `issingular` | finite square matrix | row-equilibrated partial-pivot LU; default tolerance n×EPSILON, overridable; this is not an SVD rank or condition estimate |
| `lu` | finite m×n | L is m×r, U is r×n, r=min(m,n); `L*U = A[P,:]` up to rounding |
| `det` | finite square, including 1×1 | no absolute clamping; tiny determinants are allowed; overflow/underflow and cancellation follow f64 arithmetic |
| `mpower` | square matrix and safe integer | identity at zero, squaring for positives, inverse for negatives; no fractional matrix powers |
| `varc`, `std` | vector or matrix | flag 0 divides by N, flag 1 by N−1 (default); dim 0 summarizes rows, dim 1 columns; insufficient observations yield NaN |
| `corrcoef(x,y)` | equal-length vectors | one-pass Pearson correlation; constant/nonfinite moments yield NaN; finite valid correlations are bounded to [−1,1] |
| `median` | finite numeric vector or matrix | sorts a copy; averages the two middle values for even lengths; empty vectors throw |
| `linearreg(y,x)` | equal finite vectors, at least two observations | centered fit; constant x throws; constant y has NaN R²; overflowing moments throw |
| `irr` | finite flows of both signs, matching finite dates | positive period, initial guess above −1; converged rate is checked by scaled NPV; multiple roots and convergence failure remain possible |
| `drawdown` | finite simple returns ≥ −1 | includes wealth 1 at period 0; total loss gives return drawdown 1 / logarithmic drawdown infinity; maxddrecov is [peak,trough] |

Legacy result shapes are preserved: `mean(matrix)` and `median(matrix)` return a
flat vector; `varc(matrix)` and `std(matrix)` wrap that vector in one outer row.
Use explicit dimensions and inspect shapes when composing these functions.
`prctile` uses interpolation on sorted-observation ranks at i+0.5, scaled by N
(and endpoint values outside that rank range), rather than an unspecified generic
"percentile" convention. It was not rewritten in this change.

There is no library-wide missing-data imputation or omission policy. Pass finite,
complete observations for statistics; the browser CSV example explicitly filters
complete rows first. General matrix multiplication permits IEEE NaN/infinity
propagation, while the finite linear-system routines reject them. Extremely scaled
inputs can overflow, underflow or lose significance even when every entry is finite.

Tests compare exact integer examples exactly and numerical results with explicit
tolerances. Solve tests check reconstruction/residuals. A small residual does not
prove accurate coefficients for an ill-conditioned matrix; use an appropriate
condition estimate or higher precision when that distinction matters.
