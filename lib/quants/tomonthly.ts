/**
 * Time Series Analysis.
 */
import type { array } from "../types.d.ts";
import { isnumber, sum } from "../../index.ts";

/**
 * Convert a return series to a monthly series.
 *
 * Convert a return series to a monthly series (e.g. from daily to monthly)
 *
 * @param x array of values
 * @param mode calculation mode: 'simple' (default) or 'continuous'
 * @return monthly series
 *
 * @example Convert daily returns to monthly returns using simple mode
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * var dailyReturns = [
 *   0.001, 0.002, -0.001, 0.004, 0.005, // Week 1
 *   0.002, -0.003, 0.001, 0.002, 0.004, // Week 2
 *   0.003, 0.001, -0.002, 0.003, 0.002, // Week 3
 *   0.001, 0.004, 0.003, -0.001, 0.002  // Week 4
 * ];
 * assertEquals(tomonthly(dailyReturns), 0.03347884902598719);
 *
 * ```
 *
 * @example Convert daily returns to monthly returns using continuous mode
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * var dailyReturns = [
 *   0.001, 0.002, -0.001, 0.004, 0.005, // Week 1
 *   0.002, -0.003, 0.001, 0.002, 0.004, // Week 2
 *   0.003, 0.001, -0.002, 0.003, 0.002, // Week 3
 *   0.001, 0.004, 0.003, -0.001, 0.002  // Week 4
 * ];
 * assertEquals(tomonthly(dailyReturns, "continuous"), 0.033);
 * ```
 */
export default function tomonthly(x: array, mode?: string): number;
export default function tomonthly(
  x: array,
  mode: string = "simple",
): number {
  if (isnumber(x)) {
    return x as number;
  }

  if (mode === "simple") {
    let monthly = 1;
    for (let i = 0; i < x.length; i++) {
      monthly *= 1 + x[i];
    }
    return monthly - 1;
  } else if (mode === "continuous") {
    return sum(x) as number;
  } else {
    throw new Error("unknown return method");
  }
}
