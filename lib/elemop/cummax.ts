import type { array, matrix } from "../types.d.ts";

import { vectorfun } from "../../index.ts";

/**
 * Cumulative maximum of array elements.
 *
 * Computes the cumulative maximum of elements in an array or matrix along a specified dimension.
 *
 * @param x The input array or matrix of values
 * @param dim The dimension along which to calculate, `1` for columns, `0` for rows (defaults to `1`)
 * @returns The cumulative maximum of the input values
 * @throws If no input is provided
 *
 * @example Cumulative maximum of a 1D array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cummax([5, 6, 3]), [5, 6, 6]);
 *
 * ```
 *
 * @example Cumulative maximum of a matrix along columns (dim=1)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cummax([[5, 6, 5], [7, 8, -1]]), [[5, 7], [6, 8], [5, 5]]);
 *
 * ```
 *
 * @example Cumulative maximum of a matrix along rows (dim=0)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cummax([[5, 6, 5], [7, 8, -1]], 0), [[5, 6, 6], [7, 8, 8]]);
 * ```
 */
export default function cummax(x: array): array;
export default function cummax(x: array, dim?: 0 | 1): array;
export default function cummax(x: matrix, dim?: 0 | 1): matrix;
export default function cummax(
  x: array | matrix,
  dim: 0 | 1 = 1,
): array | matrix {
  return vectorfun(
    dim,
    x,
    (a: array) =>
      a.map((_: number, i: number) => Math.max(...a.slice(0, i + 1))),
  );
}
