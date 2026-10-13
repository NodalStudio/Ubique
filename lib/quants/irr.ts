import type { array } from "../types.d.ts";

/**
 * Internal rate of return on an investment based on a series of periodic cash flows.
 *
 * Calculates the internal rate of return on an investment
 * based on a series of regularly/irregularly periodic cash flows.
 *
 * @param cf Cash flows associated with the investment. Must contain at least one negative and one positive cash flow
 * @param cfd Number of calendar days from the beginning of the period that cash flow occurs (defaults to sequential periods)
 * @param cd Total number of calendar days in the measurement period (defaults to 1)
 * @param guess Initial estimate for what the internal rate of return will be (defaults to 0.1)
 * @returns A real rate above -1 near the supplied guess; non-conventional flows may have multiple roots
 * @throws If insufficient arguments or convergence fails
 *
 * @example Simple IRR with regular cash flows
 * ```ts
 * import { assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(irr([250000, 25000, -10000, -285000]), 0.024712564600136055, 1e-11);
 *
 * ```
 *
 * @example Simple IRR with time periods
 * ```ts
 * import { assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(irr([74.2, 37.1, -104.4], [0, 1, 2], 2), -0.07410825700371723, 1e-11);
 *
 * ```
 *
 * @example Modified IRR with irregular time periods
 * ```ts
 * import { assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(irr([250000, 25000, -10000, -285000], [0, 45, 69, 90], 90), 0.07692279592283387, 1e-11);
 *
 * ```
 *
 * @example Modified IRR with different calendar days
 * ```ts
 * import { assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(irr([74.2, 37.1, -104.4], [0, 14, 31], 31), -0.07271460953489632, 1e-11);
 * ```
 */
export default function irr(
  cf: array,
  cfd?: array,
  cd?: number,
  guess?: number,
): number {
  const period = cd ?? 1;
  const initial = guess ?? 0.1;
  if (
    !Array.isArray(cf) || cf.length < 2 ||
    !Array.from(cf).every(Number.isFinite) ||
    !cf.some((v) => v < 0) || !cf.some((v) => v > 0)
  ) {
    throw new Error("Cash flows must be finite and contain both signs");
  }
  const days = cfd ?? cf.map((_, i) => i);
  if (
    !Array.isArray(days) || days.length !== cf.length ||
    !Array.from(days).every(Number.isFinite) ||
    !Number.isFinite(period) || period <= 0 || !Number.isFinite(initial) ||
    initial <= -1
  ) {
    throw new Error("Invalid cash flow times, period or initial rate");
  }
  const origin = days.reduce((a, b) => Math.min(a, b), Infinity);
  const times = days.map((d) => (d - origin) / period);
  if (
    !times.every(Number.isFinite) ||
    times.reduce((a, b) => Math.max(a, b), 0) === 0
  ) {
    throw new Error("Cash flows need distinct finite times");
  }
  // Solve in q = log(1+r), which keeps rates above -1. Scale each evaluation
  // by its largest term to avoid overflowing powers on long time horizons.
  const logs = cf.map((v) => Math.log(Math.abs(v)));
  const evaluate = (q: number) => {
    let largest = -Infinity;
    for (let i = 0; i < cf.length; i++) {
      if (cf[i] !== 0) largest = Math.max(largest, logs[i] - times[i] * q);
    }
    let value = 0, derivative = 0, magnitude = 0;
    for (let i = 0; i < cf.length; i++) {
      if (cf[i] !== 0) {
        const term = Math.sign(cf[i]) *
          Math.exp(logs[i] - times[i] * q - largest);
        value += term;
        derivative -= times[i] * term; // d/dq; the equivalent d/dr has an extra 1/(1+r).
        magnitude += Math.abs(term);
      }
    }
    return { value, derivative, magnitude };
  };
  const acceptable = (e: ReturnType<typeof evaluate>) =>
    Number.isFinite(e.value) &&
    e.magnitude > 0 && Math.abs(e.value) <= 1e-13 * e.magnitude;
  const lower = Math.log(Number.EPSILON / 2),
    upper = Math.log(Number.MAX_VALUE);
  const initialQ = Math.log1p(initial);
  const answer = (q: number) => {
    const rate = Math.expm1(q);
    if (
      !Number.isFinite(rate) || rate <= -1 ||
      !acceptable(evaluate(Math.log1p(rate)))
    ) {
      throw new Error("IRR is not representable or failed the residual check");
    }
    return rate;
  };
  let q = initialQ;
  for (let i = 0; i < 80; i++) {
    const e = evaluate(q);
    if (acceptable(e)) return answer(q);
    if (!Number.isFinite(e.derivative) || e.derivative === 0) break;
    const step = Math.max(-1, Math.min(1, e.value / e.derivative));
    const next = q - step;
    if (
      !Number.isFinite(next) || next <= lower || next >= upper || next === q
    ) break;
    q = next;
  }
  // Safeguarded fallback: expand around the supplied guess, then bisect a sign
  // change. Non-conventional cash flows can have several roots; no uniqueness
  // or exhaustive enumeration is promised.
  const center = evaluate(initialQ).value;
  let lo = initialQ, hi = initialQ, flo = center;
  let bracketed = false;
  for (let width = 0.125; width <= 2048; width *= 2) {
    const left = Math.max(lower, initialQ - width),
      right = Math.min(upper, initialQ + width);
    const le = evaluate(left), re = evaluate(right);
    if (acceptable(le)) return answer(left);
    if (acceptable(re)) return answer(right);
    if (Number.isFinite(le.value) && le.value * center < 0) {
      lo = left;
      hi = initialQ;
      flo = le.value;
      bracketed = true;
      break;
    }
    if (Number.isFinite(re.value) && re.value * center < 0) {
      lo = initialQ;
      hi = right;
      flo = center;
      bracketed = true;
      break;
    }
  }
  if (bracketed) {
    for (let i = 0; i < 200; i++) {
      const mid = lo + (hi - lo) / 2;
      const e = evaluate(mid);
      if (acceptable(e)) return answer(mid);
      if (e.value * flo > 0) {
        lo = mid;
        flo = e.value;
      } else hi = mid;
    }
  }
  throw new Error("IRR calculation failed to converge to a real rate above -1");
}
