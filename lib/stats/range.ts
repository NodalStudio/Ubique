import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { isnumber, max, min, vectorfun } from "../../index.ts";

/**
 * Range of values.
 *
 * Calculates the range (difference between maximum and minimum values)
 * of an array or matrix. Provides a measure of data spread or variability.
 *
 * @param x Input number, array, or matrix
 * @param dim Dimension along which to compute range. Default is 0
 * @returns Range values (max - min)
 * @throws When input is invalid
 *
 * @example Simple range
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(range([1, 5, 3]), 4);
 *
 * ```
 *
 * @example Range with negative values
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(range([-2, 0, 3]), 5);
 *
 * ```
 *
 * @example Matrix range along rows (default dim=0)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(range([[1, 4], [2, 8]]), [3, 6]);
 * ```
 */
export default function range(x: number): number;
export default function range(x: array, dim?: 0 | 1): number;
export default function range(x: matrix, dim?: 0 | 1): array;
export default function range(
  x: numarraymatrix,
  dim: 0 | 1 = 0,
): numarraymatrix {
  const _range = function (a: array): number {
    return (max(a) as number) - (min(a) as number);
  };

  if (isnumber(x)) {
    return 0;
  }

  return vectorfun(dim, x, _range);
}
