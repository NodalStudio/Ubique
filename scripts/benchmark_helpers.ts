/** Shared, deterministic benchmark protocol. All times are milliseconds. */
export const BENCHMARK_SEED = 0x51b1c;
export function seededRandom(seed = BENCHMARK_SEED): () => number {
  return () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}

/** Compare unrounded finite results with absolute + relative tolerance.
 * NaN and infinities fail: these benchmarks intentionally use finite inputs
 * whose expected outputs are finite. No invalid result earns a speed ratio.
 */
export function resultsAgree(
  a: unknown,
  b: unknown,
  atol = 1e-10,
  rtol = 1e-9,
): boolean {
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.length === b.length &&
      a.every((v, i) => resultsAgree(v, b[i], atol, rtol));
  }
  return typeof a === "number" && typeof b === "number" &&
    Number.isFinite(a) && Number.isFinite(b) &&
    Math.abs(a - b) <= atol + rtol * Math.max(Math.abs(a), Math.abs(b));
}

export function medianTime(samples: number[]): number {
  const sorted = samples.slice().sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

// Keep outputs observable, outside measurement, without scanning whole matrices.
let sink: unknown;
export function timeBatch(fn: () => unknown, iterations: number): number {
  let value: unknown;
  const start = performance.now();
  for (let i = 0; i < iterations; i++) value = fn();
  const elapsed = performance.now() - start;
  sink = value;
  return elapsed / iterations;
}
export function lastBenchmarkOutput(): unknown {
  return sink;
}

/** Calibrate from repeated probes of the faster implementation, not the slower
 * one or a single scheduling outlier. A hard cap bounds cheap/no-op probes. */
export function calibrateIterations(
  functions: (() => unknown)[],
  maxIterations = 100000,
  now = () => performance.now(),
): number {
  let iterations = 1;
  for (;;) {
    let shortest = Infinity;
    for (const fn of functions) {
      for (let repeat = 0; repeat < 3; repeat++) {
        const start = now();
        for (let i = 0; i < iterations; i++) sink = fn();
        shortest = Math.min(shortest, now() - start);
      }
    }
    if (shortest >= 10 || iterations >= maxIterations) return iterations;
    iterations = Math.min(maxIterations, iterations * 4);
  }
}

/** A correct output is not sufficient evidence for a measurable duration. */
export function timingUsable(samples: number[], iterations: number): boolean {
  return samples.length > 0 &&
    samples.every((v) => Number.isFinite(v) && v > 0 && v * iterations >= 1);
}
export function formatDuration(ms: number): string {
  if (!Number.isFinite(ms) || ms <= 0) return "below timer resolution";
  if (ms < 0.001) return `${(ms * 1e6).toPrecision(3)} ns`;
  if (ms < 1) return `${(ms * 1000).toPrecision(3)} µs`;
  return `${ms.toPrecision(3)} ms`;
}

/** Warm both implementations, alternate order, preserve all batch samples. */
export function measurePair(
  a: () => unknown,
  b: () => unknown,
  iterations: number,
  batches = 9,
) {
  if (!resultsAgree(a(), b())) {
    throw new Error("Correctness check failed; timing suppressed");
  }
  for (let i = 0; i < 10; i++) {
    a();
    b();
  }
  iterations = calibrateIterations([a, b], Math.max(iterations, 10000));
  const aSamples: number[] = [], bSamples: number[] = [];
  for (let i = 0; i < batches; i++) {
    if (i % 2 === 0) {
      aSamples.push(timeBatch(a, iterations));
      bSamples.push(timeBatch(b, iterations));
    } else {
      bSamples.push(timeBatch(b, iterations));
      aSamples.push(timeBatch(a, iterations));
    }
  }
  if (
    !timingUsable(aSamples, iterations) || !timingUsable(bSamples, iterations)
  ) {
    throw new Error(
      "Timing unresolved: batches are below timer resolution; no speed ratio reported",
    );
  }
  return {
    iterations,
    aSamples,
    bSamples,
    aMedian: medianTime(aSamples),
    bMedian: medianTime(bSamples),
  };
}
