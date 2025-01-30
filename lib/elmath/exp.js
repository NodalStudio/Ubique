/** @import { array, matrix } from '../types.js' */
import { arrayfun } from '../datatype/arrayfun.js';
import { isnumber } from '../datatype/isnumber.js';

/**
 * @function exp
 * @summary Computes the exponential value.
 * @description Computes the exponential value for each element in a number, array, or matrix.
 *
 * @param {number|array|matrix} x The input value(s).
 * @returns {number|array|matrix} The exponential of the input value(s).
 * @throws {Error} If no arguments are provided.
 *
 * @example
 * // Example 1: Exponential of a single number
 * assert.strictEqual(exp(6), 403.429);
 *
 * // Example 2: Exponential of an array of numbers
 * assert.deepStrictEqual(exp([5, 6, 3]), [148.413, 403.429, 20.0855]);
 *
 * // Example 3: Exponential of a matrix of numbers
 * assert.deepStrictEqual(exp([[5, 6, 5], [7, 8, -1]]), [
 *   [148.413, 403.429, 148.413],
 *   [1096.63, 2980.96, 0.367879]
 * ]);
 */
export function exp(x) {
  if (arguments.length === 0) {
    throw new Error('not enough input arguments');
  }

  const computeExp = Math.exp;

  return isnumber(x) ? computeExp(x) : arrayfun(x, computeExp);
}
