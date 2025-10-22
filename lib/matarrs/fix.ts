import { array, matrix, numarraymatrix } from "../types.d.ts";

import arrayfun from "../datatype/arrayfun.ts";

/**
 * Rounds numbers toward zero.
 *
 * Rounds numbers toward zero. This operation is element-wise for arrays and matrices.
 *
 * @param x The input number.
 * @returns The rounded value.
 * @throws If no input argument is provided.
 *
 * @example Round a single number toward zero
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(fix(3.78), 3);
 *
 * ```
 *
 * @example Round an array of numbers toward zero
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(fix([4.51, -1.4]), [4, -1]);
 *
 * ```
 *
 * @example Round a matrix of numbers toward zero
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(fix([[4.51, -1.4], [3.78, 0.01]]), [[4, -1], [3, 0]]);
 * ```
 */
export default function fix(x: number): number;
/**
 * Rounds numbers toward zero.
 *
 * Rounds numbers toward zero. This operation is element-wise for arrays and matrices.
 *
 * @param x The input number.
 * @returns The rounded value.
 * @throws If no input argument is provided.
 *
 * @example Round a single number toward zero
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(fix(3.78), 3);
 *
 * ```
 *
 * @example Round an array of numbers toward zero
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(fix([4.51, -1.4]), [4, -1]);
 *
 * ```
 *
 * @example Round a matrix of numbers toward zero
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(fix([[4.51, -1.4], [3.78, 0.01]]), [[4, -1], [3, 0]]);
 * ```
 */
export default function fix(x: array): array;
/**
 * Rounds numbers toward zero.
 *
 * Rounds numbers toward zero. This operation is element-wise for arrays and matrices.
 *
 * @param x The input number.
 * @returns The rounded value.
 * @throws If no input argument is provided.
 *
 * @example Round a single number toward zero
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(fix(3.78), 3);
 *
 * ```
 *
 * @example Round an array of numbers toward zero
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(fix([4.51, -1.4]), [4, -1]);
 *
 * ```
 *
 * @example Round a matrix of numbers toward zero
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(fix([[4.51, -1.4], [3.78, 0.01]]), [[4, -1], [3, 0]]);
 * ```
 */
export default function fix(x: matrix): matrix;
/**
 * Rounds numbers toward zero.
 *
 * Rounds numbers toward zero. This operation is element-wise for arrays and matrices.
 *
 * @param x The input number.
 * @returns The rounded value.
 * @throws If no input argument is provided.
 *
 * @example Round a single number toward zero
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(fix(3.78), 3);
 *
 * ```
 *
 * @example Round an array of numbers toward zero
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(fix([4.51, -1.4]), [4, -1]);
 *
 * ```
 *
 * @example Round a matrix of numbers toward zero
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(fix([[4.51, -1.4], [3.78, 0.01]]), [[4, -1], [3, 0]]);
 * ```
 */
export default function fix(x: numarraymatrix): numarraymatrix {
  const _fix = (a: number): number => {
    const rounded = a < 0 ? Math.ceil(a) : Math.floor(a);
    return rounded === 0 ? 0 : rounded;
  };

  return arrayfun(x, _fix);
}
