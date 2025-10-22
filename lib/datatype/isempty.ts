import { isarray, ismatrix } from "../../index.ts";
import type { array, matrix } from "../types.d.ts";

/**
 * Checks if an array or matrix is empty.
 *
 * Returns `true` if the input is an empty array or an empty matrix.
 *
 * @param x The input array or matrix to check.
 * @returns Returns `true` if `x` is empty, otherwise `false`.
 *
 * @example An empty array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(isempty([]), true);
 *
 * ```
 *
 * @example A 2D array with an empty first row (considered empty matrix)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(isempty([[]]), true);
 *
 * ```
 *
 * @example A non-empty 1D array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(isempty([1, 2, 3]), false);
 *
 * ```
 *
 * @example A non-empty 2D array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(isempty([[1, 2], [3, 4]]), false);
 *
 * ```
 *
 * @example A non-array input
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(isempty(123), false);
 * ```
 */
export default function isempty(x: unknown): boolean {
  return (isarray(x) && (x as array).length === 0) ||
    (ismatrix(x) && (x as matrix)[0].length === 0);
}
