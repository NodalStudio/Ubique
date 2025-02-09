import { array, matrix } from '../types';

/**
 * @function subsetlin
 * @summary Extracts elements from an array or matrix based on linear indexing.
 * @description Extracts a subset of an array or matrix using linear indexing, either row-wise (default) or column-wise.
 *
 * @param m The array or matrix of elements.
 * @param idx Linear indexing values.
 * @param flag Flag (0: row-wise, 1: column-wise).
 * @returns The subset of `m` based on `idx`.
 * @throws If input arguments are missing.
 *
 * @example
 * const a = [[5,6,5],[7,8,-1]];
 * const c = [5,6,3];
 *
 * // Example 1: Extract a single element
 * assert.deepStrictEqual(subsetlin(a, 1), [6]);
 *
 * // Example 2: Subset by rows
 * assert.deepStrictEqual(subsetlin(a, [0,1,2,3]), [5, 6, 5, 7]);
 *
 * // Example 3: Subset by columns
 * assert.deepStrictEqual(subsetlin(a, [0,1,2,3], 1), [5, 7, 6, 8]);
 *
 * // Example 4: Extract a 2D subset (column-wise)
 * assert.deepStrictEqual(subsetlin(a, [[0,1,2], [2,3,4]], 1), [[5, 7, 6], [6, 8, 5]]);
 *
 * // Example 5: Subset a vector
 * assert.deepStrictEqual(subsetlin(c, [0,1]), [5, 6]);
 *
 * // Example 6: Extract a 2D subset from a vector
 * assert.deepStrictEqual(subsetlin(c, [[0,1], [1,2]]), [[5, 6], [6, 3]]);
 */
export function subsetlin(m: array | matrix, idx: number | array | matrix, flag?: number): number | array | matrix;
