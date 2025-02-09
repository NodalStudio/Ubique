import { array } from '../types';

/**
 * @function rand
 * @summary Uniformly distributed pseudorandom numbers
 * @description Generates uniformly distributed pseudorandom numbers. It can return:
 * - A single random number if no arguments are provided.
 * - A 2D array of random numbers if dimensions are provided.
 *
 * @param args Variable input arguments (max 2).
 * @returns A random number or a matrix of random numbers.
 *
 * @example
 * // Example 1: Single random number
 * assert.strictEqual(typeof rand(), 'number');
 *
 * // Example 2: Empty matrix
 * assert.deepStrictEqual(rand(0), []);
 *
 * // Example 3: 1x1 matrix
 * const result1x1 = rand(1);
 * assert.strictEqual(result1x1.length, 1);
 * assert.strictEqual(result1x1[0].length, 1);
 *
 * // Example 4: 2x2 matrix
 * const result2x2 = rand(2);
 * assert.strictEqual(result2x2.length, 2);
 * assert.strictEqual(result2x2[0].length, 2);
 *
 * // Example 5: 2x1 matrix
 * const result2x1 = rand([2, 1]);
 * assert.strictEqual(result2x1.length, 2);
 * assert.strictEqual(result2x1[0].length, 1);
 *
 * // Example 6: 1x2 matrix
 * const result1x2 = rand(1, 2);
 * assert.strictEqual(result1x2.length, 1);
 * assert.strictEqual(result1x2[0].length, 2);
 */
export function rand(...args: number[] | array<number>): number | array<number>;
