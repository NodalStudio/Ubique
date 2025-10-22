import type { array, matrix, numarraymatrix } from "../types.d.ts";

import cat from "./cat.ts";

/**
 * Concatenates arrays or matrices vertically.
 *
 * Combines multiple arrays or matrices by stacking them vertically.
 *
 * @param args Variable arguments (args1, args2, ...).
 * @returns The vertically concatenated matrix.
 * @throws If no arguments are provided.
 *
 * @example Concatenate two matrices
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertEquals(vertcat([[5,6,5],[7,8,-1]],[[-1,3,-1],[4,5,9]]),
 *   [[5, 6, 5], [7, 8, -1], [-1, 3, -1], [4, 5, 9]]);
 *
 * ```
 *
 * @example Concatenate single numbers
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertEquals(vertcat(5,7,9,8), [[5], [7], [9], [8]]);
 *
 * ```
 *
 * @example Concatenate row vectors
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertEquals(vertcat([1,2,3],[4,5,6]), [[1,2,3], [4,5,6]]);
 *
 * ```
 *
 * @example Concatenate column vectors
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertEquals(vertcat([[1],[2],[3]], [[4],[5],[6]]), [[1], [2], [3], [4], [5], [6]]);
 *
 * ```
 *
 * @example Invalid input (no arguments)
 * ```ts
 * import { assertEquals, assertThrows } from "jsr:@std/assert";
 *
 * assertThrows(() => vertcat(), "Not enough input arguments.");
 *
 * ```
 */
export default function vertcat(
  ...args: (numarraymatrix)[]
): array | matrix {
  return cat(0, ...args);
}
