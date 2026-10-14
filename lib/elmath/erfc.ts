import { erfcwasm } from "../../rs_lib/pkg/rs_lib.js";
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
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(erfc(0.5), 0.4795001221869535, 2.3975006109347676e-13);
 *
 * ```
 *
 * @example Compute the complementary error function for a negative value
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(erfc(-1), 1.8427007929497148, 9.213503964748575e-13);
 *
 * ```
 *
 * @example Compute the complementary error function for zero
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(erfc(0), 1.0, 5e-13);
 *
 * ```
 *
 * @example Compute the complementary error function for a large positive value
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(erfc(2), 0.004677734981047266, 1e-14);
 *
 * ```
 *
 * @example Compute the complementary error function for a large negative value
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(erfc(-2), 1.9953222650189528, 9.976611325094764e-13);
 *
 * ```
 */
export default function erfc(x: number): number {
  return erfcwasm(x);
}
