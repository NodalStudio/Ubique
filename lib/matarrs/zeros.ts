import type { array, matrix } from "../types.d.ts";

import isarray from "../datatype/isarray.ts";

/**
 * @function zeros
 * @summary Create an array or matrix of all zeros.
 * @description Creates an array or matrix filled with zeros based on the specified dimensions. If no arguments are provided, it defaults to a 1x1 matrix.
 *
 * @param nrowsOrDims The number of rows or an array specifying both dimensions. Defaults to 1.
 * @param ncols The number of columns (optional if the first argument is an array). Defaults to 1.
 * @returns A matrix of zeros with the specified dimensions.
 * @throws If invalid input arguments are provided.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Create a 1x1 matrix of zeros (default behavior)
 * assertEquals(zeros(), [[0]]);
 *
 * // Example 2: Create a 2x2 square matrix of zeros
 * assertEquals(zeros(2, 2), [[0, 0], [0, 0]]);
 *
 * // Example 3: Create a 2x3 matrix of zeros
 * assertEquals(zeros(2, 3), [[0, 0, 0], [0, 0, 0]]);
 *
 * // Example 4: Create a 2x1 matrix of zeros using array input
 * assertEquals(zeros([2, 1]), [[0], [0]]);

 * ```*/
export default function zeros(): matrix;
export default function zeros(n: number): matrix;
export default function zeros(dims: array): matrix;
export default function zeros(nrows: number, ncols: number): matrix;
export default function zeros(nrowsOrDims?: unknown, ncols?: unknown): matrix {
  const dimensions = isarray(nrowsOrDims)
    ? (nrowsOrDims as array)
    : [nrowsOrDims ?? 1];

  const [nrows] = dimensions;
  const cols = ncols ?? dimensions[1] ?? nrows;

  return Array.from(
    { length: nrows as number },
    (): number[] => Array.from({ length: cols as number }, (): number => 0),
  );
}
