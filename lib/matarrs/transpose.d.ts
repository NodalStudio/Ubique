import { array, matrix } from '../types';

/**
 * @function transpose
 * @summary Transpose a matrix or array.
 * @description Transposes the given matrix or array. If the input is a 1D array, it is treated as a row vector and the result is a column vector. If the input is a matrix, the rows and columns are swapped.
 *
 * @param x The input array or matrix to transpose.
 * @returns The transposed matrix.
 *
 * @throws Throws an error if no input is provided.
 *
 * @example
 * // Example 1: Transpose a 2x3 matrix
 * assert.deepStrictEqual(transpose([[5, 6, 5], [7, 8, -1]]), [[5, 7], [6, 8], [5, -1]]);
 *
 * // Example 2: Transpose a 1D array (row vector)
 * assert.deepStrictEqual(transpose([5, 6, 3]), [[5], [6], [3]]);
 *
 * // Example 3: Transpose a single number (scalar)
 * assert.strictEqual(transpose(5), 5);
 *
 * // Example 4: Transpose a square matrix
 * assert.deepStrictEqual(transpose([[1, 2], [3, 4]]), [[1, 3], [2, 4]]);
 */
export function transpose(x:array|matrix): matrix;
