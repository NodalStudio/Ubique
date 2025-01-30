import { array, matrix } from '../types.js';

/**
 * @function abs
 * @summary Absolute value
 * @description Returns the absolute value of a number, or applies the absolute value function element-wise to arrays or matrices.
 *
 * @param x The number, array, or matrix to compute the absolute value for.
 * @returns The absolute value(s).
 *
 * @example
 * // Example 1: Compute the absolute value of a single number
 * abs(-0.5); // 0.5
 *
 * // Example 2: Compute the absolute value of an array of numbers
 * abs([0.1, -0.5]); // [0.1, 0.5]
 *
 * // Example 3: Compute the absolute value of a matrix
 * abs([[5, -2], [-3, 4]]); // [[5, 2], [3, 4]]
 */
export function abs(x: number | array | matrix): number | array | matrix;
