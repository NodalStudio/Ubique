/**
 * @function isundefined
 * @summary Checks if the input is undefined.
 * @description Returns `true` if the input is strictly equal to `undefined`, otherwise returns `false`.
 *
 * @param x The element to check.
 * @returns Returns `true` if `x` is `undefined`, otherwise `false`.
 *
 * @throws Throws an error if no argument is provided.
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
export function isundefined(x: any): boolean;
