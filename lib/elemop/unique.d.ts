import { array, matrix } from '../types';

/**
 * @function unique
 * @summary Unique values in an array or matrix
 * @description Returns the unique values from an array or matrix. Optionally, returns the unique values along with their original indices.
 *
 * @param x The input array or matrix of values.
 * @param flag If `1`, returns both unique values and their indices; if `0`, returns only unique values.
 * @returns The unique values, or a matrix containing the unique values and their indices.
 *
 * @example
 * // Example 1: Unique values from an array
 * assert.deepStrictEqual(unique([9, -3, 2, -12, 0, 1, 0, 1, 2, 3, 4, 5]), [-12, -3, 0, 1, 2, 3, 4, 5, 9]);
 *
 * // Example 2: Unique values and their indices
 * assert.deepStrictEqual(unique([9, -3, 2, -12, 0, 1, 0, 1, 2, 3, 4, 5], 1), [[-12, -3, 0, 1, 2, 3, 4, 5, 9], [3, 1, 4, 5, 2, 9, 10, 11, 0]]);
 *
 * // Example 3: Unique values from a matrix
 * assert.deepStrictEqual(unique([[5, 4], [5, 3], [6, 3]]), [3, 4, 5, 6]);
 *
 * // Example 4: Unique values and indices from a matrix
 * assert.deepStrictEqual(unique([[5, 4], [5, 3], [6, 3]], 1), [[3, 4, 5, 6], [3, 1, 0, 4]]);
 */
export function unique(x: array | matrix, flag?: number): array | [array, array];
