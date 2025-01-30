import { array, matrix } from "../types";

/**
 * @function getcol
 * @summary Get a column of a matrix.
 * @description Retrieves a specific column from a 2D matrix. If the input is not a matrix or if the column index is invalid, an error is thrown.
 *
 * @param x The input matrix (2D array) from which to retrieve the column.
 * @param n The column index to retrieve (0-based index).
 * @returns An array representing the specified column of the matrix.
 *
 * @throws Throws an error if the input is not a matrix or if the column index is out of bounds.
 *
 * @example
 * // Example 1: Get the first column
 * assert.deepStrictEqual(getcol([[5, 6, 5], [7, 8, -1]], 0), [5, 7]); // [ 5, 7 ]
 *
 * // Example 2: Get the third column
 * assert.deepStrictEqual(getcol([[5, 6, 5], [7, 8, -1]], 2), [5, -1]); // [ 5, -1 ]
 *
 * // Example 3: Invalid column index (out of bounds)
 * assert.throws(() => { getcol([[5, 6, 5], [7, 8, -1]], 3); }, Error, 'col must be an integer between 0 and N - 1 columns');
 */
export function getcol(x: matrix, n: number): array;
