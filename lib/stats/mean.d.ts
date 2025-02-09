import { array, matrix } from '../types';

/**
 * @function mean
 * @summary Average value of array or matrix
 * @description Computes the average value of an array or matrix along a specified dimension.
 *
 * @param x The input array or matrix of values.
 * @param dim The dimension along which to calculate. `0` for row-wise, `1` for column-wise. Defaults to `0`.
 * @returns The mean value(s).
 *
 * @example
 * // Example 1: Mean of a vector
 * assert.strictEqual(mean([5, 6, 3]), 4.666666666666667);
 *
 * // Example 2: Mean of a matrix along rows (dim=0)
 * assert.deepStrictEqual(mean([[5, 6, 5], [7, 8, -1]]), [5.333333333333333, 4.666666666666667]);
 *
 * // Example 3: Mean of a matrix along columns (dim=1)
 * assert.deepStrictEqual(mean([[5, 6, 5], [7, 8, -1]], 1), [5.5, 4.5, 2]);
 *
 * // Example 4: Mean of a scalar
 * assert.strictEqual(mean(10), 10);
 */
export function mean(x: array | matrix, dim?: number): number | array;
