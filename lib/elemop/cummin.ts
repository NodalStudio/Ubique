import type { array, matrix } from "../types.d.ts";

import { vectorfun } from "../../index.ts";

/**
 * Cumulative minimum of array elements.
 *
 * Computes the cumulative minimum of elements in an array or matrix along a specified dimension.
 *
 * @param x The input array or matrix of values
 * @param dim The dimension along which to calculate, `1` for columns, `0` for rows (defaults to `1`)
 * @returns The cumulative minimum of the input values
 * @throws If no input is provided
 *
 * @example Cumulative minimum of a 1D array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cummin([5, 6, 3]), [5, 5, 3]);
 *
 * ```
 *
 * @example Cumulative minimum of a matrix along columns (dim=1)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cummin([[5, 6, 5], [7, 8, -1]], 1), [[5, 5], [6, 6], [5, -1]]);
 *
 * ```
 *
 * @example Cumulative minimum of a matrix along rows (dim=0)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cummin([[5, 6, 5], [7, 8, -1]], 0), [[5, 5, 5], [7, 7, -1]]);
 * ```
 */
export default function cummin(x: array): array;
/**
 * Cumulative minimum of array elements.
 *
 * Computes the cumulative minimum of elements in an array or matrix along a specified dimension.
 *
 * @param x The input array or matrix of values
 * @param dim The dimension along which to calculate, `1` for columns, `0` for rows (defaults to `1`)
 * @returns The cumulative minimum of the input values
 * @throws If no input is provided
 *
 * @example Cumulative minimum of a 1D array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cummin([5, 6, 3]), [5, 5, 3]);
 *
 * ```
 *
 * @example Cumulative minimum of a matrix along columns (dim=1)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cummin([[5, 6, 5], [7, 8, -1]], 1), [[5, 5], [6, 6], [5, -1]]);
 *
 * ```
 *
 * @example Cumulative minimum of a matrix along rows (dim=0)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cummin([[5, 6, 5], [7, 8, -1]], 0), [[5, 5, 5], [7, 7, -1]]);
 * ```
 */
export default function cummin(x: array, dim: 0): array;
/**
 * Cumulative minimum of array elements.
 *
 * Computes the cumulative minimum of elements in an array or matrix along a specified dimension.
 *
 * @param x The input array or matrix of values
 * @param dim The dimension along which to calculate, `1` for columns, `0` for rows (defaults to `1`)
 * @returns The cumulative minimum of the input values
 * @throws If no input is provided
 *
 * @example Cumulative minimum of a 1D array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cummin([5, 6, 3]), [5, 5, 3]);
 *
 * ```
 *
 * @example Cumulative minimum of a matrix along columns (dim=1)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cummin([[5, 6, 5], [7, 8, -1]], 1), [[5, 5], [6, 6], [5, -1]]);
 *
 * ```
 *
 * @example Cumulative minimum of a matrix along rows (dim=0)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cummin([[5, 6, 5], [7, 8, -1]], 0), [[5, 5, 5], [7, 7, -1]]);
 * ```
 */
export default function cummin(x: array, dim: 1): array;
/**
 * Cumulative minimum of array elements.
 *
 * Computes the cumulative minimum of elements in an array or matrix along a specified dimension.
 *
 * @param x The input array or matrix of values
 * @param dim The dimension along which to calculate, `1` for columns, `0` for rows (defaults to `1`)
 * @returns The cumulative minimum of the input values
 * @throws If no input is provided
 *
 * @example Cumulative minimum of a 1D array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cummin([5, 6, 3]), [5, 5, 3]);
 *
 * ```
 *
 * @example Cumulative minimum of a matrix along columns (dim=1)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cummin([[5, 6, 5], [7, 8, -1]], 1), [[5, 5], [6, 6], [5, -1]]);
 *
 * ```
 *
 * @example Cumulative minimum of a matrix along rows (dim=0)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cummin([[5, 6, 5], [7, 8, -1]], 0), [[5, 5, 5], [7, 7, -1]]);
 * ```
 */
export default function cummin(x: matrix, dim: 0): matrix;
/**
 * Cumulative minimum of array elements.
 *
 * Computes the cumulative minimum of elements in an array or matrix along a specified dimension.
 *
 * @param x The input array or matrix of values
 * @param dim The dimension along which to calculate, `1` for columns, `0` for rows (defaults to `1`)
 * @returns The cumulative minimum of the input values
 * @throws If no input is provided
 *
 * @example Cumulative minimum of a 1D array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cummin([5, 6, 3]), [5, 5, 3]);
 *
 * ```
 *
 * @example Cumulative minimum of a matrix along columns (dim=1)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cummin([[5, 6, 5], [7, 8, -1]], 1), [[5, 5], [6, 6], [5, -1]]);
 *
 * ```
 *
 * @example Cumulative minimum of a matrix along rows (dim=0)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cummin([[5, 6, 5], [7, 8, -1]], 0), [[5, 5, 5], [7, 7, -1]]);
 * ```
 */
export default function cummin(x: matrix, dim: 1): matrix;
/**
 * Cumulative minimum of array elements.
 *
 * Computes the cumulative minimum of elements in an array or matrix along a specified dimension.
 *
 * @param x The input array or matrix of values
 * @param dim The dimension along which to calculate, `1` for columns, `0` for rows (defaults to `1`)
 * @returns The cumulative minimum of the input values
 * @throws If no input is provided
 *
 * @example Cumulative minimum of a 1D array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cummin([5, 6, 3]), [5, 5, 3]);
 *
 * ```
 *
 * @example Cumulative minimum of a matrix along columns (dim=1)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cummin([[5, 6, 5], [7, 8, -1]], 1), [[5, 5], [6, 6], [5, -1]]);
 *
 * ```
 *
 * @example Cumulative minimum of a matrix along rows (dim=0)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cummin([[5, 6, 5], [7, 8, -1]], 0), [[5, 5, 5], [7, 7, -1]]);
 * ```
 */
export default function cummin(
  x: array | matrix,
  dim: 0 | 1 = 1,
): array | matrix {
  return vectorfun(
    dim,
    x,
    (a: array) =>
      a.map((_: number, i: number) => Math.min(...a.slice(0, i + 1))),
  );
}
