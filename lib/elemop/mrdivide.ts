/** @import { array, matrix } from '../types' */

import isnumber from '../datatype/isnumber.js';
import issquare from '../matarrs/issquare.js';
import ncols from '../matarrs/ncols.js';
import nrows from '../matarrs/nrows.js';
import inv from '../linalgebra/inv.js';
import mtimes from './mtimes.js';
import rdivide from './rdivide.js';

/**
 * @function mrdivide
 * @summary Matrix division X / Y
 * @description Performs matrix division X / Y. If X is MxN and Y is NxN, it returns a matrix MxN. The operation multiplies X with the inverse of Y. Y must be a square matrix.
 *
 * @param {number|array|matrix} x Number, array, or matrix representing the dividend.
 * @param {number|array|matrix} y Number, array, or matrix representing the divisor.
 * @returns {number|array|matrix} The result of the division.
 * @throws {Error} If the input dimensions are incompatible or if Y is not a square matrix when required.
 *
 * @example
 * // Example 1: Divide two numbers
 * assert.strictEqual(mrdivide(5, 6), 0.833333);
 *
 * // Example 2: Divide an array by a scalar
 * assert.deepStrictEqual(mrdivide([5, 6, 3], 6), [0.833333, 1, 0.5]);
 *
 * // Example 3: Divide a matrix by a scalar
 * assert.deepStrictEqual(mrdivide([[9, 5], [6, 1]], 5), [[1.8, 1], [1.2, 0.2]]);
 *
 * // Example 4: Matrix division where the second argument is a square matrix
 * assert.deepStrictEqual(mrdivide([[9, 5], [6, 1]], [[3, 2], [5, 2]]), [[1.75, 0.75], [-1.75, 2.25]]);
 *
 * // Example 5: Matrix division with two matrices
 * assert.deepStrictEqual(mrdivide([[5, 6, 5], [7, 8, -1]], [[1, 1, -1], [1, -2, 3], [2, 3, 1]]),
 *   [[-0.769231, 0.538462, 2.615385], [3.384615, 0.230769, 1.692308]]);
 */
export default function mrdivide(x, y) {
  if (arguments.length < 2) {
    throw new Error('not enough input arguments');
  }

  if (isnumber(x) && isnumber(y)) {
    return x / y;
  }

  if (isnumber(y)) {
    return rdivide(x, y);
  }

  if (issquare(y)) {
    if (ncols(x) !== nrows(y)) {
      throw new Error('matrix dimensions mismatch');
    }
    return mtimes(x, inv(y));
  }

  throw new Error('second argument must be square');
}
