import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { isnumber, mean, vectorfun } from "../../index.ts";

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
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Second moment (variance)
 * assertEquals(moment([1, 2, 3, 4, 5], 2), 2);
 *
 * // Example 2: First moment (always zero)
 * assertEquals(moment([1, 2, 3], 1), 0);
 *
 * // Example 3: Matrix moments
 * assertEquals(moment([[1, 2], [3, 4]], 2), [0.25, 0.25]);
 * ```
 */
export default function moment(x: array, k: number, dim?: 0 | 1): number;
export default function moment(x: matrix, k: number, dim?: 0 | 1): array;
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
  const mu = mean(arr);
  return mean(arr.map((val: number) => (val - mu) ** order));
}
