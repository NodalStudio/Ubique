import type { array, matrix, numarraymatrix } from "../types.d.ts";
import {
  cdrawdown,
  isarray,
  ismatrix,
  mean,
  sort,
  subsetlin,
  vectorfun,
} from "../../index.ts";

/**
 * Computes the Average Drawdown.
 *
 * Computes the average drawdown of an asset/portfolio.
 * If `k` is greater than 0, it calculates the average of the `k` largest drawdowns.
 *
 * **Formula:**
 * - If `k = 0`: **Average Drawdown = Mean of all continuous drawdowns**
 * - If `k > 0`: **Average of the `k` largest drawdowns**
 *
 * @param x Asset/portfolio returns
 * @param k Number of largest drawdowns to consider (0 for all)
 * @param dim Dimension to operate on (0: row-wise, 1: column-wise)
 * @returns The computed average drawdown
 * @throws If the input is invalid
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Average drawdown for a single asset
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assertEquals(avgdrawdown(x), 0.007299999999999999);
 *
 * // Example 2: Average of largest drawdown only
 * assertEquals(avgdrawdown(x, 1), 0.014);
 *
 * // Example 3: Average drawdown for multiple assets (matrix)
 * const x1 = [0.003, 0.026, 0.015, -0.009, 0.014];
 * const x2 = [0.024, 0.015, 0.066, -0.014, 0.039];
 * assertEquals(avgdrawdown([x1, x2]), [0.0036, 0.0056]);
 * ```
 */
export default function avgdrawdown(x: array, k?: number, dim?: 0 | 1): number;
export default function avgdrawdown(x: matrix, k?: number, dim?: 0 | 1): array;
export default function avgdrawdown(
  x: numarraymatrix,
  k = 0,
  dim: 0 | 1 = 0,
): number | array | matrix {
  if (!isarray(x) && !ismatrix(x)) {
    throw new Error("Input must be an array or matrix");
  }

  return vectorfun(dim, x, (arr: array) => computeAvgDrawdown(arr, k));
}

function computeAvgDrawdown(arr: array, k: number): number {
  const cdd = cdrawdown(arr);
  if (k === 0) {
    return mean(cdd);
  }
  if (k > 0 && k <= cdd.length) {
    const sortedCdd = sort(cdd, "descend") as array;
    return mean(
      subsetlin(
        sortedCdd,
        Array.from({ length: k }, (_, i) => i),
      ) as array,
    );
  }
  return NaN;
}
