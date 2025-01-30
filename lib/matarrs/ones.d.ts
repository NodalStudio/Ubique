import { array, matrix } from '../types.ts';

/**
 * @function ones
 * @summary Create an array of all ones
 * @description Creates a matrix or array filled with ones based on the provided dimensions.
 * Accepts up to two arguments for dimensions or a single array defining the dimensions.
 *
 * @param args Variable input arguments (max 2).
 * @returns A matrix or array filled with ones.
 *
 * @example
 * // Example 1: Create a 0x0 matrix
 * assert.deepStrictEqual(ones(0), []);
 *
 * // Example 2: Create a 1x1 matrix
 * assert.deepStrictEqual(ones(1), [[1]]);
 *
 * // Example 3: Create a 2x2 matrix
 * assert.deepStrictEqual(ones(2), [[1, 1], [1, 1]]);
 *
 * // Example 4: Create a 2x1 matrix
 * assert.deepStrictEqual(ones([2, 1]), [[1], [1]]);
 *
 * // Example 5: Create a 2x3 matrix
 * assert.deepStrictEqual(ones(2, 3), [[1, 1, 1], [1, 1, 1]]);
 */
export function ones(...args: number[] | array<number>): matrix<number>;
