import { array, matrix } from '../types';

/**
 * @function diff
 * @summary Differences between adjacent elements in an array or matrix
 * @description Computes the differences between adjacent elements in an array or along a specified dimension of a matrix.
 *
 * @param x The input array or matrix of values.
 * @param dim The dimension along which to calculate. `1` for columns, `0` for rows. Defaults to `1`.
 * @returns The differences between adjacent elements.
 *
 * @example
 * // Example 1: Differences in a 1D array
 * assert.deepStrictEqual(diff([5, 6, 3]), [1, -3]);
 *
 * // Example 2: Differences in a matrix along columns (dim=1)
 * assert.deepStrictEqual(diff([[5, 6, 5], [7, 8, -1]]), [[2, 2, -6]]);
 *
 * // Example 3: Differences in a matrix along columns (dim=1)
 * assert.deepStrictEqual(diff([[5, 6, 5], [7, 8, -1], [1, 2, 3]]), [[2, 2, -6], [-6, -6, 4]]);
 *
 * // Example 4: Differences in a matrix along rows (dim=0)
 * assert.deepStrictEqual(diff([[5, 6, 5], [7, 8, -1]], 0), [[1, -1], [1, -9]]);
 */
export function diff(x: array | matrix, dim?: number): array | matrix;
