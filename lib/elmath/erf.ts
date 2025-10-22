import { erfc } from "../../index.ts";

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
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(erf(0.5), 0.5204999077232426);
 *
 * ```
 *
 * @example Compute the error function for a negative value
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(erf(-1), -0.8427007877600068);
 *
 * ```
 *
 * @example Compute the error function for zero
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(erf(0), 0);
 *
 * ```
 *
 * @example Compute the error function for a large positive value
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(erf(2), 0.995322265010666);
 *
 * ```
 *
 * @example Compute the error function for a large negative value
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(erf(-2), -0.9953222650106659);
 *
 * ```
 */
export default function erf(x: number): number {
  return 1 - erfc(x);
}
