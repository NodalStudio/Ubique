import { array, matrix } from '../types';

/**
 * @function cummax
 * @summary Cumulative maximum of array elements
 * @description Computes the cumulative maximum of elements in an array or matrix along a specified dimension.
 *
 * @param x The input array or matrix of values.
 * @param dim The dimension along which to calculate. `1` for columns, `0` for rows. Defaults to `1`.
 * @returns The cumulative maximum of the input values.
 *
 * @example
 * // Example 1: Cumulative maximum of a 1D array
 * assert.deepStrictEqual(cummax([5, 6, 3]), [5, 6, 6]);
 *
 * // Example 2: Cumulative maximum of a matrix along columns (dim=1)
 * assert.deepStrictEqual(cummax([[5, 6, 5], [7, 8, -1]]), [[5, 6, 5], [7, 8, 5]]);
 *
 * // Example 3: Cumulative maximum of a matrix along rows (dim=0)
 * assert.deepStrictEqual(cummax([[5, 6, 5], [7, 8, -1]], 0), [[5, 6, 6], [7, 8, 8]]);
 */
export function cummax(x: array | matrix, dim?: number): array | matrix;
