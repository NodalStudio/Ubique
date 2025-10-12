import type { array } from "../types.d.ts";
import { sum, times } from "../../index.ts";

/**
 * Linear regression of Y on X.
 *
 * Performs linear regression and returns an object with regression coefficients,
 * R-squared value, and a prediction function.
 *
 * @param y array of dependent variable values
 * @param x array of independent variable values
 * @return Object with beta (slope), alpha (intercept), rsq (R-squared), and prediction function
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Basic linear regression
 * const x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 * const y = [-0.005,0.081,0.04,-0.037,-0.061,0.058,-0.049,-0.021,0.062,0.058];
 * const result = linearreg(y,x);
 * assertEquals(Math.round(result.beta * 1000) / 1000, 0.119);
 * assertEquals(Math.round(result.alpha * 1000) / 1000, 0.01);
 *
 * // Example 2: Linear regression with stronger correlation
 * const result2 = linearreg([100,101,99,102,105],[1,2,3,4,5]);
 * assertEquals(result2.beta, 1.1);
 * assertEquals(result2.alpha, 98.1);
 *
 * // Example 3: Using the prediction function
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

  const n = y.length;
  const sx = sum(x);
  const sy = sum(y);
  const sxy = sum(times(x, y));
  const sxx = sum(times(x, x));
  const syy = sum(times(y, y));

  const beta = (n * sxy - sx * sy) / (n * sxx - sx * sx);
  const alpha = (sy - beta * sx) / n;
  const rsq = Math.pow(
    (n * sxy - sx * sy) / Math.sqrt((n * sxx - sx * sx) * (n * syy - sy * sy)),
    2,
  );

  return {
    beta,
    alpha,
    rsq,
    fun: (x: number) => beta * x + alpha,
  };
}
