/** @import { array, matrix } from '../types' */

import mean from './mean.js';
import vectorfun from '../datatype/vectorfun.js';

/**
 * @function moment
 * @summary Computes the central moment of an array or matrix.
 * @description Computes the k-th central moment of a dataset. The first moment is always zero, and the second moment is the variance.
 *
 * @param {array|matrix} x The dataset (array or matrix).
 * @param {number} k The order of the moment (k-th central moment).
 * @param {number} [dim=0] The dimension to compute the moment along (0 for row-wise, 1 for column-wise).
 * @returns {number|array|matrix} The computed central moment.
 * @throws {Error} If the number of arguments is insufficient.
 *
 * @example
 * import moment from './moment.js';
 *
 * // Example 1: Compute the third central moment of an array
 * assert.strictEqual(moment([0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039], 3), 0.000007);
 *
 * // Example 2: Compute the first central moment (always zero)
 * assert.strictEqual(moment([0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039], 1), 0);
 *
 * // Example 3: Compute the second central moment (variance) for a matrix along rows
 * assert.deepStrictEqual(moment([[0.003, 0.026], [0.015, -0.009]], 2), [[0.000265], [0.000144]]);
 *
 * // Example 4: Compute the second central moment (variance) for a matrix along columns
 * assert.deepStrictEqual(moment([[0.003, 0.026], [0.015, -0.009]], 2, 1), [[0.000114, 0.000605]]);
 *
 * // Example 5: Compute the fourth moment of a dataset
 * assert.strictEqual(moment([1, 2, 3, 4, 5], 4), 2);
 */
export default function moment(x, k, dim = 0) {
  if (x === undefined || k === undefined) {
    throw new Error('Not enough input arguments');
  }

  if (!Array.isArray(x)) {
    return NaN;
  }

  return vectorfun(dim, x, computeMoment, k);
}

function computeMoment(arr, order) {
  const mu = mean(arr);

  return mean(arr.map((val) => (val - mu) ** order));
}
