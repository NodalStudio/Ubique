import type { array } from "../types.d.ts";

/**
 * Linear regression of Y on X.
 *
 * Performs linear regression and returns an object with regression coefficients,
 * R-squared value, and a prediction function.
 *
 * @param y array of dependent variable values
 * @param x array of independent variable values
 * @throws On mismatched/nonfinite input, constant predictors or overflowing moments
 * @return Object with beta (slope), alpha (intercept), rsq (R-squared), and prediction function
 *
 * @example Basic linear regression
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * const x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 * const y = [-0.005,0.081,0.04,-0.037,-0.061,0.058,-0.049,-0.021,0.062,0.058];
 * const result = linearreg(y,x);
 * assertEquals(Math.round(result.beta * 1000) / 1000, 0.119);
 * assertEquals(Math.round(result.alpha * 1000) / 1000, 0.01);
 *
 * ```
 *
 * @example Linear regression with stronger correlation
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * const result2 = linearreg([100,101,99,102,105],[1,2,3,4,5]);
 * assertEquals(result2.beta, 1.1);
 * assertAlmostEquals(result2.alpha, 98.1, 1e-12);
 *
 * ```
 *
 * @example Using the prediction function
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * const result2 = linearreg([100,101,99,102,105],[1,2,3,4,5]);
 *
 * assertEquals(Math.round(result2.fun(6) * 10) / 10, 104.7);
 * ```
 */
export default function linearreg(y: array, x: array): {
  beta: number;
  alpha: number;
  rsq: number;
  fun: (x: number) => number;
} {
  if (arguments.length < 2) {
    throw new Error("not enough input arguments");
  }

  const n = y?.length;
  if (
    !Array.isArray(x) || !Array.isArray(y) || n < 2 || x.length !== n ||
    !Array.from(x).every(Number.isFinite) ||
    !Array.from(y).every(Number.isFinite)
  ) {
    throw new Error(
      "Regression requires equal finite arrays with at least two observations",
    );
  }
  // Shift before averaging: small differences remain accurate around a large
  // origin (timestamps, prices, coordinates). Then center the differences.
  const originX = x[0], originY = y[0];
  let meanDX = 0, meanDY = 0;
  for (let i = 0; i < n; i++) {
    meanDX += (x[i] - originX) / n;
    meanDY += (y[i] - originY) / n;
  }
  let xx = 0, xy = 0, yy = 0;
  for (let i = 0; i < n; i++) {
    const dx = (x[i] - originX) - meanDX, dy = (y[i] - originY) - meanDY;
    xx += dx * dx;
    xy += dx * dy;
    yy += dy * dy;
  }
  if (!Number.isFinite(xx) || !Number.isFinite(xy) || !Number.isFinite(yy)) {
    throw new Error("Regression moments exceed the finite f64 range");
  }
  if (xx === 0) {
    throw new Error("Regression is undefined for a constant predictor");
  }
  const beta = xy / xx;
  const meanY = originY + meanDY;
  const alpha = meanY - beta * (originX + meanDX);
  // R² is undefined when the observed response has zero variance.
  const correlation = yy === 0 ? NaN : xy / Math.sqrt(xx) / Math.sqrt(yy);
  const rsq = Math.min(1, Math.max(0, correlation * correlation));
  return {
    beta,
    alpha,
    rsq,
    fun: (value: number) => meanY + beta * ((value - originX) - meanDX),
  };
}
