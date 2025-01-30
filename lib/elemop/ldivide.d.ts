import { array, matrix } from '../types.ts';

/**
 * @function ldivide
 * @summary Left array division X. \ Y
 * @description Divides each element of Y by the corresponding element of X. Inputs X and Y must have the same size.
 *
 * @param x Number or array of values.
 * @param y Number or array of values.
 * @returns Result of the division.
 *
 * @example
 * // Example 1: Single number division
 * assert.strictEqual(ldivide(5, 10), 2);
 *
 * // Example 2: Scalar divided by array
 * assert.deepStrictEqual(ldivide([1, 2, 3], 6), [6, 3, 2]);
 *
 * // Example 3: Scalar divided by array with negative numbers
 * assert.deepStrictEqual(ldivide(2, [-12, -8, -4]), [-6, -4, -2]);
 *
 * // Example 4: Element-wise division of two arrays
 * assert.deepStrictEqual(ldivide([5, 10, 3], [10, 20, 30]), [2, 2, 10]);
 *
 * // Example 5: Element-wise division of two matrices
 * assert.deepStrictEqual(ldivide([[5, 5], [6, 1]], [[10, 2], [6, 2]]), [[2, 0.4], [1, 2]]);
 *
 * // Example 6: Scalar divided by matrix
 * assert.deepStrictEqual(ldivide([[3, 5], [6, 1]], 3), [[1, 0.6], [0.5, 3]]);
 */
export function ldivide(x: number | array | matrix, y: number | array | matrix): number | array | matrix;
