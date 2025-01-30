import { array, matrix } from "../types";

/**
 * @function trues
 * @summary Creates an array filled with `true` values.
 * @description Generates an array or matrix of all `true` values based on the input dimensions.
 *              Accepts one or two numeric arguments, or an array specifying the dimensions.
 *
 * @param args Variable input arguments (max 2).
 * @returns A matrix filled with `true` values.
 * @throws If no arguments are provided.
 *
 * @example
 * // Example 1: Create an empty array
 * assert.deepStrictEqual(trues(0), []);
 *
 * // Example 2: Create a 1x1 matrix of `true`
 * assert.deepStrictEqual(trues(1), [[true]]);
 *
 * // Example 3: Create a 2x2 matrix of `true`
 * assert.deepStrictEqual(trues(2), [[true, true], [true, true]]);
 *
 * // Example 4: Create a 2x1 matrix of `true`
 * assert.deepStrictEqual(trues([2,1]), [[true], [true]]);
 *
 * // Example 5: Create a 2x3 matrix of `true`
 * assert.deepStrictEqual(trues(2,3), [[true, true, true], [true, true, true]]);
 */
export function trues(...args: (number | array)[]): matrix<boolean>;
