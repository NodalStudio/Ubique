import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";

import { arrayfun } from "../../index.ts";
import type { array, matrix } from "../types.d.ts";

dayjs.extend(utc);

/**
 * Convert Unix timestamp to string format.
 *
 * Converts a Unix timestamp (in seconds) to a formatted date string using `dayjs`.
 * Can handle individual numbers, arrays, and matrices of Unix timestamps.
 *
 * @example Convert a single Unix timestamp to a date string
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(datestr(1419984000), '2014-12-31');
 *
 * ```
 *
 * @example Convert an array of Unix timestamps to date strings with custom format
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(datestr([1419984000, 1422662400], 'DD-MMM-YY'), ['31-Dec-14', '31-Jan-15']);
 *
 * ```
 *
 * @example Convert a matrix of Unix timestamps to formatted date strings
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(datestr([[1419984000, 1422662400], [1423958400, 1425168000]], 'YY-MM-DD HH:mm:ss'),
 *   [['14-12-31 00:00:00', '15-01-31 00:00:00'], ['15-02-15 00:00:00', '15-03-01 00:00:00']]);
 * ```
 */
export default function datestr(
  d: number,
  fmt?: string,
): string;
/**
 * Convert Unix timestamp to string format.
 *
 * Converts a Unix timestamp (in seconds) to a formatted date string using `dayjs`.
 * Can handle individual numbers, arrays, and matrices of Unix timestamps.
 *
 * @example Convert a single Unix timestamp to a date string
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(datestr(1419984000), '2014-12-31');
 *
 * ```
 *
 * @example Convert an array of Unix timestamps to date strings with custom format
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(datestr([1419984000, 1422662400], 'DD-MMM-YY'), ['31-Dec-14', '31-Jan-15']);
 *
 * ```
 *
 * @example Convert a matrix of Unix timestamps to formatted date strings
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(datestr([[1419984000, 1422662400], [1423958400, 1425168000]], 'YY-MM-DD HH:mm:ss'),
 *   [['14-12-31 00:00:00', '15-01-31 00:00:00'], ['15-02-15 00:00:00', '15-03-01 00:00:00']]);
 * ```
 */
export default function datestr(
  d: array<number>,
  fmt?: string,
): array<string>;
/**
 * Convert Unix timestamp to string format.
 *
 * Converts a Unix timestamp (in seconds) to a formatted date string using `dayjs`.
 * Can handle individual numbers, arrays, and matrices of Unix timestamps.
 *
 * @example Convert a single Unix timestamp to a date string
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(datestr(1419984000), '2014-12-31');
 *
 * ```
 *
 * @example Convert an array of Unix timestamps to date strings with custom format
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(datestr([1419984000, 1422662400], 'DD-MMM-YY'), ['31-Dec-14', '31-Jan-15']);
 *
 * ```
 *
 * @example Convert a matrix of Unix timestamps to formatted date strings
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(datestr([[1419984000, 1422662400], [1423958400, 1425168000]], 'YY-MM-DD HH:mm:ss'),
 *   [['14-12-31 00:00:00', '15-01-31 00:00:00'], ['15-02-15 00:00:00', '15-03-01 00:00:00']]);
 * ```
 */
export default function datestr(
  d: matrix<number>,
  fmt?: string,
): matrix<string>;
/**
 * Convert Unix timestamp to string format.
 *
 * Converts a Unix timestamp (in seconds) to a formatted date string using `dayjs`.
 * Can handle individual numbers, arrays, and matrices of Unix timestamps.
 *
 * @example Convert a single Unix timestamp to a date string
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(datestr(1419984000), '2014-12-31');
 *
 * ```
 *
 * @example Convert an array of Unix timestamps to date strings with custom format
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(datestr([1419984000, 1422662400], 'DD-MMM-YY'), ['31-Dec-14', '31-Jan-15']);
 *
 * ```
 *
 * @example Convert a matrix of Unix timestamps to formatted date strings
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(datestr([[1419984000, 1422662400], [1423958400, 1425168000]], 'YY-MM-DD HH:mm:ss'),
 *   [['14-12-31 00:00:00', '15-01-31 00:00:00'], ['15-02-15 00:00:00', '15-03-01 00:00:00']]);
 * ```
 */
export default function datestr(
  d: number | array<number> | matrix<number>,
  fmt: string = "YYYY-MM-DD",
): string | array<string> | matrix<string> {
  if (typeof d === "number") {
    return _datestr(d, fmt);
  }

  if (Array.isArray(d)) {
    if (d.length > 0 && Array.isArray(d[0])) {
      return arrayfun(d as matrix<number>, _datestr, fmt);
    } else {
      return arrayfun(d as array<number>, _datestr, fmt);
    }
  }

  throw new Error("Invalid input type");
}

function _datestr(timestamp: number, format: string): string {
  if (typeof timestamp !== "number") {
    throw new Error("Input must be a Unix timestamp");
  }
  return dayjs.unix(timestamp).utc().format(format);
}
