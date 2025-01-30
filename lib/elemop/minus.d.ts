import { array, matrix } from '../types.ts';

/**
 * @function minus
 * @summary Subtracts one number, array, or matrix from another.
 * @description Subtracts Y from X. X and Y must have the same dimensions unless one is a number.
 *
 * @param x The left-hand operand.
 * @param y The right-hand operand.
 * @returns The result of the subtraction.
 *
 * @example
 * // Example 1: Subtract two numbers
 * assert.strictEqual(minus(5, 6), -1);
 *
 * // Example 2: Subtract two arrays
 * assert.deepStrictEqual(minus([5, 6, 4], [3, -1, 0]), [2, 7, 4]);
 *
 * // Example 3: Subtract a number from an array
 * assert.deepStrictEqual(minus([5, 6, 4], 10), [-5, -4, -6]);
 *
 * // Example 4: Subtract two matrices
 * assert.deepStrictEqual(minus([[5, 6, 5], [7, 8, -1]], [[-1, 3, -1], [4, 5, 9]]),
 *   [[6, 3, 6], [3, 3, -10]]);
 */
export function minus(x: number | array | matrix, y: number | array | matrix): number | array | matrix;
