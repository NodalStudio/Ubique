import type { array, matrix } from "../types.d.ts";

import isnumber from "../datatype/isnumber.ts";
import isarray from "../datatype/isarray.ts";
import ismatrix from "../datatype/ismatrix.ts";
import nrows from "../matarrs/nrows.ts";
import ncols from "../matarrs/ncols.ts";
import clone from "../matarrs/clone.ts";

/**
 * Concatenates arrays and matrices along the specified dimension.
 *
 * Concatenates arrays and matrices along the specified dimension. Supports vertical (0) and horizontal (1) concatenation.
 *
 * @param dim The dimension along which to concatenate (0: rows, 1: columns)
 * @param args Variable arguments to concatenate
 * @returns The concatenated array or matrix
 * @throws If not enough input arguments are provided or if dimensions do not match for concatenation
 *
 * @example Vertical Concatenation (dim = 0) with numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cat(0, 1, 2, 3, 4), [[1], [2], [3], [4]]);
 *
 * ```
 *
 * @example Vertical Concatenation (dim = 0) with arrays
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cat(0, [5, 6, 3], [0.5, -3, 2.3]), [[5, 6, 3], [0.5, -3, 2.3]]);
 *
 * ```
 *
 * @example Vertical Concatenation (dim = 0) with matrix and array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const result3 = cat(0, [[5, 6, 5], [7, 8, -1]], [5, 6, 3]);
 * assertEquals(result3, [[5, 6, 5], [7, 8, -1], [5, 6, 3]]);
 *
 * ```
 *
 * @example Horizontal Concatenation (dim = 1) with numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cat(1, 1, 2, 3, 4), [[1, 2, 3, 4]]);
 *
 * ```
 *
 * @example Horizontal Concatenation (dim = 1) with arrays
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(cat(1, [5, 6, 3], [0.5, -3, 2.3]), [[5, 6, 3, 0.5, -3, 2.3]]);
 *
 * ```
 *
 * @example Horizontal Concatenation (dim = 1) with matrix and arrays
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const result6 = cat(1, [[2, 3, 4]], [5, 6, 3], [0.5, -3, 2.3]);
 * assertEquals(result6, [[2, 3, 4, 5, 6, 3, 0.5, -3, 2.3]]);
 * ```
 */
export default function cat(
  dim: number,
  ...args: (number | array | matrix)[]
): array | matrix {
  if (args.length === 0) {
    throw new Error("not enough input arguments");
  }
  if (dim !== 0 && dim !== 1) {
    throw new Error("dimension must be 0 (rows) or 1 (columns)");
  }

  const normalizedArgs = args.map((arg) => normalize(arg));
  return dim === 0
    ? verticalConcat(normalizedArgs)
    : horizontalConcat(normalizedArgs);
}

/**
 * Normalizes the input arguments into a 2D matrix form for easier concatenation.
 * @param arg The argument to normalize.
 * @returns The normalized 2D matrix.
 */
function normalize(arg: number | array | matrix): matrix {
  if (isnumber(arg)) {
    return [[arg]];
  }
  if (isarray(arg) && !ismatrix(arg)) {
    return [arg];
  }
  if (ismatrix(arg)) {
    return arg;
  }
  throw new TypeError(`Invalid input type: ${typeof arg}`);
}

/**
 * Concatenates matrices vertically (along rows).
 * @param args The list of matrices to concatenate vertically.
 * @returns The vertically concatenated matrix.
 */
function verticalConcat(args: matrix[]): matrix {
  const result: matrix = [];
  const numCols = ncols(args[0]);

  for (const arg of args) {
    if (ncols(arg) !== numCols) {
      throw new Error("concatenation dimension mismatch");
    }
    for (const row of arg) {
      result.push(row);
    }
  }
  return result;
}

/**
 * Concatenates matrices horizontally (along columns).
 * @param args The list of matrices to concatenate horizontally.
 * @returns The horizontally concatenated matrix.
 */
function horizontalConcat(args: matrix[]): matrix {
  const result = clone(args[0]);
  const numRows = nrows(args[0]);

  for (let i = 1; i < args.length; i++) {
    const current = args[i];
    if (nrows(current) !== numRows) {
      throw new Error("concatenation dimension mismatch");
    }
    for (let j = 0; j < numRows; j++) {
      result[j] = result[j].concat(current[j]);
    }
  }
  return result;
}
