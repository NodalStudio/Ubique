import { array, matrix } from '../types';

/**
 * @function annreturn
 * @summary Computes the annualized return
 * @description Calculates the annualized return of an asset or portfolio over a period.
 * It supports both geometric (compounded) and simple (arithmetic) return modes.
 *
 * @param x Asset/portfolio returns.
 * @param t Frequency of data points in a year.
 *   (1: yearly, 4: quarterly, 12: monthly, 52: weekly, 252: daily).
 * @param mode Return mode: 'geometric' (default) or 'simple'.
 * @param dim Dimension to operate on (0: row-wise, 1: column-wise).
 * @returns The computed annualized return.
 *
 * @example
 * import { annreturn } from './annreturn.js';
 *
 * // Example 1: Annualized return for a single asset
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assert.strictEqual(annreturn(x, 12), 0.2338146820656939);
 *
 * // Example 2: Throws an error for unknown mode
 * assert.throws(() => annreturn(x, 12, 'invalid'), /Unknown mode/);
 */
export function annreturn(
  x: array | matrix,
  t?: number,
  mode?: string,
  dim?: number
): number | array | matrix;
