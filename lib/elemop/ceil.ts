import type { array, matrix, numarraymatrix } from "../types.d.ts";

import { arrayfun } from "../../index.ts";

/**
 * Round toward positive infinity.
 *
 * Rounds the input value(s) toward positive infinity, optionally to a specified number of decimal places.
 *
 * @param x Value(s) to be rounded
 * @param n Number of decimal places to round to (defaults to 0)
 * @returns The rounded value(s)
 * @throws If no input is provided
 *
 * @example Round a number (Math.PI) to 12 decimal places
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(ceil(Math.PI, 12), 3.141592653590);
 *
 * ```
 *
 * @example Round a number (3.78) toward positive infinity
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(ceil(3.78), 4);
 *
 * ```
 *
 * @example Round an array of numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(ceil([4.51, -1.4]), [5, -1]);
 *
 * ```
 *
 * @example Round a matrix of numbers to 2 decimal places
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(ceil([[4.5134, -1.4345], [3.7809, 0.0134]], 2), [[4.52, -1.43], [3.79, 0.02]]);
 * ```
 */
export default function ceil(x: number, n?: number): number;
/**
 * Round toward positive infinity.
 *
 * Rounds the input value(s) toward positive infinity, optionally to a specified number of decimal places.
 *
 * @param x Value(s) to be rounded
 * @param n Number of decimal places to round to (defaults to 0)
 * @returns The rounded value(s)
 * @throws If no input is provided
 *
 * @example Round a number (Math.PI) to 12 decimal places
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(ceil(Math.PI, 12), 3.141592653590);
 *
 * ```
 *
 * @example Round a number (3.78) toward positive infinity
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(ceil(3.78), 4);
 *
 * ```
 *
 * @example Round an array of numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(ceil([4.51, -1.4]), [5, -1]);
 *
 * ```
 *
 * @example Round a matrix of numbers to 2 decimal places
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(ceil([[4.5134, -1.4345], [3.7809, 0.0134]], 2), [[4.52, -1.43], [3.79, 0.02]]);
 * ```
 */
export default function ceil(x: array, n?: number): array;
/**
 * Round toward positive infinity.
 *
 * Rounds the input value(s) toward positive infinity, optionally to a specified number of decimal places.
 *
 * @param x Value(s) to be rounded
 * @param n Number of decimal places to round to (defaults to 0)
 * @returns The rounded value(s)
 * @throws If no input is provided
 *
 * @example Round a number (Math.PI) to 12 decimal places
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(ceil(Math.PI, 12), 3.141592653590);
 *
 * ```
 *
 * @example Round a number (3.78) toward positive infinity
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(ceil(3.78), 4);
 *
 * ```
 *
 * @example Round an array of numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(ceil([4.51, -1.4]), [5, -1]);
 *
 * ```
 *
 * @example Round a matrix of numbers to 2 decimal places
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(ceil([[4.5134, -1.4345], [3.7809, 0.0134]], 2), [[4.52, -1.43], [3.79, 0.02]]);
 * ```
 */
export default function ceil(x: matrix, n?: number): matrix;
/**
 * Round toward positive infinity.
 *
 * Rounds the input value(s) toward positive infinity, optionally to a specified number of decimal places.
 *
 * @param x Value(s) to be rounded
 * @param n Number of decimal places to round to (defaults to 0)
 * @returns The rounded value(s)
 * @throws If no input is provided
 *
 * @example Round a number (Math.PI) to 12 decimal places
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(ceil(Math.PI, 12), 3.141592653590);
 *
 * ```
 *
 * @example Round a number (3.78) toward positive infinity
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(ceil(3.78), 4);
 *
 * ```
 *
 * @example Round an array of numbers
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(ceil([4.51, -1.4]), [5, -1]);
 *
 * ```
 *
 * @example Round a matrix of numbers to 2 decimal places
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(ceil([[4.5134, -1.4345], [3.7809, 0.0134]], 2), [[4.52, -1.43], [3.79, 0.02]]);
 * ```
 */
export default function ceil(x: numarraymatrix, n: number = 0): numarraymatrix {
  const factor = 10 ** n;
  return arrayfun(x, (a: number) => Math.ceil(a * factor) / factor);
}
