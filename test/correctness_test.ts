import {
  assert,
  assertAlmostEquals,
  assertEquals,
  assertThrows,
} from "jsr:@std/assert@1.0.14";
import {
  det,
  drawdown,
  factorize,
  inv,
  irr,
  issingular,
  linearreg,
  linsolve,
  lu,
  martinratio,
  matmul,
  mpower,
  painindex,
  painratio,
  ulcerindex,
} from "../index.ts";

function close(a: number[][], b: number[][], tol = 1e-12) {
  assertEquals(a.map((r) => r.length), b.map((r) => r.length));
  a.forEach((r, i) => r.forEach((v, j) => assertAlmostEquals(v, b[i][j], tol)));
}
const identity = (n: number) =>
  Array.from(
    { length: n },
    (_, i) => Array.from({ length: n }, (_, j) => i === j ? 1 : 0),
  );
Deno.test("determinants preserve scale, including valid 1x1 matrices", () => {
  assertEquals(det([[2]]), 2);
  assertAlmostEquals(det([[1e-8, 0], [0, 1e-8]]) / 1e-16, 1, 1e-14);
  assertAlmostEquals(det([[1e-100, 0], [0, 1e-100]]) / 1e-200, 1, 1e-14);
  assertEquals(det([[1, 2], [2, 4]]), 0);
  assertThrows(() => det([[NaN]]));
  assertThrows(() => det([[1], [2, 3]]));
});
Deno.test("singularity uses scaled pivots rather than original diagonal entries", () => {
  assertEquals(issingular([[0, 1], [1, 0]]), false);
  assertEquals(issingular([[1, 2], [2, 4]]), true);
  assertEquals(issingular([[1, 2, 3], [4, 5, 6], [7, 8, 9]]), true);
  for (const scale of [1e-150, 1, 1e150]) {
    assertEquals(
      issingular([[scale, 2 * scale], [2 * scale, 4 * scale]]),
      true,
    );
    assertEquals(issingular([[scale, 0], [0, scale]]), false);
  }
  assertEquals(issingular([[1e-150, 0], [0, 1e150]]), false);
  assertEquals(issingular([[1, 1], [1, 1 + 1e-10]], 1e-8), true);
  assertThrows(() => issingular([[1]], -1));
});
Deno.test("inverse and solves reject rank deficiency on both sides of WASM dispatch", () => {
  assertThrows(() => inv([[1, 2, 3], [4, 5, 6], [7, 8, 9]]));
  for (const n of [1, 2, 3, 10, 11, 20]) {
    const a = identity(n);
    a[n - 1] = a[0].slice();
    if (n === 1) a[0][0] = 0;
    assertThrows(() => inv(a));
    assertThrows(() => linsolve(a, new Array(n).fill(1)));
    const well = identity(n).map((row, i) =>
      row.map((v, j) => v * (i + 2) + (i === j ? 0 : 0.01))
    );
    close(matmul(well, inv(well)), identity(n));
    close(matmul(inv(well), well), identity(n));
  }
});
Deno.test("reusable solves preserve inputs and handle independently scaled equations", () => {
  const a = [[0, 2, 1], [1, 3, 0], [4, 1, 2]], saved = structuredClone(a);
  const f = factorize(a);
  for (const b of [[[2, 5], [1, 4], [3, 6]], [[1], [0], [1]]]) {
    close(matmul(a, f.solve(b)), b);
  }
  assertEquals(a, saved);
  assertEquals(factorize([[1e-150, 0], [0, 1e150]]).solve([2e-150, 3e150]), [
    2,
    3,
  ]);
  close(inv([[1e-150, 0], [0, 1e150]]), [[1e150, 0], [0, 1e-150]], 1e-12);
  assertThrows(() => f.solve([1, 2]));
  assertThrows(() => f.solve([1, NaN, 3]));
});
Deno.test("rectangular LU reconstructs row-permuted input with compatible factor shapes", () => {
  for (
    const a of [[[1, 2], [3, 4], [5, 6]], [[1, 2, 3], [4, 5, 7]], [[1], [2], [
      3,
    ]], [[1, 2, 3]]]
  ) {
    const { L, U, P } = lu(a), r = Math.min(a.length, a[0].length);
    assertEquals(L.length, a.length);
    assertEquals(L[0].length, r);
    assertEquals(U.length, r);
    assertEquals(U[0].length, a[0].length);
    close(matmul(L, U), P.map((i) => a[i]));
  }
});
Deno.test("integer powers implement identity, inverse, squaring and explicit exponent limits", () => {
  const a = [[2, 0], [0, 3]];
  assertEquals(mpower(a, 0), identity(2));
  assertEquals(mpower(a, 1), a);
  assertEquals(mpower(a, 10), [[1024, 0], [0, 59049]]);
  close(mpower(a, -2), [[0.25, 0], [0, 1 / 9]]);
  assertEquals(mpower(identity(2), Number.MAX_SAFE_INTEGER), identity(2));
  for (const p of [0.5, NaN, Infinity, Number.MAX_SAFE_INTEGER + 1]) {
    assertThrows(() => mpower(a, p));
  }
  assertThrows(() => mpower([[1, 2], [2, 4]], -1));
});
Deno.test("IRR converges for large/negative rates, respects dates and verifies NPV", () => {
  assertAlmostEquals(irr([-100, 1000]), 9, 1e-10);
  assertAlmostEquals(irr([-100, 1]), -0.99, 1e-12);
  assertAlmostEquals(irr([-100, 121], [0, 2]), 0.1, 1e-12);
  assertAlmostEquals(irr([-100, 121], [0, 365], 365), 0.21, 1e-12);
  assertAlmostEquals(
    irr([-100, 230, -132], undefined, undefined, 0.09),
    0.1,
    1e-10,
  );
  assertAlmostEquals(
    irr([-100, 230, -132], undefined, undefined, 0.21),
    0.2,
    1e-10,
  );
  const cash = [-1000, 100, 250, 400, 600], rate = irr(cash);
  const npv = cash.reduce((sum, c, t) => sum + c / (1 + rate) ** t, 0);
  assert(Math.abs(npv) < 1e-9);
  for (const cf of [[1, 2], [-1, -2], [1], [-1, NaN]]) {
    assertThrows(() => irr(cf));
  }
  assertThrows(() => irr([-100, 100], [0]));
  assertThrows(() => irr([-100, 100], [0, 0]));
  assertThrows(() => irr([-100, 100], undefined, 0));
  assertThrows(() => irr([-100, 100], undefined, undefined, -1));
  assertThrows(() => irr([-100, 50, -100]));
});
Deno.test("drawdown starts from wealth one, includes total loss and defines peak/trough periods", () => {
  const first = drawdown([-0.1]);
  assertAlmostEquals(first.maxdd, 0.1, 1e-15);
  assertEquals(first.maxddrecov, [0, 1]);
  const d = drawdown([-0.1, -0.1, 0.3]);
  assertAlmostEquals(d.dd[1], 0.19, 1e-15);
  assertEquals(d.dd[2], 0);
  assertAlmostEquals(
    drawdown([-0.1], "geometric").maxdd,
    -Math.log(0.9),
    1e-15,
  );
  assertEquals(drawdown([-1, 0.5]).dd, [1, 1]);
  assertEquals(drawdown([0.1, 0.1]).maxddrecov, [0, 0]);
  assertThrows(() => drawdown([-1.1]));
  assertThrows(() => drawdown([NaN]));
});
Deno.test("regression is translation-stable and rejects unidentifiable predictors", () => {
  const fit = linearreg([3, 5, 7], [1e12 + 1, 1e12 + 2, 1e12 + 3]);
  assertAlmostEquals(fit.beta, 2, 1e-12);
  assertEquals(fit.alpha, 1 - 2e12);
  assertAlmostEquals(fit.rsq, 1, 1e-12);
  assertAlmostEquals(fit.fun(1e12 + 4), 9, 1e-12);
  const constant = linearreg([5, 5, 5], [1, 2, 3]);
  assertEquals(constant.beta, 0);
  assertEquals(constant.fun(4), 5);
  assert(Number.isNaN(constant.rsq));
  assertThrows(() => linearreg([1, 2], [1, 1]));
  assertThrows(() => linearreg([1, 2], [1]));
  assertThrows(() => linearreg([1, NaN], [1, 2]));
});

Deno.test("drawdown-derived ratios match an independent wealth path including initial loss", () => {
  const returns = [
    -.005,
    .081,
    .04,
    -.037,
    -.061,
    .058,
    -.049,
    -.021,
    .062,
    .058,
  ];
  let wealth = 1, peak = 1;
  const dd: number[] = [], logdd: number[] = [];
  for (const r of returns) {
    wealth *= 1 + r;
    peak = Math.max(peak, wealth);
    dd.push(1 - wealth / peak);
    logdd.push(Math.log(peak / wealth));
  }
  const average = (a: number[]) => a.reduce((s, v) => s + v, 0) / a.length;
  const annual = wealth ** (12 / returns.length) - 1;
  assertAlmostEquals(painindex(returns), average(dd), 1e-14);
  assertAlmostEquals(
    ulcerindex(returns),
    Math.sqrt(average(dd.map((v) => v * v))),
    1e-14,
  );
  assertAlmostEquals(painratio(returns, 0, 12), annual / average(logdd), 1e-12);
  assertAlmostEquals(
    martinratio(returns, 0, 12),
    annual / Math.sqrt(average(dd.map((v) => v * v))),
    1e-12,
  );
});
