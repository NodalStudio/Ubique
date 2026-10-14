import {
  assert,
  assertAlmostEquals,
  assertEquals,
  assertThrows,
} from "jsr:@std/assert@1.0.14";
import {
  corrcoef,
  cov,
  DenseMatrix,
  matmul,
  median,
  mldivide,
  mrdivide,
  std,
  varc,
} from "../index.ts";
import { matrix_memory } from "../rs_lib/pkg/rs_lib.js";
import { resultsAgree, seededRandom } from "../scripts/benchmark_helpers.ts";

const random = seededRandom(42);
function matrix(m: number, n: number): number[][] {
  return Array.from(
    { length: m },
    () => Array.from({ length: n }, () => random() * 2 - 1),
  );
}
function reference(a: number[][], b: number[][]): number[][] {
  return a.map((row) =>
    b[0].map((_, j) => row.reduce((s, v, k) => s + v * b[k][j], 0))
  );
}
Deno.test("JS, WASM and auto products match an independent rectangular reference", () => {
  for (
    const [m, k, n] of [
      [1, 1, 1],
      [2, 3, 4],
      [4, 3, 2],
      [1, 31, 7],
      [19, 2, 1],
      [31, 33, 35],
      [65, 63, 67],
    ]
  ) {
    const a = matrix(m, k), b = matrix(k, n), before = JSON.stringify([a, b]);
    for (const backend of ["js", "wasm", "auto"] as const) {
      assert(resultsAgree(matmul(a, b, backend), reference(a, b)));
    }
    assertEquals(JSON.stringify([a, b]), before);
  }
});
Deno.test("matrix boundaries reject ragged, empty and incompatible input", () => {
  for (const a of [[], [[]], [[1], [2, 3]]]) {
    assertThrows(() => matmul(a, [[1]]));
  }
  assertThrows(() => matmul([[1, 2]], [[1]]));
  assertThrows(() => matmul([new Array<number>(1)], [[1]]));
  assertThrows(() => new DenseMatrix(0, 1));
  assertThrows(() => new DenseMatrix(2.5, 1));
  assertThrows(() => new DenseMatrix(Number.MAX_SAFE_INTEGER, 1));
});
Deno.test("resident products reuse output, support self multiplication, preserve inputs and release safely", () => {
  const a = DenseMatrix.from([[1, 2], [3, 4]]),
    b = DenseMatrix.from([[5, 6], [7, 8]]),
    out = new DenseMatrix(2, 2);
  try {
    const ptr = out.view().byteOffset;
    assertEquals(a.multiplyInto(b, out), out);
    assertEquals(out.toArray(), [[19, 22], [43, 50]]);
    a.multiplyInto(a, out);
    assertEquals(out.toArray(), [[7, 10], [15, 22]]);
    assertEquals(out.view().byteOffset, ptr);
    assertEquals(a.toArray(), [[1, 2], [3, 4]]);
    assertThrows(() => a.multiplyInto(b, a));
    assertThrows(() => a.multiplyInto(b, b));
    out.setData(new Float64Array([1, 2, 3, 4]));
    assertEquals(out.toArray(), [[1, 2], [3, 4]]);
    out.setData(out.view(), "row-major");
    assertEquals(out.toArray(), [[1, 3], [2, 4]]);
    assertThrows(() => out.setData(new Float64Array(3)));
  } finally {
    a.dispose();
    b.dispose();
    out.dispose();
  }
  out.dispose();
  assertThrows(() => out.view());
  assertThrows(() => out.multiplyInto(out, out));
});
Deno.test("resident view must be reacquired after WASM memory growth", () => {
  const a = DenseMatrix.from([[2, 3]]);
  try {
    const old = a.view();
    (matrix_memory() as WebAssembly.Memory).grow(1);
    assertEquals(old.byteLength, 0);
    assertEquals(a.toArray(), [[2, 3]]);
    a.view()[1] = 7;
    assertEquals(a.toArray(), [[2, 7]]);
  } finally {
    a.dispose();
  }
});
Deno.test("stable statistics retain normalization and do not mutate median inputs", () => {
  const x = [1e12 + 1, 1e12 + 2, 1e12 + 3];
  assertAlmostEquals(varc(x), 1);
  assertAlmostEquals(varc(x, 0), 2 / 3);
  assertAlmostEquals(std(x), 1);
  assertAlmostEquals(corrcoef(x, [2, 4, 6])[0][1], 1);
  assertAlmostEquals(corrcoef(x, [6, 4, 2])[0][1], -1);
  assert(Number.isNaN(corrcoef([1, 1], [2, 3])[0][1]));
  const a = [9, -1, 5, 3];
  assertEquals(median(a), 4);
  assertEquals(a, [9, -1, 5, 3]);
});
Deno.test("division solves satisfy left and right residuals, including multiple RHS", () => {
  const a = [[0, 2, 1], [1, 3, 0], [4, 1, 2]], b = [[2, 5], [1, 4], [3, 6]];
  assert(resultsAgree(matmul(a, mldivide(a, b)), b));
  const c = [[2, 1, 3], [5, 4, 6]];
  assert(resultsAgree(matmul(mrdivide(c, a), a), c));
});
Deno.test("benchmark comparator never hides small wrong results or nonfinite failures", () => {
  assert(!resultsAgree(1e-7, 0));
  assert(!resultsAgree(NaN, NaN));
  assert(!resultsAgree(Infinity, Infinity));
  assert(!resultsAgree([1], [[1]]));
  assert(resultsAgree([1e10], [1e10 + 1]));
  const a = seededRandom(), b = seededRandom();
  for (let i = 0; i < 20; i++) assertEquals(a(), b());
});

Deno.test("fractional variations survive a large translation in every statistics path", () => {
  // Binary fractions retain exactly the same differences after translation.
  // This catches mean rounding that the integer-offset examples missed.
  const x = [0, 0.25, 0.75, 1.125, -0.5, 0.0625];
  const y = [0.5, -0.125, 0.875, 0.25, -0.75, 0.0625];
  const translatedX = x.map((v) => v + 1e12);
  const translatedY = y.map((v) => v - 1e12);
  for (const flag of [0, 1] as const) {
    assertAlmostEquals(varc(translatedX, flag), varc(x, flag), 1e-14);
    assertAlmostEquals(std(translatedX, flag), std(x, flag), 1e-14);
    for (
      const [actual, expected] of [
        [corrcoef(translatedX, translatedY, flag), corrcoef(x, y, flag)],
        [cov(translatedX, translatedY, flag), cov(x, y, flag)],
        [
          cov(translatedX.map((v, i) => [v, translatedY[i]]), flag),
          cov(x.map((v, i) => [v, y[i]]), flag),
        ],
        [
          corrcoef(translatedX.map((v, i) => [v, translatedY[i]]), flag),
          corrcoef(x.map((v, i) => [v, y[i]]), flag),
        ],
      ]
    ) {
      const a = actual as number[][], b = expected as number[][];
      a.forEach((row, i) =>
        row.forEach((v, j) => assertAlmostEquals(v, b[i][j], 1e-14))
      );
    }
  }
});
