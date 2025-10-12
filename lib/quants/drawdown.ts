import type { array, matrix, numarraymatrix } from "../types.d.ts";
import {
  cumprod,
  isarray,
  ismatrix,
  log,
  plus,
  vectorfun,
} from "../../index.ts";

interface DrawdownResult {
  dd: array;
  ddrecov: array;
  maxdd: number;
  maxddrecov: [number, number];
}

/**
 * Drawdown.
 *
 * Calculates drawdown from peak, which represents any continuous losing return period.
 * Returns drawdown array, recovery index, maximum drawdown, and maximum drawdown recovery period.
 *
 * Returns an object with:
 * - dd (drawdown array)
 * - ddrecov (drawdown recovery index)
 * - maxdd (max drawdown)
 * - maxddrecov (max drawdown recovery period): [start period, end period]
 *
 * @param x Asset/portfolio returns
 * @param mode Drawdown calculation mode: 'return' or 'geometric' (defaults to 'return')
 * @param dim Dimension to operate on (0: row-wise, 1: column-wise) (defaults to 0)
 * @returns Drawdown information object
 * @throws If input must be an array or matrix
 *
 * @example
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 * import { drawdown } from "../../index.ts";
 *
 * // Example 1: Calculate drawdown metrics for a return series
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * const result = drawdown(x);
 * assertEquals(result.dd, [0, 0, 0, 0.00900000000000004, 0, 0, 0, 0, 0.013999999999999995, 0]);
 * assertEquals(result.ddrecov, [0, 0, 0, 4, 0, 0, 0, 0, 9, 0]);
 * assertEquals(result.maxdd, 0.013999999999999995);
 * assertEquals(result.maxddrecov, [8, 9]);
 *
 * // Example 2: Drawdown with geometric mode
 * assertEquals(drawdown(x, "geometric").maxdd, 0.014098924379501637);
 *
 * // Example 3: Drawdown for multiple assets
 * const y = [-0.005, 0.081, 0.04, -0.037, -0.061, 0.058, -0.049, -0.021, 0.062, 0.058];
 * assertEquals((drawdown([x, y]) as any).length, 2);
 * ```
 */
export default function drawdown(
  x: array,
  mode?: string,
  dim?: 0 | 1,
): DrawdownResult;
export default function drawdown(
  x: matrix,
  mode?: string,
  dim?: 0 | 1,
): DrawdownResult[];
export default function drawdown(
  x: numarraymatrix,
  mode: string = "return",
  dim: 0 | 1 = 0,
): DrawdownResult | DrawdownResult[] {
  const calculateDrawdown = function (a: array, mode: string): DrawdownResult {
    let prices;
    if (mode === "return") {
      prices = cumprod(plus(a, 1));
    } else if (mode === "geometric") {
      prices = log(cumprod(plus(a, 1)));
    } else {
      throw new Error("unknown drawdown mode");
    }

    let highest = prices[0];
    let highestidx = 1;
    const _dd = new Array(prices.length).fill(0);
    const _recov = new Array(prices.length).fill(0);
    let _maxdd = 0;
    const _maxddidx: [number, number] = [1, prices.length];

    for (let i = 0; i < prices.length; i++) {
      if (highest <= prices[i]) {
        highest = prices[i];
        highestidx = i + 1;
      }

      if (mode === "return") {
        _dd[i] = (highest - prices[i]) / highest;
      } else if (mode === "geometric") {
        _dd[i] = highest - prices[i];
      }

      if (_dd[i] !== 0) {
        _recov[i] = i + 1;
      }

      if (_dd[i] > _maxdd) {
        _maxdd = _dd[i];
        _maxddidx[0] = highestidx;
        _maxddidx[1] = i + 1;
      }
    }

    return {
      dd: _dd,
      ddrecov: _recov,
      maxdd: _maxdd,
      maxddrecov: _maxddidx,
    };
  };

  if (!isarray(x) && !ismatrix(x)) {
    throw new Error("Input must be an array or matrix");
  }

  return vectorfun(dim, x, (a: array) => calculateDrawdown(a, mode)) as
    | DrawdownResult
    | DrawdownResult[];
}
