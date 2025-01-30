import dayjs from 'dayjs';
import { arrayfun } from './arrayfun.js';

/** @import { array, matrix } from '../types.ts' */

/**
 * @function month
 * @summary Extracts the month from a Unix timestamp.
 * @description Returns a number representing the month for each element in `x`. Months are 0-indexed, where January is 0 and December is 11.
 *
 * @param {number|array|matrix} x A Unix timestamp or an array/matrix of Unix timestamps.
 * @returns {number|array|matrix} The month(s) corresponding to the input timestamp(s).
 *
 * @throws {Error} If the input is not a number, array or matrix.
 *
 * @example
 * // Example 1: Single timestamp
 * assert.strictEqual(month(1424708525), 1);
 *
 * // Example 2: Array of timestamps
 * assert.deepStrictEqual(month([1414886399, 1414972799]), [10, 10]);
 *
 * // Example 3: Matrix of timestamps
 * assert.deepStrictEqual(month([[1414886399, 1414972799], [1415059199, 1415145599]]), [[10, 10], [10, 10]]);
 */
export function month(x) {
  if (arguments.length === 0) {
    throw new Error('not enough input arguments');
  }

  const extractMonth = (timestamp) => dayjs.unix(timestamp).month();

  return arrayfun(x, extractMonth);
}
