import type { NormalizationFlag } from "../types.d.ts";

/**
 * Asserts that a value is a valid normalization flag (0 or 1).
 *
 * Throws a TypeError if the input is not 0 or 1. Uses TypeScript's type assertion to narrow the type.
 *
 * @param flag The value to check
 * @throws If flag is not 0 or 1
 *
 * @example
 * ```ts
 * import { assertThrows } from "jsr:@std/assert";
 *
 * // Example 1: Valid flag 0 (population)
 * assertnormalizationflag(0); // No error
 *
 * // Example 2: Valid flag 1 (sample)
 * assertnormalizationflag(1); // No error
 *
 * // Example 3: Invalid flag throws error
 * assertThrows(() => assertnormalizationflag(2), TypeError, "Expected normalization flag 0 or 1, got 2");
 * ```
 */
export default function assertnormalizationflag(
  flag: unknown,
): asserts flag is NormalizationFlag {
  if (flag !== 0 && flag !== 1) {
    throw new TypeError(`Expected normalization flag 0 or 1, got ${flag}`);
  }
}
