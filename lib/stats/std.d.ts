import { array, matrix } from "../types.d.ts";

/**
 * @function std
 * @summary Computes the Standard Deviation
 * @description Computes the standard deviation for an array or matrix.
 * Supports both **population (N)** and **sample (N-1)** normalizations.
 *
 * **Formula:**
 * - Population (flag = 0):
 *   **σ = sqrt(Σ (xᵢ - μ)² / N)**
 * - Sample (flag = 1, default):
 *   **s = sqrt(Σ (xᵢ - x̄)² / (N - 1))**
 *
 * @param x Input array or matrix.
 * @param flag Normalization type:
 *   - `0`: Population standard deviation
 *   - `1`: Sample standard deviation (default)
 * @param dim Dimension to operate on (0: row-wise, 1: column-wise).
 * @returns The computed standard deviation.
 *
 * @example
 * import { std } from './std.ts';
 *
 * // Example 1: Standard deviation of a 1D array (sample)
 * const c = [5, 6, 3];
 * assert.strictEqual(std(c), 1.52753);
 *
 * // Example 2: Standard deviation of a 1D array (population)
 * assert.strictEqual(std(c, 0), 1.24722);
 *
 * // Example 3: Standard deviation of a 2D matrix (row-wise, population)
 * const a = [[5, 6, 5], [7, 8, -1]];
 * assert.deepStrictEqual(std(a, 0), [[0.471405], [4.027682]]);
 *
 * // Example 4: Standard deviation of a 2D matrix (column-wise, population)
 * assert.deepStrictEqual(std(a, 0, 1), [[1, 1, 3]]);
 *
 * // Example 5: Throws an error for invalid input
 * assert.throws(() => std(123), /Input must be an array or matrix/);
 */
export function std(
  x: array | matrix,
  flag?: number,
  dim?: number,
): number | array | matrix;
