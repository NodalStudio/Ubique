import { size } from './size.js';
import { length } from './length.js';

/** @import { array, matrix } from '../types.ts' */

/**
 * @function ndims
 * @summary Number of array dimensions
 * @description Calculates the number of dimensions of an array or matrix by determining the length of the size array.
 *
 * @param {array|matrix} x Array or matrix of elements.
 * @returns {number} The number of dimensions of the array.
 * @throws {Error} If no input is provided.
 *
 * @example
 * // Example 1: 1D array
 * assert.strictEqual(ndims([3, 5, 6]), 2);
 *
 * // Example 2: 2D array
 * assert.strictEqual(ndims([[3, 2, 7], [4, 5, 6]]), 2);
 */
export function ndims(x) {
  if (x === undefined) {
    throw new Error('Not enough input arguments');
  }
  return length(size(x));
}
