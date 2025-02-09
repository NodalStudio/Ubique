/** @import { array, matrix } from '../types' */

import isnumber from '../datatype/isnumber.js';
import isarray from '../datatype/isarray.js';
import rdivide from '../elemop/rdivide.js';
import numel from '../matarrs/numel.js';
import size from '../matarrs/size.js';
import sum from '../elemop/sum.js';

/**
 * @function mean
 * @summary Average value of array or matrix
 * @description Computes the average value of an array or matrix along a specified dimension.
 *
 * @param {array|matrix} x The input array or matrix of values.
 * @param {number} [dim=0] The dimension along which to calculate. `0` for row-wise, `1` for column-wise. Defaults to `0`.
 * @returns {number|array} The mean value(s).
 * @throws {Error} If no input is provided.
 *
 * @example
 * // Example 1: Mean of a vector
 * assert.strictEqual(mean([5, 6, 3]), 4.66667);
 *
 * // Example 2: Mean of a matrix along rows (dim=0)
 * assert.deepStrictEqual(mean([[5, 6, 5], [7, 8, -1]]), [5.333333, 4.666667]);
 *
 * // Example 3: Mean of a matrix along columns (dim=1)
 * assert.deepStrictEqual(mean([[5, 6, 5], [7, 8, -1]], 1), [6, 7, 2]);
 */
export default function mean(x, dim = 0) {
  if (!x) {throw new Error('Not enough input arguments');}

  if (isnumber(x))
  {return x;}

  if (isarray(x))
  {return sum(x, dim) / numel(x);}

  return rdivide(sum(x, dim), size(x, dim)[1 - dim]);
}
