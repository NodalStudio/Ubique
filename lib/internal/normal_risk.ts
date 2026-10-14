import type { numarraymatrix } from "../types.d.ts";

/** Shape-preserving normal loss estimates with explicit finite-domain checks. */
export function normalRisk(
  mu: numarraymatrix,
  sigma: numarraymatrix,
  p: number,
  amount: number,
  period: number,
  multiplier: number,
): numarraymatrix {
  if (
    !Number.isFinite(p) || p <= 0 || p >= 1 ||
    !Number.isFinite(amount) || amount < 0 ||
    !Number.isFinite(period) || period <= 0
  ) {
    throw new RangeError(
      "Require 0 < p < 1, amount >= 0, and period > 0 (finite)",
    );
  }
  const visit = (mean: unknown, deviation: unknown): unknown => {
    if (Array.isArray(mean)) {
      if (
        !Array.isArray(deviation) || mean.length !== deviation.length ||
        !mean.length
      ) {
        throw new Error(
          "Mean and standard deviation must have the same nonempty shape",
        );
      }
      return mean.map((v, i) => visit(v, deviation[i]));
    }
    if (
      typeof mean !== "number" || !Number.isFinite(mean) ||
      typeof deviation !== "number" || !Number.isFinite(deviation) ||
      deviation < 0
    ) {
      throw new RangeError(
        "Means must be finite; standard deviations must be finite and nonnegative",
      );
    }
    return (deviation * Math.sqrt(period) * multiplier - mean * period) *
      amount;
  };
  return visit(mu, sigma) as numarraymatrix;
}
