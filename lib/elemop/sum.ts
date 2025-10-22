import type { array, matrix } from "../types.d.ts";

import { vectorfun } from "../../index.ts";

/**
 * Sum of array elements.
 *
 * Computes the sum of array or matrix elements. If a matrix is provided, the sum can be calculated across rows or columns based on the specified dimension.
 *
 * @param x The input array or matrix of values
 * @param dim The dimension to sum across. Use `0` for rows and `1` for columns (defaults to `0`)
 * @returns The sum of the elements
 *
 * @example Sum of elements in a 1D array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(sum([5, 6, 3]), 14);
 *
 * ```
 *
 * @example Sum of elements across rows in a 2D array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(sum([[5, 6, 5], [7, 8, -1]], 0), [16, 14]);
 *
 * ```
 *
 * @example Sum of elements across columns in a 2D array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(sum([[5, 6, 5], [7, 8, -1]], 1), [12, 14, 4]);
 * ```
 */
export default function sum(x: array): number;
export default function sum(x: array, dim: 0 | 1): number;
export default function sum(x: matrix, dim: 0): array;
export default function sum(x: matrix, dim: 1): array;
export default function sum(x: matrix): array;
export default function sum(x: matrix, dim: 0 | 1): array;
export default function sum(x: array | matrix, dim?: 0 | 1): number | array;
export default function sum(x: array | matrix, dim: 0 | 1): number | array;
export default function sum(
  x: array | matrix,
  dim?: 0 | 1,
): number | array {
  const actualDim = dim ?? 0;
  const _sum = (a: array): number =>
    a.reduce((acc: number, val: number) => acc + val, 0);

  return vectorfun(actualDim, x, _sum);
}
