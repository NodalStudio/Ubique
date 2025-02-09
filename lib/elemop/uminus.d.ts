import { array, matrix } from '../types';

/**
 * @function uminus
 * @summary Unary minus -X
 * @description Applies unary minus to a number, array, or matrix, effectively negating all elements.
 *
 * @param x The input number, array, or matrix to be negated.
 * @returns The negated value(s).
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
export function uminus(x: number | array | matrix): number | array<number> | matrix<number>;
