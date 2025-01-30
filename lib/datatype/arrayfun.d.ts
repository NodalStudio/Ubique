/** @import { array, matrix } from '../types.ts' */

/**
 * @function arrayfun
 * @summary Applies a function to each element of a array or matrix.
 * @description This function applies the provided function to each element of a array or matrix.
 * The first argument is the input array or matrix, the second is the function to apply, followed by any additional parameters required by the function.
 *
 * @param x The input array, matrix, or single value to which the function will be applied.
 * @param fun The function to apply to each element of `x`.
 * @param funArgs Additional arguments to pass to the function `fun` after the current element.
 * @returns The result of applying the function to each element of the input. Returns a array, matrix, or single value based on input.
 *
 * @throws {Error} If the input arguments are not valid.
 *
 * @example
 * // Example 1: Apply Math.log to each element of an array
 * assert.deepStrictEqual(arrayfun([1.4, 2.3, 3], Math.log), [0.33647223662121284, 0.832909122935104, 1.0986122886681096]);
 *
 * // Example 2: Apply Math.pow to each element of a matrix
 * assert.deepStrictEqual(arrayfun([[5, 6], [1, 3]], Math.pow, 3), [[125, 216], [1, 27]]);
 *
 * // Example 3: Apply a custom sign function to an array
 * function sign(x) {
 *     if (x > 0) {
 *         return 1;
 *     } else if (x < 0) {
 *         return -1;
 *     } else {
 *         return 0;
 *     }
 * }
 * assert.deepStrictEqual(arrayfun([1.4, 0, -10], sign), [1, 0, -1]);
 *
 * // Example 4: Apply a string search function to each element of a matrix
 * function strfind(str, substr) {
 *     const indices = [];
 *     let i = str.indexOf(substr);
 *     while (i !== -1) {
 *         indices.push(i);
 *         i = str.indexOf(substr, i + 1);
 *     }
 *     return indices;
 * }
 * assert.deepStrictEqual(arrayfun([['cat', 'concat'], ['cattle', 'catch the catfish']], strfind, 'cat'), [[[0], [3]], [[0], [0, 10]]]);
 *
 * // Example 5: Apply a function to check for null values in an array
 * function isnull(value) {
 *     return value === null;
 * }
 * assert.deepStrictEqual(arrayfun([null, true, 'hello', 5, NaN], isnull), [true, false, false, false, false]);
 *
 * // Example 6: Multiply each element of an array by a scalar
 * assert.deepStrictEqual(arrayfun([1, 2, 3], (x) => x * 2), [2, 4, 6]);
 *
 * // Example 7: Add an offset to each element of a matrix
 * assert.deepStrictEqual(arrayfun([[1, 2], [3, 4]], (x, offset) => x + offset, 10), [[11, 12], [13, 14]]);
 *
 * // Example 8: Apply Math.sqrt to a single value
 * assert.strictEqual(arrayfun(16, Math.sqrt), 4);
 *
 * // Example 9: Apply a function to concatenate strings in an array
 * assert.deepStrictEqual(arrayfun(['a', 'b', 'c'], (s1, s2) => s1 + s2, 'X'), ['aX', 'bX', 'cX']);
 *
 * // Example 10: Check if each element of an array is greater than a threshold
 * assert.deepStrictEqual(arrayfun([5, 8, 2], (x, threshold) => x > threshold, 4), [true, true, false]);
 */
 export function arrayfun(x: any, fun: Function, ...funArgs: any[]): any;
