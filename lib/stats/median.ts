import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { isarray, ismatrix, isnumber, max, sort, vectorfun } from "../../index.ts";

/**
 * @function median
 * @summary Median value of array
 * @description Computes the median (middle value) of an array or matrix. For even-length arrays,
 * returns the average of the two middle values. For matrices, operates along specified dimension.
 *
 * @param x Input number, array, or matrix
 * @param dim Dimension along which to compute median. Default is 0
 * @returns Median values
 * @throws {Error} When input is invalid
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Odd length array
 * assertEquals(median([1, 2, 3]), 2);
 *
 * // Example 2: Even length array
 * assertEquals(median([1, 2, 3, 4]), 1.5);
 *
 * // Example 3: Matrix median
 * assertEquals(median([[1, 2], [3, 4]]), [1.5, 3.5]);
 * ```
 */
export default function median(x: number): number;
export default function median(x: array, dim?: 0 | 1): number;
export default function median(x: matrix, dim?: 0 | 1): matrix;
export default function median(
  x: numarraymatrix,
  dim: 0 | 1 = 0,
): numarraymatrix {
  const _median = function (a: array): number {
    const n = a.length - 1;
    const idx = max(1, Math.floor(n / 2)) as number;
    const _a = sort(a);

    if (n % 2 === 0) {
      return _a[idx];
    } else {
      return (_a[idx - 1] + _a[idx]) / 2;
    }
  };

  if (isnumber(x)) {
    return x;
  }

  return vectorfun(dim, x, _median);
}
