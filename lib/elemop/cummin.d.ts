import { array, matrix } from '../types.ts';

/**
 * @function cummin
 * @summary Cumulative minimum of array elements
 * @description Computes the cumulative minimum of elements in an array or matrix along a specified dimension.
 *
 * @param x The input array or matrix of values.
 * @param dim The dimension along which to calculate. `1` for columns, `0` for rows. Defaults to `1`.
 * @returns The cumulative minimum of the input values.
 *
 * @example
 * // Example 1: Cumulative minimum of a 1D array
 * assert.deepStrictEqual(cummin([5, 6, 3]), [5, 5, 3]);
 *
 * // Example 2: Cumulative minimum of a matrix along columns (dim=1)
 * assert.deepStrictEqual(cummin([[5, 6, 5], [7, 8, -1]]), [[5, 6, 5], [5, 6, -1]]);
 *
 * // Example 3: Cumulative minimum of a matrix along rows (dim=0)
 * assert.deepStrictEqual(cummin([[5, 6, 5], [7, 8, -1]], 0), [[5, 5, 5], [7, 7, -1]]);
 */
export function cummin(x: array | matrix, dim?: number): array | matrix;
