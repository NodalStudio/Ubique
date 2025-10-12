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
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Basic usage with multiple occurrences
 * assertEquals(strfind('find indices in the string', 'in'), [1, 5, 13, 23]);
 *
 * // Example 2: Pattern appears only once
 * assertEquals(strfind('hello world', 'world'), [6]);
 *
 * // Example 3: Pattern does not appear
 * assertEquals(strfind('hello world', 'notfound'), []);
 *
 * // Example 4: Pattern is longer than the string
 * assertEquals(strfind('short', 'longpattern'), []);
 * ``` */
export default function strfind(str: string, pattern: string): array {
  if (pattern.length > str.length) {
    return [];
  }

  return Array.from(
    str.matchAll(new RegExp(pattern, "g")),
    (match) => match.index,
  );
}
