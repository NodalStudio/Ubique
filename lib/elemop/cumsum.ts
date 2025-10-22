import type { array, matrix } from "../types.d.ts";

import { vectorfun } from "../../index.ts";

/**
 * Cumulative sum of array elements.
 *
 * Computes the cumulative sum of elements in an array or matrix along a specified dimension.
 *
 * @param x The input array or matrix of values
 * @param dim The dimension along which to calculate, `1` for columns, `0` for rows (defaults to `1`)
 * @returns The cumulative sum of the input values
 * @throws If no input is provided
 *
 * @example Cumulative sum of a 1D array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cumsum([5, 6, 3]), [5, 11, 14]);
 *
 * ```
 *
 * @example Cumulative sum of a matrix along columns (dim=1)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cumsum([[5, 6, 5], [7, 8, -1]], 1), [[5, 12], [6,14], [5, 4]]);
 *
 * ```
 *
 * @example Cumulative sum of a matrix along rows (dim=0)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cumsum([[5, 6, 5], [7, 8, -1]], 0), [[5, 11, 16], [7, 15, 14]]);
 * ```
 */
export default function cumsum(x: array): array;
/**
 * Cumulative sum of array elements.
 *
 * Computes the cumulative sum of elements in an array or matrix along a specified dimension.
 *
 * @param x The input array or matrix of values
 * @param dim The dimension along which to calculate, `1` for columns, `0` for rows (defaults to `1`)
 * @returns The cumulative sum of the input values
 * @throws If no input is provided
 *
 * @example Cumulative sum of a 1D array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cumsum([5, 6, 3]), [5, 11, 14]);
 *
 * ```
 *
 * @example Cumulative sum of a matrix along columns (dim=1)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cumsum([[5, 6, 5], [7, 8, -1]], 1), [[5, 12], [6,14], [5, 4]]);
 *
 * ```
 *
 * @example Cumulative sum of a matrix along rows (dim=0)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cumsum([[5, 6, 5], [7, 8, -1]], 0), [[5, 11, 16], [7, 15, 14]]);
 * ```
 */
export default function cumsum(x: array, dim: 0): array;
/**
 * Cumulative sum of array elements.
 *
 * Computes the cumulative sum of elements in an array or matrix along a specified dimension.
 *
 * @param x The input array or matrix of values
 * @param dim The dimension along which to calculate, `1` for columns, `0` for rows (defaults to `1`)
 * @returns The cumulative sum of the input values
 * @throws If no input is provided
 *
 * @example Cumulative sum of a 1D array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cumsum([5, 6, 3]), [5, 11, 14]);
 *
 * ```
 *
 * @example Cumulative sum of a matrix along columns (dim=1)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cumsum([[5, 6, 5], [7, 8, -1]], 1), [[5, 12], [6,14], [5, 4]]);
 *
 * ```
 *
 * @example Cumulative sum of a matrix along rows (dim=0)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cumsum([[5, 6, 5], [7, 8, -1]], 0), [[5, 11, 16], [7, 15, 14]]);
 * ```
 */
export default function cumsum(x: array, dim: 1): array;
/**
 * Cumulative sum of array elements.
 *
 * Computes the cumulative sum of elements in an array or matrix along a specified dimension.
 *
 * @param x The input array or matrix of values
 * @param dim The dimension along which to calculate, `1` for columns, `0` for rows (defaults to `1`)
 * @returns The cumulative sum of the input values
 * @throws If no input is provided
 *
 * @example Cumulative sum of a 1D array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cumsum([5, 6, 3]), [5, 11, 14]);
 *
 * ```
 *
 * @example Cumulative sum of a matrix along columns (dim=1)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cumsum([[5, 6, 5], [7, 8, -1]], 1), [[5, 12], [6,14], [5, 4]]);
 *
 * ```
 *
 * @example Cumulative sum of a matrix along rows (dim=0)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cumsum([[5, 6, 5], [7, 8, -1]], 0), [[5, 11, 16], [7, 15, 14]]);
 * ```
 */
export default function cumsum(x: matrix, dim: 0): matrix;
/**
 * Cumulative sum of array elements.
 *
 * Computes the cumulative sum of elements in an array or matrix along a specified dimension.
 *
 * @param x The input array or matrix of values
 * @param dim The dimension along which to calculate, `1` for columns, `0` for rows (defaults to `1`)
 * @returns The cumulative sum of the input values
 * @throws If no input is provided
 *
 * @example Cumulative sum of a 1D array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cumsum([5, 6, 3]), [5, 11, 14]);
 *
 * ```
 *
 * @example Cumulative sum of a matrix along columns (dim=1)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cumsum([[5, 6, 5], [7, 8, -1]], 1), [[5, 12], [6,14], [5, 4]]);
 *
 * ```
 *
 * @example Cumulative sum of a matrix along rows (dim=0)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cumsum([[5, 6, 5], [7, 8, -1]], 0), [[5, 11, 16], [7, 15, 14]]);
 * ```
 */
export default function cumsum(x: matrix, dim: 1): matrix;
/**
 * Cumulative sum of array elements.
 *
 * Computes the cumulative sum of elements in an array or matrix along a specified dimension.
 *
 * @param x The input array or matrix of values
 * @param dim The dimension along which to calculate, `1` for columns, `0` for rows (defaults to `1`)
 * @returns The cumulative sum of the input values
 * @throws If no input is provided
 *
 * @example Cumulative sum of a 1D array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cumsum([5, 6, 3]), [5, 11, 14]);
 *
 * ```
 *
 * @example Cumulative sum of a matrix along columns (dim=1)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cumsum([[5, 6, 5], [7, 8, -1]], 1), [[5, 12], [6,14], [5, 4]]);
 *
 * ```
 *
 * @example Cumulative sum of a matrix along rows (dim=0)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cumsum([[5, 6, 5], [7, 8, -1]], 0), [[5, 11, 16], [7, 15, 14]]);
 * ```
 */
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
