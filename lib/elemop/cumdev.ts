import type { array, matrix } from "../types.d.ts";

import { cumsum, mean, minus, vectorfun } from "../../index.ts";

/**
 * Cumulative mean deviation.
 *
 * Computes the cumulative mean deviation of an array or matrix along a specified dimension.
 *
 * @param x The input array or matrix of values.
 * @param dim The dimension along which to calculate, `1` for columns, `0` for rows (defaults to `1`).
 * @returns The cumulative mean deviation.
 * @throws If no input is provided.
 *
 * @example Cumulative mean deviation of a 1D array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cumdev([5, 6, 3]), [0.33333333333333304, 1.666666666666666, -8.881784197001252e-16]);
 *
 * ```
 *
 * @example Cumulative mean deviation of a single-element array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cumdev([10]), [0]);
 *
 * ```
 *
 * @example Cumulative mean deviation of a matrix along rows (dim=0)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cumdev([[-1, 3, -1], [4, 5, 9]], 0), [
 *   [-1.3333333333333333, 1.3333333333333333, 0],
 *   [-2, -3, 0]
 * ]);
 *
 * ```
 *
 * @example Cumulative mean deviation of a matrix along columns (dim=1)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cumdev([[-1, 3, -1], [4, 5, 9]]), [
 *   [-2.5, 0],
 *   [-1, 0],
 *   [-5, 0],
 * ]);
 *
 * ```
 *
 * @example Cumulative mean deviation of an empty array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cumdev([]), []);
 *
 * ```
 *
 * @example Cumulative mean deviation of an empty matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cumdev([[]]), []);
 *
 * ```
 *
 * @example Cumulative mean deviation of a matrix with identical values
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cumdev([[2, 2, 2], [2, 2, 2]]), [
 *   [0, 0],
 *   [0, 0],
 *   [0, 0],
 * ]);
 *
 * ```
 *
 * @example Cumulative mean deviation with negative values
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cumdev([[-5, -10, -15], [0, 5, 10]], 0), [
 *   [5, 5, 0],
 *   [-5, -5, 0],
 * ]);
 * ```
 */
export default function cumdev(x: array, dim?: 0 | 1): array;
export default function cumdev(x: matrix, dim?: 0 | 1): matrix;
export default function cumdev(
  x: array | matrix,
  dim: 0 | 1 = 1,
): array | matrix {
  const _cumdev = (a: array) => cumsum(minus(a, mean(a) as number));

  return vectorfun(dim, x, _cumdev);
}
