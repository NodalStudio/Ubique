import type { matrix } from "../types.d.ts";
import ismatrix from "./ismatrix.ts";

/**
 * Asserts that a value is a 2D matrix.
 *
 * Throws a TypeError if the input is not a 2D matrix. Uses TypeScript's type assertion to narrow the type.
 *
 * @param x The value to check
 * @throws If x is not a 2D matrix
 *
 * @example
 * ```ts
 * import { assertThrows } from "jsr:@std/assert";
 *
 * // Example 1: Valid matrix
 * assertmatrixx([[1, 2], [3, 4]]); // No error
 *
 * // Example 2: Invalid input throws error
 * assertThrows(() => assertmatrixx([1, 2, 3]), TypeError, "Expected matrix");
 *
 * // Example 3: Number throws error
 * assertThrows(() => assertmatrixx(5), TypeError, "Expected matrix");
 * ```
 */
export default function assertmatrixx(x: unknown): asserts x is matrix {
  if (!ismatrix(x)) {
    throw new TypeError(`Expected matrix, got ${typeof x}`);
  }
}
