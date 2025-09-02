import type { array, matrix } from "../types.d.ts";
import {
  abs,
  isarray,
  mean,
  minus,
  power,
  sum,
  vectorfun,
} from "../../index.ts";

/**
 * @function varc
 * @summary Computes the Variance
 * @description Computes the variance for an array or matrix.
 * Supports both **population (N)** and **sample (N-1)** normalizations.
 *
 * **Formula:**
 * - Population (flag = 0):
 *   **σ² = Σ (xᵢ - μ)² / N**
 * - Sample (flag = 1, default):
 *   **s² = Σ (xᵢ - x̄)² / (N - 1)**
 *
 * @param x Input array or matrix
 * @param flag Normalization type (0: Population, 1: Sample, defaults to 1)
 * @param dim Dimension to operate on (0: row-wise, 1: column-wise, defaults to 0)
 * @returns The computed variance
 * @throws {Error} If the input is invalid
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Variance of a 1D array (sample)
 * const c = [5, 6, 3];
 * assertEquals(varc(c), 2.33333);
 *
 * // Example 2: Variance of a 1D array (population)
 * assertEquals(varc(c, 0), 1.55556);
 *
 * // Example 3: Variance of a 2D matrix (row-wise, population)
 * const a = [[5, 6, 5], [7, 8, -1]];
 * assertEquals(varc(a, 0), [[0.222222], [16.222222]]);
 *
 * // Example 4: Variance of a 2D matrix (column-wise, population)
 * assertEquals(varc(a, 0, 1), [[1, 1, 9]]);

 * ```*/
export default function varc(x: array, flag?: 0 | 1, dim?: 0 | 1): number;
export default function varc(
  x: matrix,
  flag?: 0 | 1,
  dim?: 0 | 1,
): array | matrix;
export default function varc(
  x: array | matrix,
  flag: 0 | 1 = 1,
  dim: 0 | 1 = 0,
): number | array | matrix {
  if (!isarray(x)) {
    throw new Error("Input must be an array or matrix");
  }

  return vectorfun(dim, x, (arr: array) => computeVariance(arr, flag));
}

function computeVariance(arr: array, flag: 0 | 1): number {
  const mu = mean(arr);
  return sum(power(abs(minus(arr, mu)), 2) as array) / (arr.length - flag);
}
