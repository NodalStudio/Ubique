import { array, matrix } from '../types';

/**
 * @function rem
 * @summary Remainder after division
 * @description Computes the remainder after division for each element of `x` divided by the corresponding element of `y`. Works element-wise for arrays and matrices.
 *
 * @param x The dividend, can be a number, array, or matrix.
 * @param y The divisor, can be a number, array, or matrix.
 * @returns The remainder after division.
 *
 * @example
 * // Example 1: Remainder of a vector divided by a scalar
 * assert.deepStrictEqual(rem([13, -7], 2.2), [2, -0.4]);
 *
 * // Example 2: Remainder of two vectors
 * assert.deepStrictEqual(rem([13, -7], [5, 6]), [3, -1]);
 *
 * // Example 3: Remainder of two matrices
 * const a = [[5, 6, 5], [7, 8, -1]];
 * const b = [[-1, 3, -1], [4, 5, 9]];
 * assert.deepStrictEqual(rem(a, b), [[0, 0, 0], [3, 3, -1]]);
 */
export function rem(x: number | array | matrix, y: number | array | matrix): number | array<number> | matrix<number>;
