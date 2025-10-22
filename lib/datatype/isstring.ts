/**
 * Checks if the input is a string.
 *
 * Returns `true` if the input is of type string, otherwise returns `false`.
 *
 * @param x The element to check.
 * @returns Returns `true` if `x` is a string, otherwise `false`.
 *
 * @example Input is a string
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(isstring('test'), true);
 *
 * ```
 *
 * @example Input is a number
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(isstring(123), false);
 *
 * ```
 *
 * @example Input is an object
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(isstring({ key: 'value' }), false);
 * ```
 */
export default function isstring(x: unknown): x is string {
  return typeof x === "string";
}
