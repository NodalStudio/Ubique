import type { array } from "../types.d.ts";
import { colon } from "../../index.ts";

/**
 * @function irr
 * @summary Internal rate of return on an investment based on a series of periodic cash flows
 * @description Calculates the internal rate of return on an investment
 * based on a series of regularly/irregularly periodic cash flows.
 *
 * @param cf Cash flows associated with the investment. Must contain at least one negative and one positive cash flow
 * @param cfd Number of calendar days from the beginning of the period that cash flow occurs (defaults to sequential periods)
 * @param cd Total number of calendar days in the measurement period (defaults to 1)
 * @param guess Initial estimate for what the internal rate of return will be (defaults to 0.1)
 * @returns Internal rate of return
 * @throws If insufficient arguments or convergence fails
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Simple IRR with regular cash flows
 * assertEquals(irr([250000, 25000, -10000, -285000]), 0.024712563094781776);
 *
 * // Example 2: Simple IRR with time periods
 * assertEquals(irr([74.2, 37.1, -104.4], [0, 1, 2], 2), -0.07410820570460687);
 *
 * // Example 3: Modified IRR with irregular time periods
 * assertEquals(irr([250000, 25000, -10000, -285000], [0, 45, 69, 90], 90), 0.07692283872311291);
 *
 * // Example 4: Modified IRR with different calendar days
 * assertEquals(irr([74.2, 37.1, -104.4], [0, 14, 31], 31), -0.07271456460699813);
 * ```
 */
export default function irr(
  cf: array,
  cfd?: array,
  cd?: number,
  guess?: number,
): number {
  const _npv = function (
    cf: array,
    cfd: array,
    cd: number,
    guess: number,
  ): number {
    let npv = 0;
    for (let i = 0; i < cf.length; i++) {
      npv += cf[i] / Math.pow(1 + guess, cfd[i] / cd);
    }
    return npv;
  };

  const _npvd = function (
    cf: array,
    cfd: array,
    cd: number,
    guess: number,
  ): number {
    let npv = 0;
    for (let i = 0; i < cf.length; i++) {
      npv -= ((cfd[i] / cd) * cf[i]) / Math.pow(1 + guess, cfd[i] / cd);
    }
    return npv;
  };

  // Ensure all parameters have values with proper types
  const cfdValue: array = cfd ?? colon(0, cf.length - 1, 1);
  const cdValue: number = cd ?? 1;
  const guessValue: number = guess ?? 0.1;

  let rate = guessValue;
  const maxeps = 1e-6;
  const maxiter = 50;
  let newrate = 0;
  let epsrate = 0;
  let npv = 0;
  let cnt = 0;
  let cntv = true;

  do {
    npv = _npv(cf, cfdValue, cdValue, rate);
    newrate = rate - npv / _npvd(cf, cfdValue, cdValue, rate);
    epsrate = Math.abs(newrate - rate);
    rate = newrate;
    cntv = epsrate > maxeps && Math.abs(npv) > maxeps;
  } while (cntv && cnt++ < maxiter);

  if (cntv) {
    throw new Error("IRR calculation failed to converge");
  }

  return rate;
}
