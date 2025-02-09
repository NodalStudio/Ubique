import issquare from '../matarrs/issquare.js';
import ncols from '../matarrs/ncols.js';
import ismatrix from './ismatrix.js';

/**
 * @function issingular
 * @summary Checks if a matrix is singular (non-invertible).
 * @description Returns `true` if the input is a singular matrix. A matrix is singular if it is square and its determinant is zero, which occurs when any of the diagonal elements is zero.
 *
 * @param x - The matrix to check.
 * @returns - Returns `true` if the matrix is singular, otherwise `false`.
 *
 * @throws {Error} - Throws an error if the input is not a matrix or not a square matrix.
 *
 * @example
 * // Example 1: Non-singular square matrix
 * assert.strictEqual(issingular([[2, 6], [1, 3]]), false);
 *
 * // Example 2: Singular square matrix (diagonal element is zero)
 * assert.strictEqual(issingular([[0, 6], [1, 3]]), true);
 *
 * // Example 3: Not a matrix (single number input)
 * assert.throws(() => { issingular(5) }, Error, 'input must be a matrix');
 *
 * // Example 4: Non-square matrix
 * assert.throws(() => { issingular([[1, 2, 3], [4, 5, 6]]) }, Error, 'input must be a square matrix');
 */
export default function issingular(x) {
  if (!x || arguments.length === 0) {
    throw new Error('not enough input arguments');
  }

  if (!ismatrix(x)) {
    throw new Error('input must be a matrix');
  }

  if (!issquare(x)) {
    throw new Error('input must be a square matrix');
  }

  const n = ncols(x);
  for (let i = 0; i < n; i += 1) {
    if (x[i][i] === 0) {
      return true;
    }
  }

  return false;
}
