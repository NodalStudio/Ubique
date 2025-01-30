/** @import { array, matrix } from '../types.ts' */

/**
 * @function unique
 * @summary Unique values in an array or matrix
 * @description Returns the unique values from an array or matrix. Optionally, returns the unique values along with their original indices.
 *
 * @param {array|matrix} x The input array or matrix of values.
 * @param {boolean} [flag=0] If `1`, returns both unique values and their indices; if `0`, returns only unique values.
 * @returns {array|matrix} The unique values, or a matrix containing the unique values and their indices.
 * @throws {Error} If no input is provided or the flag is invalid.
 *
 * @example
 * // Example 1: Unique values from an array
 * assert.deepStrictEqual(unique([9, -3, 2, -12, 0, 1, 0, 1, 2, 3, 4, 5]), [-12, -3, 0, 1, 2, 3, 4, 5, 9]);
 *
 * // Example 2: Unique values and their indices
 * assert.deepStrictEqual(unique([9, -3, 2, -12, 0, 1, 0, 1, 2, 3, 4, 5], 1), [[-12, -3, 0, 1, 2, 3, 4, 5, 9], [3, 1, 4, 5, 2, 9, 10, 11, 0]]);
 *
 * // Example 3: Unique values from a matrix
 * assert.deepStrictEqual(unique([[5, 4], [5, 3], [6, 3]]), [3, 4, 5, 6]);
 *
 * // Example 4: Unique values and indices from a matrix
 * assert.deepStrictEqual(unique([[5, 4], [5, 3], [6, 3]], 1), [[3, 4, 5, 6], [3, 1, 0, 4]]);
 */
export function unique(x, flag = 0) {
  if (!x) throw new Error('Not enough input arguments');

  const flatX = Array.isArray(x[0]) ? x.flat() : x;
  const sorted = flatX
    .map((value, index) => [value, index])
    .sort(([a], [b]) => a - b);

  const uvalue = [];
  const uindex = [];

  sorted.forEach(([value, index], i) => {
    if (i === 0 || value !== sorted[i - 1][0]) {
      uvalue.push(value);
      uindex.push(index);
    }
  });

  if (flag === 1) {
    return [uvalue, uindex];
  } else if (flag === 0) {
    return uvalue;
  } else {
    throw new Error('Flag can be only 0 (default) or 1');
  }
}
