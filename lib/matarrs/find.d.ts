import { array, matrix } from "../types.js";

/**
 * @function find
 * @summary Finds the indices of nonzero (true) elements in an array or matrix.
 * @description Given an input array or matrix, returns the indices of elements that are `true`. For a matrix, the indices are flattened row-wise.
 *
 * @param x Input array or matrix.
 * @returns An array of indices where the values are `true`.
 * @throws If no arguments are provided or if the input is not an array or matrix.
 *
 * @example
 * // Example 1: Find indices of true elements in a 1D array
 * find([0.3, -0.4, 0.5, 0.9].map(a => a > 0)); // [0, 2, 3]
 *
 * // Example 2: Find indices of true elements in a 2D matrix
 * find([[true, true], [false, true]]); // [0, 1, 3]
 *
 * // Example 3: Empty input
 * find([]); // []
 *
 * // Example 4: No true elements
 * find([false, false, false]); // []
 *
 * // Example 5: All true elements
 * find([true, true, true]); // [0, 1, 2]
 */
export function find(x: array | matrix): array;
