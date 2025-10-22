/**
 * Computes the sign of a number.
 *
 * Computes the sign of each element in a number, array, or matrix.
 * Returns 1 for positive numbers, -1 for negative numbers, and 0 for zero.
 *
 * @param x The input value(s).
 * @returns The sign of the input value(s).
 * @throws If no arguments are provided.
 *
 * @example Sign of a single number
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { arrayfun } from "../../index.ts";
 *
 * assertEquals(sign(-0.5), -1);
 *
 * ```
 *
 * @example Sign of a positive number
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { arrayfun } from "../../index.ts";
 *
 * assertEquals(sign(42), 1);
 *
 * ```
 *
 * @example Sign of zero
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { arrayfun } from "../../index.ts";
 *
 * assertEquals(sign(0), 0);
 *
 * ```
 *
 * @example Sign with special values
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { arrayfun } from "../../index.ts";
 *
 * assertEquals(sign(Infinity), 1);
 * assertEquals(sign(-Infinity), -1);
 *
 * ```
 *
 * @example Sign with very small numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { arrayfun } from "../../index.ts";
 *
 * assertEquals(sign(0.000001), 1);
 * assertEquals(sign(-0.000001), -1);
 *
 * ```
 *
 * @example Using with arrayfun for arrays
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { arrayfun } from "../../index.ts";
 *
 * assertEquals(arrayfun([5, 0, -3], sign), [1, 0, -1]);
 *
 * ```
 *
 * @example Using with arrayfun for matrices
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { arrayfun } from "../../index.ts";
 *
 * assertEquals(arrayfun([[2, -1], [0, 4]], sign), [[1, -1], [0, 1]]);
 * ```
 */
export default function sign(x: number): number {
  if (x > 0) return 1;
  if (x < 0) return -1;
  return 0;
}
