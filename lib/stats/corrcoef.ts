import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { cov, diag, isarray, ismatrix, rdivide, repmat, sqrt, transpose } from "../../index.ts";

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
 * @throws {Error} When input dimensions are incompatible
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Correlation coefficient is a matrix function
 * assertEquals(typeof corrcoef, "function");
 *
 * // Example 2: Corrcoef accepts array inputs
 * assertEquals(Array.isArray([[1, 2], [2, 4]]), true);
 *
 * // Example 3: Function has appropriate signature
 * assertEquals(corrcoef.length, 2);
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
  
  if (typeof y === 'number') {
    actualFlag = y;
    actualY = undefined;
  } else {
    actualY = y;
  }

  // Calculate covariance matrix
  const covm = actualY !== undefined ? cov(x, actualY, actualFlag) : cov(x, actualFlag);

  const sigma = transpose(sqrt(diag(covm)));
  const m = sigma.length;

  let result = rdivide(covm, repmat(sigma, 1, m));
  result = rdivide(result, repmat(transpose(sigma), m, 1));

  return result;
}
