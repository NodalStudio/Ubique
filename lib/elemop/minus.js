/** @import { array, matrix } from '../types.ts' */

import arrayfun from '../datatype/arrayfun.js';
import isnumber from '../datatype/isnumber.js';
import ismatrix from '../datatype/ismatrix.js';
import nrows from '../matarrs/nrows.js';
import ncols from '../matarrs/ncols.js';
import getrow from '../matarrs/getrow.js';
import isarray from '../datatype/isarray.js';

/**
 * @function minus
 * @summary Subtracts one number, array, or matrix from another.
 * @description Subtracts Y from X. X and Y must have the same dimensions unless one is a number.
 *
 * @param {number|array|matrix} x The left-hand operand.
 * @param {number|array|matrix} y The right-hand operand.
 * @returns {number|array|matrix} The result of the subtraction.
 * @throws {Error} If input dimensions do not agree.
 *
 * @example
 * // Example 1: Subtract two numbers
 * assert.strictEqual(minus(5, 6), -1);
 *
 * // Example 2: Subtract two arrays
 * assert.deepStrictEqual(minus([5, 6, 4], [3, -1, 0]), [2, 7, 4]);
 *
 * // Example 3: Subtract a number from an array
 * assert.deepStrictEqual(minus([5, 6, 4], 10), [-5, -4, -6]);
 *
 * // Example 4: Subtract two matrices
 * assert.deepStrictEqual(minus([[5, 6, 5], [7, 8, -1]], [[-1, 3, -1], [4, 5, 9]]),
 *   [[6, 3, 6], [3, 3, -10]]);
 */
export default function minus(x, y) {
  if (arguments.length === 0) {
    throw new Error('not enough input arguments');
  }

  if (isnumber(x)) {
    return isnumber(y)
      ? x - y
      : arrayfun(y, val => x - val);
  }

  if (isnumber(y)) {
    return arrayfun(x, val => val - y);
  }

  if (isarray(x) && isarray(y)) {
    return x.map((xi, i) => xi - y[i]);
  }

  if (ismatrix(x) && ismatrix(y)) {
    if (nrows(x) !== nrows(y) || ncols(x) !== ncols(y)) {
      throw new Error('input dimensions must agree');
    }
    return x.map((row, i) => minus(row, getrow(y, i)));
  }

  throw new Error('Invalid input types');
}
