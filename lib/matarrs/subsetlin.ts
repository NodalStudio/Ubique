import type { array, matrix } from "../types.d.ts";

import flatten from "./flatten.ts";
import squeeze from "./squeeze.ts";
import arrayfun from "../datatype/arrayfun.ts";

/**
 * Extracts elements from an array or matrix based on linear indexing.
 *
 * Extracts a subset of an array or matrix using linear indexing, either row-wise (default) or column-wise.
 *
 * @param m The array or matrix of elements.
 * @param idx Linear indexing values.
 * @param flag Flag (0: row-wise, 1: column-wise). Defaults to 0.
 * @returns The subset of `m` based on `idx`.
 * @throws If input arguments are missing.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const a = [[5,6,5],[7,8,-1]];
 * const c = [5,6,3];
 * ```
 *
 * @example Extract a single element
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const a = [[5,6,5],[7,8,-1]];
 *
 * assertEquals(subsetlin(a, 1), [6]);
 *
 * ```
 *
 * @example Subset by rows
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const a = [[5,6,5],[7,8,-1]];
 *
 * assertEquals(subsetlin(a, [0,1,2,3]), [5, 6, 5, 7]);
 *
 * ```
 *
 * @example Subset by columns
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const a = [[5,6,5],[7,8,-1]];
 *
 * assertEquals(subsetlin(a, [0,1,2,3], 1), [5, 7, 6, 8]);
 *
 * ```
 *
 * @example Extract a 2D subset (column-wise)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const a = [[5,6,5],[7,8,-1]];
 *
 * assertEquals(subsetlin(a, [[0,1,2], [2,3,4]], 1), [[5, 7, 6], [6, 8, 5]]);
 *
 * ```
 *
 * @example Subset a vector
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const c = [5,6,3];
 *
 * assertEquals(subsetlin(c, [0,1]), [5, 6]);
 *
 * ```
 *
 * @example Extract a 2D subset from a vector
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const c = [5,6,3];
 *
 * assertEquals(subsetlin(c, [[0,1], [1,2]]), [[5, 6], [6, 3]]);
 *
 * ```
 */
export default function subsetlin(
  m: array,
  idx: number | array | matrix,
  flag?: 0 | 1,
): array | matrix;
export default function subsetlin(
  m: matrix,
  idx: number | array | matrix,
  flag?: 0 | 1,
): array | matrix;
export default function subsetlin(
  m: unknown,
  idx: unknown,
  flag: 0 | 1 = 0,
): unknown {
  const flatM = flatten(m as array | matrix, flag);
  const indices: number[] = Array.isArray(idx) ? idx : [idx as number];

  if (!Array.isArray(flatM)) {
    throw new Error("Input cannot be flattened to an array.");
  }
  return squeeze(arrayfun(indices, (val: number) => flatM[val]));
}
