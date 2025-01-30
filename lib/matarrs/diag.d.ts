import { array, matrix } from "../types.js";

/**
 * @function diag
 * @summary Diagonal matrix creation and extraction of diagonals from a matrix.
 * @description Creates a diagonal matrix from a vector, or extracts the k-th diagonal from a matrix.
 *
 * @param x Input array or matrix.
 * @param k Index of the diagonal. 0 represents the main diagonal, k > 0 is above, and k < 0 is below the main diagonal. Defaults to 0.
 * @returns A diagonal matrix or array of diagonal values.
 * @throws If the input is neither a vector nor a matrix.
 *
 * @example
 * // Example 1: Create a diagonal matrix from a vector
 * diag([5, 6, -3]); // [[5, 0, 0], [0, 6, 0], [0, 0, -3]]
 *
 * // Example 2: Create a diagonal matrix with k = 1
 * diag([5, 6, -3], 1); // [[0, 5, 0, 0], [0, 0, 6, 0], [0, 0, 0, -3], [0, 0, 0, 0]]
 *
 * // Example 3: Create a diagonal matrix with k = -1
 * diag([5, 6, -3], -1); // [[0, 0, 0, 0], [5, 0, 0, 0], [0, 6, 0, 0], [0, 0, -3, 0]]
 *
 * // Example 4: Extract the main diagonal of a matrix
 * diag([[5, 0, 0], [0, 6, 0], [0, 0, -3]]); // [5, 6, -3]
 *
 * // Example 5: Extract the first superdiagonal of a matrix
 * diag([[0, 5, 0, 0], [0, 0, 6, 0], [0, 0, 0, -3], [0, 0, 0, 0]], 1); // [5, 6, -3]
 *
 * // Example 6: Extract the first subdiagonal of a matrix
 * diag([[0, 0, 0, 0], [5, 0, 0, 0], [0, 6, 0, 0], [0, 0, -3, 0]], -1); // [5, 6, -3]
 *
 * // Example 7: Extract a diagonal out of bounds (diagonal 2)
 * diag([[5, 0, 0], [0, 6, 0], [0, 0, -3]], 2); // [0]
 */
export function diag(x: array | matrix, k?: number): array | matrix;
