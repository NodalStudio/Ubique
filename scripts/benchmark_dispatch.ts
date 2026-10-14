/** Experimental JS loop-unrolling probe; not a production backend. */
import { matmul } from "../index.ts";
import { matrixShape } from "../lib/internal/matrix.ts";
import {
  calibrateIterations,
  medianTime,
  resultsAgree,
  seededRandom,
  timeBatch,
  timingUsable,
} from "../scripts/benchmark_helpers.ts";
const random = seededRandom();
function unrolled(a: number[][], b: number[][]) {
  const [m, k] = matrixShape(a), [bk, n] = matrixShape(b);
  if (k !== bk) throw Error("shape");
  const out = Array.from({ length: m }, () => new Array<number>(n).fill(0));
  for (let i = 0; i < m; i++) {
    const row = out[i];
    for (let p = 0; p < k; p++) {
      const av = a[i][p], br = b[p];
      let j = 0;
      for (; j + 3 < n; j += 4) {
        row[j] += av * br[j];
        row[j + 1] += av * br[j + 1];
        row[j + 2] += av * br[j + 2];
        row[j + 3] += av * br[j + 3];
      }
      for (; j < n; j++) row[j] += av * br[j];
    }
  }
  return out;
}
const rows = [];
for (
  const [m, k, n] of [
    [2, 2, 2],
    [8, 8, 8],
    [16, 16, 16],
    [24, 24, 24],
    [32, 32, 32],
    [48, 48, 48],
    [64, 64, 64],
    [100, 100, 100],
    [128, 128, 128],
    [8, 512, 8],
    [512, 8, 64],
    [16, 256, 16],
    [64, 8, 512],
  ]
) {
  const a = Array.from({ length: m }, () => Array.from({ length: k }, random)),
    b = Array.from({ length: k }, () => Array.from({ length: n }, random));
  const variants = [["js", () => matmul(a, b, "js")], [
    "unrolled",
    () => unrolled(a, b),
  ], ["wasm", () => matmul(a, b, "wasm")]] as const;
  const expected = variants[0][1]();
  const samples = variants.map(() => [] as number[]);
  for (const [, fn] of variants) {
    if (!resultsAgree(fn(), expected)) throw Error("correctness");
    for (let i = 0; i < 20; i++) fn();
  }
  const it = calibrateIterations(variants.map((v) => v[1]));
  for (let batch = 0; batch < 9; batch++) {
    for (let off = 0; off < variants.length; off++) {
      const i = (batch + off) % variants.length;
      samples[i].push(timeBatch(variants[i][1], it));
    }
  }
  const row = {
    shape: [m, k, n],
    iterations: it,
    variants: variants.map(([name], i) => ({
      name,
      medianMs: medianTime(samples[i]),
      samples: samples[i],
      resolved: timingUsable(samples[i], it),
    })),
  };
  rows.push(row);
  console.log(JSON.stringify(row));
}
await Deno.writeTextFile(
  Deno.args.find((a) => a.startsWith("--output="))?.slice(9) ||
    "benchmarks/dispatch-probe.json",
  JSON.stringify({ runtime: Deno.version, rows }, null, 2),
);
