import { array, matrix } from '../types';

/**
 * @function burkeratio
 * @summary Computes the Burke Ratio
 * @description The Burke Ratio is a risk-adjusted metric incorporating drawdowns.
 * Supports both 'simple' and 'modified' calculation modes.
 *
 * @param x Asset or portfolio returns.
 * @param frisk Annual risk-free rate.
 * @param t Frequency: 252 (daily), 52 (weekly), 12 (monthly), 4 (quarterly).
 * @param mode Calculation mode: 'simple' or 'modified'.
 * @param dim Dimension: 0 (row-wise), 1 (column-wise).
 * @returns The computed Burke Ratio.
 *
 * @example
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * const y = [-0.005, 0.081, 0.04, -0.037, -0.061, 0.058, -0.049, -0.021, 0.062, 0.058];
 *
 * // Example 1: Compute Burke Ratio for a single return series
 * assert.strictEqual(burkeratio(x, 0, 12), 14.048563);
 *
 * // Example 2: Compute modified Burke Ratio
 * assert.strictEqual(burkeratio(x, 0, 12, 'modified'), 44.425456);
 *
 * // Example 3: Invalid input
 * assert.throws(() => burkeratio([x, y]), /Input must be an array/);
 */
export function burkeratio(
  x: array | matrix,
  frisk?: number,
  t?: number,
  mode?: string,
  dim?: number
): number | array;
