# Reproducing the matrix measurements

Use Deno 2.9 or later for the browser bundler. From the repository root:

```sh
deno task build
deno task build:simd
deno run -A scripts/benchmark_matrices.ts --simd --output=benchmarks/matrices.json
deno task benchmark
```

Optionally supply `--baseline=file:///absolute/path/to/old-checkout/index.ts`.
Both revisions are then warmed and measured in the same process. Keep the old
checkout and its generated WASM untouched. Do not benchmark while compiling,
running other tests, or in a throttled/background browser tab.

The matrix harness uses deterministic f64 data, a finite absolute + relative
correctness gate, 10 warmups, calibration targeting 10 ms for the fastest variant, 9 batches with rotating implementation order,
and median milliseconds per operation. Raw samples, dimensions, iteration counts,
runtime and CPU are retained. Setup, import/compilation, and readback are excluded
from resident timings; nested-array timings include input packing and output
conversion. Compare those categories separately. SIMD is compared against the
same raw scalar binding, not against a higher-level wrapper.

The standard CLI benchmark compares the current public nested-array API with
math.js 15.2.0 on the same inputs. It uses 9 alternating batches and includes
packing/copying. It fails before timing if correctness disagrees. Its geometric
mean is only a summary of that test selection, never a universal speed claim.
The browser page follows the same principles and is bundled from local source
by `deno task docs`; it suppresses invalid/nonfinite-result timings.

SIMD is an optional experimental build, excluded from package exports. Enabling
`simd128` does not guarantee vectorization or a speedup. Keep the scalar release
unless measured gains justify the browser requirement and a runtime feature
selection strategy. Release compilation favors speed (`opt-level = 3`, LTO,
one codegen unit); `--skip-opt` makes the post-link wasm-opt stage explicit rather than combining
its effects with the Rust profile change. This is not proof that skipping
wasm-opt is faster; a speed-oriented post-link pass is a separate experiment.

The numerical regression tests cover the new matrix paths, lifetime handling,
statistics and division residuals. They do not certify every existing numerical
function. The identified IRR, powers, drawdown, singularity, small-determinant, rectangular-LU
and large-offset regression defects are now covered by corrective changes and
independent regression tests. This is not a certification of every library function.

## Before/after application workloads

```sh
deno run -A scripts/benchmark_workloads.ts --baseline=file:///absolute/path/to/baseline/index.ts
```

The retained `workloads-2026-10-13.json` compares variance, correlation and median
on 100,000 observations, plus 1,000 input-changing matrix updates. The repeated
workloads include input setup, buffer allocations, one rotating output value
consumed each iteration, and cleanup. The resident path is scalar. This makes the
benefit of a changed ownership API explicit; it is not a full matrix download on
every iteration. Statistics retain identical input/output contracts.

The local run measured median ratios of 39.62× for median, 14.36× for correlation,
and 7.65× for repeated 10×10 products against the previous implementation. System
load was high and sample variation is substantial. These are scoped observations,
not release guarantees; repeat on quiet hardware before publishing headline
numbers. Raw samples include slower cases and outliers. The matrix auto-dispatch
heuristic remains provisional; explicit overrides support workload-specific tuning.

`mathjs-2026-10-13.json` contains the final 17-case CLI run, all correctness checks
passed. This comparison is separate from before/after improvements. Cold module
initialization is not measured by either harness.


## Final correctness-phase verification

`mathjs-final-2026-10-13.json` retains the new 17-case CLI measurement after the
mathematical fixes; `browser-final-2026-10-13.json` retains nine browser cases.
`artifacts-final-2026-10-13.json` records the final scalar/SIMD binaries separately
from the earlier optimization-phase artifacts. The scalar WASM binary is now
54,211 bytes (baseline 36,086): speed was prioritized over download size.
`lab-final-2026-10-13.json` is a functional lab export using synthetic data.
Historical workload ratios were not relabeled as new-binary measurements.


## Timer resolution regression fix

Current calibration uses repeated probes of the faster implementation and targets
10 ms per batch, with a bounded iteration count. Measured batches must all be
finite, positive and at least 1 ms. Otherwise the UI marks the timing unresolved,
shows no speed ratio and excludes it from the summary. Raw unresolved samples
remain in a separate JSON field. Duration labels use ms/µs/ns as appropriate.
Correctness and timing quality are explicitly separate.

Run `deno test test/benchmark_timing_test.ts` for coarse-clock, probe-outlier and
zero/nonfinite-duration regression cases. With the docs server running, use
`deno task test:benchmark:browser` to exercise all nine comparisons, inject a
numerical mismatch and a zero clock, and verify raw export. Historical JSON files
above retain their original calibration protocol; they were not silently rewritten.

## 1.0.4 measurements

[Statistics samples](statistics-1.0.4.json) compare the installed **1.0.3** npm
ESM build against the 1.0.4 source in the same Deno process, with matching
results checked before timing. Inputs contain 32, 1,000 and 10,000 seeded values.

| Operation | Baseline / current median (32 / 1,000 / 10,000 values) |
| --- | --- |
| Hazen percentile | 7.60× / 6.17× / 5.93× |
| Mean absolute deviation | 3.70× / 3.28× / 3.88× |
| Fourth central moment | 2.61× / 2.20× / 2.18× |

The host had other applications active; release tests were paused. Samples vary
substantially, so these are **local observations**, not portable speed guarantees
or launch headline numbers. Percentiles now sort once and interpolate directly;
the two moment paths avoid intermediate elementwise arrays and WASM crossings.

```sh
npm install --prefix /tmp/ubique-baseline ubique@1.0.3
deno run -A scripts/benchmark_statistics.ts \
  --baseline=file:///tmp/ubique-baseline/node_modules/ubique/esm/index.js
```

[Matrix samples](matrices-1.0.4.json) retain scalar/SIMD, resident and copied API
costs separately. [Loop-unrolling probes](dispatch-probe-1.0.4.json) use
`scripts/benchmark_dispatch.ts`. Correctness gates passed, but the run's variance
is too high to justify changing the portable default or the automatic dispatch
threshold. SIMD remains an optional build experiment; this release does not
claim a new matrix-kernel speedup. Recheck on an isolated host and multiple
browser engines before changing those defaults.
