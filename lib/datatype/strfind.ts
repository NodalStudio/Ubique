import type { array } from "../types.d.ts";

/**
 * Finds all occurrences of a substring within a string.
 *
 * Returns an array of indices where the search pattern is found within the string. If the pattern's length is greater than the string's length, or if the inputs are invalid, an error is thrown.
 *
 * @param str The string to be searched.
 * @param pattern The search pattern.
 * @returns An array of indices where the pattern occurs in the string.
 *
 * @throws If the input arguments are invalid or the pattern is longer than the string.
 *
 * @example Basic usage with multiple occurrences
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(strfind('find indices in the string', 'in'), [1, 5, 13, 23]);
 *
 * ```
 *
 * @example Pattern appears only once
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(strfind('hello world', 'world'), [6]);
 *
 * ```
 *
 * @example Pattern does not appear
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(strfind('hello world', 'notfound'), []);
 *
 * ```
 *
 * @example Pattern is longer than the string
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(strfind('short', 'longpattern'), []);
 * ```
 */
export default function strfind(str: string, pattern: string): array {
  if (pattern.length > str.length) {
    return [];
  }

  return Array.from(
    str.matchAll(new RegExp(pattern, "g")),
    (match) => match.index,
  );
}
