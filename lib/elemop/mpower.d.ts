import { matrix } from '../types';

/**
 * @function mpower
 * @summary Matrix power X ^ Y
 * @description Raises a square matrix X to the power of a scalar exponent Y.
 *
 * @param x The base matrix, which must be square.
 * @param y The exponent, which must be a scalar.
 * @returns The resulting matrix after exponentiation.
 *
 * @example
 * // Example 1: Raise a matrix to the power of 3
 * assert.deepStrictEqual(mpower([[1,1,-1],[1,-2,3],[2,3,1]], 3),
 *   [[-2, 11, -11], [11, -35, 33], [22, 33, -2]]);
 */
export function mpower(x: matrix, y: number): matrix;
