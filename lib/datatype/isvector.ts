import ismatrix from "./ismatrix.ts";
import iscolumn from "./../matarrs/iscolumn.ts";
import isrow from "./../matarrs/isrow.ts";

/**
 * @function isvector
 * @summary Checks if the input is a vector.
 * @description Returns `true` if the input is a vector. A vector is defined as a matrix with either one row or one column.
 *
 * @param {any} x The matrix to check.
 * @returns {boolean} Returns `true` if `x` is a vector, otherwise `false`.
 *
 * @example
 * // Example 1: A row vector
 * assert.strictEqual(isvector([[5, 6, 7]]), true);
 *
 * // Example 2: A column vector
 * assert.strictEqual(isvector([[5], [6], [7]]), true);
 *
 * // Example 3: A matrix with more than one row and column
 * assert.strictEqual(isvector([[1, 2], [3, 4]]), false);
 *
 * // Example 4: Not a matrix (invalid input)
 * assert.strictEqual(isvector(123), false);
 *
 * // Example 5: Empty matrix
 * assert.strictEqual(isvector([]), false);
 */
export default function isvector(x: any) {
  if (arguments.length === 0) {
    throw new Error("not enough input arguments");
  }

  if (ismatrix(x)) {
    return iscolumn(x) || isrow(x);
  }

  return false;
}
