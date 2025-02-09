/** @import { array, matrix } from '../types.js' */

import isnumber from '../datatype/isnumber.js';
import ismatrix from '../datatype/ismatrix.js';
import transpose from './transpose.js';
import isarray from '../datatype/isarray.js';

/**
 * @function flatten
 * @summary Flatten a matrix into an array.
 * @description Flattens a matrix into a 1D array. The default concatenation is row-wise (dim = 0). If `dim = 1`, the concatenation is column-wise.
 *
 * @param {matrix} x The matrix to flatten.
 * @param {number} [dim=0] The dimension to flatten by. 0 = row-wise, 1 = column-wise. Defaults to 0.
 * @returns {array} The flattened 1D array.
 * @throws {Error} If no input is provided or if the input is not a matrix.
 *
 * @example
 * // Example 1: Flatten a 2x2 matrix (row-wise by default)
 * flatten([[5, 6], [7, 8]]); // [5, 7, 6, 8]
 *
 * // Example 2: Flatten a 3x3 matrix by rows
 * flatten([[1, 1, -1], [1, -2, 3], [2, 3, 1]]); // [1, 1, -1, 1, -2, 3, 2, 3, 1]
 *
 * // Example 3: Flatten a 3x3 matrix by columns (dim = 1)
 * flatten([[1, 1, -1], [1, -2, 3], [2, 3, 1]], 1); // [1, 1, 2, 1, -2, 3, -1, 3, 1]
 */
export default function flatten(x, dim = 0) {
  if (!x) {
    throw new Error('Not enough input arguments');
  }

  if (isnumber(x) || isarray(x)) {
    return x;
  }

  if (ismatrix(x)) {
    const matrixToFlatten = dim === 1 ? transpose(x) : x;
    return [].concat(...matrixToFlatten);
  }

  throw new Error('Unknown input arguments');
}
