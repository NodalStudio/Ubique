import type { array, matrix, numarraymatrix } from "../types.d.ts";
import {
  cov,
  diag,
  isarray,
  ismatrix,
  rdivide,
  repmat,
  sqrt,
  transpose,
} from "../../index.ts";

/**
 * Correlation coefficients of arrays.
 *
 * Calculates the correlation coefficients between arrays or matrices. Returns
 * the sample correlation coefficient matrix for matrix input, or the correlation matrix
 * between two input arrays/matrices.
 *
 * @param x Input array or matrix
 * @param y Optional second input array or matrix
 * @param flag Optional Bessel's correction (0: population, 1: sample). Default is 1
 * @returns Matrix of correlation coefficients
 * @throws When input dimensions are incompatible
 *
 * @example Perfect positive correlation between identical arrays
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * const actual = corrcoef([1, 2, 3], [1, 2, 3]);
 * const expected = [
 *   [1, 1],
 *   [1, 1],
 * ];
 * assertEquals(actual.map(row => row.length), expected.map(row => row.length));
 * actual.forEach((row, i) => row.forEach((v, j) => assertAlmostEquals(v, expected[i][j], 1e-12)));
 *
 * ```
 *
 * @example Perfect negative correlation between reversed arrays
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * const actual = corrcoef([1, 2, 3], [3, 2, 1]);
 * const expected = [
 *   [1, -1],
 *   [-1, 1],
 * ];
 * assertEquals(actual.map(row => row.length), expected.map(row => row.length));
 * actual.forEach((row, i) => row.forEach((v, j) => assertAlmostEquals(v, expected[i][j], 1e-12)));
 *
 * ```
 *
 * @example Zero correlation between orthogonal sequences
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * const actual = corrcoef([1, -1, 1, -1], [1, 1, -1, -1]);
 * const expected = [
 *   [1, 0],
 *   [0, 1],
 * ];
 * assertEquals(actual.map(row => row.length), expected.map(row => row.length));
 * actual.forEach((row, i) => row.forEach((v, j) => assertAlmostEquals(v, expected[i][j], 1e-12)));
 *
 * ```
 *
 * @example Explicit sample flag matches the default behaviour
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(
 *   corrcoef([2, 4, 6, 8], [1, 2, 3, 4]),
 *   corrcoef([2, 4, 6, 8], [1, 2, 3, 4], 1),
 * );
 *
 * ```
 *
 * @example Population flag (0) is supported for array inputs
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * const actual = corrcoef([1, 2, 3], [3, 2, 1], 0);
 * const expected = [
 *   [1, -1],
 *   [-1, 1],
 * ];
 * assertEquals(actual.map(row => row.length), expected.map(row => row.length));
 * actual.forEach((row, i) => row.forEach((v, j) => assertAlmostEquals(v, expected[i][j], 1e-12)));
 *
 * ```
 *
 * @example Matrix input with linearly related columns
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * const actual = corrcoef([
 *   [1, 2, -1],
 *   [2, 4, -2],
 *   [3, 6, -3],
 * ]);
 * const expected = [
 *   [1, 1, -1],
 *   [1, 1, -1],
 *   [-1, -1, 1],
 * ];
 * assertEquals(actual.map(row => row.length), expected.map(row => row.length));
 * actual.forEach((row, i) => row.forEach((v, j) => assertAlmostEquals(v, expected[i][j], 1e-12)));
 *
 * ```
 *
 * @example Matrix input with independent columns
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * const actual = corrcoef([
 *   [1, 1, -1],
 *   [-1, 1, 1],
 *   [1, -1, 1],
 *   [-1, -1, -1],
 * ]);
 * const expected = [
 *   [1, 0, 0],
 *   [0, 1, 0],
 *   [0, 0, 1],
 * ];
 * assertEquals(actual.map(row => row.length), expected.map(row => row.length));
 * actual.forEach((row, i) => row.forEach((v, j) => assertAlmostEquals(v, expected[i][j], 1e-12)));
 *
 * ```
 *
 * @example Symmetry for swapped array inputs
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(
 *   corrcoef([1, 2, 3, 4], [4, 3, 2, 1]),
 *   corrcoef([4, 3, 2, 1], [1, 2, 3, 4]),
 * );
 *
 * ```
 *
 * @example Population flag also works for matrix inputs
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * const actual = corrcoef([
 *   [1, 1, -1],
 *   [-1, 1, 1],
 *   [1, -1, 1],
 *   [-1, -1, -1],
 * ], 0);
 * const expected = [
 *   [1, 0, 0],
 *   [0, 1, 0],
 *   [0, 0, 1],
 * ];
 * assertEquals(actual.map(row => row.length), expected.map(row => row.length));
 * actual.forEach((row, i) => row.forEach((v, j) => assertAlmostEquals(v, expected[i][j], 1e-12)));
 *
 * ```
 *
 * @example Matrix correlation handles alternating columns
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * const actual = corrcoef([
 *   [1, 0],
 *   [0, 1],
 *   [1, 0],
 *   [0, 1],
 * ]);
 * const expected = [
 *   [1, -1],
 *   [-1, 1],
 * ];
 * assertEquals(actual.map(row => row.length), expected.map(row => row.length));
 * actual.forEach((row, i) => row.forEach((v, j) => assertAlmostEquals(v, expected[i][j], 1e-12)));
 * ```
 */
