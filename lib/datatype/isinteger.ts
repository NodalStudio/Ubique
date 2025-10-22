import { isnumber } from "../../index.ts";

/**
 * Checks if the input is an integer.
 *
 * Returns `true` if the input is a number and is an integer (i.e., has no fractional part).
 *
 * @param x The input to check.
 * @returns Returns `true` if `x` is an integer.
 *
 * @throws If the number of input arguments is not 1.
 *
 * @example An integer
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(isinteger(5), true);
 *
 * ```
 *
 * @example A non-integer number
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(isinteger(5.5), false);
 *
 * ```
 *
 * @example Not a number (string)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(isinteger("5"), false);
 *
 * ```
 *
 * @example Not a number (null)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(isinteger(null), false);
 *
 * ```
 */
export default function isinteger(x: unknown): boolean {
  return isnumber(x) && Math.round(x) === x;
}
