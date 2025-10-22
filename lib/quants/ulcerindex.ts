import type { array, matrix } from "../types.d.ts";
import { drawdown, power, sqrt, sum, vectorfun } from "../../index.ts";

/**
 * Ulcer Index.
 *
 * Ulcer Index of Peter G. Martin (1987). The impact of long, deep drawdowns will have significant
 * impact because the underperformance since the last peak is squared.
 * The formula is: sqrt(sum(dd^2) / n), where dd is the drawdown and n is the number of observations.
 *
 * @param x Asset/portfolio returns
 * @param mode Drawdown calculation mode: 'return' or 'geometric' (defaults to 'return')
 * @param dim Dimension to operate on (0: row-wise, 1: column-wise) (defaults to 0)
 * @returns Ulcer Index
 * @throws If input is a number (not supported)
 *
 * @example Single array of returns
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 * assertEquals(ulcerindex(x), 0.005263078946776312);
 *
 * ```
 *
 * @example Matrix of returns with column dimension
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const xt = [[0.003, 0.026], [0.015, -0.009], [0.014, 0.024], [0.015, 0.066], [-0.014, 0.039]];
 * assertEquals(ulcerindex(xt, 'return', 1), [0.006260990336999415, 0.004024922359499606]);
 *
 * ```
 *
 * @example Ulcer index with geometric mode
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * const x = [0.003, 0.026, 0.015, -0.009, 0.014, 0.024, 0.015, 0.066, -0.014, 0.039];
 *
 * assertEquals(ulcerindex(x, 'geometric'), 0.005296364154061427);
 * ```
 */
export default function ulcerindex(
  x: array,
  mode?: "return" | "geometric",
  dim?: 0 | 1,
): number;
export default function ulcerindex(
  x: matrix,
  mode?: "return" | "geometric",
  dim?: 0 | 1,
): array | matrix;
export default function ulcerindex(
  x: array | matrix,
  mode: "return" | "geometric" = "return",
  dim: 0 | 1 = 0,
): number | array | matrix {
  const _uidx = function (a: array, mode: string): number {
    const dd = drawdown(a, mode).dd;
    const n = a.length;
    return sqrt(sum(power(dd, 2)) / n);
  };

  return vectorfun(dim, x, _uidx, mode);
}
