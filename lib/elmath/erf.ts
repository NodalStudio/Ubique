import { erfwasm } from "../../rs_lib/pkg/rs_lib.js";

/**
 * Error function.
 *
 * Calculates the error function, which is commonly used in probability, statistics, and partial differential equations describing diffusion.
 *
 * The error function is defined as:
 *
 * ```
 *           2     x
 * erf(x) = ───  ∫  e^(-t²) dt
 *          √π    0
 * ```
 *
 * This implementation approximates the error function with a maximal error of 1.2 × 10⁻⁷.
 *
 * @param x A real value
 * @returns The value of the error function for the input x
 * @throws If no arguments are provided
 *
 * @example Compute the error function for a single value
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(erf(0.5), 0.5204998778130465, 2.6024993890652323e-13);
 *
 * ```
 *
 * @example Compute the error function for a negative value
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(erf(-1), -0.8427007929497148, 4.213503964748574e-13);
 *
 * ```
 *
 * @example Compute the error function for zero
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(erf(0), 0.0, 1e-14);
 *
 * ```
 *
 * @example Compute the error function for a large positive value
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(erf(2), 0.9953222650189527, 4.976611325094764e-13);
 *
 * ```
 *
 * @example Compute the error function for a large negative value
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(erf(-2), -0.9953222650189527, 4.976611325094764e-13);
 *
 * ```
 */
export default function erf(x: number): number {
  return erfwasm(x);
}
