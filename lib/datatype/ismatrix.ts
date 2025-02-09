import isarray from './isarray.js';

/**
 * @function ismatrix
 * @summary True for matrix of numbers
 * @description Returns `true` if the input is a 2D array (array of arrays) where all subarrays have the same length and all elements are numbers.
 *
 * @param {any} x The matrix to check.
 * @returns {boolean} Returns `true` if `x` is a valid matrix of numbers.
 *
 * @example
 * // Example 1: Valid matrix of numbers with one row
 * assert.strictEqual(ismatrix([[1, 3, 4]]), true);
 *
 * // Example 2: Valid matrix of numbers with multiple rows
 * assert.strictEqual(ismatrix([[1], [3], [4]]), true);
 *
 * // Example 3: Invalid matrix due to varying row lengths
 * assert.strictEqual(ismatrix([[1, 2], [3, 4, 5]]), false);
 *
 * // Example 4: Invalid matrix with non-number elements
 * assert.strictEqual(ismatrix([[1, 2], [3, '4']]), false);
 *
 * // Example 5: Empty array (not a matrix)
 * assert.strictEqual(ismatrix([]), false);
 *
 * // Example 6: Not an array (invalid input)
 * assert.strictEqual(ismatrix(123), false);
 *
 * // Example 7: Array of non-arrays (not a matrix)
 * assert.strictEqual(ismatrix([1, 2, 3]), false);
 *
 * // Example 8: Valid matrix of numbers with NaN values
 * assert.strictEqual(ismatrix([[NaN, 2, 3], [4, 5, NaN]]), true);
 *
 * // Example 9: Invalid matrix with mixed types (not all numbers)
 * assert.strictEqual(ismatrix([[1, "b", true], [4, "e", false]]), false);
 *
 * // Example 10: Nested arrays but not uniform length
 * assert.strictEqual(ismatrix([[1, [2]], [[3]], [4]]), false);
 *
 * // Example 11: Empty matrix
 * assert.strictEqual(ismatrix([[]]), true);
 */
export default function ismatrix(x) {
  return Array.isArray(x) && x.length > 0 && x.every((row) => isarray(row) && row.length === x[0].length);
}
