import dayjs from "https://esm.sh/dayjs";
import utc from "https://esm.sh/dayjs/plugin/utc";
import isoWeek from "https://esm.sh/dayjs/plugin/isoWeek";
import arrayfun from "./arrayfun.ts";

dayjs.extend(utc);
dayjs.extend(isoWeek);

import { numarraymatrix } from "../types.d.ts";

/**
 * @function weekday
 * @summary Gets the ISO weekday for a given Unix timestamp.
 * @description Returns a number representing the ISO weekday (1 = Monday, 7 = Sunday) for each element in `x`.
 *
 * @param {} x - Unix timestamp(s) to convert to the ISO weekday.
 * @returns {number|array|matrix} - The corresponding ISO weekday(s).
 *
 * @example
 * // Example 1: Single Unix timestamp
 * assert.strictEqual(weekday(1426636800), 3); // (Wednesday)
 *
 * // Example 2: Array of Unix timestamps
 * assert.deepStrictEqual(weekday([1424908800, 1426636800]), [4, 3]); // (Thursday, Wednesday)
 *
 * // Example 3: Matrix of Unix timestamps
 * assert.deepStrictEqual(weekday([[1424908800, 1426636800], [1427328000, 1429315200]]), [[4, 3], [4, 6]]); // (Thursday, Wednesday, Thursday, Saturday)
 */
export default function weekday(x: numarraymatrix): numarraymatrix {
  if (arguments.length === 0) {
    throw new Error("Not enough input arguments");
  }

  const getWeekday = (timestamp: number) =>
    dayjs.unix(timestamp).utc().isoWeekday();

  return arrayfun(x, getWeekday);
}
