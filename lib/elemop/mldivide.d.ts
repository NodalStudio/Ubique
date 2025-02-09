import { array, matrix } from '../types';

/**
 * @function mldivide
 * @summary Matrix left division X \ Y
 * @description Performs matrix left division. If X is NxN and Y is NxM, it returns a matrix NxM by multiplying Y with the inverse of X. X must be a square matrix.
 *
 * @param x Number or array/matrix of values.
 * @param y Number or array/matrix of values.
 * @returns The result of the division.
 *
 * @example
 * // Example 1: Divide two numbers
 * assert.strictEqual(mldivide(5, 6), 1.2);
 *
 * // Example 2: Left matrix division of two square matrices
 * assert.deepStrictEqual(mldivide([[9, 5], [6, 1]], [[3, 2], [5, 2]]), [[1.047619, 0.380952], [-1.285714, -0.285714]]);
 *
 * // Example 3: Scalar division applied to a matrix
 * assert.deepStrictEqual(mldivide(5, [[9, 5], [6, 1]]), [[1.8, 1], [1.2, 0.2]]);
 *
 * // Example 4: Left matrix division of a square matrix by a non-square matrix
 * assert.deepStrictEqual(mldivide([[9, 5], [6, 1]], [[5, 6, 5], [7, 8, -1]]), [[1.428571, 1.619048, -0.47619], [-1.571429, -1.714286, 1.857143]]);
 */
export function mldivide(x: number | array | matrix, y: number | array | matrix): number | array | matrix;
