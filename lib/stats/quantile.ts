import type { array, matrix } from "../types.d.ts";
import { isarray, ismatrix, prctile } from "../../index.ts";

/**
 * Quantiles of a sample.
 *
 * Calculates the p-th quantile of values in an array or matrix.
 * Quantiles are values that divide the data into equal probability intervals.
 *
 * @param x Input array or matrix
 * @param p Quantile value in range [0,1] (0.5 = median, 0.25 = first quartile)
 * @param dim Dimension along which to compute quantiles. Default is 0
 * @returns Quantile values
 * @throws When quantile is outside valid range [0,1]
 *
 * @example Median (0.5 quantile)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(quantile([1, 2, 3, 4, 5], 0.5), 3);
 *
 * ```
 *
 * @example First quartile
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(quantile([1, 2, 3, 4], 0.25), 1.5);
 *
 * ```
 *
 * @example Matrix quantiles
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(quantile([[1, 2], [3, 4]], 0.5), [1.5, 3.5]);
 * ```
 */
export default function quantile(x: array, p: number, dim?: 0 | 1): number;
export default function quantile(x: matrix, p: number, dim?: 0 | 1): array;
export default function quantile(x: array, p: number, dim: 0 | 1): number;
export default function quantile(x: matrix, p: number, dim: 0 | 1): array;
export default function quantile(
  x: array | matrix,
  p: number,
  dim?: 0 | 1,
): number | array {
  const actualDim = dim ?? 0;
  if (p < 0 || p > 1) {
    throw new Error(
      "p-th quantile must be a real value between 0 and 1 inclusive",
    );
  }

  // Convert quantile (0-1) to percentile (0-100) and use prctile
  if (isarray(x)) {
    return prctile(x, p * 100, actualDim);
  }

  if (ismatrix(x)) {
    return prctile(x, p * 100, actualDim);
  }

  throw new Error("Invalid input type");
}
