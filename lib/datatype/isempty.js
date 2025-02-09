import isarray from './isarray.js';
import ismatrix from './ismatrix.js';

/**
 * @function isempty
 * @summary Checks if an array or matrix is empty.
 * @description Returns `true` if the input is an empty array or an empty matrix.
 *
 * @param {any} x The input array or matrix to check.
 * @returns {boolean} Returns `true` if `x` is empty, otherwise `false`.
 *
 * @example
 * // Example 1: An empty array
 * assert.strictEqual(isempty([]), true, 'An empty array should return true.');
 *
 * // Example 2: A 2D array with an empty first row (considered empty matrix)
 * assert.strictEqual(isempty([[]]), true, 'A 2D array with an empty first row should return true.');
 *
 * // Example 3: A non-empty 1D array
 * assert.strictEqual(isempty([1, 2, 3]), false, 'A non-empty 1D array should return false.');
 *
 * // Example 4: A non-empty 2D array
 * assert.strictEqual(isempty([[1, 2], [3, 4]]), false, 'A non-empty 2D array should return false.');
 *
 * // Example 5: A non-array input
 * assert.strictEqual(isempty(123), false, 'A non-array input should return false.');
 */
export default function isempty(x) {
  if (arguments.length === 0) throw new Error('not enough input arguments');
  return (isarray(x) && x.length === 0) || (ismatrix(x) && x[0].length === 0);
}
