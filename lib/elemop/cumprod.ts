import type { array, matrix } from "../types.d.ts";

import { vectorfun } from "../../index.ts";

/**
 * @function cumprod
 * @summary Cumulative product of array elements
 * @description Computes the cumulative product of elements in an array or matrix along a specified dimension.
 *
 * @param x The input array or matrix of values
 * @param dim The dimension along which to calculate, `1` for columns, `0` for rows (defaults to `1`)
 * @returns The cumulative product of the input values
 * @throws If no input is provided
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Cumulative product of a 1D array
 * assertEquals(cumprod([5, 6, 3]), [5, 30, 90]);
 *
 * // Example 2: Cumulative product of a matrix along columns (dim=1)
 * assertEquals(cumprod([[5, 6, 5], [7, 8, -1]], 1), [[5, 35], [6, 48], [5, -5]]);
 *
 * // Example 3: Cumulative product of a matrix along rows (dim=0)
 * assertEquals(cumprod([[5, 6, 5], [7, 8, -1]], 0), [[5, 30, 150], [7, 56, -56]]);
 * ```
 */
export default function cumprod(x: array): array;
export default function cumprod(x: array, dim: 0): array;
export default function cumprod(x: array, dim: 1): array;
export default function cumprod(x: matrix, dim: 0): matrix;
export default function cumprod(x: matrix, dim: 1): matrix;
export default function cumprod(
  x: array | matrix,
  dim: 0 | 1 = 1,
): array | matrix {
  return vectorfun(
    dim,
    x,
    (a: array) =>
      a.map((_: number, i: number) =>
        a.slice(0, i + 1).reduce((p, c) => p * c)
      ),
  );
}
