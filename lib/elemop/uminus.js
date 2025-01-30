/** @import { array, matrix } from '../types.ts' */

/**
 * @function uminus
 * @summary Unary minus -X
 * @description Applies unary minus to a number, array, or matrix, effectively negating all elements.
 *
 * @param {number|array|matrix} x The input number, array, or matrix to be negated.
 * @returns {number|array|matrix} The negated value(s).
 * @throws {Error} If no input is provided.
 *
 * @example
 * // Example 1: Unary minus on a single number
 * assert.strictEqual(uminus(-5), 5);
 *
 * // Example 2: Unary minus on an array of numbers
 * assert.deepStrictEqual(uminus([5, 6]), [-5, -6]);
 *
 * // Example 3: Unary minus on a matrix of numbers
 * assert.deepStrictEqual(uminus([[5, 6], [-1, -3]]), [[-5, -6], [1, 3]]);
 */
export function uminus(x) {
	if (x === undefined) throw new Error('Not enough input arguments');

	return Array.isArray(x)
	  ? x.map(row => Array.isArray(row) ? row.map(val => -val) : -row)
	  : -x;
  }
