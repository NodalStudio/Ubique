/** @import { array, matrix } from '../types.ts' */

import { isnumber } from '../datatype/isnumber.js';
import { isarray } from '../datatype/isarray.js';
import { ismatrix } from '../datatype/ismatrix.js';
import { arrayfun } from '../datatype/arrayfun.js';

/**
 * @function power
 * @summary Element-wise power X ^ Y
 * @description Computes the element-wise power of `x` raised to `y`. Supports mixed inputs of scalars, arrays, and matrices.
 *
 * @param {number|array|matrix} x The base value, can be a number, array, or matrix.
 * @param {number|array|matrix} y The exponent value, can be a number, array, or matrix.
 * @returns {number|array|matrix} The result of raising `x` to the power of `y`.
 * @throws {Error} If the input dimensions do not agree or if insufficient arguments are provided.
 *
 * @example
 * // Example 1: Power of two numbers
 * assert.strictEqual(power(5, 4), 625);
 *
 * // Example 2: Power of an array by a scalar
 * assert.deepStrictEqual(power([5, 6, 3], 5), [3125, 7776, 243]);
 *
 * // Example 3: Scalar raised to the power of an array
 * assert.deepStrictEqual(power(5, [5, 6, 3]), [3125, 15625, 125]);
 *
 * // Example 4: Element-wise power of two arrays
 * assert.deepStrictEqual(power([5, 6, 3], [0.5, -3, 2.3]), [2.23607, 0.00462963, 12.5135]);
 *
 * // Example 5: Power of two matrices
 * const a = [[5, 6, 5], [7, 8, -1]];
 * const b = [[-1, 3, -1], [4, 5, 9]];
 * assert.deepStrictEqual(power(a, b), [[0.2, 216, 0.2], [2401, 32768, -1]]);
 *
 * // Example 6: Scalar raised to the power of a matrix
 * assert.deepStrictEqual(power(5, a), [[3125, 15625, 3125], [78125, 390625, 0.2]]);
 */
export function power(x, y) {
  if (arguments.length < 2) throw new Error('Not enough input arguments');

  const applyPower = (a, b) => Math.pow(a, b);

  if (isnumber(x) && isnumber(y)) {
    return applyPower(x, y);
  }

  if (isnumber(x)) {
    return arrayfun(y, val => applyPower(x, val));
  }

  if (isnumber(y)) {
    return arrayfun(x, val => applyPower(val, y));
  }

  if (isarray(x) && isarray(y)) {
    if (x.length !== y.length) throw new Error('Input dimensions must agree');
    return x.map((val, idx) => applyPower(val, y[idx]));
  }

  if (ismatrix(x) && ismatrix(y)) {
    if (x.length !== y.length || x[0].length !== y[0].length) {
      throw new Error('Input dimensions must agree');
    }
    return x.map((row, i) => row.map((val, j) => applyPower(val, y[i][j])));
  }

  throw new Error('Invalid input types');
}
