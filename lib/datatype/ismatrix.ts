import type { matrix } from "../types.d.ts";

/**
 * True for matrix (2D array with consistent row lengths).
 *
 * Returns `true` if the input is a 2D array (array of arrays) where all subarrays have the same length.
 *
 * @param x The input to check.
 * @returns Returns `true` if `x` is a valid matrix.
 *
 * @example Valid matrix with one row
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(ismatrix([[1, 3, 4]]), true);
 *
 * ```
 *
 * @example Valid matrix with multiple rows
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(ismatrix([[1], [3], [4]]), true);
 *
 * ```
 *
 * @example Invalid matrix due to varying row lengths
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(ismatrix([[1, 2], [3, 4, 5]]), false);
 *
 * ```
 *
 * @example Valid matrix with mixed element types
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(ismatrix([[1, 2], [3, '4']]), true);
 *
 * ```
 *
 * @example Empty array (not a matrix)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(ismatrix([]), false);
 *
 * ```
 *
 * @example Empty matrix with one empty row
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(ismatrix([[]]), true);
 * ```
 */
export default function ismatrix(x: unknown): x is matrix {
  return (
    Array.isArray(x) &&
    x.length > 0 &&
    x.every((row) => Array.isArray(row) && row.length === x[0].length)
  );
}
