import {
  assertAlmostEquals,
  assertEquals,
  assertThrows,
} from "jsr:@std/assert";
import {
  downsiderisk,
  moment,
  normcdf,
  norminv,
  omegaratio,
  paramcondvar,
  paramvar,
  prctile,
  upsidepot,
  zscore,
} from "../index.ts";

Deno.test("normal tails retain relative accuracy instead of cancelling to zero", () => {
  // SciPy 1.18.1 reference values; relative error matters in a tiny tail.
  assertAlmostEquals(normcdf(-10) / 7.61985302416047e-24, 1, 5e-13);
  assertAlmostEquals(norminv(1e-100), -21.273453560965322, 1e-12);
});
Deno.test("partial moments use all observations and MAR-relative gains", () => {
  assertAlmostEquals(
    downsiderisk([.1, -.2, .05, -.1]),
    Math.sqrt(.05 / 4),
    1e-14,
  );
  assertAlmostEquals(upsidepot([.05, .03, .08, -.02], .04), .0125, 1e-14);
  assertAlmostEquals(omegaratio([.05, .03, .08, -.02], .02), 2.5, 1e-14);
  assertThrows(() => downsiderisk(Infinity));
});
Deno.test("normal loss horizon and matrix shape", () => {
  const means = [[.01, .02], [.03, .04]], sigma = [[1, 1], [1, 1]];
  const result = paramvar(means, sigma, .95, 100, 4) as number[][];
  assertEquals(result.map((row) => row.length), [2, 2]);
  assertAlmostEquals(result[1][1], (2 * 1.6448536269514722 - .16) * 100, 1e-10);
  assertAlmostEquals(
    paramcondvar(.01, 1, .95, 100, 4),
    (2 * 2.0627128075074257 - .04) * 100,
    1e-10,
  );
  assertThrows(() => paramvar([0, 0], [1]));
  assertThrows(() => paramvar(0, -1));
  assertThrows(() => paramcondvar(0, 1, 1));
});
Deno.test("translated moments and column zscores", () => {
  const x = [1e12, 1e12 + 1, 1e12 + 2];
  assertAlmostEquals(moment(x, 2), 2 / 3, 1e-14);
  assertEquals(zscore([[1, 10], [2, 20], [3, 30]], 1, 1), [[-1, -1], [0, 0], [
    1,
    1,
  ]]);
  const unsorted = [4, 1, 3, 2];
  assertEquals(prctile(unsorted, 25), 1.5);
  assertEquals(unsorted, [4, 1, 3, 2]);
  assertThrows(() => prctile([], 50));
  assertThrows(() => prctile([1, 2], NaN));
});
