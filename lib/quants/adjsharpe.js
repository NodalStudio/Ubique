/** @import { array, matrix } from '../types.js' */

import { sharpe } from './sharpe.js';
import { skewness } from '../stats/skewness.js';
import { kurtosis } from '../stats/kurtosis.js';
import { vectorfun } from '../datatype/vectorfun.js';
import { isarray } from '../datatype/isarray.js';

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
 * @param {array|matrix} x Asset/portfolio returns.
 * @param {number} [frisk=0] Annual risk-free rate.
 * @param {number} [dim=0] Dimension to operate on (0: row-wise, 1: column-wise).
 * @returns {number|array|matrix} The computed Adjusted Sharpe Ratio.
 * @throws {Error} If the input is invalid.
 *
 * @example
 * // Example 1: Adjusted Sharpe Ratio for a single asset
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assert.strictEqual(adjsharpe(x, 0.02 / 12), 0.748134);
 *
 * // Example 2: Throws an error for invalid input
 * assert.throws(() => adjsharpe(123), /Input must be an array or matrix/);
 */
export function adjsharpe(x, frisk = 0, dim = 0) {
  if (!isarray(x)) {
    throw new Error('Input must be an array or matrix');
  }

  return vectorfun(dim, x, arr => computeAdjSharpe(arr, frisk));
}

function computeAdjSharpe(arr, frisk) {
  const sr = sharpe(arr, frisk);
  const sk = skewness(arr);
  const ku = kurtosis(arr);
  return sr * (1 + (sk / 6) * sr - ((ku - 3) / 24) * Math.sqrt(sr));
}
