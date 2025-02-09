import { array, matrix } from '../types';

/**
 * @function log
 * @summary Computes the natural logarithm (base e).
 * @description Computes the natural logarithm (base e) for each element in a number, array, or matrix.
 *
 * @param x The input value(s).
 * @returns The natural logarithm of the input value(s).
 *
 * @example
 * // Example 1: Natural logarithm of a single number
 * assert.strictEqual(log(6), 1.79176);
 *
 * // Example 2: Natural logarithm of an array of numbers
 * assert.deepStrictEqual(log([5, 6, 3]), [1.60944, 1.79176, 1.09861]);
 *
 * // Example 3: Natural logarithm of a matrix of numbers
 * assert.deepStrictEqual(log([[5, 6, 5], [7, 8, 2]]), [
 *   [1.60944, 1.79176, 1.60944],
 *   [1.94591, 2.07944, 0.69315]
 * ]);
 */
export function log(x: number | array | matrix): number | array | matrix;
