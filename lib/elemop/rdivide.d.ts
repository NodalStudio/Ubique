import { array, matrix } from '../types';

/**
 * @function rdivide
 * @summary Right array division X / Y
 * @description Divides each element of X by the corresponding element of Y. Inputs X and Y
 * must have compatible sizes.
 *
 * @param x The dividend, can be a number, array, or matrix.
 * @param y The divisor, can be a number, array, or matrix.
 * @returns The result of the element-wise division.
 *
 * @example
 * // Example 1: Divide two numbers
 * assert.strictEqual(rdivide(5, 6), 0.833333);
 *
 * // Example 2: Divide a matrix by a scalar
 * const a = [[5, 6, 5], [7, 8, -1]];
 * assert.deepStrictEqual(rdivide(a, 3), [[1.66667, 2, 1.66667], [2.33333, 2.66667, -0.333333]]);
 *
 * // Example 3: Divide a scalar by a vector
 * assert.deepStrictEqual(rdivide(3, [-1, -2, -3]), [-3, -1.5, -1]);
 *
 * // Example 4: Element-wise division of two vectors
 * assert.deepStrictEqual(rdivide([5, 6, 7], [-1, -2, -3]), [-5, -3, -2.33333]);
 *
 * // Example 5: Element-wise division of two matrices
 * const e = [[9, 5], [6, 1]];
 * const f = [[3, 2], [5, 2]];
 * assert.deepStrictEqual(rdivide(e, f), [[3, 2.5], [1.2, 0.5]]);
 *
 * // Example 6: Divide a matrix by a scalar
 * assert.deepStrictEqual(rdivide(e, 3), [[3, 1.66667], [2, 0.333333]]);
 */
export function rdivide(x: number | array | matrix, y: number | array | matrix): number | array<number> | matrix<number>;
