import { array, matrix } from '../types';

/**
 * @function prod
 * @summary Product of array elements
 * @description Computes the product of elements in an array or matrix. Optionally, computes the product along a specified dimension.
 *
 * @param x The input array or matrix of values.
 * @param dim The dimension to operate along, 1 for columns, 0 for rows (default is 1).
 * @returns The product of the array elements, or an array of products if a matrix is provided.
 *
 * @example
 * // Example 1: Product of a vector
 * assert.strictEqual(prod([5, 6, 3]), 90);
 *
 * // Example 2: Product of matrix elements along rows
 * assert.deepStrictEqual(prod([[5, 6, 5], [7, 8, -1]], 0), [150, -56]);
 *
 * // Example 3: Product of matrix elements along columns
 * assert.deepStrictEqual(prod([[5, 6, 5], [7, 8, -1]], 1), [35, 48, -5]);
 */
export function prod(x: array | matrix, dim?: number): number | array<number>;
