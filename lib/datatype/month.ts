import dayjs from "dayjs";

import { arrayfun } from "../../index.ts";
import type { array, matrix } from "../types.d.ts";

/**
 * Extracts the month from a Unix timestamp.
 *
 * Returns a number representing the month for each element in `x`. Months are 0-indexed, where January is 0 and December is 11.
 *
 * @param x A Unix timestamp or an array/matrix of Unix timestamps.
 * @returns The month(s) corresponding to the input timestamp(s).
 *
 * @throws If the input is not a number, array or matrix.
 *
 * @example Single timestamp
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(month(1424708525), 1);
 *
 * ```
 *
 * @example Array of timestamps
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(month([1414886399, 1414972799]), [10, 10]);
 *
 * ```
 *
 * @example Matrix of timestamps
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(month([[1414886399, 1414972799], [1415059199, 1415145599]]), [[10, 10], [10, 10]]);
 * ```
 */
export default function month(x: number): number;
export default function month(x: array<number>): array<number>;
export default function month(x: matrix<number>): matrix<number>;
export default function month(
  x: number | array<number> | matrix<number>,
): number | array<number> | matrix<number> {
  const extractMonth = (timestamp: number) => dayjs.unix(timestamp).month();

  return arrayfun(x, extractMonth);
}
