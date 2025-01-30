import { array, matrix } from '../types.ts';

/**
 * @function sub2ind
 * @summary Converts 2D subscripts to linear indices.
 * @description Converts 2D coordinates `[X, Y]` into linear indices based on the given matrix size.
 *
 * @param size The size of the matrix.
 * @param index X, Y coordinates in the range `[0...N-1]`.
 * @returns The computed linear index or an array of indices.
 * @throws If input arguments are missing or invalid.
 *
 * @example
 * var a = [[5,6,5],[7,8,-1]];
 *
 * // Example 1: Convert single 2D coordinate to linear index
 * assert.strictEqual(sub2ind([2, 3], [1, 2]), 5);
 *
 * // Example 2: Convert multiple 2D coordinates to linear indices
 * assert.deepStrictEqual(sub2ind([2, 3], [[0, 0], [1, 0], [0, 1]]), [0, 1, 2]);
 *
 * // Example 3: Convert index for a row vector
 * assert.strictEqual(sub2ind([1, 3], [2, 0]), 2);
 */
export function sub2ind(size: array, index: array | matrix): number | array;