export default function corrcoef(x: array, y: array, flag?: number): matrix;
/**
 * Correlation coefficients of arrays.
 *
 * Calculates the correlation coefficients between arrays or matrices. Returns
 * the sample correlation coefficient matrix for matrix input, or the correlation matrix
 * between two input arrays/matrices.
 *
 * @param x Input array or matrix
 * @param y Optional second input array or matrix
 * @param flag Optional Bessel's correction (0: population, 1: sample). Default is 1
 * @returns Matrix of correlation coefficients
 * @throws When input dimensions are incompatible
 *
 * @example Perfect positive correlation between identical arrays
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * const actual = corrcoef([1, 2, 3], [1, 2, 3]);
 * const expected = [
 *   [1, 1],
 *   [1, 1],
 * ];
 * assertEquals(actual.map(row => row.length), expected.map(row => row.length));
 * actual.forEach((row, i) => row.forEach((v, j) => assertAlmostEquals(v, expected[i][j], 1e-12)));
 *
 * ```
 *
 * @example Perfect negative correlation between reversed arrays
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * const actual = corrcoef([1, 2, 3], [3, 2, 1]);
 * const expected = [
 *   [1, -1],
 *   [-1, 1],
 * ];
 * assertEquals(actual.map(row => row.length), expected.map(row => row.length));
 * actual.forEach((row, i) => row.forEach((v, j) => assertAlmostEquals(v, expected[i][j], 1e-12)));
 *
 * ```
 *
 * @example Zero correlation between orthogonal sequences
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * const actual = corrcoef([1, -1, 1, -1], [1, 1, -1, -1]);
 * const expected = [
 *   [1, 0],
 *   [0, 1],
 * ];
 * assertEquals(actual.map(row => row.length), expected.map(row => row.length));
 * actual.forEach((row, i) => row.forEach((v, j) => assertAlmostEquals(v, expected[i][j], 1e-12)));
 *
 * ```
 *
 * @example Explicit sample flag matches the default behaviour
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(
 *   corrcoef([2, 4, 6, 8], [1, 2, 3, 4]),
 *   corrcoef([2, 4, 6, 8], [1, 2, 3, 4], 1),
 * );
 *
 * ```
 *
 * @example Population flag (0) is supported for array inputs
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * const actual = corrcoef([1, 2, 3], [3, 2, 1], 0);
 * const expected = [
 *   [1, -1],
 *   [-1, 1],
 * ];
 * assertEquals(actual.map(row => row.length), expected.map(row => row.length));
 * actual.forEach((row, i) => row.forEach((v, j) => assertAlmostEquals(v, expected[i][j], 1e-12)));
 *
 * ```
 *
 * @example Matrix input with linearly related columns
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * const actual = corrcoef([
 *   [1, 2, -1],
 *   [2, 4, -2],
 *   [3, 6, -3],
 * ]);
 * const expected = [
 *   [1, 1, -1],
 *   [1, 1, -1],
 *   [-1, -1, 1],
 * ];
 * assertEquals(actual.map(row => row.length), expected.map(row => row.length));
 * actual.forEach((row, i) => row.forEach((v, j) => assertAlmostEquals(v, expected[i][j], 1e-12)));
 *
 * ```
 *
 * @example Matrix input with independent columns
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * const actual = corrcoef([
 *   [1, 1, -1],
 *   [-1, 1, 1],
 *   [1, -1, 1],
 *   [-1, -1, -1],
 * ]);
 * const expected = [
 *   [1, 0, 0],
 *   [0, 1, 0],
 *   [0, 0, 1],
 * ];
 * assertEquals(actual.map(row => row.length), expected.map(row => row.length));
 * actual.forEach((row, i) => row.forEach((v, j) => assertAlmostEquals(v, expected[i][j], 1e-12)));
 *
 * ```
 *
 * @example Symmetry for swapped array inputs
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(
 *   corrcoef([1, 2, 3, 4], [4, 3, 2, 1]),
 *   corrcoef([4, 3, 2, 1], [1, 2, 3, 4]),
 * );
 *
 * ```
 *
 * @example Population flag also works for matrix inputs
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * const actual = corrcoef([
 *   [1, 1, -1],
 *   [-1, 1, 1],
 *   [1, -1, 1],
 *   [-1, -1, -1],
 * ], 0);
 * const expected = [
 *   [1, 0, 0],
 *   [0, 1, 0],
 *   [0, 0, 1],
 * ];
 * assertEquals(actual.map(row => row.length), expected.map(row => row.length));
 * actual.forEach((row, i) => row.forEach((v, j) => assertAlmostEquals(v, expected[i][j], 1e-12)));
 *
 * ```
 *
 * @example Matrix correlation handles alternating columns
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * const actual = corrcoef([
 *   [1, 0],
 *   [0, 1],
 *   [1, 0],
 *   [0, 1],
 * ]);
 * const expected = [
 *   [1, -1],
 *   [-1, 1],
 * ];
 * assertEquals(actual.map(row => row.length), expected.map(row => row.length));
 * actual.forEach((row, i) => row.forEach((v, j) => assertAlmostEquals(v, expected[i][j], 1e-12)));
 * ```
 */
