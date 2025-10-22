/**
 * Checks if the input is a scalar value.
 *
 * Returns `true` if the input is a scalar, meaning it is either a single number, an array with one element, or a matrix with one element.
 *
 * @param x The input to check.
 * @returns Returns `true` if `x` is a scalar, otherwise `false`.
 *
 * @example Single number
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(isscalar(2), true);
 *
 * ```
 *
 * @example Array with one element
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(isscalar([2]), true);
 *
 * ```
 *
 * @example Matrix with one element
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(isscalar([[2]]), true);
 *
 * ```
 *
 * @example Array with multiple elements
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(isscalar([1, 2, 3]), false);
 *
 * ```
 *
 * @example Matrix with multiple elements
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(isscalar([[1, 2], [3, 4]]), false);
 *
 * ```
 *
 * @example Empty array (not a scalar)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(isscalar([]), false);
 *
 * ```
 *
 * @example Empty matrix (not a scalar)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(isscalar([[]]), false);
 *
 * ```
 */
export default function isscalar(x: unknown): boolean {
  if (typeof x === "number") {
    return true;
  }

  if (Array.isArray(x)) {
    if (x.length === 0) {
      return false;
    }

    if (x.length === 1 && !Array.isArray(x[0])) {
      return true;
    }

    if (x.length === 1 && Array.isArray(x[0]) && x[0].length === 1) {
      return true;
    }
  }

  return false;
}
