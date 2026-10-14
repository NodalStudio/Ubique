/** Compare shipped versions on identical finite inputs; run without other jobs. */
import * as current from "../index.ts";
import {
  BENCHMARK_SEED,
  measurePair,
  seededRandom,
} from "./benchmark_helpers.ts";
import { cpus, loadavg } from "node:os";
const baselinePath = Deno.args.find((a) => a.startsWith("--baseline="))?.slice(
  11,
);
if (!baselinePath) {
  throw new Error("Supply --baseline=file:///.../ubique/esm/index.js");
}
const baseline = await import(baselinePath);
const output = Deno.args.find((a) => a.startsWith("--output="))?.slice(9) ||
  "benchmarks/statistics-1.0.4.json";
const random = seededRandom(), results = [];
for (const n of [32, 1000, 10000]) {
  const x = Array.from({ length: n }, () => random() * 2 - 1);
  for (const op of ["prctile", "mad", "moment"] as const) {
    const call = (u: typeof current) =>
      op === "prctile"
        ? u.prctile(x, 75)
        : op === "moment"
        ? u.moment(x, 4)
        : u.mad(x);
    const result = measurePair(() => call(baseline), () => call(current), 1);
    const row = {
      operation: op,
      n,
      ...result,
      baselineOverCurrent: result.aMedian / result.bMedian,
    };
    results.push(row);
    console.log(JSON.stringify(row));
  }
}
await Deno.writeTextFile(
  output,
  JSON.stringify(
    {
      metadata: {
        timestamp: new Date().toISOString(),
        runtime: Deno.version,
        cpu: cpus()[0]?.model,
        loadAverage: loadavg(),
        seed: BENCHMARK_SEED,
        baseline: baselinePath,
        protocol:
          "1.0.3 baseline and current; 10 warmups; calibrated 9 alternating batches; finite correctness gate; median ms/op; seeded f64 vectors; includes allocations",
      },
      results,
    },
    null,
    2,
  ),
);
