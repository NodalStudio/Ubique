import type { matrix } from "../types.d.ts";
import ismatrix from "./ismatrix.ts";

/**
 * Asserts that a value is a 2D matrix.
 *
 * Throws a TypeError if the input is not a 2D matrix. Uses TypeScript's type assertion to narrow the type.
 *
 * @param x The value to check
 * @throws If x is not a 2D matrix
 *
 * @example Valid matrix
 * ```ts
 * import { assertThrows } from "jsr:@std/assert";
 *
 * assertmatrix([[1, 2], [3, 4]]); // No error
 *
 * ```
 *
 * @example Invalid input throws error
 * ```ts
 * import { assertThrows } from "jsr:@std/assert";
 *
 * assertThrows(() => assertmatrix([1, 2, 3]), TypeError, "Expected matrix");
 *
 * ```
 *
 * @example Number throws error
 * ```ts
 * import { assertThrows } from "jsr:@std/assert";
 *
 * assertThrows(() => assertmatrix(5), TypeError, "Expected matrix");
 * ```
 */
export default function assertmatrix(x: unknown): asserts x is matrix {
  if (!ismatrix(x)) {
    throw new TypeError(`Expected matrix, got ${typeof x}`);
  }
}
