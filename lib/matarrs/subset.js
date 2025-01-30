/** @import { array, matrix } from '../types.js' */

import { isnumber } from '../datatype/isnumber.js';
import { ismatrix } from '../datatype/ismatrix.js';
import { colon } from './colon.js';
import { nrows } from './nrows.js';
import { ncols } from './ncols.js';
import { zeros } from './zeros.js';
import { squeeze } from './squeeze.js';
import { isarray } from '../datatype/isarray.js';

/**
 * @function subset
 * @summary Extract a subset of an array or matrix based on row and column indices.
 * @description Extracts a subset from an array or matrix based on specified row and column indices.
 * If the indices are not provided, the entire array or matrix is returned. Use ':' to select all rows or columns.
 *
 * @param {array|matrix} m The input array or matrix.
 * @param {number|array|string} [r] The row index or ':' for all rows.
 * @param {number|array|string} [c] The column index or ':' for all columns.
 * @returns {number|array|matrix} The extracted subset of the array or matrix.
 * @throws {Error} If the input arguments are invalid.
 *
 * @example
 * // Example 1: Extract a single element from an array
 * const c = [5, 6, 3];
 * assert.strictEqual(subset(c, 1), 6);
 *
 * // Example 2: Extract multiple elements from an array
 * assert.deepStrictEqual(subset(c, [1, 2]), [6, 3]);
 *
 * // Example 3: Extract the last element from an array
 * assert.strictEqual(subset(c, c.length - 1), 3);
 *
 * // Example 4: Extract a single element from a matrix
 * const a = [[5, 6, 5], [7, 8, -1]];
 * assert.deepStrictEqual(subset(a, 0, 1), [[6]]);
 *
 * // Example 5: Extract a submatrix
 * assert.deepStrictEqual(subset(a, [0, 1], [1, 2]), [[6, 5], [8, -1]]);
 *
 * // Example 6: Extract an entire row
 * assert.deepStrictEqual(subset(a, 0, ':'), [[5, 6, 5]]);
 *
 * // Example 7: Extract an entire column
 * assert.deepStrictEqual(subset(a, ':', 0), [[5], [7]]);
 */
export function subset(m, r, c) {
  if (arguments.length === 0) {
    throw new Error('not enough input arguments');
  }

  if (arguments.length > 3) {
    throw new Error('too many input arguments');
  }

  if (arguments.length === 1) {
    return m;
  }

  if (arguments.length === 2) {
    return handleArraySubset(m, r);
  }

  if (arguments.length === 3) {
    return handleMatrixSubset(m, r, c);
  }
}

/**
 * @function handleArraySubset
 * @description Handles subset extraction for arrays (1D).
 * @param {array} array The input array.
 * @param {number|array} indices The indices to extract.
 * @returns {number|array} The extracted subset.
 */
function handleArraySubset(array, indices) {
  if (isnumber(array)) {
    return array;
  }

  if (isarray(array)) {
    if (isnumber(indices)) {
      return array[indices];
    } else {
      return indices.map((index) => array[index]);
    }
  }

  throw new Error('input must be an array');
}

/**
 * @function handleMatrixSubset
 * @description Handles subset extraction for matrices (2D).
 * @param {matrix} matrix The input matrix.
 * @param {number|array|string} rows The row indices or ':' for all rows.
 * @param {number|array|string} cols The column indices or ':' for all columns.
 * @returns {matrix} The extracted subset of the matrix.
 * @throws {Error} If the input is not a matrix.
 */
function handleMatrixSubset(matrix, rows, cols) {
  if (!ismatrix(matrix)) {
    throw new Error('input must be a matrix');
  }

  if (rows === ':') {
    rows = colon(0, nrows(matrix) - 1);
  }

  if (cols === ':') {
    cols = colon(0, ncols(matrix) - 1);
  }

  if (isnumber(rows)) {
    rows = [rows];
  }

  if (isnumber(cols)) {
    cols = [cols];
  }

  const result = zeros(rows.length, cols.length);

  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < cols.length; j++) {
      result[i][j] = matrix[rows[i]][cols[j]];
    }
  }

  return squeeze(result);
}
