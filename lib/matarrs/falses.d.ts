import { array, matrix } from '../types';

/**
 * @function falses
 * @summary Creates an array or matrix filled with `false`.
 * @description Generates an array or matrix filled with the boolean value `false`. It accepts up to two dimensions.
 *
 * @param args Variable input arguments (max 2). If a single value is provided, a square matrix is created.
 * @returns An array or matrix of `false` values.
 *
 * @example
 * // Example 1: Create an empty array (0x0 matrix)
 * console.log(falses(0)); // []
 *
 * // Example 2: Create a 1x1 matrix of `false`
 * console.log(falses(1)); // [ [ false ] ]
 *
 * // Example 3: Create a 2x2 matrix of `false`
 * console.log(falses(2)); // [ [ false, false ], [ false, false ] ]
 *
 * // Example 4: Create a 2x1 matrix of `false`
 * console.log(falses([2, 1])); // [ [ false ], [ false ] ]
 *
 * // Example 5: Create a 2x3 matrix of `false`
 * console.log(falses(2, 3)); // [ [ false, false, false ], [ false, false, false ] ]
 */
export function falses(...args: number[] | [array]): array | matrix;
