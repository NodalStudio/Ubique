/** @import { array, matrix } from '../types' */

import cdrawdown from './cdrawdown.js';
import mean from '../stats/mean.js';
import sort from '../matarrs/sort.js';
import subsetlin from '../matarrs/subsetlin.js';
import vectorfun from '../datatype/vectorfun.js';
import isarray from '../datatype/isarray.js';

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
 * @param {array|matrix} x Asset/portfolio returns.
 * @param {number} [k=0] Number of largest drawdowns to consider (0 for all).
 * @param {number} [dim=0] Dimension to operate on (0: row-wise, 1: column-wise).
 * @returns {number|array|matrix} The computed average drawdown.
 * @throws {Error} If the input is invalid.
 *
 * @example
 * import avgdrawdown from './avgdrawdown.js';
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
export default function avgdrawdown(x, k = 0, dim = 0) {
  if (!isarray(x)) {
    throw new Error('Input must be an array or matrix');
  }

  return vectorfun(dim, x, (x) => computeAvgDrawdown(x, k));
}

function computeAvgDrawdown(arr, k) {
  const cdd = cdrawdown(arr);
  if (k === 0) {
    return mean(cdd);
  }
  if (k > 0 && k <= cdd.length) {
    const sortedCdd = sort(cdd, 'descend');
    return mean(subsetlin(sortedCdd, Array.from({ length: k }, (_, i) => i)));
  }
  return NaN;
}
