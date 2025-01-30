import { array, matrix } from "../types.js";

/**
 * @function end
 * @summary Returns the last index in an array or matrix.
 * @description Returns the last index of an array or matrix. For matrices, you can specify the dimension: -1 for both rows and columns, 0 for rows, and 1 for columns.
 *
 * @param x Input array or matrix.
 * @param dim For matrix: -1 (both), 0 (rows), 1 (columns). Defaults to -1.
 * @returns Last index or indices.
 *
 * @example
 * // Example 1: Last index of a vector
 * console.log(end([5, 6, 3])); // 2
 *
 * // Example 2: Last indices of a matrix
 * console.log(end([[4, 5, 0], [-1, 2, -3]])); // [1, 2]
 *
 * // Example 3: Last row index of a matrix
 * console.log(end([[4, 5, 0], [-1, 2, -3]], 0)); // 1
 *
 * // Example 4: Last column index of a matrix
 * console.log(end([[4, 5, 0], [-1, 2, -3]], 1)); // 2
 *
 * // Example 5: Last index of a number (returns the number itself)
 * console.log(end(5)); // 5
 */
export function end(x: array | matrix, dim?: number): number | array;
