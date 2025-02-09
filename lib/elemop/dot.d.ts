import { array } from '../types';

/**
 * @function dot
 * @summary Computes the dot product of two arrays.
 * @description Takes two arrays of equal length and computes the dot product.
 * The arrays must be of the same size.
 *
 * @param x Array of numbers.
 * @param y Array of numbers.
 * @returns The dot product of the two arrays.
 *
 * @example
 * // Example 1: Dot product of two 1D arrays
 * assert.strictEqual(dot([5, 6, 3], [0.5, -3, 2.3]), -8.6);
 *
 * // Example 2: Dot product of two arrays with negative numbers
 * assert.strictEqual(dot([-1, -2, -3], [-4, -5, -6]), 32);
 *
 * // Example 3: Dot product of two identical arrays
 * assert.strictEqual(dot([1, 2, 3], [1, 2, 3]), 14);
 *
 * // Example 4: Dot product of two arrays with zero values
 * assert.strictEqual(dot([0, 0, 0], [0, 0, 0]), 0);
 *
 * // Example 5: Error when input arrays are of different sizes
 * assert.throws(() => dot([1, 2], [1, 2, 3]), Error, 'input size mismatch');
 */
export function dot(x: array, y: array): number;
