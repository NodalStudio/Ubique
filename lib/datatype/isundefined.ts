/**
 * @function isundefined
 * @summary Checks if the input is undefined.
 * @description Returns `true` if the input is strictly equal to `undefined`, otherwise returns `false`.
 *
 * @param {any} x The element to check.
 * @returns {boolean} Returns `true` if `x` is `undefined`, otherwise `false`.
 *
 * @throws {Error} Throws an error if no argument is provided.
 *
 * @example
 * // Example 1: Input is undefined
 * assert.strictEqual(isundefined(undefined), true);
 *
 * // Example 2: Input is defined (null)
 * assert.strictEqual(isundefined(null), false);
 *
 * // Example 3: Input is defined (string)
 * assert.strictEqual(isundefined('test'), false);
 *
 * // Example 4: No input provided
 * try {
 *   isundefined(); // Error: not enough input arguments
 * } catch (error) {
 *   assert.strictEqual(error.message, 'not enough input arguments');
 * }
 */
export default function isundefined(x: any) {
  if (arguments.length === 0) {
    throw new Error("not enough input arguments");
  }

  return x === undefined;
}
