import { array } from '../types.ts';

/**
 * @function mergesort
 * @summary Sort array in ascending or descending order
 * @description Mergesort is a divide-and-conquer algorithm that recursively splits an array into halves,
 * sorts each half, and then merges them back together in the desired order.
 * It returns the sorted values along with their original indexes.
 *
 * @param x Array of elements to sort.
 * @param mode Sorting direction: `"ascend"` (default) or `"descend"`.
 * @returns A 2D array: the first row contains sorted values, the second row contains the original indexes.
 *
 * @example
 * // Example 1: Sort an array in ascending order with indexes
 * assert.deepStrictEqual(mergesort([9, -3, 2, -12, 0, 1]), [
 *   [-12, -3, 0, 1, 2, 9],
 *   [3, 1, 4, 5, 2, 0],
 * ]);
 *
 * // Example 2: Sort an array in descending order with indexes
 * assert.deepStrictEqual(mergesort([9, -3, 2, -12, 0, 1], 'descend'), [
 *   [9, 2, 1, 0, -3, -12],
 *   [0, 2, 5, 4, 1, 3],
 * ]);
 *
 * // Example 3: Sort an array of length 1
 * assert.deepStrictEqual(mergesort([5]), [[5], [0]]);
 *
 * // Example 4: Invalid mode
 * assert.throws(() => mergesort([1, 2, 3], 'invalid'), /sorting must be "ascend" or "descend"/);
 *
 * // Example 5: Empty array
 * assert.deepStrictEqual(mergesort([]), [[], []]);
 *
 * // Example 6: Array with repeated values
 * assert.deepStrictEqual(mergesort([3, 1, 3, 2, 3]), [
 *   [1, 2, 3, 3, 3],
 *   [1, 3, 0, 2, 4],
 * ]);
 */
export function mergesort(
  x: array<number>,
  mode?: string
): array<array<number>>;
