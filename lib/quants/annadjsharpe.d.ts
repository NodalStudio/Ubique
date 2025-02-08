import { array, matrix } from "../types.js";

/**
 * @function annadjsharpe
 * @summary Computes the Annualized Adjusted Sharpe Ratio
 * @description The Adjusted Sharpe Ratio accounts for skewness and kurtosis with a penalty factor
 * for negative skewness and excess kurtosis.
 *
 * **Formula:**
 * ASR = SR × [1 + (S / 6) × SR - ((K - 3) / 24) × SR²]
 * where:
 * - `SR` = Annualized Sharpe Ratio (Annualized Return / Annualized Risk)
 * - `S` = Skewness
 * - `K` = Kurtosis
 *
 * @param x Asset/portfolio returns.
 * @param frisk Annual risk-free rate.
 * @param t Data frequency:
 *   - 252: daily (default)
 *   - 52: weekly
 *   - 12: monthly
 *   - 4: quarterly
 * @param mode Return mode: 'geometric' or 'simple'.
 * @param dim Dimension to operate on (0: row-wise, 1: column-wise).
 * @returns The computed Annualized Adjusted Sharpe Ratio.
 *
 * @example
 * // Example 1: Annualized Adjusted Sharpe Ratio for a single asset
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assert.strictEqual(annadjsharpe(x, 0.02, 12, 'geometric'), 3.376724);
 *
 * // Example 2: Throws an error for invalid input
 * assert.throws(() => annadjsharpe(123), /Input must be an array or matrix/);
 */
export function annadjsharpe(
  x: array | matrix,
  frisk?: number,
  t?: number,
  mode?: string,
  dim?: number
): number | array | matrix;
