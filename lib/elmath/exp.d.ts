import { array, matrix } from '../types';

/**
 * @function exp
 * @summary Computes the exponential value.
 * @description Computes the exponential value for each element in a number, array, or matrix.
 *
 * @param x The input value(s).
 * @returns The exponential of the input value(s).
 *
 * @example
 * // Example 1: Exponential of a single number
 * assert.strictEqual(exp(6), 403.429);
 *
 * // Example 2: Exponential of an array of numbers
 * assert.deepStrictEqual(exp([5, 6, 3]), [148.413, 403.429, 20.0855]);
 *
 * // Example 3: Exponential of a matrix of numbers
 * assert.deepStrictEqual(exp([[5, 6, 5], [7, 8, -1]]), [
 *   [148.413, 403.429, 148.413],
 *   [1096.63, 2980.96, 0.367879]
 * ]);
 */
export function exp(x: number | array | matrix): number | array | matrix;
