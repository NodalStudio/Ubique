import type { array } from "../types.d.ts";

/**
 * Checks if the input is a 1D array.
 *
 * Returns `true` if the input is a 1D array (not a 2D array/matrix).
 *
 * @param x The input to check.
 * @returns Returns `true` if `x` is a 1D array, otherwise `false`.
 *
 * @example A valid 1D array of numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(isarray([1.4, 2.3, 3]), true);
 *
 * ```
 *
 * @example An array with mixed types (still an array)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(isarray([1, "a", {}]), true);
 *
 * ```
 *
 * @example An empty array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(isarray([]), true);
 *
 * ```
 *
 * @example Not an array (single number)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(isarray(123), false);
 *
 * ```
 *
 * @example A 2D array (array of arrays)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(isarray([[1], [2], [3]]), false);
 * ```
 */
// deno-lint-ignore no-explicit-any
export default function isarray(x: unknown): x is array<any> {
  return Array.isArray(x) && x.every((el) => !Array.isArray(el));
}
