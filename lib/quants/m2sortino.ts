import type { array, matrix, numarraymatrix } from "../types.d.ts";
import {
  annreturn,
  downsiderisk,
  isarray,
  sortino,
  sqrt,
  vectorfun,
} from "../../index.ts";

/**
 * M-squared for Sortino.
 *
 * M2 calculated for Downside risk instead of Total Risk.
 * It represents the portfolio return adjusted for downside risk relative to the benchmark.
 *
 * @param x asset/portfolio values
 * @param y benchmark values
 * @param frisk free-risk rate (def: 0)
 * @param mar minimum acceptable return (def: 0)
 * @param t frequency of data. 1: yearly, 4: quarterly, 12: monthly, 52: weekly, 252: daily (def: 252)
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return M-squared for Sortino
 *
 * @example Single asset vs benchmark
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 * var y = [-0.005,0.081,0.04,-0.037,-0.061,0.058,-0.049,-0.021,0.062,0.058];
 * assertEquals(m2sortino(x,y,0,0,12), 0.5611427561167748);
 *
 * ```
 *
 * @example Multiple assets vs different benchmark
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 * var y = [-0.005,0.081,0.04,-0.037,-0.061,0.058,-0.049,-0.021,0.062,0.058];
 *
 * var z = [0.04,-0.022,0.043,0.028,-0.078,-0.011,0.033,-0.049,0.09,0.087];
 * assertEquals(m2sortino(x,z,0,0,12), 0.696982403465082);
 * assertEquals(m2sortino(y,z,0,0,12), 0.1603188447030512);
 * ```
 */
export default function m2sortino(
  x: array,
  y: array,
  frisk?: number,
  mar?: number,
  t?: number,
  dim?: 0 | 1,
): number;
/**
 * M-squared for Sortino.
 *
 * M2 calculated for Downside risk instead of Total Risk.
 * It represents the portfolio return adjusted for downside risk relative to the benchmark.
 *
 * @param x asset/portfolio values
 * @param y benchmark values
 * @param frisk free-risk rate (def: 0)
 * @param mar minimum acceptable return (def: 0)
 * @param t frequency of data. 1: yearly, 4: quarterly, 12: monthly, 52: weekly, 252: daily (def: 252)
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return M-squared for Sortino
 *
 * @example Single asset vs benchmark
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 * var y = [-0.005,0.081,0.04,-0.037,-0.061,0.058,-0.049,-0.021,0.062,0.058];
 * assertEquals(m2sortino(x,y,0,0,12), 0.5611427561167748);
 *
 * ```
 *
 * @example Multiple assets vs different benchmark
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 * var y = [-0.005,0.081,0.04,-0.037,-0.061,0.058,-0.049,-0.021,0.062,0.058];
 *
 * var z = [0.04,-0.022,0.043,0.028,-0.078,-0.011,0.033,-0.049,0.09,0.087];
 * assertEquals(m2sortino(x,z,0,0,12), 0.696982403465082);
 * assertEquals(m2sortino(y,z,0,0,12), 0.1603188447030512);
 * ```
 */
export default function m2sortino(
  x: matrix,
  y: array,
  frisk?: number,
  mar?: number,
  t?: number,
  dim?: 0 | 1,
): array | matrix;
/**
 * M-squared for Sortino.
 *
 * M2 calculated for Downside risk instead of Total Risk.
 * It represents the portfolio return adjusted for downside risk relative to the benchmark.
 *
 * @param x asset/portfolio values
 * @param y benchmark values
 * @param frisk free-risk rate (def: 0)
 * @param mar minimum acceptable return (def: 0)
 * @param t frequency of data. 1: yearly, 4: quarterly, 12: monthly, 52: weekly, 252: daily (def: 252)
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return M-squared for Sortino
 *
 * @example Single asset vs benchmark
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 * var y = [-0.005,0.081,0.04,-0.037,-0.061,0.058,-0.049,-0.021,0.062,0.058];
 * assertEquals(m2sortino(x,y,0,0,12), 0.5611427561167748);
 *
 * ```
 *
 * @example Multiple assets vs different benchmark
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 * var y = [-0.005,0.081,0.04,-0.037,-0.061,0.058,-0.049,-0.021,0.062,0.058];
 *
 * var z = [0.04,-0.022,0.043,0.028,-0.078,-0.011,0.033,-0.049,0.09,0.087];
 * assertEquals(m2sortino(x,z,0,0,12), 0.696982403465082);
 * assertEquals(m2sortino(y,z,0,0,12), 0.1603188447030512);
 * ```
 */
export default function m2sortino(
  x: numarraymatrix,
  y: array,
  frisk: number = 0,
  mar: number = 0,
  t: number = 252,
  dim: 0 | 1 = 0,
): number | array | matrix {
  const _m2sortino = function (
    a: array,
    b: array,
    frisk: number,
    mar: number,
    t: number,
  ): number {
    return (annreturn(a, t) as number) +
      (sortino(a, frisk, mar) as number) *
        ((downsiderisk(b, mar) as number) * (sqrt(t) as number) -
          (downsiderisk(a, mar) as number) * (sqrt(t) as number));
  };

  if (!isarray(x) || !isarray(y)) {
    throw new Error("Inputs must be arrays or matrices");
  }

  return vectorfun(dim, x, (a: array) => _m2sortino(a, y, frisk, mar, t));
}
