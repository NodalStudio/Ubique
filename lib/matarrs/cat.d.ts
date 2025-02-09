import { array, matrix } from '../types';

/**
 * @function cat
 * @summary Concatenates arrays and matrices along the specified dimension.
 * @description Concatenates arrays and matrices along the specified dimension. Supports vertical (0) and horizontal (1) concatenation.
 *
 * @param {number} dim The dimension along which to concatenate (0: rows, 1: columns).
 * @param {...(number|array|matrix)} args Variable arguments to concatenate.
 * @returns {array|matrix} The concatenated array or matrix.
 * @throws {Error} If not enough input arguments are provided or if dimensions do not match for concatenation.
 *
 * @example
 * // Example 1: Vertical Concatenation (dim = 0) with numbers
 * assert.deepStrictEqual(cat(0, 1, 2, 3, 4), [[1], [2], [3], [4]]);
 *
 * // Example 2: Vertical Concatenation (dim = 0) with arrays
 * assert.deepStrictEqual(cat(0, [5, 6, 3], [0.5, -3, 2.3]), [[5, 6, 3], [0.5, -3, 2.3]]);
 *
 * // Example 3: Vertical Concatenation (dim = 0) with matrix and array
 * assert.deepStrictEqual(cat(0, [[5, 6, 5], [7, 8, -1]], [5, 6, 3]), [[5, 6, 5], [7, 8, -1], [5, 6, 3]]);
 *
 * // Example 4: Horizontal Concatenation (dim = 1) with numbers
 * assert.deepStrictEqual(cat(1, 1, 2, 3, 4), [[1, 2, 3, 4]]);
 *
 * // Example 5: Horizontal Concatenation (dim = 1) with arrays
 * assert.deepStrictEqual(cat(1, [5, 6, 3], [0.5, -3, 2.3]), [[5, 6, 3, 0.5, -3, 2.3]]);
 *
 * // Example 6: Horizontal Concatenation (dim = 1) with matrix and arrays
 * assert.deepStrictEqual(cat(1, [[2, 3, 4]], [5, 6, 3], [0.5, -3, 2.3]), [[2, 3, 4, 5, 6, 3, 0.5, -3, 2.3]]);
 */
export function cat(dim: number, ...args: (number | array | matrix)[]): array | matrix;
