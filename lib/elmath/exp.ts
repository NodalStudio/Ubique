import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { arrayfun, isnumber } from "../../index.ts";

/**
 * @function exp
 * @summary Computes the exponential value.
 * @description Computes the exponential value for each element in a number, array, or matrix.
 *
 * @param x The input value(s)
 * @returns The exponential of the input value(s)
 * @throws {Error} If no arguments are provided
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Exponential of a single number
 * assertEquals(exp(6), 403.4287934927351);
 *
 * // Example 2: Exponential of an array of numbers
 * assertEquals(exp([5, 6, 3]), [148.4131591025766, 403.4287934927351, 20.085536923187668]);
 *
 * // Example 3: Exponential of a matrix of numbers
 * assertEquals(exp([[5, 6, 5], [7, 8, -1]]), [
 *   [148.4131591025766, 403.4287934927351, 148.4131591025766],
 *   [1096.6331584284585, 2980.9579870417282, 0.36787944117144233]
 * ]);

 * ```*/
export default function exp(x: number): number;
export default function exp(x: array): array;
export default function exp(x: matrix): matrix;
export default function exp(x: numarraymatrix): numarraymatrix {
  const computeExp = Math.exp;
  return isnumber(x) ? computeExp(x) : arrayfun(x, computeExp);
}
