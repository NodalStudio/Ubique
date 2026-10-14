/** Compare API costs separately from resident kernels. Run outside other tests/builds. */
import { DenseMatrix, matmul } from "../index.ts";
import {
  BENCHMARK_SEED,
  calibrateIterations,
  medianTime,
  resultsAgree,
  seededRandom,
  timeBatch,
  timingUsable,
} from "./benchmark_helpers.ts";
import { cpus } from "node:os";

const random = seededRandom();
const baselinePath = Deno.args.find((a) => a.startsWith("--baseline="))?.slice(
  11,
);
const baseline = baselinePath ? await import(baselinePath) : undefined;
const simd = Deno.args.includes("--simd")
  ? await import("../rs_lib/pkg_simd/rs_lib.js")
  : undefined;
const output = Deno.args.find((a) => a.startsWith("--output="))?.slice(9) ??
  "benchmarks/matrices.json";
const results = [];
for (
  const [m, k, n] of [
    [2, 2, 2],
    [10, 10, 10],
    [16, 16, 16],
    [32, 32, 32],
    [64, 64, 64],
    [100, 100, 100],
    [250, 250, 250],
    [500, 500, 500],
    [8, 512, 8],
    [512, 8, 64],
  ]
) {
  const a = Array.from(
    { length: m },
    () => Array.from({ length: k }, () => random() * 2 - 1),
  );
  const b = Array.from(
    { length: k },
    () => Array.from({ length: n }, () => random() * 2 - 1),
  );
  const expected = matmul(a, b, "js");
  const ra = DenseMatrix.from(a),
    rb = DenseMatrix.from(b),
    rc = new DenseMatrix(m, n);
  const variants: {
    name: string;
    fn: () => unknown;
    read: () => unknown;
    samples: number[];
  }[] = [];
  for (const backend of ["js", "wasm", "auto"] as const) {
    const fn = () => matmul(a, b, backend);
    variants.push({ name: `nested/${backend}`, fn, read: fn, samples: [] });
  }
  variants.push({
    name: "resident/scalar",
    fn: () => ra.multiplyInto(rb, rc),
    read: () => rc.toArray(),
    samples: [],
  });
  if (baseline) {
    variants.push({
      name: "nested/baseline",
      fn: () => baseline.mtimes(a, b),
      read: () => baseline.mtimes(a, b),
      samples: [],
    });
  }
  const simdBuffers = [];
  if (simd) {
    const sa = new simd.MatrixBuffer(m, k),
      sb = new simd.MatrixBuffer(k, n),
      sc = new simd.MatrixBuffer(m, n);
    simdBuffers.push(sa, sb, sc);
    const fill = (buffer: { data_ptr(): number }, values: number[][]) => {
      const v = new Float64Array(
        (simd.matrix_memory() as WebAssembly.Memory).buffer,
        buffer.data_ptr(),
        values.length * values[0].length,
      );
      values.forEach((row, i) =>
        row.forEach((x, j) => v[j * values.length + i] = x)
      );
    };
    fill(sa, a);
    fill(sb, b);
    variants.push({
      name: "resident/simd",
      fn: () => sa.multiply_into(sb, sc),
      read: () => {
        const v = new Float64Array(
          (simd.matrix_memory() as WebAssembly.Memory).buffer,
          sc.data_ptr(),
          m * n,
        );
        return Array.from(
          { length: m },
          (_, i) => Array.from({ length: n }, (_, j) => v[j * m + i]),
        );
      },
      samples: [],
    });
    variants.push({
      name: "resident/scalar-raw",
      fn: () => rawA.multiply_into(rawB, rawC),
      read: () => {
        const v = new Float64Array(
          (scalar.matrix_memory() as WebAssembly.Memory).buffer,
          rawC.data_ptr(),
          m * n,
        );
        return Array.from(
          { length: m },
          (_, i) => Array.from({ length: n }, (_, j) => v[j * m + i]),
        );
      },
      samples: [],
    });
  }
  // Raw scalar bindings make the SIMD comparison use the exact same API.
  const scalar = await import("../rs_lib/pkg/rs_lib.js");
  const rawA = new scalar.MatrixBuffer(m, k),
    rawB = new scalar.MatrixBuffer(k, n),
    rawC = new scalar.MatrixBuffer(m, n);
  const fillScalar = (buffer: { data_ptr(): number }, values: number[][]) => {
    const v = new Float64Array(
      (scalar.matrix_memory() as WebAssembly.Memory).buffer,
      buffer.data_ptr(),
      values.length * values[0].length,
    );
    values.forEach((row, i) =>
      row.forEach((x, j) => v[j * values.length + i] = x)
    );
  };
  fillScalar(rawA, a);
  fillScalar(rawB, b);
  try {
    for (const v of variants) {
      v.fn();
      if (!resultsAgree(v.read(), expected)) {
        throw new Error(`Incorrect ${v.name}: ${m}x${k}x${n}`);
      }
      for (let i = 0; i < 10; i++) v.fn();
    }
    const iterations = calibrateIterations(variants.map((v) => v.fn));
    for (let batch = 0; batch < 9; batch++) {
      for (let offset = 0; offset < variants.length; offset++) {
        const v = variants[(batch + offset) % variants.length];
        v.samples.push(timeBatch(v.fn, iterations));
      }
    }
    const row = {
      shape: [m, k, n],
      iterationsPerBatch: iterations,
      variants: variants.map((v) => ({
        name: v.name,
        medianMs: timingUsable(v.samples, iterations)
          ? medianTime(v.samples)
          : null,
        timingResolved: timingUsable(v.samples, iterations),
        samplesMs: v.samples,
      })),
    };
    results.push(row);
    console.log(
      JSON.stringify({
        shape: row.shape,
        ...Object.fromEntries(row.variants.map((v) => [v.name, v.medianMs])),
      }),
    );
  } finally {
    ra.dispose();
    rb.dispose();
    rc.dispose();
    rawA.free();
    rawB.free();
    rawC.free();
    for (const buffer of simdBuffers) buffer.free();
  }
}
await Deno.writeTextFile(
  output,
  JSON.stringify(
    {
      metadata: {
        timestamp: new Date().toISOString(),
        runtime: Deno.version,
        platform: Deno.build,
        cpu: cpus()[0]?.model,
        seed: BENCHMARK_SEED,
        baseline: baselinePath,
        simd: !!simd,
        protocol:
          "10 warmups; calibrated batches targeting >=10ms for fastest variant (100000-op cap); 9 rotating batches; median ms/op; f64; setup excluded; nested includes copies; resident excludes setup and readback",
        tolerance: { absolute: 1e-10, relative: 1e-9 },
      },
      results,
    },
    null,
    2,
  ),
);
