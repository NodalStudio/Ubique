import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { isnumber, sort, vectorfun } from "../../index.ts";

/**
 * Most frequent value in an array.
 *
 * Finds the most frequently occurring value in an array or matrix.
 * In case of ties, returns the first value that achieves the maximum frequency.
 *
 * @param x Input array or matrix
 * @param dim Dimension along which to compute mode. Default is 0
 * @returns Most frequent values
 * @throws When input is invalid
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Simple mode
 * assertEquals(mode([1, 2, 2, 3]), 2);
 *
 * // Example 2: Mode with multiple values
 * assertEquals(mode([1, 1, 2, 2, 2]), 2);
 *
 * // Example 3: Matrix mode
 * assertEquals(mode([[1, 1, 2], [3, 3, 4]]), [1, 3]);
 * ```
 */
export default function mode(x: array, dim?: 0 | 1): number;
export default function mode(x: matrix, dim?: 0 | 1): array;
export default function mode(
  x: numarraymatrix,
  dim: 0 | 1 = 0,
): numarraymatrix {
  const _mode = function (a: number[]) {
    const counter: Record<number, number> = {};
    let mode: number[] = [];
    let max = 0;
    const _a = sort(a);

    for (let i = 0; i < a.length; i++) {
      if (!(_a[i] in counter)) {
        counter[_a[i]] = 0;
      } else {
        counter[_a[i]]++;
      }

      if (counter[_a[i]] === max) {
        mode.push(_a[i]);
      } else if (counter[_a[i]] > max) {
        max = counter[_a[i]];
        mode = [_a[i]];
      }
    }

    return mode[0];
  };

  if (isnumber(x)) {
    return x;
  }

  return vectorfun(dim, x, _mode);
}
