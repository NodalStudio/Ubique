/** @import { array, matrix } from '../types.ts' */

import { isnumber } from '../datatype/isnumber.js';
import { isarray } from '../datatype/isarray.js';
import { ismatrix } from '../datatype/ismatrix.js';
import { arrayfun } from '../datatype/arrayfun.js';

/**
 * @function mod
 * @summary Calculates the modulus after division.
 * @description Computes the modulus after division. This operation is element-wise for matrices and arrays.
 *
 * @param {number|array|matrix} x The dividend.
 * @param {number|array|matrix} y The divisor.
 * @returns {number|array|matrix} The modulus after division.
 * @throws {Error} If fewer than two arguments are provided.
 *
 * @example
 * // Example 1: Modulus of a vector with a scalar divisor
 * assert.deepStrictEqual(mod([13, -7], 2.2), [2, 1.8]);
 *
 * // Example 2: Modulus of two vectors
 * assert.deepStrictEqual(mod([13, -7], [5, 6]), [3, 5]);
 *
 * // Example 3: Modulus of two matrices
 * const a = [[5, 6, 5], [7, 8, -1]];
 * const b = [[-1, 3, -1], [4, 5, 9]];
 * assert.deepStrictEqual(mod(a, b), [[0, 0, 0], [3, 3, 8]]);
 */
export function mod(x, y) {
  if (x === undefined || y === undefined) {
    throw new Error('Not enough input arguments');
  }

  if (isnumber(x)) {
    return isnumber(y) ? x % y : arrayfun(y, (val) => x % val);
  }

  if (isnumber(y)) {
    return arrayfun(x, (val) => val % y);
  }

  if (isarray(x) && isarray(y)) {
    return x.map((val, i) => val % y[i]);
  }

  if (ismatrix(x) && ismatrix(y)) {
    return x.map((row, i) => row.map((val, j) => val % y[i][j]));
  }

  throw new Error('Incompatible types for mod operation');
}
