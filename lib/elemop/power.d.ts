import { array, matrix } from '../types';

/**
 * @function power
 * @summary Element-wise power X ^ Y
 * @description Computes the element-wise power of `x` raised to `y`. Supports mixed inputs of scalars, arrays, and matrices.
 *
 * @param x The base value, can be a number, array, or matrix.
 * @param y The exponent value, can be a number, array, or matrix.
 * @returns The result of raising `x` to the power of `y`.
 *
 * @example
 * // Example 1: Power of two numbers
 * assert.strictEqual(power(5, 4), 625);
 *
 * // Example 2: Power of an array by a scalar
 * assert.deepStrictEqual(power([5, 6, 3], 5), [3125, 7776, 243]);
 *
 * // Example 3: Scalar raised to the power of an array
 * assert.deepStrictEqual(power(5, [5, 6, 3]), [3125, 15625, 125]);
 *
 * // Example 4: Element-wise power of two arrays
 * assert.deepStrictEqual(power([5, 6, 3], [0.5, -3, 2.3]), [2.23607, 0.00462963, 12.5135]);
 *
 * // Example 5: Power of two matrices
 * const a = [[5, 6, 5], [7, 8, -1]];
 * const b = [[-1, 3, -1], [4, 5, 9]];
 * assert.deepStrictEqual(power(a, b), [[0.2, 216, 0.2], [2401, 32768, -1]]);
 *
 * // Example 6: Scalar raised to the power of a matrix
 * assert.deepStrictEqual(power(5, a), [[3125, 15625, 3125], [78125, 390625, 0.2]]);
 */
export function power(x: number | array | matrix, y: number | array | matrix): number | array<number> | matrix<number>;
