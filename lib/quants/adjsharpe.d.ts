import { array, matrix } from '../types';

/**
 * @function adjsharpe
 * @summary Computes the Adjusted Sharpe Ratio
 * @description The Adjusted Sharpe Ratio accounts for skewness and kurtosis with a penalty factor
 * for negative skewness and excess kurtosis.
 *
 * Adjusted Sharpe Ratio formula:
 * **ASR = SR × [1 + (S / 6) × SR - ((K - 3) / 24) × SR²]**
 * where:
 * - `SR` = Sharpe Ratio
 * - `S` = Skewness
 * - `K` = Kurtosis
 *
 * @param x Asset/portfolio returns.
 * @param frisk Annual risk-free rate.
 * @param dim Dimension to operate on (0: row-wise, 1: column-wise).
 * @returns The computed Adjusted Sharpe Ratio.
 *
 * @example
 * // Example 1: Adjusted Sharpe Ratio for a single asset
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assert.strictEqual(adjsharpe(x, 0.02 / 12), 0.748134);
 *
 * // Example 2: Throws an error for invalid input
 * assert.throws(() => adjsharpe(123), /Input must be an array or matrix/);
 */
export function adjsharpe(
  x: array | matrix,
  frisk?: number,
  dim?: number
): number | array | matrix;
