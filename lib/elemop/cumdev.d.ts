import { array, matrix } from '../types.ts';

/**
 * @function cumdev
 * @summary Cumulative mean deviation
 * @description Computes the cumulative mean deviation of an array or matrix along a specified dimension.
 *
 * @param x The input array or matrix of values.
 * @param dim The dimension along which to calculate. `1` for columns, `0` for rows. Defaults to `1`.
 * @returns The cumulative mean deviation.
 *
 * @example
 * // Example 1: Cumulative mean deviation of a 1D array
 * assert.deepStrictEqual(cumdev([5, 6, 3]), [0.333333, 1.666667, 0]);
 *
 * // Example 2: Cumulative mean deviation of a matrix along rows (dim=0)
 * assert.deepStrictEqual(cumdev([[-1, 3, -1], [4, 5, 9]], 0), [[-1.333333, 1.333333, 0], [-2, -3, 0]]);
 *
 * // Example 3: Cumulative mean deviation of a matrix along columns (dim=1)
 * assert.deepStrictEqual(cumdev([[-1, 3, -1], [4, 5, 9]]), [[-2.5, -1, -5], [0, 0, 0]]);
 */
export function cumdev(x: array | matrix, dim?: number): array | matrix;
