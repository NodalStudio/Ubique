import { centered } from "../internal/moments.ts";
import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { isnumber, vectorfun } from "../../index.ts";

/**
 * Computes the central moment of a dataset.
 *
 * Computes the k-th central moment of a dataset around the mean. The first moment
 * is always zero, the second moment equals variance, and higher moments describe shape.
 *
 * @param x Input array or matrix
 * @param k Order of the moment to compute
 * @param dim Dimension to compute along (0 for rows, 1 for columns). Default is 0
 * @returns Central moment values
 * @throws When input is invalid
 *
 * @example Second moment (variance)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(moment([1, 2, 3, 4, 5], 2), 2);
 *
 * ```
 *
 * @example First moment (always zero)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(moment([1, 2, 3], 1), 0);
 *
 * ```
 *
 * @example Matrix moments
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(moment([[1, 2], [3, 4]], 2), [0.25, 0.25]);
 * ```
 */
export default function moment(x: array, k: number, dim?: 0 | 1): number;
/**
 * Computes the central moment of a dataset.
 *
 * Computes the k-th central moment of a dataset around the mean. The first moment
 * is always zero, the second moment equals variance, and higher moments describe shape.
 *
 * @param x Input array or matrix
 * @param k Order of the moment to compute
 * @param dim Dimension to compute along (0 for rows, 1 for columns). Default is 0
 * @returns Central moment values
 * @throws When input is invalid
 *
 * @example Second moment (variance)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(moment([1, 2, 3, 4, 5], 2), 2);
 *
 * ```
 *
 * @example First moment (always zero)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(moment([1, 2, 3], 1), 0);
 *
 * ```
 *
 * @example Matrix moments
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(moment([[1, 2], [3, 4]], 2), [0.25, 0.25]);
 * ```
 */
export default function moment(x: matrix, k: number, dim?: 0 | 1): array;
/**
 * Computes the central moment of a dataset.
 *
 * Computes the k-th central moment of a dataset around the mean. The first moment
 * is always zero, the second moment equals variance, and higher moments describe shape.
 *
 * @param x Input array or matrix
 * @param k Order of the moment to compute
 * @param dim Dimension to compute along (0 for rows, 1 for columns). Default is 0
 * @returns Central moment values
 * @throws When input is invalid
 *
 * @example Second moment (variance)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(moment([1, 2, 3, 4, 5], 2), 2);
 *
 * ```
 *
 * @example First moment (always zero)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(moment([1, 2, 3], 1), 0);
 *
 * ```
 *
 * @example Matrix moments
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(moment([[1, 2], [3, 4]], 2), [0.25, 0.25]);
 * ```
 */
export default function moment(
  x: numarraymatrix,
  k: number,
  dim: 0 | 1 = 0,
): numarraymatrix {
  if (isnumber(x)) {
    return NaN;
  }

  return vectorfun(dim, x, computeMoment, k);
}

function computeMoment(arr: array, order: number): number {
  if (!Number.isInteger(order) || order < 0) {
    throw new RangeError("Moment order must be a nonnegative integer");
  }
  if (order === 0) return 1;
  if (order === 1) return 0;
  let total = 0;
  for (const value of centered(arr)) total += value ** order / arr.length;
  return total;
}
