import { array, matrix } from "../types.js";

/**
 * @function horzcat
 * @summary Concatenate arrays or matrices horizontally.
 * @description Concatenates arrays or matrices horizontally along columns.
 *
 * @param args Arrays or matrices to concatenate.
 * @returns Concatenated result.
 *
 * @example
 * // Example 1: Concatenate two 2x3 matrices
 * assert.deepStrictEqual(horzcat([[5, 6, 5], [7, 8, -1]], [[-1, 3, -1], [4, 5, 9]]), [[5, 6, 5, -1, 3, -1], [7, 8, -1, 4, 5, 9]]);
 *
 * // Example 2: Concatenate numbers into a 1x3 matrix
 * assert.deepStrictEqual(horzcat(5, 6, 7), [[5, 6, 7]]);
 *
 * // Example 3: Invalid input (no arguments)
 * assert.throws(() => { horzcat(); }, Error, 'Not enough input arguments');
 */
export function horzcat(...args: (array | matrix)[]): array | matrix;
