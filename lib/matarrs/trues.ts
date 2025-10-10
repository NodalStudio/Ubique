/** @import { array, matrix } from '../types.d.ts' */

import { array } from "../types.d.ts";

/**
 * @function trues
 * @summary Creates an array filled with `true` values.
 * @description Generates an array or matrix of all `true` values based on the input dimensions.
 *              Accepts one or two numeric arguments, or an array specifying the dimensions.
 *
 * @param {number|array|...} args Variable input arguments (max 2).
 * @returns {matrix<boolean>} A matrix filled with `true` values.
 * @throws {Error} If no arguments are provided.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Create an empty array
 * assertEquals(trues(0), []);
 *
 * // Example 2: Create a 1x1 matrix of `true`
 * assertEquals(trues(1), [[true]]);
 *
 * // Example 3: Create a 2x2 matrix of `true`
 * assertEquals(trues(2), [[true, true], [true, true]]);
 *
 * // Example 4: Create a 2x1 matrix of `true`
 * assertEquals(trues([2,1]), [[true], [true]]);
 *
 * // Example 5: Create a 2x3 matrix of `true`
 * assertEquals(trues(2,3), [[true, true, true], [true, true, true]]);

 * ```*/
export default function trues(n: number): boolean[][];
export default function trues(dims: array): boolean[][];
export default function trues(nrows: number, ncols: number): boolean[][];
export default function trues(
  nrowsOrDims: unknown,
  ncols?: unknown,
): boolean[][] {
  let rows: number;
  let cols: number;

  if (arguments.length === 1) {
    if (Array.isArray(nrowsOrDims)) {
      [rows, cols] = nrowsOrDims as number[];
    } else {
      rows = nrowsOrDims as number;
      cols = rows;
    }
  } else {
    rows = nrowsOrDims as number;
    cols = ncols as number;
  }

  if (typeof rows !== "number" || typeof cols !== "number") {
    throw new Error("Invalid dimensions");
  }

  return Array.from(
    { length: rows },
    () => Array.from({ length: cols }, () => true),
  );
}
