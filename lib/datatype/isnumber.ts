/**
 * True for number.
 *
 * Returns `true` if the input is a number or `NaN`, otherwise `false`.
 *
 * @param x The element to check.
 * @returns Returns `true` if `x` is a number or `NaN`.
 *
 * @example Input is a number
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(isnumber(5), true);
 *
 * ```
 *
 * @example Input is `NaN`
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(isnumber(NaN), true);
 *
 * ```
 *
 * @example Input is a string representing a number (not a number)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(isnumber('5'), false);
 *
 * ```
 *
 * @example Input is `undefined`
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(isnumber(undefined), false);
 *
 * ```
 *
 * @example Input is `null`
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(isnumber(null), false);
 *
 * ```
 */
export default function isnumber(x: unknown): x is number {
  return typeof x === "number";
}
