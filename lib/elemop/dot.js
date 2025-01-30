/** @import { array } from '../types.ts' */

import { sum } from './sum.js';
import { times } from './times.js';
import { size } from '../matarrs/size.js';

/**
 * @function dot
 * @summary Computes the dot product of two arrays.
 * @description Takes two arrays of equal length and computes the dot product.
 * The arrays must be of the same size.
 *
 * @param {array} x Array of numbers.
 * @param {array} y Array of numbers.
 * @returns {number} The dot product of the two arrays.
 * @throws {Error} If the arrays are not of the same size.
 *
 * @example
 * // Example 1: Dot product of two 1D arrays
 * assert.strictEqual(dot([5, 6, 3], [0.5, -3, 2.3]), -8.6);
 *
 * // Example 2: Dot product of two arrays with negative numbers
 * assert.strictEqual(dot([-1, -2, -3], [-4, -5, -6]), 32);
 *
 * // Example 3: Dot product of two identical arrays
 * assert.strictEqual(dot([1, 2, 3], [1, 2, 3]), 14);
 *
 * // Example 4: Dot product of two arrays with zero values
 * assert.strictEqual(dot([0, 0, 0], [0, 0, 0]), 0);
 *
 * // Example 5: Error when input arrays are of different sizes
 * assert.throws(() => dot([1, 2], [1, 2, 3]), Error, 'input size mismatch');
 */
export function dot(x, y) {
  const xSize = size(x);
  const ySize = size(y);

  if (xSize[0] !== ySize[0] || xSize[1] !== ySize[1]) {
    throw new Error('input size mismatch');
  }

  return sum(times(x, y));
}
