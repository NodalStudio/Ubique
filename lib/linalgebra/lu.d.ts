import { array, matrix } from '../types';

/**
 * @function lu
 * @summary LU matrix factorization using the Doolittle algorithm.
 * @description Performs LU matrix factorization on the input matrix `x` using the Doolittle algorithm with pivoting.
 * The function returns an object containing the LU matrix, lower triangular matrix L, upper triangular matrix U, pivot vector P, and the pivot sign S.
 *
 * @param x The input matrix.
 * @returns An object with the following properties:
 *          - `LU`: The LU matrix.
 *          - `L`: The lower triangular matrix.
 *          - `U`: The upper triangular matrix.
 *          - `P`: The pivot vector.
 *          - `S`: The pivot sign (+1 or -1).
 * @throws If no input arguments are provided.
 *
 * @example
 * // Example 1: LU decomposition of a 2x3 matrix
 * const result1 = lu([[5, 6, 5], [7, 8, -1]]);
 * assert.deepStrictEqual(result1, {
 *   LU: [[7, 8, -1], [0.714286, 0.285714, 5.714286]],
 *   L:  [[1, 0], [0.714286, 1]],
 *   U:  [[7, 8, -1], [0, 0.285714, 5.714286]],
 *   P:  [1, 0],
 *   S:  -1
 * });
 *
 * // Example 2: LU decomposition of a 2x2 matrix
 * const result2 = lu([[0, 5], [6, 0]]);
 * assert.deepStrictEqual(result2, {
 *   LU: [[6, 0], [0, 5]],
 *   L:  [[1, 0], [0, 1]],
 *   U:  [[6, 0], [0, 5]],
 *   P:  [1, 0],
 *   S:  -1
 * });
 */
export function lu(x: matrix): {
  LU: matrix;
  L: matrix;
  U: matrix;
  P: array;
  S: number;
};
