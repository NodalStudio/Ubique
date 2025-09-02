import type { array, matrix } from "../types.d.ts";

import { vectorfun } from "../../index.ts";

/**
 * @function sum
 * @summary Sum of array elements
 * @description Computes the sum of array or matrix elements. If a matrix is provided, the sum can be calculated across rows or columns based on the specified dimension.
 *
 * @param x The input array or matrix of values
 * @param dim The dimension to sum across. Use `0` for rows and `1` for columns (defaults to `0`)
 * @returns The sum of the elements
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Sum of elements in a 1D array
 * assertEquals(sum([5, 6, 3]), 14);
 *
 * // Example 2: Sum of elements across rows in a 2D array
 * assertEquals(sum([[5, 6, 5], [7, 8, -1]], 0), [16, 14]);
 *
 * // Example 3: Sum of elements across columns in a 2D array
 * assertEquals(sum([[5, 6, 5], [7, 8, -1]], 1), [[12], [14], [4]]);
 * ```
 */
export default function sum(x: array): number;
export default function sum(x: array, dim: 0): number;
export default function sum(x: array, dim: 1): number;
export default function sum(x: matrix, dim: 0): array;
export default function sum(x: matrix, dim: 1): matrix;
export default function sum(
  x: array | matrix,
  dim: 0 | 1 = 0,
): number | array | matrix {
  const _sum = (a: array): number =>
    a.reduce((acc: number, val: number) => acc + val, 0);

  return vectorfun(dim, x, _sum);
}
