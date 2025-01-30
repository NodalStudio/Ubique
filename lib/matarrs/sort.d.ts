import { array, matrix } from '../types.ts';

/**
 * @function sort
 * @summary Sorts an array or matrix in ascending or descending order.
 * @description If input is a 1D array, it is sorted normally. If input is a matrix, sorting can be done along rows or columns.
 *
 * @param x The array or matrix to sort.
 * @param mode Sorting order: `'ascend'` (default) or `'descend'`.
 * @param dim Dimension along which to sort (0: rows, 1: columns).
 * @returns The sorted array or matrix.
 * @throws If input is invalid.
 *
 * @example
 * // Example 1: Sort an array in ascending order
 * assert.deepStrictEqual(sort([0, 5, -1, 3, -4, 9, 0], 'ascend'), [-4, -1, 0, 0, 3, 5, 9]);
 *
 * // Example 2: Sort an array in descending order
 * assert.deepStrictEqual(sort([0, 5, -1, 3, -4, 9, 0], 'descend'), [9, 5, 3, 0, 0, -1, -4]);
 *
 * // Example 3: Sort rows in descending order
 * assert.deepStrictEqual(sort([[-1, 3, -1], [4, 5, 9]], 'descend', 1), [
 *   [3, -1, -1],
 *   [9, 5, 4]
 * ]);
 *
 * // Example 4: Sort columns in ascending order
 * assert.deepStrictEqual(sort([[-1, 3, -1], [4, 5, 9]], 'ascend', 0), [
 *   [-1, 3, -1],
 *   [4, 5, 9]
 * ]);
 *
 * // Example 5: Invalid sorting mode
 * assert.throws(() => sort([1, 2, 3], 'wrong'), /Sorting mode must be "ascend" or "descend"./);
 *
 * // Example 6: Invalid matrix input
 * assert.throws(() => sort(5), /Input must be an array or matrix./);
 */
export function sort(x: array | matrix, mode?: string, dim?: number): array | matrix;
