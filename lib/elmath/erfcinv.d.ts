/**
 * @function erfcinv
 * @summary Inverse complementary error function
 * @description Computes the inverse of the complementary error function.
 *
 * It satisfies \( y = \text{erfc}(x) \) for \( 2 \geq y \geq 0 \) with \( -\infty \leq x \leq \infty \).
 *
 * @param y A real value in the range [2, 0].
 * @returns The value of the inverse complementary error function.
 *
 * @example
 * // Example 1: Compute the inverse complementary error function for a value less than 1
 * assert.strictEqual(erfcinv(1.5), -0.476936236121904);
 *
 * // Example 2: Compute the inverse complementary error function for a value greater than 1
 * assert.strictEqual(erfcinv(0.5), 0.476936236121904);
 *
 * // Example 3: Compute the inverse complementary error function for 1
 * assert.strictEqual(erfcinv(1), 0);
 *
 * // Example 4: Compute the inverse complementary error function for 2 (should return negative infinity)
 * assert.strictEqual(erfcinv(2), -Infinity);
 *
 * // Example 5: Compute the inverse complementary error function for 0 (should return positive infinity)
 * assert.strictEqual(erfcinv(0), Infinity);
 */
export function erfcinv(y: number): number;