export default function corrcoef(x: matrix, flag?: number): matrix;
/**
 * Correlation coefficients of arrays.
 *
 * Calculates the correlation coefficients between arrays or matrices. Returns
 * the sample correlation coefficient matrix for matrix input, or the correlation matrix
 * between two input arrays/matrices.
 *
 * @param x Input array or matrix
 * @param y Optional second input array or matrix
 * @param flag Optional Bessel's correction (0: population, 1: sample). Default is 1
 * @returns Matrix of correlation coefficients
 * @throws When input dimensions are incompatible
 *
 * @example Perfect positive correlation between identical arrays
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * const actual = corrcoef([1, 2, 3], [1, 2, 3]);
 * const expected = [
 *   [1, 1],
 *   [1, 1],
 * ];
 * assertEquals(actual.map(row => row.length), expected.map(row => row.length));
 * actual.forEach((row, i) => row.forEach((v, j) => assertAlmostEquals(v, expected[i][j], 1e-12)));
 *
 * ```
 *
 * @example Perfect negative correlation between reversed arrays
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * const actual = corrcoef([1, 2, 3], [3, 2, 1]);
 * const expected = [
 *   [1, -1],
 *   [-1, 1],
 * ];
 * assertEquals(actual.map(row => row.length), expected.map(row => row.length));
 * actual.forEach((row, i) => row.forEach((v, j) => assertAlmostEquals(v, expected[i][j], 1e-12)));
 *
 * ```
 *
 * @example Zero correlation between orthogonal sequences
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * const actual = corrcoef([1, -1, 1, -1], [1, 1, -1, -1]);
 * const expected = [
 *   [1, 0],
 *   [0, 1],
 * ];
 * assertEquals(actual.map(row => row.length), expected.map(row => row.length));
 * actual.forEach((row, i) => row.forEach((v, j) => assertAlmostEquals(v, expected[i][j], 1e-12)));
 *
 * ```
 *
 * @example Explicit sample flag matches the default behaviour
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(
 *   corrcoef([2, 4, 6, 8], [1, 2, 3, 4]),
 *   corrcoef([2, 4, 6, 8], [1, 2, 3, 4], 1),
 * );
 *
 * ```
 *
 * @example Population flag (0) is supported for array inputs
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * const actual = corrcoef([1, 2, 3], [3, 2, 1], 0);
 * const expected = [
 *   [1, -1],
 *   [-1, 1],
 * ];
 * assertEquals(actual.map(row => row.length), expected.map(row => row.length));
 * actual.forEach((row, i) => row.forEach((v, j) => assertAlmostEquals(v, expected[i][j], 1e-12)));
 *
 * ```
 *
 * @example Matrix input with linearly related columns
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * const actual = corrcoef([
 *   [1, 2, -1],
 *   [2, 4, -2],
 *   [3, 6, -3],
 * ]);
 * const expected = [
 *   [1, 1, -1],
 *   [1, 1, -1],
 *   [-1, -1, 1],
 * ];
 * assertEquals(actual.map(row => row.length), expected.map(row => row.length));
 * actual.forEach((row, i) => row.forEach((v, j) => assertAlmostEquals(v, expected[i][j], 1e-12)));
 *
 * ```
 *
 * @example Matrix input with independent columns
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * const actual = corrcoef([
 *   [1, 1, -1],
 *   [-1, 1, 1],
 *   [1, -1, 1],
 *   [-1, -1, -1],
 * ]);
 * const expected = [
 *   [1, 0, 0],
 *   [0, 1, 0],
 *   [0, 0, 1],
 * ];
 * assertEquals(actual.map(row => row.length), expected.map(row => row.length));
 * actual.forEach((row, i) => row.forEach((v, j) => assertAlmostEquals(v, expected[i][j], 1e-12)));
 *
 * ```
 *
 * @example Symmetry for swapped array inputs
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(
 *   corrcoef([1, 2, 3, 4], [4, 3, 2, 1]),
 *   corrcoef([4, 3, 2, 1], [1, 2, 3, 4]),
 * );
 *
 * ```
 *
 * @example Population flag also works for matrix inputs
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * const actual = corrcoef([
 *   [1, 1, -1],
 *   [-1, 1, 1],
 *   [1, -1, 1],
 *   [-1, -1, -1],
 * ], 0);
 * const expected = [
 *   [1, 0, 0],
 *   [0, 1, 0],
 *   [0, 0, 1],
 * ];
 * assertEquals(actual.map(row => row.length), expected.map(row => row.length));
 * actual.forEach((row, i) => row.forEach((v, j) => assertAlmostEquals(v, expected[i][j], 1e-12)));
 *
 * ```
 *
 * @example Matrix correlation handles alternating columns
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * const actual = corrcoef([
 *   [1, 0],
 *   [0, 1],
 *   [1, 0],
 *   [0, 1],
 * ]);
 * const expected = [
 *   [1, -1],
 *   [-1, 1],
 * ];
 * assertEquals(actual.map(row => row.length), expected.map(row => row.length));
 * actual.forEach((row, i) => row.forEach((v, j) => assertAlmostEquals(v, expected[i][j], 1e-12)));
 * ```
 */
