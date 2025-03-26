import type { array, matrix } from "../types.d.ts";

import { vectorfun } from "../../index.ts";

/**
 * @function cummin
 * @summary Cumulative minimum of array elements
 * @description Computes the cumulative minimum of elements in an array or matrix along a specified dimension.
 *
 * @param x The input array or matrix of values
 * @param dim The dimension along which to calculate, `1` for columns, `0` for rows (defaults to `1`)
 * @returns The cumulative minimum of the input values
 * @throws {Error} If no input is provided
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Cumulative minimum of a 1D array
 * assertEquals(cummin([5, 6, 3]), [5, 5, 3]);
 *
 * // Example 2: Cumulative minimum of a matrix along columns (dim=1)
 * assertEquals(cummin([[5, 6, 5], [7, 8, -1]], 1), [[5, 5], [6, 6], [5, -1]]);
 *
 * // Example 3: Cumulative minimum of a matrix along rows (dim=0)
 * assertEquals(cummin([[5, 6, 5], [7, 8, -1]], 0), [[5, 5, 5], [7, 7, -1]]);
 * ```
 */
export default function cummin(x: array): array;
export default function cummin(x: array, dim: 0): array;
export default function cummin(x: array, dim: 1): array;
export default function cummin(x: matrix, dim: 0): matrix;
export default function cummin(x: matrix, dim: 1): matrix;
export default function cummin(x: array | matrix, dim: 0|1 = 1): array | matrix {
  return vectorfun(
    dim,
    x,
    (a: array) => a.map((_: number, i: number) => Math.min(...a.slice(0, i + 1))),
  );
}
