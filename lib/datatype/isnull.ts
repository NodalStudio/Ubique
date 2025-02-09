/**
 * @function isnull
 * @summary True for null values
 * @description Returns `true` if the input is `null`, otherwise `false`.
 *
 * @param {any} x - The element to check.
 * @returns {boolean} - Returns `true` if `x` is `null`.
 *
 * @example
 * // Example 1: Input is `null`
 * assert.strictEqual(isnull(null), true);
 *
 * // Example 2: Input is `undefined`
 * assert.strictEqual(isnull(undefined), false);
 *
 * // Example 3: Input is a number (not `null`)
 * assert.strictEqual(isnull(0), false);
 *
 * // Example 4: Input is an empty string (not `null`)
 * assert.strictEqual(isnull(''), false);
 */
export default function isnull(x: any) {
  if (arguments.length === 0) {
    throw new Error("Not enough input arguments");
  }
  return x === null;
}
