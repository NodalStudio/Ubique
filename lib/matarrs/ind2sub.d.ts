import { array, matrix } from '../types';

/**
 * @function ind2sub
 * @summary Converts linear index to row and column subscripts.
 * @description Converts a linear index or array of linear indices into the equivalent row and column subscripts for a given matrix size.
 *
 * @param size Size of the matrix as [rows, columns].
 * @param index Linear index or array of indices [0...N-1].
 * @returns The corresponding row and column subscripts.
 *
 * @example
 * // Example 1: Convert linear index 5 to subscripts in a 2x3 matrix
 * assert.deepStrictEqual(ind2sub([2, 3], 5), [1, 2]);
 *
 * // Example 2: Convert multiple linear indices to subscripts
 * assert.deepStrictEqual(ind2sub([2, 3], [0, 1, 2]), [[0, 0], [1, 0], [0, 1]]);
 *
 * // Example 3: Convert linear index to subscripts in a vector
 * assert.deepStrictEqual(ind2sub([3, 1], 2), [2, 0]);
 *
 * // Example 4: Invalid input (no arguments)
 * assert.throws(() => { ind2sub(); }, Error, 'not enough input arguments');
 */
export function ind2sub(size: array, index: number | array): array | matrix;
