/**
 * Complementary error function.
 *
 * Calculates the complementary error function, which is widely used in probability, statistics, and partial differential equations.
 *
 * The complementary error function is defined as:
 *
 * ```
 *            2     ∞
 * erfc(x) = ───  ∫  e^(-t²) dt  =  1 - erf(x)
 *           √π    x
 * ```
 *
 * This implementation provides an approximation with a high degree of accuracy.
 *
 * @param x A real value
 * @returns The value of the complementary error function for the input x
 * @throws If no arguments are provided
 *
 * @example Compute the complementary error function for a single value
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(erfc(0.5), 0.47950009227675744);
 *
 * ```
 *
 * @example Compute the complementary error function for a negative value
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(erfc(-1), 1.8427007877600068);
 *
 * ```
 *
 * @example Compute the complementary error function for zero
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(erfc(0), 1);
 *
 * ```
 *
 * @example Compute the complementary error function for a large positive value
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(erfc(2), 0.004677734989334044);
 *
 * ```
 *
 * @example Compute the complementary error function for a large negative value
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(erfc(-2), 1.995322265010666);
 *
 * ```
 */
export default function erfc(x: number): number {
  if (x === 0) return 1;

  const z = Math.abs(x);
  const t = 1 / (0.5 * z + 1);
  const a1 = t * 0.17087277 + -0.82215223;
  const a2 = t * a1 + 1.48851587;
  const a3 = t * a2 + -1.13520398;
  const a4 = t * a3 + 0.27886807;
  const a5 = t * a4 + -0.18628806;
  const a6 = t * a5 + 0.09678418;
  const a7 = t * a6 + 0.37409196;
  const a8 = t * a7 + 1.00002368;
  const a9 = t * a8;
  const a10 = -z * z - 1.26551223 + a9;
  let a = t * Math.exp(a10);

  if (x < 0) {
    a = 2 - a;
  }
  return a;
}
