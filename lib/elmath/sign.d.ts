import { array, matrix } from '../types';

/**
 * @function sign
 * @summary Computes the sign of a number.
 * @description Computes the sign of each element in a number, array, or matrix.
 * Returns 1 for positive numbers, -1 for negative numbers, and 0 for zero.
 *
 * @param x The input value(s).
 * @returns The sign of the input value(s).
 *
 * @example
 * // Example 1: Sign of a single number
 * assert.strictEqual(sign(-0.5), -1);
 *
 * // Example 2: Sign of an array of numbers
 * assert.deepStrictEqual(sign([0.1, -0.5]), [1, -1]);
 *
 * // Example 3: Sign of a matrix of numbers
 * assert.deepStrictEqual(sign([[5, -2], [-3, 4]]), [[1, -1], [-1, 1]]);
 */
export function sign(x: number | array | matrix): number | array | matrix;
