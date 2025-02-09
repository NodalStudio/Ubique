import { array, matrix } from '../types';

/**
 * @function floor
 * @summary Rounds a number or array of numbers toward negative infinity.
 * @description Rounds the input value(s) towards negative infinity, optionally to a specified number of decimal places.
 *
 * @param x Number or array of numbers to be rounded.
 * @param n Number of decimal places to round to. Defaults to 0.
 * @returns The rounded value(s).
 *
 * @example
 * // Example 1: Round PI to 12 decimal places
 * assert.strictEqual(floor(Math.PI, 12), 3.141592653589);
 *
 * // Example 2: Round a single number toward negative infinity
 * assert.strictEqual(floor(3.78), 3);
 *
 * // Example 3: Round an array of numbers toward negative infinity
 * assert.deepStrictEqual(floor([4.51, -1.4]), [4, -2]);
 *
 * // Example 4: Round a matrix of numbers to 2 decimal places
 * assert.deepStrictEqual(floor([[4.5134, -1.4345], [3.7809, 0.0134]], 2), [[4.51, -1.44], [3.78, 0.01]]);
 */
export function floor(x: number | array | matrix, n?: number): number | array | matrix;
