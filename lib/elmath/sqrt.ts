import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { arrayfun, isnumber } from "../../index.ts";

/**
 * @function sqrt
 * @summary Computes the square root of a number, array, or matrix.
 * @description Computes the square root of each element in a number, array, or matrix. Returns NaN for negative values.
 *
 * @param x The input value(s)
 * @returns The square root of the input value(s)
 * @throws {Error} If no arguments are provided
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Square root of a single number
 * assertEquals(sqrt(6), 2.449489742783178);
 *
 * // Example 2: Square root of an array of numbers
 * assertEquals(sqrt([5, 6, 3]), [2.23606797749979, 2.449489742783178, 1.7320508075688772]);
 *
 * // Example 3: Square root of a matrix of numbers
 * assertEquals(sqrt([[5, 6, 5], [7, 8, 2]]), [[2.23606797749979, 2.449489742783178, 2.23606797749979], [2.6457513110645907, 2.8284271247461903, 1.4142135623730951]]);

 * ```*/
export default function sqrt(x: number): number;
export default function sqrt(x: array): array;
export default function sqrt(x: matrix): matrix;
export default function sqrt(x: numarraymatrix): numarraymatrix {
  const computeSqrt = Math.sqrt;
  return isnumber(x) ? computeSqrt(x) : arrayfun(x, computeSqrt);
}
