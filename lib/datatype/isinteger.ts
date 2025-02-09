import isnumber from "./isnumber.ts";

/**
 * @function isinteger
 * @summary Checks if the input is an integer.
 * @description Returns `true` if the input is a number and is an integer (i.e., has no fractional part).
 *
 * @param {any} x The input to check.
 * @returns {boolean} Returns `true` if `x` is an integer.
 *
 * @throws {Error} If the number of input arguments is not 1.
 *
 * @example
 * // Example 1: An integer
 * assert.strictEqual(isinteger(5), true);
 *
 * // Example 2: A non-integer number
 * assert.strictEqual(isinteger(5.5), false);
 *
 * // Example 3: Not a number (string)
 * assert.strictEqual(isinteger("5"), false);
 *
 * // Example 4: Not a number (null)
 * assert.strictEqual(isinteger(null), false);
 */
export default function isinteger(x: any) {
  if (arguments.length === 0) {
    throw new Error("not enough input arguments");
  }
  return isnumber(x) && Math.round(x) === x;
}
