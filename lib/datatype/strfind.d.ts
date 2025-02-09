import { array } from '../types';

/**
 * @function strfind
 * @summary Finds all occurrences of a substring within a string.
 * @description Returns an array of indices where the search pattern is found within the string. If the pattern's length is greater than the string's length, or if the inputs are invalid, an error is thrown.
 *
 * @param str The string to be searched.
 * @param pattern The search pattern.
 * @returns An array of indices where the pattern occurs in the string.
 *
 * @throws If the input arguments are invalid or the pattern is longer than the string.
 *
 * @example
 * // Example 1: Basic usage with multiple occurrences
 * assert.deepStrictEqual(strfind('find indices in the string', 'in'), [1, 5, 13, 23]);
 *
 * // Example 2: Pattern appears only once
 * assert.deepStrictEqual(strfind('hello world', 'world'), [6]);
 *
 * // Example 3: Pattern does not appear
 * assert.deepStrictEqual(strfind('hello world', 'notfound'), []);
 *
 * // Example 4: Pattern is longer than the string
 * assert.strictEqual(strfind('short', 'longpattern'), null);
 *
 * // Example 5: Invalid input (non-string arguments)
 * try {
 *   strfind(123, '12');
 * } catch (e) {
 *   assert.strictEqual(e.message, 'Both arguments must be strings');
 * }
 */
export function strfind(str: string, pattern: string): array;
