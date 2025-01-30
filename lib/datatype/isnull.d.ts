/**
 * Returns `true` if the input is `null`, otherwise `false`.
 *
 * @param x - The element to check.
 * @returns - Returns `true` if `x` is `null`.
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
export function isnull(x: any): boolean;
