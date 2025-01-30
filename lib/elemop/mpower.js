/** @import { matrix } from '../types.ts' */

import { issquare } from '../matarrs/issquare.js';
import { isnumber } from '../datatype/isnumber.js';
import { mtimes } from './mtimes.js';

/**
 * @function mpower
 * @summary Matrix power X ^ Y
 * @description Raises a square matrix X to the power of a scalar exponent Y.
 *
 * @param {matrix} x The base matrix, which must be square.
 * @param {number} y The exponent, which must be a scalar.
 * @returns {matrix} The resulting matrix after exponentiation.
 * @throws {Error} If the input is not a square matrix or the exponent is not a scalar.
 *
 * @example
 * // Example 1: Raise a matrix to the power of 3
 * assert.deepStrictEqual(mpower([[1,1,-1],[1,-2,3],[2,3,1]], 3),
 *   [[-2, 11, -11], [11, -35, 33], [22, 33, -2]]);
 */
export function mpower(x, y) {
  if (arguments.length === 0) {
    throw new Error('not enough input arguments');
  }
  if (!issquare(x)) {
    throw new Error('input must be a square matrix');
  }
  if (!isnumber(y)) {
    throw new Error('exponent must be a scalar value');
  }

  let out = x;
  for (let t = 1; t < y; t++) {
    out = mtimes(out, x);
  }
  return out;
}
