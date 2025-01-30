import { array, matrix } from '../types.js';

/**
 * @function fix
 * @summary Rounds numbers toward zero.
 * @description Rounds numbers toward zero. This operation is element-wise for arrays and matrices.
 *
 * @param x The input number, array, or matrix.
 * @returns The rounded value(s).
 * @throws {Error} If no input argument is provided.
 *
 * @example
 * // Example 1: Round a single number toward zero
 * assert.strictEqual(fix(3.78), 3);
 *
 * // Example 2: Round an array of numbers toward zero
 * assert.deepStrictEqual(fix([4.51, -1.4]), [4, -1]);
 *
 * // Example 3: Round a matrix of numbers toward zero
 * assert.deepStrictEqual(fix([[4.51, -1.4], [3.78, 0.01]]), [[4, -1], [3, 0]]);
 */
export function fix(x: number | array | matrix): number | array | matrix;
