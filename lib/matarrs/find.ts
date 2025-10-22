import type { array, matrix } from "../types.d.ts";
import ismatrix from "../datatype/ismatrix.ts";
import flatten from "./flatten.ts";

/**
 * Finds the indices of nonzero (true) elements in an array or matrix.
 *
 * Given an input array or matrix, returns the indices of elements that are `true`. For a matrix, the indices are flattened row-wise.
 *
 * @param x Input array or matrix.
 * @returns An array of indices where the values are `true`.
 * @throws If no arguments are provided or if the input is not an array or matrix.
 *
 * @example Find indices of true elements in a 1D array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * find([0.3, -0.4, 0.5, 0.9].map(a => a > 0)); // [0, 2, 3]
 *
 * ```
 *
 * @example Find indices of true elements in a 2D matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * find([[true, true], [false, true]]); // [0, 1, 3]
 *
 * ```
 *
 * @example Empty input
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * find([]); // []
 *
 * ```
 *
 * @example No true elements
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * find([false, false, false]); // []
 *
 * ```
 *
 * @example All true elements
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * find([true, true, true]); // [0, 1, 2]
 * ```
 */
export default function find(
  x: array<boolean | number> | matrix<boolean | number>,
): array {
  const flatX = (ismatrix(x) ? flatten(x) : x) as array<boolean | number>;
  const indices: number[] = [];

  flatX.forEach((el: boolean | number, idx: number) => {
    if (el === true || el) {
      indices.push(idx);
    }
  });

  return indices;
}
