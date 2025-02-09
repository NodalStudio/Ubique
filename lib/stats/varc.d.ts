import { array, matrix } from "../types.d.ts";

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
 * @param x Input array or matrix.
 * @param flag Normalization type:
 *   - `0`: Population variance
 *   - `1`: Sample variance (default)
 * @param dim Dimension to operate on (0: row-wise, 1: column-wise).
 * @returns The computed variance.
 *
 * @example
 * // Example 1: Variance of a 1D array (sample)
 * const c = [5, 6, 3];
 * assert.strictEqual(varc(c), 2.33333);
 *
 * // Example 2: Variance of a 1D array (population)
 * assert.strictEqual(varc(c, 0), 1.55556);
 *
 * // Example 3: Variance of a 2D matrix (row-wise, population)
 * const a = [[5, 6, 5], [7, 8, -1]];
 * assert.deepStrictEqual(varc(a, 0), [[0.222222], [16.222222]]);
 *
 * // Example 4: Variance of a 2D matrix (column-wise, population)
 * assert.deepStrictEqual(varc(a, 0, 1), [[1, 1, 9]]);
 *
 * // Example 5: Throws an error for invalid input
 * assert.throws(() => varc(123), /Input must be an array or matrix/);
 */
export function varc(
  x: array | matrix,
  flag?: number,
  dim?: number,
): number | array | matrix;
