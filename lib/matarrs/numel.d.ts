import { array, matrix } from '../types';

/**
 * @function numel
 * @summary Number of elements in an array or matrix
 * @description Computes the total number of elements in an array or matrix.
 *
 * @param x The array or matrix to evaluate.
 * @returns The total number of elements in the array or matrix.
 *
 * @example
 * // Example 1: Number of elements in a vector
 * assert.strictEqual(numel([3, 5, 6]), 3);
 *
 * // Example 2: Number of elements in a matrix
 * assert.strictEqual(numel([[3, 2, 7], [4, 5, 6]]), 6);
 *
 * // Example 3: Number of elements in a 1x1 matrix
 * assert.strictEqual(numel([[42]]), 1);
 *
 * // Example 4: Number of elements in an empty array
 * assert.strictEqual(numel([]), 0);
 */
export function numel(x: array | matrix): number;
