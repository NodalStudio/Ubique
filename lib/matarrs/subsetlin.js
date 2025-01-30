/** @import { array, matrix } from '../types.js' */

import { flatten } from './flatten.js';
import { squeeze } from './squeeze.js';
import { arrayfun } from '../datatype/arrayfun.js';

/**
 * @function subsetlin
 * @summary Extracts elements from an array or matrix based on linear indexing.
 * @description Extracts a subset of an array or matrix using linear indexing, either row-wise (default) or column-wise.
 *
 * @param {array|matrix} m The array or matrix of elements.
 * @param {number|array|matrix} idx Linear indexing values.
 * @param {number} [flag=0] Flag (0: row-wise, 1: column-wise).
 * @returns {number|array|matrix} The subset of `m` based on `idx`.
 * @throws {Error} If input arguments are missing.
 *
 * @example
 * const a = [[5,6,5],[7,8,-1]];
 * const c = [5,6,3];
 *
 * // Example 1: Extract a single element
 * assert.deepStrictEqual(subsetlin(a, 1), [6]);
 *
 * // Example 2: Subset by rows
 * assert.deepStrictEqual(subsetlin(a, [0,1,2,3]), [5, 6, 5, 7]);
 *
 * // Example 3: Subset by columns
 * assert.deepStrictEqual(subsetlin(a, [0,1,2,3], 1), [5, 7, 6, 8]);
 *
 * // Example 4: Extract a 2D subset (column-wise)
 * assert.deepStrictEqual(subsetlin(a, [[0,1,2], [2,3,4]], 1), [[5, 7, 6], [6, 8, 5]]);
 *
 * // Example 5: Subset a vector
 * assert.deepStrictEqual(subsetlin(c, [0,1]), [5, 6]);
 *
 * // Example 6: Extract a 2D subset from a vector
 * assert.deepStrictEqual(subsetlin(c, [[0,1], [1,2]]), [[5, 6], [6, 3]]);
 */
export function subsetlin(m, idx, flag = 0) {
  if (m === undefined) {
    throw new Error('Not enough input arguments.');
  }
  if (idx === undefined) {
    return m;
  }

  const flatM = flatten(m, flag);
  const indices = Array.isArray(idx) ? idx : [idx];

  return squeeze(arrayfun(indices, (val) => flatM[val]));
}
