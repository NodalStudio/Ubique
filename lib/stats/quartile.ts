import type { array, matrix, numarraymatrix } from "../types.d.ts";
import {
  isarray,
  ismatrix,
  isnumber,
  prctile,
  vectorfun,
} from "../../index.ts";

/**
 * @function quartile
 * @summary Quartiles of a sample
 * @description Calculates the three quartiles (Q1, Q2, Q3) which divide the data into four equal parts.
 * Q1 is the 25th percentile, Q2 is the median (50th percentile), and Q3 is the 75th percentile.
 *
 * @param x Input array or matrix
 * @param dim Dimension along which to compute quartiles. Default is 0
 * @returns Array containing [Q1, Q2, Q3] values
 * @throws {Error} When input is invalid
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Simple quartiles
 * assertEquals(quartile([1, 2, 3, 4, 5]), [1.75, 3, 4.25]);
 *
 * // Example 2: Even number of elements
 * assertEquals(quartile([1, 2, 3, 4]), [1.5, 2.5, 3.5]);
 *
 * // Example 3: Quartiles provide Q1, Q2 (median), Q3
 * assertEquals(quartile([10, 20, 30, 40]), [15, 25, 35]);
 * ```
 */
export default function quartile(x: array, dim?: 0 | 1): array;
export default function quartile(x: matrix, dim?: 0 | 1): matrix;
export default function quartile(
  x: numarraymatrix,
  dim: 0 | 1 = 0,
): numarraymatrix {
  const _quartile = function (a: array): array {
    return [
      prctile(a, 25) as number,
      prctile(a, 50) as number,
      prctile(a, 75) as number,
    ];
  };

  if (isnumber(x)) {
    return NaN;
  }

  return vectorfun(dim, x, _quartile);
}
