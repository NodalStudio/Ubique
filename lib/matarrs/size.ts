import type { array } from "../types.d.ts";

import isnull from "../datatype/isnull.ts";
import isundefined from "../datatype/isundefined.ts";
import isstring from "../datatype/isstring.ts";
import isnumber from "../datatype/isnumber.ts";
import isarray from "../datatype/isarray.ts";

/**
 * Size of an N-D array.
 *
 * Determines the size of an N-dimensional array, where a number is treated as a 1x1 array,
 * a 1-D array as 1xN, and a matrix as MxN. It handles strings by returning their length as 1xN.
 *
 * @param x The input whose size is to be determined.
 * @returns An array of dimensions representing the size of the input.
 * @throws If no input is provided or if the input type is unknown.
 *
 * @example Size of a 4D array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(size([[[[5, 6, 5], [7, 8, -1]]]]), [1, 1, 2, 3]);
 *
 * ```
 *
 * @example Size of a 2D matrix
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(size([[3, 2, 7], [4, 5, 6]]), [2, 3]);
 *
 * ```
 *
 * @example Size of a 1D array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(size([5, 4, 4]), [1, 3]);
 *
 * ```
 *
 * @example Size of a scalar
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(size(5), [1, 1]);
 *
 * ```
 *
 * @example Size of a string
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(size('ubique'), [1, 6]);
 *
 * ```
 *
 * @example Size of a 1x2 array of strings
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(size([['first', 'second']]), [1, 2]);
 *
 * ```
 *
 * @example Size of an empty array
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(size([]), [0, 0]);
 *
 * ```
 */
export default function size(x: unknown): array {
  if (isundefined(x)) {
    throw new Error("Not enough input arguments");
  }

  if (isnull(x) || isundefined(x)) {
    throw new Error("Unknown input type");
  }

  if (isstring(x)) {
    return [1, x.length];
  }

  if (isnumber(x)) {
    return [1, 1];
  }

  if (Array.isArray(x)) {
    if (isarray(x)) {
      return x.length ? [1, x.length] : [0, 0];
    }

    const dimensions = getDimensions(x);
    return dimensions;
  }

  throw new Error("Unknown input type");
}

function getDimensions(node: unknown): number[] {
  if (!Array.isArray(node)) {
    return [];
  }
  const len = node.length;
  if (len === 0) {
    return [0];
  }
  const sub = getDimensions(node[0]);
  return [len, ...sub];
}
