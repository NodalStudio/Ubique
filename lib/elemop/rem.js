/** @import { array, matrix } from '../types' */

import fix from '../matarrs/fix.js';
import rdivide from './rdivide.js';
import minus from './minus.js';
import times from './times.js';

/**
 * @function rem
 * @summary Remainder after division
 * @description Computes the remainder after division for each element of `x` divided by the corresponding element of `y`. Works element-wise for arrays and matrices.
 *
 * @param {number|array|matrix} x The dividend, can be a number, array, or matrix.
 * @param {number|array|matrix} y The divisor, can be a number, array, or matrix.
 * @returns {number|array|matrix} The remainder after division.
 * @throws {Error} If no arguments are provided.
 *
 * @example
 * // Example 1: Remainder of a vector divided by a scalar
 * rem([13, -7], 2.2);
 * // [2, -0.4]
 *
 * // Example 2: Remainder of two vectors
 * rem([13, -7], [5, 6]);
 * // [3, -1]
 *
 * // Example 3: Remainder of two matrices
 * rem([[5, 6, 5], [7, 8, -1]], [[-1, 3, -1], [4, 5, 9]]);
 * // [[0, 0, 0], [3, 3, -1]]
 */
export default function rem(x, y) {
  if (arguments.length === 0) {
    throw new Error('Not enough input arguments');
  }

  const n = fix(rdivide(x, y));
  return minus(x, times(n, y));
}
