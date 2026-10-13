import { calibrateIterations, timingUsable } from "./benchmark_helpers.ts";
import { DenseMatrix, linearreg, matmul, median } from "../index.ts";

export function fitPoints(points: number[][], offset = 0) {
  if (points.length > 1000 || !Number.isFinite(offset)) {
    throw new Error("Invalid regression input");
  }
  const x = points.map((p) => p[0] + offset), y = points.map((p) => p[1]);
  const fit = linearreg(y, x);
  return {
    beta: fit.beta,
    alpha: fit.alpha,
    rsq: Number.isFinite(fit.rsq) ? fit.rsq : null,
    predicted: x.map((v) => fit.fun(v)),
    endpoints: [fit.fun(offset), fit.fun(offset + 10)],
    residuals: y.map((v, i) => v - fit.fun(x[i])),
  };
}
export function matrixExperiment(n: number) {
  if (!Number.isInteger(n) || n < 2 || n > 128) {
    throw new Error("Matrix side must be 2–128");
  }
  const a = Array.from(
      { length: n },
      (_, i) => Array.from({ length: n }, (_, j) => Math.sin(i * 13 + j)),
    ),
    b = Array.from(
      { length: n },
      (_, i) => Array.from({ length: n }, (_, j) => Math.cos(i + j * 7)),
    );
  const A = DenseMatrix.from(a),
    B = DenseMatrix.from(b),
    C = new DenseMatrix(n, n);
  try {
    const reference = matmul(a, b, "js");
    const wasm = matmul(a, b, "wasm");
    A.multiplyInto(B, C);
    const resident = C.toArray();
    let maxError = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        for (const actual of [wasm[i][j], resident[i][j]]) {
          const error = Math.abs(actual - reference[i][j]);
          maxError = Math.max(maxError, error);
          if (
            !Number.isFinite(actual) ||
            error > 1e-10 + 1e-9 * Math.abs(reference[i][j])
          ) throw new Error("Correctness gate failed");
        }
      }
    }
    let sink = 0;
    const runs = {
      js: () => matmul(a, b, "js")[0][0],
      wasm: () => matmul(a, b, "wasm")[0][0],
      resident: () => {
        A.multiplyInto(B, C);
        return C.view()[0];
      },
    };
    const names = Object.keys(runs) as (keyof typeof runs)[];
    for (let i = 0; i < 10; i++) for (const name of names) sink += runs[name]();
    const samples: Record<string, number[]> = {
      js: [],
      wasm: [],
      resident: [],
    };
    const iterations = calibrateIterations(names.map((name) => runs[name]));
    for (let batch = 0; batch < 9; batch++) {
      for (let j = 0; j < 3; j++) {
        const name = names[(j + batch) % 3], start = performance.now();
        for (let i = 0; i < iterations; i++) sink += runs[name]();
        samples[name].push((performance.now() - start) / iterations);
      }
    }
    if (names.some((name) => !timingUsable(samples[name], iterations))) {
      throw new Error(
        "Timing unresolved: below timer resolution. Try a larger matrix.",
      );
    }
    return {
      n,
      iterations,
      warmups: 10,
      batches: 9,
      samples,
      medians: Object.fromEntries(names.map((k) => [k, median(samples[k])])),
      maxError,
      sink,
      scope:
        "Milliseconds per product. JS/WASM include packing and full nested output allocation; resident excludes initial upload and reads one output cell. These are different data-residency contracts, not interchangeable speed claims.",
    };
  } finally {
    A.dispose();
    B.dispose();
    C.dispose();
  }
}
