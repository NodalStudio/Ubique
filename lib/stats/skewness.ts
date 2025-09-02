import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { isarray, ismatrix, isnumber, moment, vectorfun } from "../../index.ts";

/**
 * @function skewness
 * @summary Computes the skewness of a dataset
 * @description Measures the asymmetry of the probability distribution. Positive skew
 * indicates a longer tail on the right, negative skew indicates a longer tail on the left.
 * Zero skew indicates symmetric distribution.
 *
 * @param x Input array or matrix
 * @param flag Bias correction flag (0 for bias correction, 1 for simple calculation). Default is 1
 * @param dim Dimension to compute along (0 for rows, 1 for columns). Default is 0
 * @returns Computed skewness values
 * @throws {Error} When input is invalid
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Right-skewed data
 * assertEquals(skewness([1, 2, 3, 10]), 1.0182337649086284);
 *
 * // Example 2: Symmetric data
 * assertEquals(skewness([1, 2, 3, 4, 5]), 0);
 *
 * // Example 3: Matrix skewness
 * assertEquals(skewness([[1, 2, 3], [4, 5, 6]]), [0, 0]);
 * ```
 */
export default function skewness(x: array, flag?: 0 | 1, dim?: 0 | 1): number;
export default function skewness(x: matrix, flag?: 0 | 1, dim?: 0 | 1): matrix;
export default function skewness(
  x: numarraymatrix,
  flag: 0 | 1 = 1,
  dim: 0 | 1 = 0,
): numarraymatrix {
  if (isnumber(x)) {
    return NaN;
  }

  return vectorfun(dim, x, computeSkewness, flag);
}

function computeSkewness(arr: array, biasFlag: 0 | 1): number {
  const n = arr.length;
  const mom3 = moment(arr, 3) as number / (moment(arr, 2) as number) ** 1.5;

  return biasFlag === 1 ? mom3 : Math.sqrt((n - 1) / n) * (n / (n - 2)) * mom3;
}
