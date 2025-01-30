import { array, matrix } from "../types";

/**
 * @function times
 * @summary Element-wise multiplication of arrays, matrices, or numbers.
 * @description Performs element-by-element multiplication. X and Y must have the same dimensions unless one is a number.
 *
 * @param x The first operand, can be a number, array, or matrix.
 * @param y The second operand, can be a number, array, or matrix.
 * @returns The result of element-wise multiplication.
 * @throws {Error} If no arguments are provided or if the input dimensions do not match.
 *
 * @example
 * // Example 1: Multiply two numbers
 * times(5, 6); // 30
 *
 * // Example 2: Element-wise multiplication of two vectors
 * times([5, 6, 4], [3, -1, 0]); // [15, -6, 0]
 *
 * // Example 3: Multiply a vector by a scalar
 * times([5, 6, 4], 10); // [50, 60, 40]
 *
 * // Example 4: Element-wise multiplication of two matrices
 * times([[5, 6, 5], [7, 8, -1]], [[-1, 3, -1], [4, 5, 9]]); // [[-5, 18, -5], [28, 40, -9]]
 */
export function times(x: number | array | matrix, y: number | array | matrix): number | array | matrix;
