import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { isnumber, vectorfun } from "../../index.ts";

/**
 * Largest element in array.
 *
 * Computes the largest element in an array or matrix. For arrays, returns a single value.
 * For matrices, returns the maximum along the specified dimension.
 *
 * @param x Input array or matrix
 * @param dim Dimension along which to compute maximum. Default is 0
 * @returns Maximum values
 * @throws When input is invalid
 *
 * @example Simple array maximum
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(max([1, 3, 2]), 3);
 *
 * ```
 *
 * @example Array with negative values
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(max([-5, -1, -10]), -1);
 *
 * ```
 *
 * @example Matrix maximum along rows
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(max([[1, 2], [3, 4]]), [2, 4]);
 * ```
 */
export default function max(x: array, dim?: 0 | 1): number;
/**
 * Largest element in array.
 *
 * Computes the largest element in an array or matrix. For arrays, returns a single value.
 * For matrices, returns the maximum along the specified dimension.
 *
 * @param x Input array or matrix
 * @param dim Dimension along which to compute maximum. Default is 0
 * @returns Maximum values
 * @throws When input is invalid
 *
 * @example Simple array maximum
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(max([1, 3, 2]), 3);
 *
 * ```
 *
 * @example Array with negative values
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(max([-5, -1, -10]), -1);
 *
 * ```
 *
 * @example Matrix maximum along rows
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(max([[1, 2], [3, 4]]), [2, 4]);
 * ```
 */
export default function max(x: matrix, dim?: 0 | 1): array;
/**
 * Largest element in array.
 *
 * Computes the largest element in an array or matrix. For arrays, returns a single value.
 * For matrices, returns the maximum along the specified dimension.
 *
 * @param x Input array or matrix
 * @param dim Dimension along which to compute maximum. Default is 0
 * @returns Maximum values
 * @throws When input is invalid
 *
 * @example Simple array maximum
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(max([1, 3, 2]), 3);
 *
 * ```
 *
 * @example Array with negative values
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(max([-5, -1, -10]), -1);
 *
 * ```
 *
 * @example Matrix maximum along rows
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(max([[1, 2], [3, 4]]), [2, 4]);
 * ```
 */
export default function max(x: numarraymatrix, dim: 0 | 1 = 0): numarraymatrix {
  const _max = function (a: number[]) {
    return Math.max.apply(null, a);
  };

  if (isnumber(x)) {
    return x;
  }

  return vectorfun(dim, x, _max);
}
