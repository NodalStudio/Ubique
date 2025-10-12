import isnumber from "./isnumber.ts";

/**
 * @function assertNumber
 * @summary Asserts that a value is a number
 * @description Throws a TypeError if the input is not a number. Uses TypeScript's type assertion to narrow the type.
 *
 * @param x The value to check
 * @throws If x is not a number
 *
 * @example
 * ```ts
 * import { assertThrows } from "jsr:@std/assert";
 *
 * // Example 1: Valid number
 * assertNumber(5); // No error
 *
 * // Example 2: Invalid input throws error
 * assertThrows(() => assertNumber("5"), TypeError, "Expected number, got string");
 *
 * // Example 3: NaN is a valid number
 * assertNumber(NaN); // No error
 * ```
 */
export default function assertNumber(x: unknown): asserts x is number {
  if (!isnumber(x)) {
    throw new TypeError(`Expected number, got ${typeof x}`);
  }
}
