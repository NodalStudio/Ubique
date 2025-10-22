import type { array, matrix } from "../types.d.ts";

import { vectorfun } from "../../index.ts";

/**
 * Cumulative product of array elements.
 *
 * Computes the cumulative product of elements in an array or matrix along a specified dimension.
 *
 * @param x The input array or matrix of values
 * @param dim The dimension along which to calculate, `1` for columns, `0` for rows (defaults to `1`)
 * @returns The cumulative product of the input values
 * @throws If no input is provided
 *
 * @example Cumulative product of a 1D array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cumprod([5, 6, 3]), [5, 30, 90]);
 *
 * ```
 *
 * @example Cumulative product of a matrix along columns (dim=1)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cumprod([[5, 6, 5], [7, 8, -1]], 1), [[5, 35], [6, 48], [5, -5]]);
 *
 * ```
 *
 * @example Cumulative product of a matrix along rows (dim=0)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
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
