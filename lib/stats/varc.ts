/** @import { array, matrix } from '../types' */

import mean from './mean.js';
import sum from '../elemop/sum.js';
import power from '../elemop/power.js';
import abs from '../elmath/abs.js';
import minus from '../elemop/minus.js';
import vectorfun from '../datatype/vectorfun.js';
import isarray from '../datatype/isarray.js';

/**
 * @function varc
 * @summary Computes the Variance
 * @description Computes the variance for an array or matrix.
 * Supports both **population (N)** and **sample (N-1)** normalizations.
 *
 * **Formula:**
 * - Population (flag = 0):
 *   **σ² = Σ (xᵢ - μ)² / N**
 * - Sample (flag = 1, default):
 *   **s² = Σ (xᵢ - x̄)² / (N - 1)**
 *
 * @param {array|matrix} x Input array or matrix.
 * @param {number} [flag=1] Normalization type:
 *   - `0`: Population variance
 *   - `1`: Sample variance (default)
 * @param {number} [dim=0] Dimension to operate on (0: row-wise, 1: column-wise).
 * @returns {number|array|matrix} The computed variance.
 * @throws {Error} If the input is invalid.
 *
 * @example
 * // Example 1: Variance of a 1D array (sample)
 * const c = [5, 6, 3];
 * assert.strictEqual(varc(c), 2.33333);
 *
 * // Example 2: Variance of a 1D array (population)
 * assert.strictEqual(varc(c, 0), 1.55556);
 *
 * // Example 3: Variance of a 2D matrix (row-wise, population)
 * const a = [[5, 6, 5], [7, 8, -1]];
 * assert.deepStrictEqual(varc(a, 0), [[0.222222], [16.222222]]);
 *
 * // Example 4: Variance of a 2D matrix (column-wise, population)
 * assert.deepStrictEqual(varc(a, 0, 1), [[1, 1, 9]]);
 *
 * // Example 5: Throws an error for invalid input
 * assert.throws(() => varc(123), /Input must be an array or matrix/);
 */
export default function varc(x, flag = 1, dim = 0) {
  if (!isarray(x)) {
    throw new Error('Input must be an array or matrix');
  }

  return vectorfun(dim, x, (arr) => computeVariance(arr, flag));
}

function computeVariance(arr, flag) {
  const mu = mean(arr);
  return sum(power(abs(minus(arr, mu)), 2)) / (arr.length - flag);
}
