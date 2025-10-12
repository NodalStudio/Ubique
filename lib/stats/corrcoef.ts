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
 * @function corrcoef
 * @summary Correlation coefficients of arrays
 * @description Calculates the correlation coefficients between arrays or matrices. Returns
 * the sample correlation coefficient matrix for matrix input, or the correlation matrix
 * between two input arrays/matrices.
 *
 * @param x Input array or matrix
 * @param y Optional second input array or matrix
 * @param flag Optional Bessel's correction (0: population, 1: sample). Default is 1
 * @returns Matrix of correlation coefficients
 * @throws When input dimensions are incompatible
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Perfect positive correlation between identical arrays
 * assertEquals(corrcoef([1, 2, 3], [1, 2, 3]), [
 *   [1, 1],
 *   [1, 1],
 * ]);
 *
 * // Example 2: Perfect negative correlation between reversed arrays
 * assertEquals(corrcoef([1, 2, 3], [3, 2, 1]), [
 *   [1, -1],
 *   [-1, 1],
 * ]);
 *
 * // Example 3: Zero correlation between orthogonal sequences
 * assertEquals(corrcoef([1, -1, 1, -1], [1, 1, -1, -1]), [
 *   [1, 0],
 *   [0, 1],
 * ]);
 *
 * // Example 4: Explicit sample flag matches the default behaviour
 * assertEquals(
 *   corrcoef([2, 4, 6, 8], [1, 2, 3, 4]),
 *   corrcoef([2, 4, 6, 8], [1, 2, 3, 4], 1),
 * );
 *
 * // Example 5: Population flag (0) is supported for array inputs
 * assertEquals(corrcoef([1, 2, 3], [3, 2, 1], 0), [
 *   [1, -1],
 *   [-1, 1],
 * ]);
 *
 * // Example 6: Matrix input with linearly related columns
 * assertEquals(corrcoef([
 *   [1, 2, -1],
 *   [2, 4, -2],
 *   [3, 6, -3],
 * ]), [
 *   [1, 1, -1],
 *   [1, 1, -1],
 *   [-1, -1, 1],
 * ]);
 *
 * // Example 7: Matrix input with independent columns
 * assertEquals(corrcoef([
 *   [1, 1, -1],
 *   [-1, 1, 1],
 *   [1, -1, 1],
 *   [-1, -1, -1],
 * ]), [
 *   [1, 0, 0],
 *   [0, 1, 0],
 *   [0, 0, 1],
 * ]);
 *
 * // Example 8: Symmetry for swapped array inputs
 * assertEquals(
 *   corrcoef([1, 2, 3, 4], [4, 3, 2, 1]),
 *   corrcoef([4, 3, 2, 1], [1, 2, 3, 4]),
 * );
 *
 * // Example 9: Population flag also works for matrix inputs
 * assertEquals(corrcoef([
 *   [1, 1, -1],
 *   [-1, 1, 1],
 *   [1, -1, 1],
 *   [-1, -1, -1],
 * ], 0), [
 *   [1, 0, 0],
 *   [0, 1, 0],
 *   [0, 0, 1],
 * ]);
 *
 * // Example 10: Matrix correlation handles alternating columns
 * assertEquals(corrcoef([
 *   [1, 0],
 *   [0, 1],
 *   [1, 0],
 *   [0, 1],
 * ]), [
 *   [1, -1],
 *   [-1, 1],
 * ]);
 * ```
 */
export default function corrcoef(x: array, y: array, flag?: number): matrix;
export default function corrcoef(x: matrix, flag?: number): matrix;
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
      covm = cov(x as array, actualY as array, actualFlag as 0 | 1);
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
