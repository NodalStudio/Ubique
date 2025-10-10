import type { array, matrix, numarraymatrix } from "../types.d.ts";
import {
  isarray,
  ismatrix,
  isnumber,
  mean,
  minus,
  rdivide,
  std,
  vectorfun,
} from "../../index.ts";

/**
 * @function zscore
 * @summary Standardized Z score
 * @description Calculates standardized z-scores by subtracting the mean and dividing by
 * the standard deviation. Results have mean 0 and standard deviation 1.
 *
 * @param x Input array or matrix
 * @param flag Normalization value (0: population, 1: sample). Default is 1
 * @param dim Dimension along which to compute z-scores. Default is 0
 * @returns Standardized z-score values
 * @throws {Error} When input is invalid
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Simple z-scores
 * assertEquals(zscore([1, 2, 3, 4, 5]), [-1.2649110640673518, -0.6324555320336759, 0, 0.6324555320336759, 1.2649110640673518]);
 *
 * // Example 2: Z-scores preserve relative distances
 * assertEquals(zscore([10, 20, 30]), [-1, 0, 1]);
 *
 * // Example 3: Matrix z-scores
 * assertEquals(zscore([[1, 2], [3, 4]]), [[-0.7071067811865475, 0.7071067811865475], [-0.7071067811865475, 0.7071067811865475]]);
 * ```
 */
export default function zscore(x: array, flag?: 0 | 1, dim?: 0 | 1): array;
export default function zscore(x: matrix, flag?: 0 | 1, dim?: 0 | 1): matrix;
export default function zscore(
  x: numarraymatrix,
  flag: 0 | 1 = 1,
  dim: 0 | 1 = 0,
): numarraymatrix {
  const _zscore = function (a: array, normFlag: 0 | 1): array {
    return rdivide(minus(a, mean(a)), std(a, normFlag)) as array;
  };

  if (isnumber(x)) {
    return NaN as any;
  }

  return vectorfun(dim, x, _zscore, flag);
}
