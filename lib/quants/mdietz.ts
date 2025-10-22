import type { array } from "../types.d.ts";

/**
 * Modified Dietz Return.
 *
 * Compute the Modified Dietz Return. It takes into account the timing
 * of the cash flows, weighting them by the time they were held in the portfolio.
 *
 * @param ev ending value
 * @param bv beginning value
 * @param cf cash flow array
 * @param cfd cash flow dates array as fraction of the total period
 * @return Modified Dietz Return
 *
 * @example Calculate Modified Dietz Return with multiple cash flows
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * var bv = 100000; // beginning value
 * var ev = 110000; // ending value
 * var cf1 = 10000; //cash flow 1 (inflow)
 * var cf2 = 5000;  //cash flow 2 (inflow)
 * var cf3 = -2000; //cash flow 3 (outflow)
 * var cf = [cf1,cf2,cf3]; //cash flow array
 * var cfd = [0.25,0.5,0.75]; //cash flow dates array as fraction of the total period
 *
 * assertEquals(mdietz(ev,bv,cf,cfd), -0.0273972602739726);
 * ```
 */
export default function mdietz(
  ev: number,
  bv: number,
  cf: number | array,
  cfd: number | array,
): number {
  let cashFlows: array;
  let cashFlowDates: array;

  if (typeof cf === "number") {
    cashFlows = [cf];
  } else {
    cashFlows = cf || [];
  }

  if (typeof cfd === "number") {
    cashFlowDates = [cfd];
  } else {
    cashFlowDates = cfd || [];
  }

  let CF = 0;
  let W = 0;
  for (let i = 0; i < cashFlows.length; i++) {
    CF = CF + cashFlows[i];
    W = W + cashFlows[i] * (1 - cashFlowDates[i]);
  }

  return (ev - bv - CF) / (bv + W);
}
