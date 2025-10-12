import type { array, matrix } from "../types.d.ts";

import { vectorfun } from "../../index.ts";

/**
 * @function cumsum
 * @summary Cumulative sum of array elements
 * @description Computes the cumulative sum of elements in an array or matrix along a specified dimension.
 *
 * @param x The input array or matrix of values
 * @param dim The dimension along which to calculate, `1` for columns, `0` for rows (defaults to `1`)
 * @returns The cumulative sum of the input values
 * @throws If no input is provided
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Cumulative sum of a 1D array
 * assertEquals(cumsum([5, 6, 3]), [5, 11, 14]);
 *
 * // Example 2: Cumulative sum of a matrix along columns (dim=1)
 * assertEquals(cumsum([[5, 6, 5], [7, 8, -1]], 1), [[5, 12], [6,14], [5, 4]]);
 *
 * // Example 3: Cumulative sum of a matrix along rows (dim=0)
 * assertEquals(cumsum([[5, 6, 5], [7, 8, -1]], 0), [[5, 11, 16], [7, 15, 14]]);
 * ```
 */
export default function cumsum(x: array): array;
export default function cumsum(x: array, dim: 0): array;
export default function cumsum(x: array, dim: 1): array;
export default function cumsum(x: matrix, dim: 0): matrix;
export default function cumsum(x: matrix, dim: 1): matrix;
export default function cumsum(
  x: array | matrix,
  dim: 0 | 1 = 1,
): array | matrix {
  return vectorfun(
    dim,
    x,
    (a: array) =>
      a.map((_: number, i: number) =>
        a.slice(0, i + 1).reduce((p, c) => p + c)
      ),
  );
}
