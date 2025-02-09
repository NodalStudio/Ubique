import { array, matrix } from '../types';

/**
 * @function avgdrawdown
 * @summary Computes the Average Drawdown
 * @description Computes the average drawdown of an asset/portfolio.
 * If `k` is greater than 0, it calculates the average of the `k` largest drawdowns.
 *
 * **Formula:**
 * - If `k = 0`: **Average Drawdown = Mean of all continuous drawdowns**
 * - If `k > 0`: **Average of the `k` largest drawdowns**
 *
 * @param x Asset/portfolio returns.
 * @param k Number of largest drawdowns to consider (0 for all).
 * @param dim Dimension to operate on (0: row-wise, 1: column-wise).
 * @returns The computed average drawdown.
 *
 * @example
 * import { avgdrawdown } from './avgdrawdown.js';
 *
 * // Example 1: Average drawdown for a single asset
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assert.strictEqual(avgdrawdown(x), 0.0115);
 *
 * // Example 2: 1-largest drawdown
 * assert.strictEqual(avgdrawdown(x, 1), 0.014);
 *
 * // Example 3: Throws an error for invalid input
 * assert.throws(() => avgdrawdown(123), /Input must be an array or matrix/);
 */
export function avgdrawdown(
  x: array | matrix,
  k?: number,
  dim?: number
): number | array | matrix;
