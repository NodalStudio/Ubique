import assert from 'assert';

/** @import { array } from '../types.ts' */

/**
 * @function strfind
 * @summary Finds all occurrences of a substring within a string.
 * @description Returns an array of indices where the search pattern is found within the string. If the pattern's length is greater than the string's length, or if the inputs are invalid, an error is thrown.
 *
 * @param {string} str The string to be searched.
 * @param {string} pattern The search pattern.
 * @returns {array} An array of indices where the pattern occurs in the string.
 *
 * @throws {Error} If the input arguments are invalid or the pattern is longer than the string.
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
export function strfind(str, pattern) {
  if (typeof str !== 'string' || typeof pattern !== 'string') {
    throw new Error('Both arguments must be strings');
  }

  if (pattern.length > str.length) {
    return null;
  }

  return Array.from(str.matchAll(new RegExp(pattern, 'g')), match => match.index);
}
