/** @import { array, matrix } from '../types' */

import arrayfun from '../datatype/arrayfun.js';

/**
 * @function ceil
 * @summary Round toward positive infinity
 * @description Rounds a number, array, or matrix of numbers toward positive infinity. If a number of decimals is provided, it rounds to that precision.
 *
 * @param {number|array|matrix} x The input number, array, or matrix to be rounded.
 * @param {number} [n=0] The number of decimals to round to. Defaults to 0.
 * @returns {number|array|matrix} The rounded value(s).
 * @throws {Error} If no input is provided.
 *
 * @example
 * // Example 1: Round a number (Math.PI) to 12 decimal places
 * assert.strictEqual(ceil(Math.PI, 12), 3.141592653590);
 *
 * // Example 2: Round a number (3.78) toward positive infinity
 * assert.strictEqual(ceil(3.78), 4);
 *
 * // Example 3: Round an array of numbers
 * assert.deepStrictEqual(ceil([4.51, -1.4]), [5, -1]);
 *
 * // Example 4: Round a matrix of numbers to 2 decimal places
 * assert.deepStrictEqual(ceil([[4.5134, -1.4345], [3.7809, 0.0134]], 2), [[4.52, -1.43], [3.79, 0.02]]);
 */
export default function ceil(x, n = 0) {
  if (!x) {throw new Error('Not enough input arguments');}

  const factor = 10 ** n;
  return arrayfun(x, (a) => Math.ceil(a * factor) / factor);
}
