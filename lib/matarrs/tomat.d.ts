import { array, matrix } from '../types.ts';

/**
 * @function tomat
 * @summary Converts a number, boolean, or array into a matrix.
 * @description If input is a number or boolean, it is converted into a 1x1 matrix.
 *              If input is a vector, it is converted into a single-row matrix.
 *              If input is already a matrix, it remains unchanged.
 *
 * @param x The input value.
 * @returns A matrix representation of the input.
 * @throws If the input is invalid.
 *
 * @example
 * // Example 1: Convert a number to a matrix
 * assert.deepStrictEqual(tomat(5), [[5]]);
 *
 * // Example 2: Convert a boolean to a matrix
 * assert.deepStrictEqual(tomat(true), [[true]]);
 *
 * // Example 3: Convert a row vector to a matrix
 * assert.deepStrictEqual(tomat([5, 6, 3]), [[5, 6, 3]]);
 *
 * // Example 4: Convert an already formatted matrix
 * assert.deepStrictEqual(tomat([[1, 2], [3, 4]]), [[1, 2], [3, 4]]);
 *
 * // Example 5: Invalid input (null)
 * assert.throws(() => tomat(null), /Invalid input argument./);
 */
export function tomat(x: number | boolean | array): matrix;