export default function corrcoef(
  x: numarraymatrix,
  y?: numarraymatrix | number,
  flag: number = 1,
): matrix {
  // Handle parameter parsing - y could be a flag value or second array
  let actualY: numarraymatrix | undefined;
  let actualFlag = flag;

  if (typeof y === "number") {
    actualFlag = y;
    actualY = undefined;
  } else {
    actualY = y;
  }

  // Calculate covariance matrix
  let covm: number | matrix;
  if (actualY !== undefined) {
    if (typeof x === "number" || typeof actualY === "number") {
      throw new Error("Number inputs not supported for correlation");
    }
    if (isarray(x) && isarray(actualY)) {
      if (actualFlag !== 0 && actualFlag !== 1) {
        throw new Error("Normalization flag must be 0 or 1");
      }
      if (x.length !== actualY.length) {
        throw new Error("input dimension must agree");
      }
      const vx = x as number[], vy = actualY as number[];
      const originX = vx[0], originY = vy[0];
      let meanX = 0, meanY = 0, xx = 0, yy = 0, xy = 0;
      for (let i = 0; i < x.length; i++) {
        const shiftedX = vx[i] - originX, shiftedY = vy[i] - originY;
        const dx = shiftedX - meanX, dy = shiftedY - meanY;
        meanX += dx / (i + 1);
        meanY += dy / (i + 1);
        xx += dx * (shiftedX - meanX);
        yy += dy * (shiftedY - meanY);
        xy += dx * (shiftedY - meanY);
      }
      const validX = x.length > actualFlag && xx > 0 && Number.isFinite(xx);
      const validY = x.length > actualFlag && yy > 0 && Number.isFinite(yy);
      const r = validX && validY
        ? Math.max(-1, Math.min(1, xy / Math.sqrt(xx) / Math.sqrt(yy)))
        : NaN;
      return [[validX ? 1 : NaN, r], [r, validY ? 1 : NaN]];
    } else if (ismatrix(x) && ismatrix(actualY)) {
      throw new Error("Matrix-matrix covariance not implemented yet");
    } else {
      throw new Error("Mixed array-matrix input not supported");
    }
  } else {
    if (typeof x === "number") {
      throw new Error("Number inputs not supported for correlation");
    }
    if (isarray(x)) {
      throw new Error("Single array correlation not meaningful");
    } else if (ismatrix(x)) {
      covm = cov(x as matrix, actualFlag as 0 | 1);
    } else {
      throw new Error("Invalid input type");
    }
  }

  const sigma = transpose(sqrt(diag(covm as matrix))) as matrix<number>;
  const m = sigma.length;

  let result = rdivide(covm as matrix, repmat(sigma, 1, m));
  result = rdivide(result, repmat(transpose(sigma), m, 1));

  return result;
}
