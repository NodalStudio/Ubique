import { array, matrix } from '../types.ts';

/**
 * @function mrdivide
 * @summary Matrix division X / Y
 * @description Performs matrix division X / Y. If X is MxN and Y is NxN, it returns a matrix MxN. The operation multiplies X with the inverse of Y. Y must be a square matrix.
 *
 * @param x Number, array, or matrix representing the dividend.
 * @param y Number, array, or matrix representing the divisor.
 * @returns The result of the division.
 *
 * @example
 * // Example 1: Divide two numbers
 * assert.strictEqual(mrdivide(5, 6), 0.833333);
 *
 * // Example 2: Divide an array by a scalar
 * assert.deepStrictEqual(mrdivide([5, 6, 3], 6), [0.833333, 1, 0.5]);
 *
 * // Example 3: Divide a matrix by a scalar
 * assert.deepStrictEqual(mrdivide([[9, 5], [6, 1]], 5), [[1.8, 1], [1.2, 0.2]]);
 *
 * // Example 4: Matrix division where the second argument is a square matrix
 * assert.deepStrictEqual(mrdivide([[9, 5], [6, 1]], [[3, 2], [5, 2]]), [[1.75, 0.75], [-1.75, 2.25]]);
 *
 * // Example 5: Matrix division with two matrices
 * assert.deepStrictEqual(mrdivide([[5, 6, 5], [7, 8, -1]], [[1, 1, -1], [1, -2, 3], [2, 3, 1]]),
 *   [[-0.769231, 0.538462, 2.615385], [3.384615, 0.230769, 1.692308]]);
 */
export function mrdivide(x: number | array | matrix, y: number | array | matrix): number | array | matrix;
