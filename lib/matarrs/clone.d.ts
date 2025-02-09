import { array, matrix } from '../types';

/**
 * Creates a deep copy of the input array or matrix.
 *
 * @param x - The value to clone.
 * @returns A deep copy of the input value.
 * @throws {Error} If no input is provided or the type is unsupported.
 *
 * @example
 * // Example 1: Clone a matrix
 * assert.deepStrictEqual(clone([[-1, 3, -1], [4, 5, 9]]), [[-1, 3, -1], [4, 5, 9]]);
 *
 * // Example 2: Clone an array
 * assert.deepStrictEqual(clone([5, 6, 3]), [5, 6, 3]);
 *
 * // Example 3: Clone a single number
 * assert.strictEqual(clone(5), 5);
 */
export default function clone(x: number | array | matrix): number | array | matrix;
