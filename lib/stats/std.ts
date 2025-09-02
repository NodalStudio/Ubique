import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { isarray, ismatrix, isnumber, sqrt, varc } from "../../index.ts";

/**
 * @function std
 * @summary Computes the standard deviation
 * @description Computes the standard deviation (square root of variance) for arrays or matrices.
 * Supports both population (N) and sample (N-1) normalizations.
 *
 * @param x Input array or matrix
 * @param flag Normalization type (0: population, 1: sample). Default is 1
 * @param dim Dimension to operate on (0: rows, 1: columns). Default is 0
 * @returns Computed standard deviation values
 * @throws {Error} When input is invalid
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Sample standard deviation
 * assertEquals(std([1, 2, 3, 4, 5]), 1.5811388300841898);
 *
 * // Example 2: Population standard deviation
 * assertEquals(std([1, 2, 3, 4, 5], 0), 1.4142135623730951);
 *
 * // Example 3: Matrix standard deviation
 * assertEquals(std([[1, 2], [3, 4]]), [0.7071067811865476, 0.7071067811865476]);
 * ```
 */
export default function std(x: array, flag?: 0 | 1, dim?: 0 | 1): number;
export default function std(x: matrix, flag?: 0 | 1, dim?: 0 | 1): matrix;
export default function std(
  x: numarraymatrix,
  flag: 0 | 1 = 1,
  dim: 0 | 1 = 0,
): numarraymatrix {
  if (isnumber(x)) {
    return NaN;
  }

  return sqrt(varc(x, flag, dim) as numarraymatrix) as numarraymatrix;
}
