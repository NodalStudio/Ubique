import { array, matrix } from '../types.js';

/**
 * @function sqrt
 * @summary Computes the square root of a number, array, or matrix.
 * @description Computes the square root of each element in a number, array, or matrix. Returns NaN for negative values.
 *
 * @param x The input value(s).
 * @returns The square root of the input value(s).
 *
 * @example
 * // Example 1: Square root of a single number
 * assert.strictEqual(sqrt(6), 2.44949);
 *
 * // Example 2: Square root of an array of numbers
 * assert.deepStrictEqual(sqrt([5, 6, 3]), [2.23607, 2.44949, 1.73205]);
 *
 * // Example 3: Square root of a matrix of numbers
 * assert.deepStrictEqual(sqrt([[5, 6, 5], [7, 8, 2]]), [[2.23607, 2.44949, 2.23607], [2.64575, 2.82843, 1.41421]]);
 */
export function sqrt(x: number | array | matrix): number | array | matrix;
