import { array } from "../types.d.ts";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import arraySupport from "dayjs/plugin/arraySupport.js";
import customParseFormat from "dayjs/plugin/customParseFormat.js";

dayjs.extend(utc);
dayjs.extend(arraySupport);
dayjs.extend(customParseFormat);

/**
 * Convert date and time to a serial date number (Unix).
 *
 * Converts a given date and time to a Unix timestamp (serial date number). The function supports both date strings with a format and numeric arrays representing components of date and time.
 *
 * @param d The date input, which can be a single value or an array of date components.
 * @param fmt The format string to parse the date if the input is a date string.
 * @returns The Unix timestamp or an array of Unix timestamps.
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Convert a date string to a Unix timestamp
 * assertEquals(datenum('31-12-2014', 'DD-MM-YYYY'), 1419984000);
 *
 * // Example 2: Convert an array of date strings to an array of Unix timestamps
 * assertEquals(datenum(['31-12-2014', '31-01-2015'], 'DD-MM-YYYY'), [1419984000, 1422662400]);
 *
 * // Example 3: Convert an array of date components to a Unix timestamp
 * assertEquals(datenum([2015, 4, 5, 12, 20, 30, 0]), 1428236430);

 * ```
 */
export default function datenum(
  d: string | array<string | number>,
  fmt?: string,
): number | array {
  if (Array.isArray(d) && d.every((el) => typeof el === "string")) {
    return d.map((item) => parseDateToUnix(item, fmt) as number);
  }

  return parseDateToUnix(d, fmt);
}

function parseDateToUnix(
  input: string | array<string | number>,
  fmt?: string,
): number | array {
  if (typeof input === "string") {
    if (!fmt) {
      throw new Error("Insert format for date string");
    }
    return dayjs.utc(input, fmt).unix();
  } else if (
    Array.isArray(input) && input.every((el) => typeof el === "number")
  ) {
    const [
      year,
      month = 1,
      day = 1,
      hour = 0,
      minute = 0,
      second = 0,
      millisecond = 0,
    ] = input;
    return dayjs.utc([year, month - 1, day, hour, minute, second, millisecond])
      .unix();
  }
  throw new Error("Invalid input type");
}
