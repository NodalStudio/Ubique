import type { Dimension } from "../types.d.ts";

/**
 * @function assertDimension
 * @summary Asserts that a value is a valid dimension (0 or 1)
 * @description Throws a TypeError if the input is not 0 or 1. Uses TypeScript's type assertion to narrow the type.
 *
 * @param dim The value to check
 * @throws If dim is not 0 or 1
 *
 * @example
 * ```ts
 * import { assertThrows } from "jsr:@std/assert";
 *
 * // Example 1: Valid dimension 0
 * assertDimension(0); // No error
 *
 * // Example 2: Valid dimension 1
 * assertDimension(1); // No error
 *
 * // Example 3: Invalid dimension throws error
 * assertThrows(() => assertDimension(2), TypeError, "Expected dimension 0 or 1, got 2");
 * ```
 */
export default function assertDimension(
  dim: unknown,
): asserts dim is Dimension {
  if (dim !== 0 && dim !== 1) {
    throw new TypeError(`Expected dimension 0 or 1, got ${dim}`);
  }
}
