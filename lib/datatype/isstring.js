/**
 * @function isstring
 * @summary Checks if the input is a string.
 * @description Returns `true` if the input is of type string, otherwise returns `false`.
 *
 * @param {any} x - The element to check.
 * @returns {boolean} - Returns `true` if `x` is a string, otherwise `false`.
 *
 * @throws {Error} - Throws an error if no argument is provided.
 *
 * @example
 * // Example 1: Input is a string
 * assert.strictEqual(isstring('test'), true);
 *
 * // Example 2: Input is a number
 * assert.strictEqual(isstring(123), false);
 *
 * // Example 3: Input is an object
 * assert.strictEqual(isstring({ key: 'value' }), false);
 *
 * // Example 4: No input provided
 * try {
 *   isstring(); // Error: not enough input arguments
 * } catch (error) {
 *   assert.strictEqual(error.message, 'not enough input arguments');
 * }
 */
export function isstring(x) {
  if (arguments.length === 0) {
    throw new Error('not enough input arguments');
  }

  return typeof x === 'string';
}
