import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { isarray, ismatrix, vectorfun } from "../../index.ts";

/**
 * Computes the Continuous Drawdown.
 *
 * Computes continuous drawdowns for an asset/portfolio.
 * A drawdown occurs when returns are negative in a sequence.
 *
 * @param x Asset/portfolio returns
 * @param dim Dimension to operate on (0: row-wise, 1: column-wise)
 * @returns The computed continuous drawdowns
 * @throws If the input is invalid
 *
 * @example Continuous drawdown for a single asset
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assertEquals(cdrawdown(x), [0, 0, 0, 0.009, 0.009, 0.009, 0.009, 0.009, 0.014, 0.014]);
 *
 * ```
 *
 * @example Continuous drawdown for multiple assets (matrix)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const x1 = [0.003, 0.026, 0.015, -0.009, 0.014];
 * const x2 = [0.024, 0.015, 0.066, -0.014, 0.039];
 * assertEquals(cdrawdown([x1, x2]), [[0, 0, 0, 0.009, 0.009], [0, 0, 0, 0.014, 0.014]]);
 *
 * ```
 *
 * @example Continuous drawdown with more negative returns
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const y = [-0.01, -0.02, 0.05, -0.03];
 * assertEquals(cdrawdown(y), [0.01, 0.03, 0.03, 0.03]);
 * ```
 */
export default function cdrawdown(x: array, dim?: 0 | 1): array;
/**
 * Computes the Continuous Drawdown.
 *
 * Computes continuous drawdowns for an asset/portfolio.
 * A drawdown occurs when returns are negative in a sequence.
 *
 * @param x Asset/portfolio returns
 * @param dim Dimension to operate on (0: row-wise, 1: column-wise)
 * @returns The computed continuous drawdowns
 * @throws If the input is invalid
 *
 * @example Continuous drawdown for a single asset
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assertEquals(cdrawdown(x), [0, 0, 0, 0.009, 0.009, 0.009, 0.009, 0.009, 0.014, 0.014]);
 *
 * ```
 *
 * @example Continuous drawdown for multiple assets (matrix)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const x1 = [0.003, 0.026, 0.015, -0.009, 0.014];
 * const x2 = [0.024, 0.015, 0.066, -0.014, 0.039];
 * assertEquals(cdrawdown([x1, x2]), [[0, 0, 0, 0.009, 0.009], [0, 0, 0, 0.014, 0.014]]);
 *
 * ```
 *
 * @example Continuous drawdown with more negative returns
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const y = [-0.01, -0.02, 0.05, -0.03];
 * assertEquals(cdrawdown(y), [0.01, 0.03, 0.03, 0.03]);
 * ```
 */
export default function cdrawdown(x: matrix, dim?: 0 | 1): array | matrix;
/**
 * Computes the Continuous Drawdown.
 *
 * Computes continuous drawdowns for an asset/portfolio.
 * A drawdown occurs when returns are negative in a sequence.
 *
 * @param x Asset/portfolio returns
 * @param dim Dimension to operate on (0: row-wise, 1: column-wise)
 * @returns The computed continuous drawdowns
 * @throws If the input is invalid
 *
 * @example Continuous drawdown for a single asset
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assertEquals(cdrawdown(x), [0, 0, 0, 0.009, 0.009, 0.009, 0.009, 0.009, 0.014, 0.014]);
 *
 * ```
 *
 * @example Continuous drawdown for multiple assets (matrix)
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const x1 = [0.003, 0.026, 0.015, -0.009, 0.014];
 * const x2 = [0.024, 0.015, 0.066, -0.014, 0.039];
 * assertEquals(cdrawdown([x1, x2]), [[0, 0, 0, 0.009, 0.009], [0, 0, 0, 0.014, 0.014]]);
 *
 * ```
 *
 * @example Continuous drawdown with more negative returns
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const y = [-0.01, -0.02, 0.05, -0.03];
 * assertEquals(cdrawdown(y), [0.01, 0.03, 0.03, 0.03]);
 * ```
 */
export default function cdrawdown(
  x: numarraymatrix,
  dim: 0 | 1 = 0,
): array | matrix {
  if (!isarray(x) && !ismatrix(x)) {
    throw new Error("Input must be an array or matrix");
  }

  return vectorfun(dim, x, computeContinuousDrawdown);
}

function computeContinuousDrawdown(returns: array): array {
  return returns.reduce(
    (
      {
        drawdowns,
        drawdown,
        max,
      }: { drawdowns: array; drawdown: number; max: number },
      value: number,
    ) => {
      const newDrawdown = Math.min(drawdown + value, 0);
      const newMax = Math.min(max, newDrawdown);

      return {
        drawdowns: [...drawdowns, -newMax],
        drawdown: newDrawdown,
        max: newMax,
      };
    },
    { drawdowns: [], drawdown: 0, max: 0 },
  ).drawdowns;
}
