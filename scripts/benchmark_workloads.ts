/** Before/after workloads, including all application-level setup and consumption. */
import * as current from "../index.ts";
import { measurePair, seededRandom } from "./benchmark_helpers.ts";
import { cpus, loadavg } from "node:os";
const baselinePath = Deno.args.find((a) => a.startsWith("--baseline="))?.slice(
  11,
);
if (!baselinePath) {
  throw new Error("Supply --baseline=file:///path/to/old/index.ts");
}
const baseline = await import(baselinePath);
const random = seededRandom();
const x = Array.from({ length: 100_000 }, () => random() * 2 - 1);
const y = x.map((v) => 0.7 * v + 0.3 * (random() * 2 - 1));
const cases: {
  name: string;
  contract: string;
  before: () => unknown;
  after: () => unknown;
}[] = [
  {
    name: "Variance of 100,000 observations",
    contract:
      "Same immutable f64 JS array; sample variance; all API work included",
    before: () => baseline.varc(x),
    after: () => current.varc(x),
  },
  {
    name: "Correlation of 100,000 paired observations",
    contract: "Same two immutable f64 JS arrays; full 2x2 correlation output",
    before: () => baseline.corrcoef(x, y),
    after: () => current.corrcoef(x, y),
  },
  {
    name: "Median of 100,000 observations",
    contract: "Same immutable f64 JS array; copying and sorting included",
    before: () => baseline.median(x),
    after: () => current.median(x),
  },
];
for (const n of [2, 10, 32]) {
  const frames = 1000;
  const a = Array.from(
    { length: n },
    () => Array.from({ length: n }, () => random() * 2 - 1),
  );
  const b = Array.from(
    { length: n },
    () => Array.from({ length: n }, () => random() * 2 - 1),
  );
  const nested =
    (multiply: (a: number[][], b: number[][]) => number[][]) => () => {
      const input = a.map((row) => row.slice());
      let checksum = 0;
      for (let frame = 0; frame < frames; frame++) {
        input[0][0] = frame / frames;
        const out = multiply(input, b);
        const index = frame % (n * n);
        checksum += out[Math.floor(index / n)][index % n];
      }
      return checksum;
    };
  const resident = () => {
    const input = current.DenseMatrix.from(a),
      rhs = current.DenseMatrix.from(b),
      out = new current.DenseMatrix(n, n);
    let checksum = 0;
    try {
      for (let frame = 0; frame < frames; frame++) {
        input.view()[0] = frame / frames;
        input.multiplyInto(rhs, out);
        const index = frame % (n * n);
        checksum += out.view()[(index % n) * n + Math.floor(index / n)];
      }
      return checksum;
    } finally {
      input.dispose();
      rhs.dispose();
      out.dispose();
    }
  };
  const contract =
    `1,000 ${n}x${n} products, input changes each iteration; consume one rotating result entry each iteration; include initial copies, allocation, readback and disposal; scalar WASM`;
  cases.push({
    name: `${n}x${n} interactive updates: old API to resident API`,
    contract,
    before: nested(baseline.mtimes),
    after: resident,
  });
  cases.push({
    name: `${n}x${n} interactive updates: current nested to resident API`,
    contract,
    before: nested(current.mtimes),
    after: resident,
  });
}
const report = {
  metadata: {
    timestamp: new Date().toISOString(),
    cpu: cpus()[0]?.model,
    runtime: Deno.version,
    baseline: baselinePath,
    loadBefore: loadavg(),
    protocol:
      "Correctness gate before timing; 10 warmups; 9 alternating batches; median ms/workload; all samples retained",
  },
  results: [] as unknown[],
};
for (const test of cases) {
  const measured = measurePair(test.before, test.after, 20);
  const result = {
    name: test.name,
    contract: test.contract,
    beforeMs: measured.aMedian,
    afterMs: measured.bMedian,
    speedup: measured.aMedian / measured.bMedian,
    beforeSamples: measured.aSamples,
    afterSamples: measured.bSamples,
    iterationsPerBatch: measured.iterations,
  };
  report.results.push(result);
  console.log(JSON.stringify(result));
  // Preserve completed expensive cases even if a later workload is interrupted.
  await Deno.writeTextFile(
    "benchmarks/workloads-2026-10-13.json",
    JSON.stringify(report, null, 2),
  );
}
await Deno.writeTextFile(
  "benchmarks/workloads-2026-10-13.json",
  JSON.stringify({ ...report, loadAfter: loadavg() }, null, 2),
);
