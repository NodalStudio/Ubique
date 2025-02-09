import { array, matrix } from '../types';

/**
 * @function mod
 * @summary Calculates the modulus after division.
 * @description Computes the modulus after division. This operation is element-wise for matrices and arrays.
 *
 * @param x The dividend.
 * @param y The divisor.
 * @returns The modulus after division.
 *
 * @example
 * // Example 1: Modulus of a vector with a scalar divisor
 * assert.deepStrictEqual(mod([13, -7], 2.2), [2, 1.8]);
 *
 * // Example 2: Modulus of two vectors
 * assert.deepStrictEqual(mod([13, -7], [5, 6]), [3, 5]);
 *
 * // Example 3: Modulus of two matrices
 * const a = [[5, 6, 5], [7, 8, -1]];
 * const b = [[-1, 3, -1], [4, 5, 9]];
 * assert.deepStrictEqual(mod(a, b), [[0, 0, 0], [3, 3, 8]]);
 */
export function mod(x: number | array | matrix, y: number | array | matrix): number | array | matrix;
