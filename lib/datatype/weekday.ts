import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import isoWeek from "dayjs/plugin/isoWeek.js";

dayjs.extend(utc);
dayjs.extend(isoWeek);

import { arrayfun } from "../../index.ts";
import type { array, matrix } from "../types.d.ts";

/**
 * Gets the ISO weekday for a given Unix timestamp.
 *
 * Returns a number representing the ISO weekday (1 = Monday, 7 = Sunday) for each element in `x`.
 *
 * @param x Unix timestamp(s) to convert to the ISO weekday.
 * @returns The corresponding ISO weekday(s).
 *
 * @example Single Unix timestamp
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(weekday(1426636800), 3); // (Wednesday)
 *
 * ```
 *
 * @example Array of Unix timestamps
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(weekday([1424908800, 1426636800]), [4, 3]); // (Thursday, Wednesday)
 *
 * ```
 *
 * @example Matrix of Unix timestamps
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(weekday([[1424908800, 1426636800], [1427328000, 1429315200]]), [[4, 3], [4, 6]]); // (Thursday, Wednesday, Thursday, Saturday)
 * ```
 */

export default function weekday(x: number): number;
/**
 * Gets the ISO weekday for a given Unix timestamp.
 *
 * Returns a number representing the ISO weekday (1 = Monday, 7 = Sunday) for each element in `x`.
 *
 * @param x Unix timestamp(s) to convert to the ISO weekday.
 * @returns The corresponding ISO weekday(s).
 *
 * @example Single Unix timestamp
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(weekday(1426636800), 3); // (Wednesday)
 *
 * ```
 *
 * @example Array of Unix timestamps
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(weekday([1424908800, 1426636800]), [4, 3]); // (Thursday, Wednesday)
 *
 * ```
 *
 * @example Matrix of Unix timestamps
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(weekday([[1424908800, 1426636800], [1427328000, 1429315200]]), [[4, 3], [4, 6]]); // (Thursday, Wednesday, Thursday, Saturday)
 * ```
 */
export default function weekday(x: array): array;
/**
 * Gets the ISO weekday for a given Unix timestamp.
 *
 * Returns a number representing the ISO weekday (1 = Monday, 7 = Sunday) for each element in `x`.
 *
 * @param x Unix timestamp(s) to convert to the ISO weekday.
 * @returns The corresponding ISO weekday(s).
 *
 * @example Single Unix timestamp
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(weekday(1426636800), 3); // (Wednesday)
 *
 * ```
 *
 * @example Array of Unix timestamps
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(weekday([1424908800, 1426636800]), [4, 3]); // (Thursday, Wednesday)
 *
 * ```
 *
 * @example Matrix of Unix timestamps
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(weekday([[1424908800, 1426636800], [1427328000, 1429315200]]), [[4, 3], [4, 6]]); // (Thursday, Wednesday, Thursday, Saturday)
 * ```
 */
export default function weekday(x: matrix): matrix;
/**
 * Gets the ISO weekday for a given Unix timestamp.
 *
 * Returns a number representing the ISO weekday (1 = Monday, 7 = Sunday) for each element in `x`.
 *
 * @param x Unix timestamp(s) to convert to the ISO weekday.
 * @returns The corresponding ISO weekday(s).
 *
 * @example Single Unix timestamp
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(weekday(1426636800), 3); // (Wednesday)
 *
 * ```
 *
 * @example Array of Unix timestamps
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(weekday([1424908800, 1426636800]), [4, 3]); // (Thursday, Wednesday)
 *
 * ```
 *
 * @example Matrix of Unix timestamps
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(weekday([[1424908800, 1426636800], [1427328000, 1429315200]]), [[4, 3], [4, 6]]); // (Thursday, Wednesday, Thursday, Saturday)
 * ```
 */
export default function weekday(
  x: number | array | matrix,
): number | array | matrix {
  const getWeekday = (timestamp: number): number =>
    dayjs.unix(timestamp).utc().isoWeekday();

  return arrayfun(x, getWeekday);
}
