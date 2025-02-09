/** @import { array, matrix } from '../types.ts' */

import isnumber from '../datatype/isnumber.js';
import size from '../matarrs/size.js';
import zeros from '../matarrs/zeros.js';
import getrow from '../matarrs/getrow.js';
import getcol from '../matarrs/getcol.js';
import dot from './dot.js';
import squeeze from '../matarrs/squeeze.js';
import times from './times.js';

/**
 * @function mtimes
 * @summary Matrix multiplication X * Y
 * @description Performs matrix multiplication X * Y. If X is MxP and Y is PxN, it returns a matrix MxN.
 *
 * @param {number|array|matrix} x Number, array, or matrix representing the first factor.
 * @param {number|array|matrix} y Number, array, or matrix representing the second factor.
 * @returns {number|array|matrix} The result of the multiplication.
 * @throws {Error} If the inner dimensions of the matrices do not match.
 *
 * @example
 * // Example 1: Multiply two numbers
 * assert.strictEqual(mtimes(5, 6), 30);
 *
 * // Example 2: Multiply an array by a scalar
 * assert.deepStrictEqual(mtimes([5, 6, 3], 3), [15, 18, 9]);
 *
 * // Example 3: Multiply a matrix by a scalar
 * assert.deepStrictEqual(mtimes([[5, 6, 5], [7, 8, -1]], 3), [[15, 18, 15], [21, 24, -3]]);
 *
 * // Example 4: Multiply a 1x3 matrix by a 3x1 matrix
 * assert.deepStrictEqual(mtimes([[5, 6, 3]], [[3], [4], [5]]), [[54]]);
 *
 * // Example 5: Multiply a 2x3 matrix by a 3x1 matrix
 * assert.deepStrictEqual(mtimes([[5, 6, 5], [7, 8, -1]], [[5], [6], [3]]), [[76], [80]]);
 */
export default function mtimes(x, y) {
  if (arguments.length === 0) {
    throw new Error('not enough input arguments');
  }

  if (!isnumber(x) && !isnumber(y)) {
    const xsize = size(x);
    const ysize = size(y);

    if (xsize[1] !== ysize[0]) {
      throw new Error('inner dimension mismatch');
    }

    const out = zeros(xsize[0], ysize[1]);

    for (let i = 0; i < xsize[0]; i++) {
      const xx = getrow(x, i);
      for (let j = 0; j < ysize[1]; j++) {
        const yy = getcol(y, j);
        out[i][j] = squeeze(dot(xx, yy));
      }
    }

    return out;
  }

  return times(x, y);
}
