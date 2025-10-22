import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { isnumber, vectorfun } from "../../index.ts";

/**
 * Standardized Z score.
 *
 * Calculates standardized z-scores by subtracting the mean and dividing by
 * the standard deviation. Results have mean 0 and standard deviation 1.
 *
 * @param x Input array or matrix
 * @param flag Normalization value (0: population, 1: sample). Default is 1
 * @param dim Dimension along which to compute z-scores. Default is 0
 * @returns Standardized z-score values
 * @throws When input is invalid
 *
 * @example Simple z-scores
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(zscore([1, 2, 3, 4, 5]), [-1.2649110640673518, -0.6324555320336759, 0, 0.6324555320336759, 1.2649110640673518]);
 *
 * ```
 *
 * @example Z-scores preserve relative distances
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(zscore([10, 20, 30]), [-1, 0, 1]);
 *
 * ```
 *
 * @example Matrix z-scores
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
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
  if (isnumber(x)) {
    return NaN;
  }

  return vectorfun(dim, x, (arr: array) => computeZscore(arr, flag), flag);
}

/**
 * Single-pass z-score calculation using Welford's algorithm.
 * Numerically stable computation of mean and std, then standardizes
 */
function computeZscore(arr: array, flag: 0 | 1): array {
  const n = arr.length;
  if (n === 0) return [];
  if (n === 1) return [0];

  // Welford's algorithm for numerically stable variance
  let mean = 0;
  let m2 = 0;

  for (let i = 0; i < n; i++) {
    const x = arr[i];
    const delta = x - mean;
    mean += delta / (i + 1);
    const delta2 = x - mean;
    m2 += delta * delta2;
  }

  const variance = m2 / (n - flag);
  const stdDev = Math.sqrt(variance);

  // Standardize: (x - mean) / std
  if (stdDev === 0) {
    // All values are the same
    return arr.map(() => 0);
  }

  return arr.map((val) => (val - mean) / stdDev);
}
