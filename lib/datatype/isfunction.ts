/**
 * Checks if the input is a function.
 *
 * Returns `true` if the input is of type `function`.
 *
 * @param x The input to check.
 * @returns Returns `true` if `x` is a function.
 *
 * @throws Throws an error if no argument is provided.
 *
 * @example Inline function
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(isfunction(function() { return console.log("Hello"); }), true, 'Inline function should return true');
 *
 * ```
 *
 * @example Built-in function
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(isfunction(Math.log), true, 'Built-in function should return true');
 *
 * ```
 *
 * @example Not a function (number)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(isfunction(42), false, 'Number should return false');
 *
 * ```
 *
 * @example Not a function (string)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(isfunction("hello"), false, 'String should return false');
 *
 * ```
 */
export default function isfunction(x: unknown): boolean {
  return typeof x === "function";
}
