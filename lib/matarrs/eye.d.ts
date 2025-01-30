import { matrix } from "../types.js";

/**
 * @function eye
 * @summary Identity matrix
 * @description Creates an identity matrix with the specified dimensions. If a single number is provided, it creates a square identity matrix.
 *
 * @param dimOrRows The number of rows, or an array specifying both dimensions.
 * @param cols The number of columns (optional if the first argument is an array).
 * @returns The identity matrix of the specified dimensions.
 * @throws If no input arguments are provided.
 *
 * @example
 * // Example 1: Create a 0x0 matrix (empty matrix)
 * assert.deepStrictEqual(eye(0), []);
 *
 * // Example 2: Create a 1x1 identity matrix
 * assert.deepStrictEqual(eye(1), [[1]]);
 *
 * // Example 3: Create a 2x2 identity matrix
 * assert.deepStrictEqual(eye(2), [[1, 0], [0, 1]]);
 *
 * // Example 4: Create a 2x1 identity matrix
 * assert.deepStrictEqual(eye([2, 1]), [[1], [0]]);
 *
 * // Example 5: Create a 2x3 identity matrix
 * assert.deepStrictEqual(eye(2, 3), [[1, 0, 0], [0, 1, 0]]);
 */
export function eye(dimOrRows: number | [number, number], cols?: number): matrix;
