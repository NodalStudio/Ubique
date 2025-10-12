import type { array } from "../types.d.ts";
import isarray from "./isarray.ts";

/**
 * Asserts that a value is a 1D array.
 *
 * Throws a TypeError if the input is not a 1D array. Uses TypeScript's type assertion to narrow the type.
 *
 * @param x The value to check
 * @throws If x is not a 1D array
 *
 * @example
 * ```ts
 * import { assertThrows } from "jsr:@std/assert";
 *
 * // Example 1: Valid array
 * assertarray([1, 2, 3]); // No error
 *
 * // Example 2: Invalid input throws error
 * assertThrows(() => assertarray(5), TypeError, "Expected array");
 *
 * // Example 3: Matrix (2D array) throws error
 * assertThrows(() => assertarray([[1, 2], [3, 4]]), TypeError, "Expected array");
 * ```
 */
export default function assertarray(x: unknown): asserts x is array {
  if (!isarray(x)) {
    throw new TypeError(`Expected array, got ${typeof x}`);
  }
}
