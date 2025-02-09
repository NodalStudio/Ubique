import { array, matrix } from '../types';

/**
 * @function setrow
 * @summary Set a row of a matrix.
 * @description Replaces the values of row `n` in a matrix with a given row vector.
 *
 * @param x Row vector (1xN) to insert.
 * @param mat Matrix (MxN) in which to set the row.
 * @param n Row index (0-based).
 * @returns A new matrix with the updated row.
 * @throws If inputs are invalid.
 *
 * @example
 * // Example 1: Replace the first row of a matrix
 * assert.deepStrictEqual(setrow([2, 0, -2], [[5, 6, 5], [7, 8, -1]], 0), [
 *   [2, 0, -2],
 *   [7, 8, -1]
 * ]);
 *
 * // Example 2: Replace the second row of a matrix
 * assert.deepStrictEqual(setrow([9, 21, 57], [[5, 6, 5], [7, 8, -1]], 1), [
 *   [5, 6, 5],
 *   [9, 21, 57]
 * ]);
 *
 * // Example 3: Row vector length mismatch error
 * assert.throws(() => setrow([1, 2], [[4, 5, 6], [7, 8, 9]], 1), /Row vector length must match the number of matrix columns./);
 *
 * // Example 4: Row index out of bounds error
 * assert.throws(() => setrow([1, 2, 3], [[4, 5, 6], [7, 8, 9]], 2), /Row index must be an integer between 0 and M-1./);
 *
 * // Example 5: Invalid matrix error
 * assert.throws(() => setrow([1, 2, 3], "not a matrix", 0), /Input matrix must be a 2D array./);
 *
 * // Example 6: Invalid row vector error
 * assert.throws(() => setrow("not a vector", [[4, 5, 6], [7, 8, 9]], 1), /Row vector must be an array./);
 */
export function setrow(x: array, mat: matrix, n: number): matrix;
