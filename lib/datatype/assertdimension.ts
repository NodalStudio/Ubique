import type { Dimension } from "../types.d.ts";

/**
 * Asserts that a value is a valid dimension (0 or 1).
 *
 * Throws a TypeError if the input is not 0 or 1. Uses TypeScript's type assertion to narrow the type.
 *
 * @param dim The value to check
 * @throws If dim is not 0 or 1
 *
 * @example
 * ```ts
 * import { assertThrows } from "jsr:@std/assert";
 *
 * // Example 1: Valid dimension 0
 * assertdimension(0); // No error
 *
 * // Example 2: Valid dimension 1
 * assertdimension(1); // No error
 *
 * // Example 3: Invalid dimension throws error
 * assertThrows(() => assertdimension(2), TypeError, "Expected dimension 0 or 1, got 2");
 * ```
 */
export default function assertdimension(
  dim: unknown,
): asserts dim is Dimension {
  if (dim !== 0 && dim !== 1) {
    throw new TypeError(`Expected dimension 0 or 1, got ${dim}`);
  }
}
