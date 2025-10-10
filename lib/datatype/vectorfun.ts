import type { array, matrix } from "../types.d.ts";

import {
  getcol,
  getrow,
  isarray,
  isempty,
  ismatrix,
  ncols,
  nrows,
} from "../../index.ts";

/**
 * @function vectorfun
 * @summary Applies a function to each vector column or row of a matrix.
 * @description This function applies a given function to each vector (column or row) of a matrix based on the specified dimension.
 * For arrays: applies function directly and returns the result.
 * For matrices: applies function to each row/column and returns array of results.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Apply function along rows of a matrix
 * const mean = (a: number[]): number => a.reduce((sum, num) => sum + num, 0) / a.length;
 * assertEquals(vectorfun(0, [[5, 6, 5], [7, 8, -1]], mean), [5.333333333333333, 4.666666666666667]);
 *
 * // Example 2: Apply function along columns of a matrix
 * assertEquals(vectorfun(1, [[5, 6, 5], [7, 8, -1]], mean), [6, 7, 2]);
 *
 * // Example 3: Applying function on a single array
 * const sum = (arr: number[]): number => arr.reduce((sum, num) => sum + num, 0);
 * assertEquals(vectorfun(0, [1, 2, 3, 4], sum), 10);
 *
 * // Example 4: Apply function without additional arguments
 * const max = (arr: number[]): number => Math.max(...arr);
 * assertEquals(vectorfun(0, [[1, 3, 5], [2, 4, 6]], max), [5, 6]);
 *
 * // Example 5: Apply function on an empty array
 * const result = vectorfun(0, [] as number[], max);
 * assertEquals(result, []);
 * ```
 */

// Overloads for union types (most common pattern)
export default function vectorfun<T>(
  dim: 0 | 1,
  x: array | matrix,
  fun: (vector: array) => T,
): T | T[];

export default function vectorfun<T, A1>(
  dim: 0 | 1,
  x: array | matrix,
  fun: (vector: array, arg1: A1) => T,
  arg1: A1,
): T | T[];

export default function vectorfun<T, A1, A2>(
  dim: 0 | 1,
  x: array | matrix,
  fun: (vector: array, arg1: A1, arg2: A2) => T,
  arg1: A1,
  arg2: A2,
): T | T[];

export default function vectorfun<T, A1, A2, A3>(
  dim: 0 | 1,
  x: array | matrix,
  fun: (vector: array, arg1: A1, arg2: A2, arg3: A3) => T,
  arg1: A1,
  arg2: A2,
  arg3: A3,
): T | T[];

// General implementation
export default function vectorfun<T>(
  dim: 0 | 1,
  x: array | matrix,
  fun: (vector: array, ...args: unknown[]) => T,
  ...varargin: unknown[]
): T | T[] {
  if (isempty(x)) {
    return [] as T[];
  }

  // Handle array case: apply function directly
  if (isarray(x) && !ismatrix(x)) {
    return fun(x, ...varargin);
  }

  // Handle matrix case: apply function to each row/column
  if (ismatrix(x)) {
    const results: T[] = [];
    let ndim: number;
    let narray: (x: matrix, idx: number) => array;

    if (dim === 1) {
      ndim = ncols(x);
      narray = getcol;
    } else {
      ndim = nrows(x);
      narray = getrow;
    }

    for (let i = 0; i < ndim; i++) {
      const d = narray(x, i);
      results.push(fun(d, ...varargin));
    }

    return results;
  }

  // Should never reach here with proper typing
  throw new Error("Invalid input type");
}
