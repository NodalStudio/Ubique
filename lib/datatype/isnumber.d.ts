/**
 * Returns `true` if the input is a number or `NaN`, otherwise `false`.
 *
 * @param x - The element to check.
 * @returns Returns `true` if `x` is a number or `NaN`.
 *
 * @example
 * // Example 1: Input is a number
 * assert.strictEqual(isnumber(5), true);
 *
 * // Example 2: Input is `NaN`
 * assert.strictEqual(isnumber(NaN), true);
 *
 * // Example 3: Input is a string representing a number (not a number)
 * assert.strictEqual(isnumber('5'), false);
 *
 * // Example 4: Input is `undefined`
 * assert.strictEqual(isnumber(undefined), false);
 *
 * // Example 5: Input is `null`
 * assert.strictEqual(isnumber(null), false);
 */
export function isnumber(x: any): boolean;
