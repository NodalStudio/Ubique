import { array, matrix } from '../types.ts';

/**
 * @function repmat
 * @summary Replicate and tile an array or matrix
 * @description Creates a new matrix by repeating the input value, array, or matrix in a tiled fashion.
 * If only two arguments are provided, `m` is used for both row and column replication.
 *
 * @param x The value, array, or matrix to replicate.
 * @param m Number of times to repeat along the rows.
 * @param n Number of times to repeat along the columns (optional, defaults to `m`).
 * @returns The resulting replicated matrix.
 * @throws If insufficient arguments are provided.
 *
 * @example
 * // Example 1: Replicate a scalar value into a 3x3 matrix
 * assert.deepStrictEqual(repmat(10, 3), [
 *   [10, 10, 10],
 *   [10, 10, 10],
 *   [10, 10, 10]
 * ]);
 *
 * // Example 2: Replicate a scalar into a 3x2 matrix
 * assert.deepStrictEqual(repmat(0.5, 3, 2), [
 *   [0.5, 0.5],
 *   [0.5, 0.5],
 *   [0.5, 0.5]
 * ]);
 *
 * // Example 3: Replicate a row vector
 * assert.deepStrictEqual(repmat([5, 6, 3], 1, 2), [
 *   [5, 6, 3, 5, 6, 3]
 * ]);
 *
 * // Example 4: Replicate a 2x2 matrix
 * assert.deepStrictEqual(repmat([[9, 5], [6, 1]], 2), [
 *   [9, 5, 9, 5],
 *   [6, 1, 6, 1],
 *   [9, 5, 9, 5],
 *   [6, 1, 6, 1]
 * ]);
 */
export function repmat(x: number | boolean | array | matrix, m: number, n?: number): matrix;
