import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { isnumber, prctile, vectorfun } from "../../index.ts";

/**
 * Interquartile range.
 *
 * Calculates the interquartile range (difference between 75th and 25th percentiles)
 * of arrays or matrices. For matrices, operates along specified dimension.
 *
 * @param x Input array or matrix
 * @param dim Dimension along which to compute IQR. Default is 0
 * @returns Interquartile range values
 * @throws When input is invalid
 *
 * @example IQR of simple array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(iqr([1, 2, 3, 4, 5]), 2.5);
 *
 * ```
 *
 * @example IQR with larger range
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(iqr([1, 2, 3, 4, 5, 6, 7, 8, 9]), 4.5);
 *
 * ```
 *
 * @example IQR of matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(iqr([[1, 2, 3], [4, 5, 6]]), [1.5, 1.5]);
 * ```
 */
export default function iqr(x: array, dim?: 0 | 1): number;
export default function iqr(x: matrix, dim?: 0 | 1): array;
export default function iqr(x: numarraymatrix, dim: 0 | 1 = 0): numarraymatrix {
  const _iqr = function (a: number[]) {
    return prctile(a, 75) - prctile(a, 25);
  };

  if (isnumber(x)) {
    return NaN;
  }

  return vectorfun(dim, x, _iqr);
}
