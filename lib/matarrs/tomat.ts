import type { array, matrix } from "../types.d.ts";

import isnumber from "../datatype/isnumber.ts";
import islogical from "../datatype/islogical.ts";
import isarray from "../datatype/isarray.ts";
import ismatrix from "../datatype/ismatrix.ts";

/**
 * Converts a number, boolean, or array into a matrix.
 *
 * If input is a number or boolean, it is converted into a 1x1 matrix.
 *              If input is a vector, it is converted into a single-row matrix.
 *              If input is already a matrix, it remains unchanged.
 *
 * @param x The input value.
 * @returns A matrix representation of the input.
 * @throws If the input is invalid.
 *
 * @example Convert a number to a matrix
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertEquals(tomat(5), [[5]]);
 *
 * ```
 *
 * @example Convert a boolean to a matrix
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertEquals(tomat(true), [[true]]);
 *
 * ```
 *
 * @example Convert a row vector to a matrix
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertEquals(tomat([5, 6, 3]), [[5, 6, 3]]);
 *
 * ```
 *
 * @example Convert an already formatted matrix
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertEquals(tomat([[1, 2], [3, 4]]), [[1, 2], [3, 4]]);
 *
 * ```
 */
export default function tomat(
  x: number | boolean | array | matrix,
): matrix<number | boolean> | matrix {
  if (isnumber(x) || islogical(x)) {
    return [[x as number | boolean]] as matrix<number | boolean>;
  }

  if (isarray(x)) {
    return [x] as matrix;
  }

  if (ismatrix(x)) {
    return x;
  }

  throw new Error("Invalid input argument.");
}
