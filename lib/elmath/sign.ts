/** @import { array, matrix } from '../types.d.ts' */
import arrayfun from "../datatype/arrayfun.ts";
import isnumber from "../datatype/isnumber.ts";

/**
 * @function sign
 * @summary Computes the sign of a number.
 * @description Computes the sign of each element in a number, array, or matrix.
 * Returns 1 for positive numbers, -1 for negative numbers, and 0 for zero.
 *
 * @param {number|array|matrix} x The input value(s).
 * @returns {number|array|matrix} The sign of the input value(s).
 * @throws {Error} If no arguments are provided.
 *
 * @example
 * // Example 1: Sign of a single number
 * assert.strictEqual(sign(-0.5), -1);
 *
 * // Example 2: Sign of an array of numbers
 * assert.deepStrictEqual(sign([0.1, -0.5]), [1, -1]);
 *
 * // Example 3: Sign of a matrix of numbers
 * assert.deepStrictEqual(sign([[5, -2], [-3, 4]]), [[1, -1], [-1, 1]]);
 */
export default function sign(x: any) {
  if (arguments.length === 0) {
    throw new Error("not enough input arguments");
  }

  const computeSign = (val: any) => {
    if (val > 0) return 1;
    if (val < 0) return -1;
    return 0;
  };

  return isnumber(x) ? computeSign(x) : arrayfun(x, computeSign);
}
