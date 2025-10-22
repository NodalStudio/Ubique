import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { isnumber, vectorfun } from "../../index.ts";

/**
 * Smallest element in array.
 *
 * Computes the smallest element in an array or matrix. For arrays, returns a single value.
 * For matrices, returns the minimum along the specified dimension.
 *
 * @param x Input array or matrix
 * @param dim Dimension along which to compute minimum. Default is 0
 * @returns Minimum values
 * @throws When input is invalid
 *
 * @example Simple array minimum
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(min([3, 1, 2]), 1);
 *
 * ```
 *
 * @example Array with negative values
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(min([5, -1, 10]), -1);
 *
 * ```
 *
 * @example Matrix minimum along rows
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(min([[1, 2], [3, 4]]), [1, 3]);
 * ```
 */
export default function min(x: array, dim?: 0 | 1): number;
/**
 * Smallest element in array.
 *
 * Computes the smallest element in an array or matrix. For arrays, returns a single value.
 * For matrices, returns the minimum along the specified dimension.
 *
 * @param x Input array or matrix
 * @param dim Dimension along which to compute minimum. Default is 0
 * @returns Minimum values
 * @throws When input is invalid
 *
 * @example Simple array minimum
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(min([3, 1, 2]), 1);
 *
 * ```
 *
 * @example Array with negative values
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(min([5, -1, 10]), -1);
 *
 * ```
 *
 * @example Matrix minimum along rows
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(min([[1, 2], [3, 4]]), [1, 3]);
 * ```
 */
export default function min(x: matrix, dim?: 0 | 1): array;
/**
 * Smallest element in array.
 *
 * Computes the smallest element in an array or matrix. For arrays, returns a single value.
 * For matrices, returns the minimum along the specified dimension.
 *
 * @param x Input array or matrix
 * @param dim Dimension along which to compute minimum. Default is 0
 * @returns Minimum values
 * @throws When input is invalid
 *
 * @example Simple array minimum
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(min([3, 1, 2]), 1);
 *
 * ```
 *
 * @example Array with negative values
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(min([5, -1, 10]), -1);
 *
 * ```
 *
 * @example Matrix minimum along rows
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(min([[1, 2], [3, 4]]), [1, 3]);
 * ```
 */
export default function min(x: numarraymatrix, dim: 0 | 1 = 0): numarraymatrix {
  const _min = function (a: number[]) {
    return Math.min.apply(null, a);
  };

  if (isnumber(x)) {
    return x;
  }

  return vectorfun(dim, x, _min);
}
