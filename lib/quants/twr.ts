import type { array } from "../types.d.ts";
import { prod } from "../../index.ts";

/**
 * @function twr
 * @summary True Time-weighted return
 * @description True Time-weighted return measures the returns of the assets irrespective of the amount invested.
 * It eliminates the impact of cash flows, focusing solely on the performance of the investments themselves.
 *
 * @param mv Array of market values at each time period
 * @param cf Array of external cash flows (inflows/outflows) or a single number applied to all periods (defaults to 0)
 * @returns Time-weighted return
 * @throws If market values and cash flows arrays have different lengths
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Calculate true time-weighted return with market values and cash flows
 * const mv = [250000, 255000, 257000, 288000, 293000, 285000];
 * const cf = [0, 0, 25000, 0, -10000, 0];
 * assertEquals(twr(mv, cf), 0.07564769566198049);
 *
 * // Example 2: TWR with no cash flows (default behavior)
 * assertEquals(twr([100, 110, 120]), 0.19999999999999996);
 *
 * // Example 3: TWR with uniform cash flow
 * assertEquals(twr([100, 110, 120], 5), 0.0931677018633541);
 * ```
 */
export default function twr(mv: array, cf: array | number = 0): number {
  // If cf is a number, create an array with the same length as mv
  if (typeof cf === "number") {
    cf = Array(mv.length).fill(cf);
  }

  if (mv.length !== cf.length) {
    throw new Error("market value and cash flows must be of the same size");
  }

  const _twr = [1];
  for (let i = 1; i < mv.length; i++) {
    _twr[i] = mv[i] / (mv[i - 1] + cf[i - 1]);
  }

  return prod(_twr) - 1;
}
