import { array, matrix } from "../types.js";

/**
 * @function flipdim
 * @summary Flip the order of elements in an array or matrix.
 * @description Flips the order of elements in an array or matrix along a specified dimension. Default dimension is 1 (columns).
 *
 * @param x The array or matrix to flip.
 * @param dim The dimension to apply the flip (0 = rows, 1 = columns). Defaults to 1.
 * @returns The array or matrix with flipped elements.
 *
 * @example
 * // Example 1: Flip a 1D array (dim = 1)
 * flipdim([5, 6, 3], 1); // [3, 6, 5]
 *
 * // Example 2: Flip a 1D array with no dimension specified (no change)
 * flipdim([5, 6, 3], 0); // [5, 6, 3]
 *
 * // Example 3: Flip a 2D matrix along columns (dim = 1)
 * flipdim([[5, 6, 5], [7, 8, -1]]); // [[5, 6, 5], [-1, 8, 7]]
 *
 * // Example 4: Flip a 2D matrix along rows (dim = 0)
 * flipdim([[5, 6, 5], [7, 8, -1]], 0); // [[7, 8, -1], [5, 6, 5]]
 */
export function flipdim(x: array | matrix, dim?: number): array | matrix;
