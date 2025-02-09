import { array, matrix } from '../types';

/**
 * @function getrow
 * @summary Get a row of a matrix.
 * @description Retrieves a specific row from a 2D matrix. If the input is not a matrix or if the row index is invalid, an error is thrown.
 *
 * @param {array} x - The input matrix (2D array) from which to retrieve the row.
 * @param {number} n - The row index to retrieve (0-based index).
 * @returns {array} - An array representing the specified row of the matrix.
 *
 * @throws {Error} - Throws an error if the input is not a matrix or if the row index is out of bounds.
 *
 * @example
 * // Example 1: Get the first row
 * assert.deepStrictEqual(getrow([[5, 6, 5], [7, 8, -1]], 0), [5, 6, 5]); // [5, 6, 5]
 *
 * // Example 2: Get the second row
 * assert.deepStrictEqual(getrow([[5, 6, 5], [7, 8, -1]], 1), [7, 8, -1]); // [7, 8, -1]
 *
 * // Example 3: Invalid row index (out of bounds)
 * assert.throws(() => { getrow([[5, 6, 5], [7, 8, -1]], 2); }, Error, 'Row index must be an integer between 0 and N - 1 rows');
 */
export function getrow(x: matrix, n: number): array;
