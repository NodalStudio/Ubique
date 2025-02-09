import { array, matrix } from '../types';

/**
 * @function weekday
 * @summary Gets the ISO weekday for a given Unix timestamp.
 * @description Returns a number representing the ISO weekday (1 = Monday, 7 = Sunday) for each element in `x`.
 *
 * @param {number|array|matrix} x - Unix timestamp(s) to convert to the ISO weekday.
 * @returns {number|array|matrix} - The corresponding ISO weekday(s).
 *
 * @example
 * // Example 1: Single Unix timestamp
 * assert.strictEqual(weekday(1426636800), 3); // (Wednesday)
 *
 * // Example 2: Array of Unix timestamps
 * assert.deepStrictEqual(weekday([1424908800, 1426636800]), [4, 3]); // (Thursday, Wednesday)
 *
 * // Example 3: Matrix of Unix timestamps
 * assert.deepStrictEqual(weekday([[1424908800, 1426636800], [1427328000, 1429315200]]), [[4, 3], [4, 6]]); // (Thursday, Wednesday, Thursday, Saturday)
 */
export function weekday(x: number | array | matrix): number | array | matrix;
