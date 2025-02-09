/** @import { array, matrix } from '../types.js' */

import mean from '../stats/mean.js';
import prod from '../elemop/prod.js';
import vectorfun from '../datatype/vectorfun.js';

/**
 * @function annreturn
 * @summary Computes the annualized return
 * @description Calculates the annualized return of an asset or portfolio over a period.
 * It supports both geometric (compounded) and simple (arithmetic) return modes.
 *
 * @param {array|matrix} x Asset/portfolio returns.
 * @param {number} [t=252] Frequency of data points in a year.
 *   (1: yearly, 4: quarterly, 12: monthly, 52: weekly, 252: daily).
 * @param {string} [mode='geometric'] Return mode: 'geometric' (default) or 'simple'.
 * @param {number} [dim=0] Dimension to operate on (0: row-wise, 1: column-wise).
 * @returns {number|array|matrix} The computed annualized return.
 * @throws {Error} If the input is invalid or an unknown mode is specified.
 *
 * @example
 * import annreturn from './annreturn.js';
 *
 * // Example 1: Annualized return for a single asset
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assert.strictEqual(annreturn(x, 12), 0.2338146820656939);
 *
 * // Example 2: Throws an error for unknown mode
 * assert.throws(() => annreturn(x, 12, 'invalid'), /Unknown mode/);
 */
export default function annreturn(x, t = 252, mode = 'geometric', dim = 0) {
  if (!Array.isArray(x)) {
    throw new Error('Input must be an array or matrix');
  }

  return vectorfun(dim, x, arr => computeAnnReturn(arr, t, mode));
}

function computeAnnReturn(arr, t, mode) {
  const n = arr.length;
  if (mode === 'geometric') {
    return Math.pow(prod(arr.map((val) => val + 1)), t / n) - 1;
  }
  if (mode === 'simple') {
    return mean(arr) * t;
  }
  throw new Error('Unknown mode');
}
