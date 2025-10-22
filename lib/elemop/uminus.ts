import type { array, matrix, numarraymatrix } from "../types.d.ts";

import { arrayfun } from "../../index.ts";

/**
 * Unary minus -X.
 *
 * Applies unary minus to a number, array, or matrix, effectively negating all elements.
 *
 * @param x The input number, array, or matrix to be negated
 * @returns The negated value(s)
 * @throws If no input is provided
 *
 * @example Unary minus on a single number
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(uminus(-5), 5);
 *
 * ```
 *
 * @example Unary minus on an array of numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(uminus([5, 6]), [-5, -6]);
 *
 * ```
 *
 * @example Unary minus on a matrix of numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(uminus([[5, 6], [-1, -3]]), [[-5, -6], [1, 3]]);
 * ```
 */
export default function uminus(x: number): number;
/**
 * Unary minus -X.
 *
 * Applies unary minus to a number, array, or matrix, effectively negating all elements.
 *
 * @param x The input number, array, or matrix to be negated
 * @returns The negated value(s)
 * @throws If no input is provided
 *
 * @example Unary minus on a single number
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(uminus(-5), 5);
 *
 * ```
 *
 * @example Unary minus on an array of numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(uminus([5, 6]), [-5, -6]);
 *
 * ```
 *
 * @example Unary minus on a matrix of numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(uminus([[5, 6], [-1, -3]]), [[-5, -6], [1, 3]]);
 * ```
 */
export default function uminus(x: array): array;
/**
 * Unary minus -X.
 *
 * Applies unary minus to a number, array, or matrix, effectively negating all elements.
 *
 * @param x The input number, array, or matrix to be negated
 * @returns The negated value(s)
 * @throws If no input is provided
 *
 * @example Unary minus on a single number
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(uminus(-5), 5);
 *
 * ```
 *
 * @example Unary minus on an array of numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(uminus([5, 6]), [-5, -6]);
 *
 * ```
 *
 * @example Unary minus on a matrix of numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(uminus([[5, 6], [-1, -3]]), [[-5, -6], [1, 3]]);
 * ```
 */
export default function uminus(x: matrix): matrix;
/**
 * Unary minus -X.
 *
 * Applies unary minus to a number, array, or matrix, effectively negating all elements.
 *
 * @param x The input number, array, or matrix to be negated
 * @returns The negated value(s)
 * @throws If no input is provided
 *
 * @example Unary minus on a single number
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(uminus(-5), 5);
 *
 * ```
 *
 * @example Unary minus on an array of numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(uminus([5, 6]), [-5, -6]);
 *
 * ```
 *
 * @example Unary minus on a matrix of numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(uminus([[5, 6], [-1, -3]]), [[-5, -6], [1, 3]]);
 * ```
 */
export default function uminus(x: numarraymatrix): numarraymatrix {
  return arrayfun(x, (a: number) => -a);
}
