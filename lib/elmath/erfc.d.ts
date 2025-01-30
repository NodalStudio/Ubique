/**
 * @function erfc
 * @summary Complementary error function
 * @description Calculates the complementary error function, which is widely used in probability, statistics, and partial differential equations.
 *
 * The complementary error function is defined as:
 *
 * \[
 * \text{erfc}(x) = \frac{2}{\sqrt{\pi}} \int_x^{\infty} e^{-t^2} dt = 1 - \text{erf}(x)
 * \]
 *
 * This implementation provides an approximation with a high degree of accuracy.
 *
 * @param x A real value.
 * @returns The value of the complementary error function for the input x.
 *
 * @example
 * // Example 1: Compute the complementary error function for a single value
 * assert.strictEqual(erfc(0.5), 0.47950009227675744);
 *
 * // Example 2: Compute the complementary error function for a negative value
 * assert.strictEqual(erfc(-1), 1.8427007929497148);
 *
 * // Example 3: Compute the complementary error function for zero
 * assert.strictEqual(erfc(0), 1);
 *
 * // Example 4: Compute the complementary error function for a large positive value
 * assert.strictEqual(erfc(2), 0.004677734981047265);
 *
 * // Example 5: Compute the complementary error function for a large negative value
 * assert.strictEqual(erfc(-2), 1.9953222650189527);
 */
export function erfc(x: number): number;
