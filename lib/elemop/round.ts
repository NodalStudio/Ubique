import type { array, matrix, numarraymatrix } from "../types.d.ts";

import { arrayfun } from "../../index.ts";

/**
 * Round to nearest integer.
 *
 * Rounds each element in `x` to the nearest integer or specified number of decimal places. Handles numbers, arrays, and matrices element-wise.
 *
 * @param x The value(s) to be rounded
 * @param n The number of decimal places to round to (default is 0)
 * @returns The rounded value(s)
 * @throws If no arguments are provided
 *
 * @example Round a number to 12 decimal places
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(round(Math.PI, 12), 3.14159265359);
 *
 * ```
 *
 * @example Round an array of numbers to 2 decimal places
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(round([-1.4543, 4.5234], 2), [-1.45, 4.52]);
 *
 * ```
 *
 * @example Round an array of numbers to the nearest integer
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(round([-1.9, -0.2, 3.4, 5.6, 7.0]), [-2, 0, 3, 6, 7]);
 *
 * ```
 *
 * @example Round a matrix of numbers to the nearest integer
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(round([[1.45, -2.3], [1.1, -4.3]]), [[1, -2], [1, -4]]);
 *
 * ```
 *
 * @example Round a matrix of numbers to 1 decimal place
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(round([[1.456, -2.354], [1.123, -4.345]], 1), [[1.5, -2.4], [1.1, -4.3]]);
 *
 * ```
 *
 * @example Round a single number without specifying decimal places
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(round(5.678), 6);
 *
 * ```
 *
 * @example Round an array of negative numbers to 2 decimal places
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(round([-1.4567, -4.5234], 2), [-1.46, -4.52]);
 *
 * ```
 *
 * @example Round a single negative number to 2 decimal places
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(round(-2.34567, 2), -2.35);
 * ```
 */
export default function round(x: number, n?: number): number;
export default function round(x: array, n?: number): array;
export default function round(x: matrix, n?: number): matrix;
export default function round(
  x: numarraymatrix,
  n: number = 0,
): numarraymatrix {
  if (arguments.length === 0) {
    throw new Error("Not enough input arguments");
  }

  const p = Math.pow(10, n);
  const _round = (a: number) => {
    const res = Math.round(a * p) / p;
    return res === 0 ? 0 : res;
  };

  return arrayfun(x, _round);
}
