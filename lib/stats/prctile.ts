import type { array, matrix, numarraymatrix } from "../types.d.ts";
import {
  colon,
  interp1,
  isarray,
  ismatrix,
  isnumber,
  rdivide,
  sort,
  times,
  vectorfun,
} from "../../index.ts";

/**
 * @function prctile
 * @summary Percentiles of a sample
 * @description Calculates the p-th percentile of values in an array or matrix.
 * Uses linear interpolation between data points for accurate percentile calculation.
 *
 * @param x Input array or matrix
 * @param p Percentile value in range [0,100]
 * @param dim Dimension along which to compute percentiles. Default is 0
 * @returns Percentile values
 * @throws {Error} When percentile is outside valid range [0,100]
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: 50th percentile (median)
 * assertEquals(prctile([1, 2, 3, 4, 5], 50), 3);
 *
 * // Example 2: 25th percentile
 * assertEquals(prctile([1, 2, 3, 4], 25), 1.5);
 *
 * // Example 3: 75th percentile
 * assertEquals(prctile([1, 2, 3, 4, 5], 75), 4.25);
 * ```
 */
export default function prctile(x: array, p: number, dim?: 0 | 1): number;
export default function prctile(x: matrix, p: number, dim?: 0 | 1): array;
export default function prctile(x: array, p: number, dim: 0 | 1): number;
export default function prctile(x: matrix, p: number, dim: 0 | 1): array;
export default function prctile(
  x: array | matrix,
  p: number,
  dim?: 0 | 1,
): number | array;
export default function prctile(
  x: array | matrix,
  p: number,
  dim: 0 | 1,
): number | array;
export default function prctile(
  x: array | matrix,
  p: number,
  dim?: 0 | 1,
): number | array {
  const actualDim = dim ?? 0;
  if (p < 0 || p > 100) {
    throw new Error(
      "p-th percentile must be a real value between 0 and 100 inclusive",
    );
  }

  const _prctile = function (a: array, pr: number): number {
    const arrnum = colon(0.5, a.length - 0.5) as number[];
    const _a = sort(a) as number[];
    const pq = rdivide(times(arrnum, 100), a.length) as number[];

    // Concatenate values to the beginning and end
    const extendedPq = [0].concat(pq, [100]);
    const extendedA = [_a[0]].concat(_a, [_a[_a.length - 1]]);

    return interp1(extendedPq, extendedA, pr) as number;
  };

  if (isnumber(x)) {
    return NaN;
  }

  const result = vectorfun(actualDim, x, _prctile, p);
  return result as number | array;
}
