import { array, matrix } from '../types';

/**
 * @function size
 * @summary Size of an N-D array
 * @description Determines the size of an N-dimensional array, where a number is treated as a 1x1 array,
 * a 1-D array as 1xN, and a matrix as MxN. It handles strings by returning their length as 1xN.
 *
 * @param x The input whose size is to be determined.
 * @returns An array of dimensions representing the size of the input.
 *
 * @example
 * // Example 1: Size of a 4D array
 * assert.deepStrictEqual(size([[[[5, 6, 5], [7, 8, -1]]]]), [1, 1, 2, 3]);
 *
 * // Example 2: Size of a 2D matrix
 * assert.deepStrictEqual(size([[3, 2, 7], [4, 5, 6]]), [2, 3]);
 *
 * // Example 3: Size of a 1D array
 * assert.deepStrictEqual(size([5, 4, 4]), [1, 3]);
 *
 * // Example 4: Size of a scalar
 * assert.deepStrictEqual(size(5), [1, 1]);
 *
 * // Example 5: Size of a string
 * assert.deepStrictEqual(size('ubique'), [1, 6]);
 *
 * // Example 6: Size of a 1x2 array of strings
 * assert.deepStrictEqual(size([['first', 'second']]), [1, 2]);
 *
 * // Example 7: Size of an empty array
 * assert.deepStrictEqual(size([]), [0, 0]);
 */
export function size(x: string | number | array | matrix): array;
