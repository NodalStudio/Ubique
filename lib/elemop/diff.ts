import type { array, matrix } from "../types.d.ts";

import { vectorfun } from "../../index.ts";

/**
 * Differences between adjacent elements.
 *
 * Computes the differences between adjacent elements in an array or along a specified dimension of a matrix.
 *
 * @param x The input array or matrix of values
 * @param dim The dimension along which to calculate, `1` for columns, `0` for rows (defaults to `1`)
 * @returns The differences between adjacent elements
 * @throws If no input is provided
 *
 * @example Differences in a 1D array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(diff([5, 6, 3]), [1, -3]);
 *
 * ```
 *
 * @example Differences in a matrix along columns (dim=1)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(diff([[5, 6, 5], [7, 8, -1]], 1), [[2], [2], [-6]]);
 *
 * ```
 *
 * @example Differences in a matrix along rows (dim=0)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(diff([[5, 6, 5], [7, 8, -1]], 0), [[1, -1], [1, -9]]);
 * ```
 */
export default function diff(x: array): array;
export default function diff(x: array, dim: 0): array;
export default function diff(x: array, dim: 1): array;
export default function diff(x: matrix, dim: 0): matrix;
export default function diff(x: matrix, dim: 1): matrix;
export default function diff(
  x: array | matrix,
  dim: 0 | 1 = 1,
): array | matrix {
  return vectorfun(
    dim,
    x,
    (a: array) => a.slice(1).map((val: number, i: number) => val - a[i]),
  );
}
