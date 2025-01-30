/**
 * @function erfinv
 * @summary Inverse error function
 * @description Computes the inverse of the error function.
 *
 * The inverse error function satisfies \( y = \text{erf}(x) \), for \( -1 \leq y \leq 1 \) and \( -\infty \leq x \leq \infty \).
 *
 * @param y A real value in the range [-1, 1].
 * @returns The value of the inverse error function.
 *
 * @example
 * // Example 1: Compute the inverse error function for a positive value
 * assert.strictEqual(erfinv(0.1), 0.08885596505119545);
 *
 * // Example 2: Compute the inverse error function for a negative value
 * assert.strictEqual(erfinv(-0.5), -0.476936236121904);
 *
 * // Example 3: Compute the inverse error function for 0 (should return 0)
 * assert.strictEqual(erfinv(0), 0);
 *
 * // Example 4: Compute the inverse error function for 1 (should return positive infinity)
 * assert.strictEqual(erfinv(1), Infinity);
 *
 * // Example 5: Compute the inverse error function for -1 (should return negative infinity)
 * assert.strictEqual(erfinv(-1), -Infinity);
 */
export function erfinv(y: number): number;
