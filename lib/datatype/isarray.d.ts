/**
 * @function isarray
 * @summary Checks if the input is a 1D array of numbers.
 * @description Returns `true` if the input is a 1D array and all its elements are numbers.
 *
 * @param x The input to check.
 * @returns Returns `true` if `x` is a 1D array of numbers, otherwise `false`.
 *
 * @example
 * // Example 1: A valid 1D array of numbers
 * assert.strictEqual(isarray([1.4, 2.3, 3]), true);
 *
 * // Example 2: An array with mixed types
 * assert.strictEqual(isarray([1, "a", {}]), false);
 *
 * // Example 3: An empty array
 * assert.strictEqual(isarray([]), true);
 *
 * // Example 4: Not an array (single number)
 * assert.strictEqual(isarray(123), false);
 *
 * // Example 5: A 2D array (array of arrays)
 * assert.strictEqual(isarray([[1], [2], [3]]), false);
 */
export function isarray(x): boolean;
