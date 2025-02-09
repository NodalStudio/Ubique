import { matrix } from '../types';

/**
 * @function zeros
 * @summary Create an array or matrix of all zeros.
 * @description Creates an array or matrix filled with zeros based on the specified dimensions. If no arguments are provided, it defaults to a 1x1 matrix.
 *
 * @param nrowsOrDims The number of rows or an array specifying both dimensions. Defaults to 1.
 * @param ncols The number of columns (optional if the first argument is an array). Defaults to 1.
 * @returns A matrix of zeros with the specified dimensions.
 * @throws If invalid input arguments are provided.
 *
 * @example
 * // Example 1: Create a 1x1 matrix of zeros (default behavior)
 * assert.deepStrictEqual(zeros(), [[0]]);
 *
 * // Example 2: Create a 2x2 square matrix of zeros
 * assert.deepStrictEqual(zeros(2), [[0, 0], [0, 0]]);
 *
 * // Example 3: Create a 2x3 matrix of zeros
 * assert.deepStrictEqual(zeros(2, 3), [[0, 0, 0], [0, 0, 0]]);
 *
 * // Example 4: Create a 2x1 matrix of zeros using array input
 * assert.deepStrictEqual(zeros([2, 1]), [[0], [0]]);
 */
export function zeros(nrowsOrDims?: number | [number, number], ncols?: number): matrix;
