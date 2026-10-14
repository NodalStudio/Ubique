# Independent numerical validation

The 1.0.4 release is checked against NumPy/SciPy and mpmath, independently of
Ubique's implementations. SciPy's linear algebra routines use BLAS/LAPACK:
https://docs.scipy.org/doc/scipy/tutorial/linalg.html

The deterministic suite currently contains **1,300 cases** across 63 operation names.
It tests source exports and can run against the generated or installed npm ESM
package. This is a correctness comparison, **not a speed comparison with SciPy**,
a MATLAB certification, or a proof covering every input or every Ubique export.

The checked-in [source validation report](reference-results.json) records the
release run. Node ESM and CommonJS builds also passed the same 1,300 cases.

## Reproduce

```sh
python3 -m venv /tmp/ubique-reference
/tmp/ubique-reference/bin/pip install -r scripts/reference-requirements.txt
/tmp/ubique-reference/bin/python scripts/test_reference.py

deno task build:npm
/tmp/ubique-reference/bin/python scripts/test_reference.py \
  --runtime node --module "file://$PWD/npm/esm/index.js" \
  --report /tmp/ubique-reference-npm.json
```

The release workflow runs these checks on source, Node ESM and CommonJS before
publishing the package. Deno must be available on PATH. The Python dependencies are development tools;
none are shipped to library users. The JSON report records reference versions,
seed, operation counts, failures and the largest measured error metrics.

## Coverage and tolerances

- Products: JS, WASM, automatic dispatch and resident WASM matrices; rectangular,
  odd and tile-boundary dimensions; magnitudes from 1e-100 to 1e100. Compare with
  NumPy's product, with error scaled by the largest entry of `abs(A) @ abs(B)` so
  cancellation does not make the test meaningless.
- Linear systems: single/multiple right-hand sides, reusable factorization,
  inverse, left/right division, independently rescaled equations, and generated
  matrices with condition numbers near 1e4 and 1e8. Compare to SciPy; require
  componentwise backward error <= 5e-13 and forward error <=
  `max(5e-13, 64 * EPSILON * condition(A))`.
- Hilbert matrices through order 10: compare solutions to mpmath at 80 decimal
  digits, using the exact binary64 input values. Forward accuracy depends on
  conditioning; a small residual alone does not imply accurate coefficients.
- Determinants, integer powers, singular-system rejection, rectangular LU
  reconstruction and triangular/permutation invariants. LU pivots need not match
  SciPy's choices if both factorizations reconstruct their inputs accurately.
- Variance, standard deviation, covariance, correlation, median and regression:
  vectors and covariance matrices, sample/population conventions, and offsets of
  0, 1e8 and 1e12. Small variations around large origins are checked with mpmath
  at 80 digits. Default scaled tolerance is 5e-13; regression uses 5e-12 relative
  plus 5e-13 absolute tolerance.
- IRR: conventional cash flows with a unique root, compared with SciPy's Brent
  solver in log-discount space, with relative tolerance 2e-11. Multiple-root
  semantics are covered separately by Ubique's regression tests.
- Higher central moments, skewness, kurtosis, z-scores and Jarque–Bera, including
  1e12 offsets; Hazen/type-5 quantiles against NumPy; distances against SciPy.
- Normal CDF/PDF/inverse and erf/erfc/inverses against SciPy, including normal
  probabilities down to 1e-100. Tiny tails are tested with relative error.
- Financial formulas against independently implemented NumPy calculations:
  full-sample downside deviation, unconditional upper/lower partial moments,
  Omega, Sortino, M2-Sortino, Sharpe, tracking error, information ratio,
  annualization, historical and normal VaR/ES, return conversions and Dietz.
  These are formula comparisons, not execution of MATLAB or an R package.
- Input preservation and finite results are checked; singular cases must throw.

Powers use a 2e-12 relative bound. Exact singular determinants have a 5e-14
norm-scaled bound. Tests reject nonfinite results rather than silently accepting
JSON nulls. Error metrics in the report use these operation-specific scales;
they must not be interpreted as one universal accuracy guarantee.

## What this found

The first 671-case run found 36 failures in variance, standard deviation and
vector correlation around large offsets. Extending coverage to matrix covariance
and matrix correlation found the same centering issue there. Shifting by an
observed origin **before** accumulating moments fixes those losses of precision.
The 1.0.3 716-case suite passed after that correction. Translation-invariance
regressions also run in the normal `deno task test` suite, without Python.

The suite focuses on revised numerical paths. It does not independently validate
all probability, date, portfolio or elementwise exports. Floating-point overflow,
underflow, rank-tolerance policy and multiple IRR roots remain subject to the
[numerical contract](numerical-contract.md).

### Expanded checks in 1.0.4

The first expanded run exposed inaccurate normal tails, large-offset higher
moments and incorrectly normalized downside/upside risk formulas. The corrected
1,300-case suite passes. Normal ES and VaR now scale drift with the horizon and
volatility with its square root; arrays and matrices retain their shape.

Downside deviation is `sqrt(mean(min(r - MAR, 0)^2))` over all observations,
and upside potential is `mean(max(r - MAR, 0))`. This follows the full-sample
convention documented by [PerformanceAnalytics](https://github.com/braverock/PerformanceAnalytics/blob/master/R/DownsideDeviation.R).
Sortino retains the API's separate `frisk` numerator and `MAR` denominator
thresholds. These corrected formulas intentionally change some 1.0.3 outputs.
