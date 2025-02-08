/** @import { array, matrix } from '../types.ts' */

import { moment } from './moment.js';
import { vectorfun } from '../datatype/vectorfun.js';

/**
 * @function kurtosis
 * @summary Computes the kurtosis of a dataset.
 * @description Kurtosis measures the "tailedness" of a probability distribution.
 * A higher kurtosis indicates heavier tails, while a lower kurtosis suggests lighter tails.
 *
 * @param {array|matrix} x The dataset (array or matrix).
 * @param {number} [flag=1] Bias correction flag (0 for bias correction, 1 for simple calculation).
 * @param {number} [dim=0] Dimension to compute kurtosis along (0 for row-wise, 1 for column-wise).
 * @returns {number|array|matrix} The computed kurtosis.
 * @throws {Error} If the input arguments are insufficient.
 *
 * @example
 * import { kurtosis } from './kurtosis.js';
 *
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * const y = [-0.005, 0.081, 0.04, -0.037, -0.061, 0.058, -0.049, -0.021, 0.062, 0.058];
 *
 * // Example 1: Compute kurtosis of an array
 * assert.strictEqual(kurtosis(x), 3.037581);
 *
 * // Example 2: Compute kurtosis with bias correction
 * assert.strictEqual(kurtosis(x, 0), 2.9453);
 *
 * // Example 3: Compute kurtosis for a matrix along rows
 * assert.deepStrictEqual(kurtosis([[...x], [...y]]), [[3.037581], [1.397642]]);
 *
 * // Example 4: Compute kurtosis for a matrix along columns
 * assert.deepStrictEqual(kurtosis([[0.003, 0.026], [0.015, -0.009]], 1, 1), [[2.78], [1.85]]);
 *
 * // Example 5: Compute kurtosis for a dataset with equal elements (should be NaN)
 * assert.strictEqual(kurtosis([1, 1, 1, 1, 1]), NaN);
 */
export function kurtosis(x, flag = 1, dim = 0) {
  if (x === undefined) {
    throw new Error('Not enough input arguments');
  }

  /**
   * Computes kurtosis for an array.
   *
   * @param {array} arr Input array.
   * @param {number} biasFlag Flag for bias correction.
   * @returns {number} Computed kurtosis.
   */
  const computeKurtosis = (arr, biasFlag) => {
    const n = arr.length;
    const mom4 = moment(arr, 4) / moment(arr, 2) ** 2;

    return biasFlag === 1
      ? mom4
      : ((n + 1) * mom4 - 3 * (n - 1)) * (n - 1) / ((n - 2) * (n - 3)) + 3;
  };

  if (!Array.isArray(x)) {
    return NaN;
  }

  return vectorfun(dim, x, computeKurtosis, flag);
}
