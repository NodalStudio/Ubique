import type { array, matrix, numarraymatrix } from "../types.d.ts";

import { arrayfun } from "../../index.ts";

/**
 * Rounds toward negative infinity.
 *
 * Rounds the input value(s) towards negative infinity, optionally to a specified number of decimal places.
 *
 * @param x Value(s) to be rounded
 * @param n Number of decimal places to round to (defaults to 0)
 * @returns The rounded value(s)
 * @throws If no arguments are provided
 *
 * @example Round PI to 12 decimal places
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(floor(Math.PI, 12), 3.141592653589);
 *
 * ```
 *
 * @example Round a single number toward negative infinity
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(floor(3.78), 3);
 *
 * ```
 *
 * @example Round an array of numbers toward negative infinity
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(floor([4.51, -1.4]), [4, -2]);
 *
 * ```
 *
 * @example Round a matrix of numbers to 2 decimal places
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(floor([[4.5134, -1.4345], [3.7809, 0.0134]], 2), [[4.51, -1.44], [3.78, 0.01]]);
 * ```
 */
export default function floor(x: number, n?: number): number;
/**
 * Rounds toward negative infinity.
 *
 * Rounds the input value(s) towards negative infinity, optionally to a specified number of decimal places.
 *
 * @param x Value(s) to be rounded
 * @param n Number of decimal places to round to (defaults to 0)
 * @returns The rounded value(s)
 * @throws If no arguments are provided
 *
 * @example Round PI to 12 decimal places
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(floor(Math.PI, 12), 3.141592653589);
 *
 * ```
 *
 * @example Round a single number toward negative infinity
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(floor(3.78), 3);
 *
 * ```
 *
 * @example Round an array of numbers toward negative infinity
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(floor([4.51, -1.4]), [4, -2]);
 *
 * ```
 *
 * @example Round a matrix of numbers to 2 decimal places
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(floor([[4.5134, -1.4345], [3.7809, 0.0134]], 2), [[4.51, -1.44], [3.78, 0.01]]);
 * ```
 */
export default function floor(x: array, n?: number): array;
/**
 * Rounds toward negative infinity.
 *
 * Rounds the input value(s) towards negative infinity, optionally to a specified number of decimal places.
 *
 * @param x Value(s) to be rounded
 * @param n Number of decimal places to round to (defaults to 0)
 * @returns The rounded value(s)
 * @throws If no arguments are provided
 *
 * @example Round PI to 12 decimal places
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(floor(Math.PI, 12), 3.141592653589);
 *
 * ```
 *
 * @example Round a single number toward negative infinity
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(floor(3.78), 3);
 *
 * ```
 *
 * @example Round an array of numbers toward negative infinity
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(floor([4.51, -1.4]), [4, -2]);
 *
 * ```
 *
 * @example Round a matrix of numbers to 2 decimal places
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(floor([[4.5134, -1.4345], [3.7809, 0.0134]], 2), [[4.51, -1.44], [3.78, 0.01]]);
 * ```
 */
export default function floor(x: matrix, n?: number): matrix;
/**
 * Rounds toward negative infinity.
 *
 * Rounds the input value(s) towards negative infinity, optionally to a specified number of decimal places.
 *
 * @param x Value(s) to be rounded
 * @param n Number of decimal places to round to (defaults to 0)
 * @returns The rounded value(s)
 * @throws If no arguments are provided
 *
 * @example Round PI to 12 decimal places
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(floor(Math.PI, 12), 3.141592653589);
 *
 * ```
 *
 * @example Round a single number toward negative infinity
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(floor(3.78), 3);
 *
 * ```
 *
 * @example Round an array of numbers toward negative infinity
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(floor([4.51, -1.4]), [4, -2]);
 *
 * ```
 *
 * @example Round a matrix of numbers to 2 decimal places
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(floor([[4.5134, -1.4345], [3.7809, 0.0134]], 2), [[4.51, -1.44], [3.78, 0.01]]);
 * ```
 */
export default function floor(
  x: numarraymatrix,
  n: number = 0,
): numarraymatrix {
  const factor = 10 ** n;
  return arrayfun(x, (a: number) => Math.floor(a * factor) / factor);
}
