/**
 * Checks if the input is undefined.
 *
 * Returns `true` if the input is strictly equal to `undefined`, otherwise returns `false`.
 *
 * @param x The element to check.
 * @returns Returns `true` if `x` is `undefined`, otherwise `false`.
 *
 * @example Input is undefined
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(isundefined(undefined), true);
 *
 * ```
 *
 * @example Input is defined (null)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(isundefined(null), false);
 *
 * ```
 *
 * @example Input is defined (string)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(isundefined('test'), false);
 * ```
 */
export default function isundefined(x: unknown): x is undefined {
  return x === undefined;
}
