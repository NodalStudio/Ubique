/** @import { array, matrix } from '../types' */

import isnumber from '../datatype/isnumber.js';
import isarray from '../datatype/isarray.js';
import ismatrix from '../datatype/ismatrix.js';

/**
 * @function clone
 * @summary Create a clone of the input array or matrix.
 * @description Creates a deep copy of the input array or matrix. If the input is a number, it simply returns that number.
 *
 * @param {array|matrix} x Array or matrix to clone.
 * @returns {array|matrix} A deep copy of the input array or matrix.
 * @throws {Error} If no input is provided.
 *
 * @example
 * // Example 1: Clone a matrix
 * assert.deepStrictEqual(clone([[-1, 3, -1], [4, 5, 9]]), [[-1, 3, -1], [4, 5, 9]]);
 *
 * // Example 2: Clone an array
 * assert.deepStrictEqual(clone([5, 6, 3]), [5, 6, 3]);
 *
 * // Example 3: Clone a single number
 * assert.strictEqual(clone(5), 5);
 */
export default function clone(x) {
  if (arguments.length === 0) {
    throw new Error('not enough input arguments');
  }

  if (isnumber(x)) {
    return x;
  }

  if (isarray(x)) {
    return [...x];
  }

  if (ismatrix(x)) {
    return x.map((row) => [...row]);
  }

  throw new Error('unsupported input type');
}
