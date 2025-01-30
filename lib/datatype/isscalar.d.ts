/**
 * @function isscalar
 * @summary Checks if the input is a scalar value.
 * @description Returns `true` if the input is a scalar, meaning it is either a single number, an array with one element, or a matrix with one element.
 *
 * @param x The input to check.
 * @returns Returns `true` if `x` is a scalar, otherwise `false`.
 *
 * @example
 * // Example 1: Single number
 * assert.strictEqual(isscalar(2), true);
 *
 * // Example 2: Array with one element
 * assert.strictEqual(isscalar([2]), true);
 *
 * // Example 3: Matrix with one element
 * assert.strictEqual(isscalar([[2]]), true);
 *
 * // Example 4: Array with multiple elements
 * assert.strictEqual(isscalar([1, 2, 3]), false);
 *
 * // Example 5: Matrix with multiple elements
 * assert.strictEqual(isscalar([[1, 2], [3, 4]]), false);
 *
 * // Example 6: Empty array (not a scalar)
 * assert.strictEqual(isscalar([]), false);
 *
 * // Example 7: Empty matrix (not a scalar)
 * assert.strictEqual(isscalar([[]]), false);
 */
export function isscalar(x: any): boolean;
