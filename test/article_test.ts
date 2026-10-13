import {
  assertAlmostEquals,
  assertEquals,
  assertThrows,
} from "jsr:@std/assert@1.0.14";
import { fitPoints, matrixExperiment } from "../scripts/article_core.ts";
Deno.test("browser regression keeps predictions under large x translation", () => {
  const a = fitPoints([[1, 3], [2, 5], [3, 7]]),
    b = fitPoints([[1, 3], [2, 5], [3, 7]], 1e12);
  assertEquals(a.predicted, b.predicted);
  assertEquals(b.beta, 2);
  assertThrows(() => fitPoints([[1, 2], [1, 3]]));
});
Deno.test("matrix lab validates each contract and retains nine raw timing samples", () => {
  const r = matrixExperiment(2);
  assertEquals(Object.keys(r.samples), ["js", "wasm", "resident"]);
  Object.values(r.samples).forEach((v) => assertEquals(v.length, 9));
  assertAlmostEquals(r.maxError, 0, 1e-12);
  assertThrows(() => matrixExperiment(129));
});

import { multiplyTeaching } from "../scripts/tutorial_kernels.ts";
Deno.test("teaching kernels agree with an independent integer dot product on ragged tile edges", () => {
  for (const [m, k, n] of [[2, 3, 4], [31, 65, 7], [1, 3, 1]]) {
    const a = Float64Array.from({ length: m * k }, (_, i) => i % 7 - 3),
      b = Float64Array.from({ length: k * n }, (_, i) => i % 5 - 2);
    const expected = Float64Array.from({ length: m * n }, (_, q) => {
      const i = Math.floor(q / n), j = q % n;
      return Array.from({ length: k }, (_, p) => a[i * k + p] * b[p * n + j])
        .reduce((s, v) => s + v, 0);
    });
    for (const mode of ["dot", "row", "tile"] as const) {
      for (const tile of [1, 4, 32, 128]) {
        assertEquals(multiplyTeaching(a, b, m, k, n, mode, tile), expected);
      }
    }
  }
  assertThrows(() =>
    multiplyTeaching(
      new Float64Array(1),
      new Float64Array(1),
      1,
      1,
      1,
      "tile",
      0,
    )
  );
});
