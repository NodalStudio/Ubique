import { array, matrix } from '../types';

/**
 * @function subset
 * @summary Extract a subset of an array or matrix based on row and column indices.
 * @description Extracts a subset from an array or matrix based on specified row and column indices.
 * If the indices are not provided, the entire array or matrix is returned. Use ':' to select all rows or columns.
 *
 * @param m The input array or matrix.
 * @param r The row index or ':' for all rows.
 * @param c The column index or ':' for all columns.
 * @returns The extracted subset of the array or matrix.
 * @throws If the input arguments are invalid.
 *
 * @example
 * // Example 1: Extract a single element from an array
 * const c = [5, 6, 3];
 * assert.strictEqual(subset(c, 1), 6);
 *
 * // Example 2: Extract multiple elements from an array
 * assert.deepStrictEqual(subset(c, [1, 2]), [6, 3]);
 *
 * // Example 3: Extract the last element from an array
 * assert.strictEqual(subset(c, c.length - 1), 3);
 *
 * // Example 4: Extract a single element from a matrix
 * const a = [[5, 6, 5], [7, 8, -1]];
 * assert.deepStrictEqual(subset(a, 0, 1), [[6]]);
 *
 * // Example 5: Extract a submatrix
 * assert.deepStrictEqual(subset(a, [0, 1], [1, 2]), [[6, 5], [8, -1]]);
 *
 * // Example 6: Extract an entire row
 * assert.deepStrictEqual(subset(a, 0, ':'), [[5, 6, 5]]);
 *
 * // Example 7: Extract an entire column
 * assert.deepStrictEqual(subset(a, ':', 0), [[5], [7]]);
 */
export function subset(
  m: array | matrix,
  r?: number | array | string,
  c?: number | array | string
): number | array | matrix;
