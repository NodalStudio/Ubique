import { array, matrix, numarraymatrix } from "../types.d.ts";

import arrayfun from "../datatype/arrayfun.ts";

/**
 * @function fix
 * @summary Rounds numbers toward zero.
 * @description Rounds numbers toward zero. This operation is element-wise for arrays and matrices.
 *
 * @param x The input number.
 * @returns The rounded value.
 * @throws If no input argument is provided.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Round a single number toward zero
 * assertEquals(fix(3.78), 3);
 *
 * // Example 2: Round an array of numbers toward zero
 * assertEquals(fix([4.51, -1.4]), [4, -1]);
 *
 * // Example 3: Round a matrix of numbers toward zero
 * assertEquals(fix([[4.51, -1.4], [3.78, 0.01]]), [[4, -1], [3, 0]]);
 * ```
 */
export default function fix(x: number): number;
export default function fix(x: array): array;
export default function fix(x: matrix): matrix;
export default function fix(x: numarraymatrix): numarraymatrix {
  const _fix = (a: number): number => {
    const rounded = a < 0 ? Math.ceil(a) : Math.floor(a);
    return rounded === 0 ? 0 : rounded;
  };

  return arrayfun(x, _fix);
}
