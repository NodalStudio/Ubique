import { centered } from "../internal/moments.ts";
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
export default function zscore(x: matrix, flag?: 0 | 1, dim?: 0 | 1): matrix;
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
export default function zscore(
  x: numarraymatrix,
  flag: 0 | 1 = 1,
  dim: 0 | 1 = 0,
): numarraymatrix {
  if (isnumber(x)) {
    return NaN;
  }

  const result = vectorfun(
    dim,
    x,
    (arr: array) => computeZscore(arr, flag),
    flag,
  );
  if (dim === 1 && Array.isArray(x[0])) {
    const columns = result as number[][];
    return columns[0].map((_, i) => columns.map((column) => column[i]));
  }
  return result;
}

/**
 * Center in translated coordinates before computing squared deviations.
 * This preserves small variations around a large common offset.
 */
function computeZscore(arr: array, flag: 0 | 1): array {
  const n = arr.length;
  if (n === 0) return [];
  if (n === 1) return [0];

  if (flag !== 0 && flag !== 1) {
    throw new RangeError("Normalization flag must be 0 or 1");
  }
  const deviations = centered(arr);
  const stdDev = Math.sqrt(
    deviations.reduce((sum, v) => sum + v * v, 0) / (n - flag),
  );
  return deviations.map((value) => stdDev === 0 ? 0 : value / stdDev);
}
