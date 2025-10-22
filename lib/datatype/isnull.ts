/**
 * True for null values.
 *
 * Returns `true` if the input is `null`, otherwise `false`.
 *
 * @param x The element to check.
 * @returns Returns `true` if `x` is `null`.
 *
 * @example Input is `null`
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(isnull(null), true);
 *
 * ```
 *
 * @example Input is `undefined`
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(isnull(undefined), false);
 *
 * ```
 *
 * @example Input is a number (not `null`)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(isnull(0), false);
 *
 * ```
 *
 * @example Input is an empty string (not `null`)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(isnull(''), false);
 *
 * ```
 */
export default function isnull(x: unknown): boolean {
  return x === null;
}
