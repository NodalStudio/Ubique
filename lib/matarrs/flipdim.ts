import type { array, matrix } from "../types.d.ts";

import isnumber from "../datatype/isnumber.ts";
import isarray from "../datatype/isarray.ts";
import ismatrix from "../datatype/ismatrix.ts";
import clone from "./clone.ts";
import vectorfun from "../datatype/vectorfun.ts";

/**
 * @function flipdim
 * @summary Flip the order of elements in an array or matrix.
 * @description Flips the order of elements in an array or matrix along a specified dimension. Default dimension is 1 (columns).
 *
 * @param x The array or matrix to flip.
 * @param dim The dimension to apply the flip (0 = rows, 1 = columns). Defaults to 1.
 * @returns The array or matrix with flipped elements.
 * @throws If no input is provided.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Flip a 1D array (dim = 1)
 * assertEquals(flipdim([5, 6, 3], 1), [3, 6, 5]);
 *
 * // Example 2: Flip a 1D array with no dimension specified (no change)
 * assertEquals(flipdim([5, 6, 3], 0), [5, 6, 3]);
 *
 * // Example 3: Flip a 2D matrix along columns (dim = 1)
 * assertEquals(flipdim([[5, 6, 5], [7, 8, -1]]), [[5, 6, 5], [-1, 8, 7]]);
 *
 * // Example 4: Flip a 2D matrix along rows (dim = 0)
 * assertEquals(flipdim([[5, 6, 5], [7, 8, -1]], 0), [[7, 5], [8, 6], [-1, 5]]);

 * ```*/
export default function flipdim(
  x: number | array | matrix,
  dim: number = 1,
): number | array | matrix {
  if (!x) {
    throw new Error("Not enough input arguments");
  }

  const flipArray = (arr: array) => clone(arr.reverse());

  if (isnumber(x)) {
    return x;
  }

  if (isarray(x)) {
    const arr = x as array;
    return dim === 1 ? flipArray(arr) : arr;
  }

  if (ismatrix(x)) {
    return vectorfun((1 - dim) as 0 | 1, x, flipArray as (arr: array) => array);
  }

  throw new Error("Unknown input arguments");
}
