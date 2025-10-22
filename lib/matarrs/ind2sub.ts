import type { array, matrix } from "../types.d.ts";
import isarray from "../datatype/isarray.ts";
import rem from "../elemop/rem.ts";

/**
 * Converts linear index to row and column subscripts.
 *
 * Converts a linear index or array of linear indices into the equivalent row and column subscripts for a given matrix size. This allows converting a 1D index into 2D row/column positions.
 *
 * @param size Size of the matrix as [rows, columns].
 * @param index Linear index or array of indices [0...N-1].
 * @returns The corresponding row and column subscripts.
 * @throws If no arguments are provided or if inputs are invalid.
 *
 * @example Convert linear index 5 to subscripts in a 2x3 matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(ind2sub([2, 3], 5), [1, 2]);
 *
 * ```
 *
 * @example Convert multiple linear indices to subscripts
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(ind2sub([2, 3], [0, 1, 2]), [[0, 0], [1, 0], [0, 1]]);
 *
 * ```
 *
 * @example Convert linear index to subscripts in a vector (3x1 matrix)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(ind2sub([3, 1], 2), [2, 0]);
 *
 * ```
 */
export default function ind2sub(
  size: array,
  index: number | array,
): array | matrix {
  if (!Array.isArray(size)) {
    throw new Error("size must be an array representing the matrix dimensions");
  }
  if (arguments.length === 0) {
    throw new Error("Not enough input arguments");
  }

  const _ind2sub = (siz: array, idx: number): array => {
    const row = rem(idx, siz[0]) as number;
    const col = (idx - row) / siz[0];
    return [row, col];
  };

  if (isarray(index)) {
    return (index as array).map((idx: number) => _ind2sub(size, idx));
  }

  return _ind2sub(size, index as number);
}
