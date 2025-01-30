/**
 * @function islogical
 * @summary Checks if the input is a boolean.
 * @description Returns `true` if the input is of type `boolean`.
 *
 * @param x The input to check.
 * @returns Returns `true` if `x` is a boolean.
 *
 * @throws Throws an error if no argument is provided.
 *
 * @example
 * // Example 1: Boolean true
 * assert.strictEqual(islogical(true), true);
 *
 * // Example 2: Boolean false
 * assert.strictEqual(islogical(false), true);
 *
 * // Example 3: Not a boolean (number)
 * assert.strictEqual(islogical(1), false);
 *
 * // Example 4: Not a boolean (string)
 * assert.strictEqual(islogical("true"), false);
 */
export function islogical(x: any): boolean;
