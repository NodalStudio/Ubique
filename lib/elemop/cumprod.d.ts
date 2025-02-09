import { array, matrix } from '../types';

/**
 * @function cumprod
 * @summary Cumulative product of array elements
 * @description Computes the cumulative product of elements in an array or matrix along a specified dimension.
 *
 * @param x The input array or matrix of values.
 * @param dim The dimension along which to calculate. `1` for columns, `0` for rows. Defaults to `1`.
 * @returns The cumulative product of the input values.
 *
 * @example
 * // Example 1: Cumulative product of a 1D array
 * assert.deepStrictEqual(cumprod([5, 6, 3]), [5, 30, 90]);
 *
 * // Example 2: Cumulative product of a matrix along columns (dim=1)
 * assert.deepStrictEqual(cumprod([[5, 6, 5], [7, 8, -1]]), [[5, 6, 5], [35, 48, -5]]);
 *
 * // Example 3: Cumulative product of a matrix along rows (dim=0)
 * assert.deepStrictEqual(cumprod([[5, 6, 5], [7, 8, -1]], 0), [[5, 30, 150], [7, 56, -56]]);
 */
export function cumprod(x: array | matrix, dim?: number): array | matrix;
