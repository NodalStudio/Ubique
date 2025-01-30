import { array, matrix } from "../types.js";

/**
 * @function length
 * @summary Gets the length of a vector or the largest array dimension.
 * @description Returns the length of a vector or the largest dimension of a 2D array (matrix).
 *
 * @param x The input array, matrix, or element.
 * @returns Returns the length of the vector or the largest dimension of the array/matrix.
 * @throws {Error} If no arguments are provided.
 *
 * @example
 * // Example 1: Length of a 1D array (vector)
 * assert.strictEqual(length([3, 5, 6]), 3);
 *
 * // Example 2: Length of a single element (should be 1)
 * assert.strictEqual(length(5), 1);
 *
 * // Example 3: Length of a 2D array (matrix)
 * assert.strictEqual(length([[5, 4], [-1, 2]]), 2);
 *
 * // Example 4: Empty array (should be 0)
 * assert.strictEqual(length([]), 0);
 */
export function length(x: array | matrix | any): number;
