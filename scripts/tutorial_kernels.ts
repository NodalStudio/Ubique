import { calibrateIterations, timingUsable } from "./benchmark_helpers.ts";
/** Teaching kernels for flat, row-major f64 matrices; intentionally independent of nalgebra. */
export function multiplyTeaching(
  A: Float64Array,
  B: Float64Array,
  m: number,
  k: number,
  n: number,
  mode: "dot" | "row" | "tile",
  tile = 32,
): Float64Array {
  if (
    ![m, k, n, tile].every((v) => Number.isSafeInteger(v) && v > 0) ||
    A.length !== m * k || B.length !== k * n
  ) throw new Error("Invalid teaching kernel dimensions");
  const C = new Float64Array(m * n);
  if (mode === "dot") {
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        let sum = 0;
        for (let p = 0; p < k; p++) sum += A[i * k + p] * B[p * n + j];
        C[i * n + j] = sum;
      }
    }
  } else if (mode === "row") {
    for (let i = 0; i < m; i++) {
      for (let p = 0; p < k; p++) {
        const a = A[i * k + p];
        for (let j = 0; j < n; j++) C[i * n + j] += a * B[p * n + j];
      }
    }
  } else if (mode === "tile") {
    for (let ii = 0; ii < m; ii += tile) {
      for (let pp = 0; pp < k; pp += tile) {
        for (let jj = 0; jj < n; jj += tile) {
          for (let i = ii; i < Math.min(ii + tile, m); i++) {
            for (let p = pp; p < Math.min(pp + tile, k); p++) {
              const a = A[i * k + p];
              for (let j = jj; j < Math.min(jj + tile, n); j++) {
                C[i * n + j] += a * B[p * n + j];
              }
            }
          }
        }
      }
    }
  } else throw new Error("Unknown teaching kernel");
  return C;
}
export function tutorialExperiment(
  m: number,
  k: number,
  n: number,
  tile: number,
) {
  if (
    ![m, k, n, tile].every((v) => Number.isInteger(v) && v >= 1 && v <= 128)
  ) throw new Error("Use dimensions and tiles between 1 and 128");
  const A = Float64Array.from({ length: m * k }, (_, i) => Math.sin(i)),
    B = Float64Array.from({ length: k * n }, (_, i) => Math.cos(i));
  const modes = ["dot", "row", "tile"] as const;
  const reference = multiplyTeaching(A, B, m, k, n, "dot");
  let error = 0, sink = 0;
  for (const mode of modes) {
    const actual = multiplyTeaching(A, B, m, k, n, mode, tile);
    actual.forEach((v, i) => {
      error = Math.max(error, Math.abs(v - reference[i]));
      if (
        !Number.isFinite(v) ||
        Math.abs(v - reference[i]) > 1e-10 + 1e-9 * Math.abs(reference[i])
      ) throw new Error("Correctness gate failed");
    });
  }
  const samples: Record<string, number[]> = { dot: [], row: [], tile: [] };
  for (let i = 0; i < 10; i++) {
    for (const mode of modes) {
      sink += multiplyTeaching(A, B, m, k, n, mode, tile)[0];
    }
  }
  const iterations = calibrateIterations(
    modes.map((mode) => () => multiplyTeaching(A, B, m, k, n, mode, tile)),
  );
  for (let batch = 0; batch < 9; batch++) {
    for (let j = 0; j < 3; j++) {
      const mode = modes[(j + batch) % 3], start = performance.now();
      for (let i = 0; i < iterations; i++) {
        sink += multiplyTeaching(A, B, m, k, n, mode, tile)[0];
      }
      samples[mode].push((performance.now() - start) / iterations);
    }
  }
  if (modes.some((mode) => !timingUsable(samples[mode], iterations))) {
    throw new Error(
      "Timing unresolved: below timer resolution. Try larger dimensions.",
    );
  }
  return {
    iterations,
    m,
    k,
    n,
    tile,
    error,
    samples,
    sink,
    medians: Object.fromEntries(
      modes.map(
        (mode) => [mode, samples[mode].slice().sort((a, b) => a - b)[4]],
      ),
    ),
  };
}
