/**
 * @function issquare
 * @summary Checks if the input is a square matrix.
 * @description Returns `true` if the input matrix has the same number of rows and columns, otherwise returns `false`.
 *
 * @param {any} x - The input matrix to check.
 * @returns {boolean} - Returns `true` if `x` is a square matrix, otherwise `false`.
 *
 * @throws {Error} - Throws an error if no arguments are provided or if the input is not a valid matrix.
 *
 * @example
 * // Example 1: Valid square matrix
 * assert.strictEqual(issquare([[9, 5], [6, 1]]), true);
 *
 * // Example 2: Non-square matrix (more rows than columns)
 * assert.strictEqual(issquare([[9, 5], [6, 1], [7, 8]]), false);
 *
 * // Example 3: Non-square matrix (more columns than rows)
 * assert.strictEqual(issquare([[9, 5, 3], [6, 1, 7]]), false);
 *
 * // Example 4: Single element (1x1 matrix)
 * assert.strictEqual(issquare([[9]]), true);
 *
 * // Example 5: Empty matrix (should throw an error)
 * assert.throws(() => { issquare([]) }, Error);
 *
 * // Example 6: Invalid input (not a matrix)
 * assert.throws(() => { issquare(123) }, Error);
 */
export function issquare(x: any): boolean;
