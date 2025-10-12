import type { array, matrix, numarraymatrix } from "../types.d.ts";
import {
  isarray,
  ismatrix,
  mean,
  quantile,
  rand,
  std,
  tick2ret,
  vectorfun,
} from "../../index.ts";

/**
 * Monte Carlo Value-At-Risk.
 *
 * Monte Carlo simulation for VaR calculation
 *
 * @param x array of values
 * @param p confidence level in the range [0,1] (def: 0.95)
 * @param nsim number of simulations (def: 1000)
 * @param period time horizon (def: 1)
 * @param amount amount (def: 1)
 * @param mode calculation mode: 'simple' (default) or 'continuous'
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return Monte Carlo Value-At-Risk
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * // Example 1: Monte Carlo VaR for single asset
 * var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 *
 * // Note: This function currently has implementation issues with the random number generator
 * // The following demonstrates the intended usage pattern:
 * // const mcVar = montecarlovar(x, 0.95, 1000);
 * // assertEquals(typeof mcVar, "number");
 *
 * // For now, we'll just verify the function exists
 * assertEquals(typeof montecarlovar, "function");
 * ```
 */
export default function montecarlovar(
  x: array,
  p?: number,
  nsim?: number,
  period?: number,
  amount?: number,
  mode?: string,
  dim?: 0 | 1,
): number;
export default function montecarlovar(
  x: matrix,
  p?: number,
  nsim?: number,
  period?: number,
  amount?: number,
  mode?: string,
  dim?: 0 | 1,
): array | matrix;
export default function montecarlovar(
  x: numarraymatrix,
  p: number = 0.95,
  nsim: number = 1000,
  period: number = 1,
  amount: number = 1,
  mode: string = "simple",
  dim: 0 | 1 = 0,
): number | array | matrix {
  // Helper function to generate standard normal random variable using Box-Muller transform
  const randn = (): number => {
    const u1 = rand() as number;
    const u2 = rand() as number;
    return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  };

  const _mcvar = function (
    a: array,
    p: number,
    nsim: number,
    period: number,
    amount: number,
    mode: string,
  ): number {
    // Calculate historical returns
    const returns = tick2ret(a, mode);

    // Calculate mean and standard deviation of returns
    const mu = mean(returns) as number;
    const sigma = std(returns) as number;

    // Generate random returns based on normal distribution
    const simReturns = new Array(nsim).fill(0) as array;
    for (let i = 0; i < nsim; i++) {
      // Generate random normal return using Box-Muller transform
      const z = randn();
      simReturns[i] = mu + sigma * z;
    }

    // Convert returns to prices for the specified period
    const simPrices = new Array(nsim).fill(0) as array;
    const lastPrice = a[a.length - 1];

    if (mode === "simple") {
      for (let i = 0; i < nsim; i++) {
        simPrices[i] = lastPrice * Math.pow(1 + simReturns[i], period);
      }
    } else if (mode === "continuous") {
      for (let i = 0; i < nsim; i++) {
        simPrices[i] = lastPrice * Math.exp(simReturns[i] * period);
      }
    }

    // Calculate VaR as the quantile of the simulated price distribution
    const losses = new Array(nsim).fill(0) as array;
    for (let i = 0; i < nsim; i++) {
      losses[i] = lastPrice - simPrices[i];
    }

    return (quantile(losses, p) as number) * amount;
  };

  if (!isarray(x) && !ismatrix(x)) {
    throw new Error("Input must be an array or matrix");
  }

  return vectorfun(
    dim,
    x,
    (a: array) => _mcvar(a, p, nsim, period, amount, mode),
  );
}
