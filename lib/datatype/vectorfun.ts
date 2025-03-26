import type { array, matrix } from "../types.d.ts";

import {
  getcol,
  getrow,
  isarray,
  isempty,
  ismatrix,
  ncols,
  nrows,
  squeeze,
  transpose,
} from "../../index.ts";

/**
 * Return type of vectorfun based on input type
 * - For array input: returns array
 * - For matrix input: returns matrix
 */
type VectorFunReturnType<X> = X extends matrix ? matrix
  : X extends array ? array
  : never;

/**
 * @function vectorfun
 * @summary Applies a function to each vector column or row of a matrix.
 * @description This function applies a given function to each vector (column or row) of a matrix based on the specified dimension.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Apply function along rows of a matrix
 * const testfun = (a: number[], b: number, c: number): number => a.reduce((sum: number, num: number) => sum + num, 0) / a.length * b + c;
 * assertEquals(vectorfun(0, [[5, 6, 5], [7, 8, -1]], testfun, 5, 10), [36.666666666666664, 33.333333333333336]);
 *
 * // Example 2: Apply function along columns of a matrix
 * assertEquals(vectorfun(1, [[5, 6, 5], [7, 8, -1]], testfun, 5, 10), [[40], [45], [20]]);
 *
 * // Example 3: Applying function on a single array
 * const sumArray = (arr: number[]): number => arr.reduce((sum, num) => sum + num, 0);
 * assertEquals(vectorfun(0, [1, 2, 3, 4], sumArray), 10);
 *
 * // Example 4: Apply function without additional arguments
 * const maxVal = (arr: number[]): number => Math.max(...arr);
 * assertEquals(vectorfun(0, [[1, 3, 5], [2, 4, 6]], maxVal), [5, 6]);
 *
 * // Example 5: Apply function on an empty matrix
 * assertEquals(vectorfun(0, [], maxVal), []);
 *
 * // Example 6: Apply function with varying number of additional arguments
 * const multiplyAndAdd = (arr: number[], factor: number, addend: number): number => arr.reduce((sum, num) => sum + num * factor, 0) + addend;
 * assertEquals(vectorfun(0, [[1, 2, 3], [4, 5, 6]], multiplyAndAdd, 2, 10), [22, 40]);
 *
 * // Example 7: Apply function on a non-numeric matrix
 * const concatStrings = (arr: string[]): string => arr.join("-");
 * assertEquals(vectorfun(0, [["a", "b"], ["c", "d"]], concatStrings), ["a-b", "c-d"]);
 *
 * // Example 8: Apply function on a column-wise basis with different data types
 * assertEquals(vectorfun(1, [["apple", "banana"], ["carrot", "date"]], concatStrings), [["apple-carrot"], ["banana-date"]]);
 * ```
 */
export default function vectorfun<X extends array | matrix>(
  dim: 0 | 1,
  x: X,
  fun: (vector: array, ...args: any[]) => any,
  ...varargin: any[]
): VectorFunReturnType<X> {
  let ndim: number;
  let narray: (x: matrix, idx: number) => array;

  if (isempty(x)) {
    return [] as unknown as VectorFunReturnType<X>;
  }

  if (dim === 1) {
    ndim = ncols(x as matrix);
    narray = getcol;
  } else {
    ndim = nrows(x as matrix);
    narray = getrow;
  }

  if (isarray(x) && !ismatrix(x)) {
    if (isempty(varargin)) {
      return fun(x as array) as unknown as VectorFunReturnType<X>;
    }
    return fun(x as array, ...varargin) as unknown as VectorFunReturnType<X>;
  }

  const v: any[] = [];
  if (ismatrix(x)) {
    for (let i = 0; i < ndim; i++) {
      const d = narray(x as matrix, i);
      let temp;
      if (isempty(varargin)) {
        temp = fun(d);
      } else {
        temp = fun(d, ...varargin);
      }
      v.push(temp);
    }
  }

  if (dim === 1) {
    if (ismatrix(v)) {
      return v as unknown as VectorFunReturnType<X>;
    }
    return squeeze(transpose([v])) as unknown as VectorFunReturnType<X>;
  }

  if (dim === 0) {
    if (ismatrix(v)) {
      return v as unknown as VectorFunReturnType<X>;
    }
  }

  return squeeze(v) as unknown as VectorFunReturnType<X>;
}
