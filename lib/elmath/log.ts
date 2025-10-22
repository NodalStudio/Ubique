import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { arrayfun, isnumber } from "../../index.ts";

/**
 * Computes the natural logarithm (base e).
 *
 * Computes the natural logarithm (base e) for each element in a number, array, or matrix.
 *
 * @param x The input value(s)
 * @returns The natural logarithm of the input value(s)
 * @throws If no arguments are provided
 *
 * @example Natural logarithm of a single number
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(log(6), 1.791759469228055);
 *
 * ```
 *
 * @example Natural logarithm of an array of numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(log([5, 6, 3]), [1.6094379124341003, 1.791759469228055, 1.0986122886681096]);
 *
 * ```
 *
 * @example Natural logarithm of a matrix of numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(log([[5, 6, 5], [7, 8, 2]]), [
 *   [1.6094379124341003, 1.791759469228055, 1.6094379124341003],
 *   [1.9459101490553132, 2.0794415416798357, 0.6931471805599453]
 * ]);
 *
 * ```
 */
export default function log(x: number): number;
export default function log(x: array): array;
export default function log(x: matrix): matrix;
export default function log(x: numarraymatrix): numarraymatrix {
  const computeLog = Math.log;
  return isnumber(x) ? computeLog(x) : arrayfun(x, computeLog);
}
