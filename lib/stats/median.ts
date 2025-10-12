import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { isarray, isnumber, sort, vectorfun } from "../../index.ts";

/**
 * Median value of array.
 *
 * Computes the median (middle value) of an array or matrix. For even-length arrays,
 * returns the average of the two middle values. For matrices, operates along specified dimension.
 *
 * @param x Input number, array, or matrix
 * @param dim Dimension along which to compute median. Default is 0
 * @returns Median values
 * @throws When input is invalid
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Odd length array
 * assertEquals(median([1, 2, 3]), 2);
 *
 * // Example 2: Even length array
 * assertEquals(median([1, 2, 3, 4]), 2.5);
 *
 * // Example 3: Matrix median
 * assertEquals(median([[1, 2], [3, 4]]), [1.5, 3.5]);
 * ```
 */
export default function median(x: number): number;
export default function median(x: array, dim?: 0 | 1): number;
export default function median(x: matrix, dim?: 0 | 1): array;
export default function median(
  x: numarraymatrix,
  dim: 0 | 1 = 0,
): numarraymatrix {
  const _median = function (a: array): number {
    const length = a.length;
    if (length === 0) {
      throw new Error("Input cannot be empty");
    }

    const sorted = sort(a);
    const mid = Math.floor(length / 2);

    if (length % 2 === 1) {
      return sorted[mid];
    }

    return (sorted[mid - 1] + sorted[mid]) / 2;
  };

  if (isnumber(x)) {
    return x;
  }

  if (isarray(x)) {
    return _median(x as array);
  }

  return vectorfun(dim, x, _median);
}
