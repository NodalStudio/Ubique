/**
 * Checks if the input is a square matrix.
 *
 * Returns `true` if the input matrix has the same number of rows and columns, otherwise returns `false`.
 *
 * @param x The input matrix to check.
 * @returns Returns `true` if `x` is a square matrix, otherwise `false`.

 * @throws Throws an error if no arguments are provided or if the input is not a valid matrix.
 *
 * @example Valid square matrix
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertEquals(issquare([[9, 5], [6, 1]]), true);
 *
 * ```
 *
 * @example Non-square matrix (more rows than columns)
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertEquals(issquare([[9, 5], [6, 1], [7, 8]]), false);
 *
 * ```
 *
 * @example Non-square matrix (more columns than rows)
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertEquals(issquare([[9, 5, 3], [6, 1, 7]]), false);
 *
 * ```
 *
 * @example Single element (1x1 matrix)
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertEquals(issquare([[9]]), true);
 *
 * ```
 *
 * @example Empty matrix (should throw an error)
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertThrows(() => { issquare([]) }, Error);
 *
 * ```
 *
 * @example Invalid input (not a matrix)
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertThrows(() => { issquare(123) }, Error);
 *
 * ```
 */
export default function issquare(x: unknown): boolean {
  if (!x) {
    throw new Error("Not enough input arguments");
  }

  if (!Array.isArray(x) || x.length === 0 || !Array.isArray(x[0])) {
    throw new Error("Input must be a non-empty matrix (array of arrays)");
  }

  const nrows = x.length;
  const ncols = x[0].length;

  if (!x.every((row) => Array.isArray(row) && row.length === ncols)) {
    return false;
  }

  return nrows === ncols;
}
