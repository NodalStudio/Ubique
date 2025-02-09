/**
 * @function randchar
 * @summary Generates a random alphanumeric string.
 * @description Generates a random string of specified length using the provided character set. If no character set is provided, the default set includes uppercase and lowercase letters and digits.
 *
 * @param {number} [n=6] The number of characters to generate. Defaults to 6 if not provided.
 * @param {string} [strset='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'] The character set to use for generating the random string.
 * @returns {string} A randomly generated string of length `n`.
 *
 * @example
 * // Example 1: Generate a random string of 12 characters from a custom set
 * const result1 = randchar(12, 'ABCD!-|/%&$1234567890');
 * assert.strictEqual(result1.length, 12);
 * assert.ok(/^[ABCD!\-|/%&$1234567890]+$/.test(result1));
 *
 * // Example 2: Generate a random string of 16 characters from a different custom set
 * const result2 = randchar(16, 'ABCDEFGHILMNOPQRSTUVZ-1234567890');
 * assert.strictEqual(result2.length, 16);
 * assert.ok(/^[ABCDEFGHILMNOPQRSTUVZ\-1234567890]+$/.test(result2));
 *
 * // Example 3: Generate a random string of 8 characters using the default set
 * const result3 = randchar(8);
 * assert.strictEqual(result3.length, 8);
 * assert.ok(/^[A-Za-z0-9]+$/.test(result3));
 */
export default function randchar(
  n = 6,
  strset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
) {
  return [...Array(n)].map(() =>
    strset[Math.floor(Math.random() * strset.length)]
  ).join("");
}
