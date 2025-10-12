import type { array, matrix, numarraymatrix } from "../types.d.ts";

import isnumber from "../datatype/isnumber.ts";
import isarray from "../datatype/isarray.ts";
import ismatrix from "../datatype/ismatrix.ts";

/**
 * Create a clone of the input array or matrix.
 *
 * Creates a deep copy of the input array or matrix. If the input is a number, it simply returns that number.
 *
 * @param x Array or matrix to clone.
 * @returns A deep copy of the input array or matrix.
 * @throws If no input is provided.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Clone a matrix
 * assertEquals(clone([[-1, 3, -1], [4, 5, 9]]), [[-1, 3, -1], [4, 5, 9]]);
 *
 * // Example 2: Clone an array
 * assertEquals(clone([5, 6, 3]), [5, 6, 3]);
 *
 * // Example 3: Clone a single number
 * assertEquals(clone(5), 5);

 * ```*/
export default function clone<T extends numarraymatrix>(x: T): T {
  if (isnumber(x)) {
    return x;
  }

  if (isarray(x)) {
    return [...x] as T;
  }

  if (ismatrix(x)) {
    return (x as matrix).map((row: array) => [...row]) as T;
  }

  throw new Error("unsupported input type");
}
