import { array, matrix } from '../types';

/**
 * @function ne
 * @summary Inequality X !== Y
 * @description Compares two inputs and returns `true` if they are not equal. Handles individual numbers, arrays, and matrices.
 *
 * @param x The left operand.
 * @param y The right operand.
 * @returns `true` if the corresponding elements of `x` and `y` are not equal, otherwise `false`.
 *
 * @example
 * // Example 1: Compare two numbers
 * assert.strictEqual(ne(5, 5), false);
 *
 * // Example 2: Compare a number with an array
 * assert.deepStrictEqual(ne(5, [5, 6, 3]), [false, true, true]);
 *
 * // Example 3: Compare a number with a matrix
 * assert.deepStrictEqual(ne(5, [[5, 6], [3, 5]]), [[false, true], [true, false]]);
 *
 * // Example 4: Compare an array with a number
 * assert.deepStrictEqual(ne([5, 6, 3], 5), [false, true, true]);
 *
 * // Example 5: Compare a matrix with a number
 * assert.deepStrictEqual(ne([[5, 6], [3, 5]], 5), [[false, true], [true, false]]);
 *
 * // Example 6: Compare two arrays
 * assert.deepStrictEqual(ne([5, 6, 3], [2, 6, 0]), [true, false, true]);
 *
 * // Example 7: Compare two matrices
 * assert.deepStrictEqual(ne([[5, 6], [-1, 2]], [[5, 6], [3, 5]]), [[false, false], [true, true]]);
 */
export function ne(x: number | array | matrix, y: number | array | matrix): boolean | array<boolean> | matrix<boolean>;
