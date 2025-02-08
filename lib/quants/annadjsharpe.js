/** @import { array, matrix } from '../types.js' */

import { annreturn } from './annreturn.js';
import { annrisk } from './annrisk.js';
import { skewness } from '../stats/skewness.js';
import { kurtosis } from '../stats/kurtosis.js';
import { vectorfun } from '../datatype/vectorfun.js';
import { isarray } from '../datatype/isarray.js';

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
 * @param {array|matrix} x Asset/portfolio returns.
 * @param {number} [frisk=0] Annual risk-free rate.
 * @param {number} [t=252] Data frequency:
 *   - 252: daily (default)
 *   - 52: weekly
 *   - 12: monthly
 *   - 4: quarterly
 * @param {string} [mode='geometric'] Return mode: 'geometric' or 'simple'.
 * @param {number} [dim=0] Dimension to operate on (0: row-wise, 1: column-wise).
 * @returns {number|array|matrix} The computed Annualized Adjusted Sharpe Ratio.
 * @throws {Error} If the input is invalid.
 *
 * @example
 * // Example 1: Annualized Adjusted Sharpe Ratio for a single asset
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assert.strictEqual(annadjsharpe(x, 0.02, 12, 'geometric'), 3.376724);
 *
 * // Example 2: Throws an error for invalid input
 * assert.throws(() => annadjsharpe(123), /Input must be an array or matrix/);
 */
export function annadjsharpe(x, frisk = 0, t = 252, mode = 'geometric', dim = 0) {
  if (!isarray(x)) {
    throw new Error('Input must be an array or matrix');
  }

  return vectorfun(dim, x, arr => computeAnnAdjSharpe(arr, frisk, t, mode));
}

function computeAnnAdjSharpe (arr, frisk, t, mode) {
  const annualReturn = annreturn(arr, t, mode);
  const annualRisk = annrisk(arr, t);
  const sr = (annualReturn - frisk) / annualRisk;
  const sk = skewness(arr);
  const ku = kurtosis(arr);
  return sr * (1 + (sk / 6) * sr - ((ku - 3) / 24) * Math.sqrt(sr));
}
