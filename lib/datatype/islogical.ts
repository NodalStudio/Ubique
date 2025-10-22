/**
 * Checks if the input is a boolean.
 *
 * Returns `true` if the input is of type `boolean`.
 *
 * @param x - The input to check.
 * @returns Returns `true` if `x` is a boolean.
 *
 * @throws Throws an error if no argument is provided.
 *
 * @example Boolean true
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(islogical(true), true);
 *
 * ```
 *
 * @example Boolean false
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(islogical(false), true);
 *
 * ```
 *
 * @example Not a boolean (number)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(islogical(1), false);
 *
 * ```
 *
 * @example Not a boolean (string)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(islogical("true"), false);
 *
 * ```
 */
export default function islogical(x: unknown): x is boolean {
  return typeof x === "boolean";
}
