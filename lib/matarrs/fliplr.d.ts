import { array, matrix } from "../types.js";

/**
 * @function fliplr
 * @summary Flip a matrix left to right.
 * @description Reverses the order of the columns in the input matrix, flipping it left to right.
 *
 * @param x The input array or matrix.
 * @returns The matrix with its columns flipped left to right.
 *
 * @example
 * // Example 1: Flip a 2D matrix left to right
 * fliplr([[1, 4], [2, 5], [3, 6]]); // [ [4, 1], [5, 2], [6, 3] ]
 *
 * // Example 2: Flip a 1D array (no change)
 * fliplr([1, 2, 3]); // [1, 2, 3]
 */
export function fliplr(x: array | matrix): array | matrix;
