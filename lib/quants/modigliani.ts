import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { isarray, mean, sharpe, std, vectorfun } from "../../index.ts";

/**
 * Modigliani-Modigliani measure (M2).
 *
 * The Modigliani-Modigliani measure (M2) is a risk-adjusted performance
 * measure that represents the return a portfolio would have achieved if it had taken
 * the same risk as the benchmark.
 *
 * @param x asset/portfolio values
 * @param y benchmark values
 * @param frisk free-risk rate (def: 0)
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return Modigliani-Modigliani measure
 *
 * @example Modigliani measure for a single asset vs benchmark
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 * var y = [-0.005,0.081,0.04,-0.037,-0.061,0.058,-0.049,-0.021,0.062,0.058];
 * assertEquals(modigliani(x,y), 0.04069406485838784);
 *
 * ```
 *
 * @example Modigliani measure for multiple assets vs benchmark
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 * var y = [-0.005,0.081,0.04,-0.037,-0.061,0.058,-0.049,-0.021,0.062,0.058];
 *
 * var z = [0.04,-0.022,0.043,0.028,-0.078,-0.011,0.033,-0.049,0.09,0.087];
 * assertEquals(modigliani(x,z), 0.042584556714225126);
 * assertEquals(modigliani(y,z), 0.013185348194299146);
 * ```
 */
export default function modigliani(
  x: array,
  y: array,
  frisk?: number,
  dim?: 0 | 1,
): number;
/**
 * Modigliani-Modigliani measure (M2).
 *
 * The Modigliani-Modigliani measure (M2) is a risk-adjusted performance
 * measure that represents the return a portfolio would have achieved if it had taken
 * the same risk as the benchmark.
 *
 * @param x asset/portfolio values
 * @param y benchmark values
 * @param frisk free-risk rate (def: 0)
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return Modigliani-Modigliani measure
 *
 * @example Modigliani measure for a single asset vs benchmark
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 * var y = [-0.005,0.081,0.04,-0.037,-0.061,0.058,-0.049,-0.021,0.062,0.058];
 * assertEquals(modigliani(x,y), 0.04069406485838784);
 *
 * ```
 *
 * @example Modigliani measure for multiple assets vs benchmark
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 * var y = [-0.005,0.081,0.04,-0.037,-0.061,0.058,-0.049,-0.021,0.062,0.058];
 *
 * var z = [0.04,-0.022,0.043,0.028,-0.078,-0.011,0.033,-0.049,0.09,0.087];
 * assertEquals(modigliani(x,z), 0.042584556714225126);
 * assertEquals(modigliani(y,z), 0.013185348194299146);
 * ```
 */
export default function modigliani(
  x: matrix,
  y: array,
  frisk?: number,
  dim?: 0 | 1,
): array | matrix;
/**
 * Modigliani-Modigliani measure (M2).
 *
 * The Modigliani-Modigliani measure (M2) is a risk-adjusted performance
 * measure that represents the return a portfolio would have achieved if it had taken
 * the same risk as the benchmark.
 *
 * @param x asset/portfolio values
 * @param y benchmark values
 * @param frisk free-risk rate (def: 0)
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return Modigliani-Modigliani measure
 *
 * @example Modigliani measure for a single asset vs benchmark
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 * var y = [-0.005,0.081,0.04,-0.037,-0.061,0.058,-0.049,-0.021,0.062,0.058];
 * assertEquals(modigliani(x,y), 0.04069406485838784);
 *
 * ```
 *
 * @example Modigliani measure for multiple assets vs benchmark
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 * var y = [-0.005,0.081,0.04,-0.037,-0.061,0.058,-0.049,-0.021,0.062,0.058];
 *
 * var z = [0.04,-0.022,0.043,0.028,-0.078,-0.011,0.033,-0.049,0.09,0.087];
 * assertEquals(modigliani(x,z), 0.042584556714225126);
 * assertEquals(modigliani(y,z), 0.013185348194299146);
 * ```
 */
export default function modigliani(
  x: numarraymatrix,
  y: array,
  frisk: number = 0,
  dim: 0 | 1 = 0,
): number | array | matrix {
  const _modigliani = function (a: array, b: array, frisk: number): number {
    return (mean(a) as number) +
      (sharpe(a, frisk) as number) * ((std(b) as number) - (std(a) as number));
  };

  if (!isarray(x) || !isarray(y)) {
    throw new Error("Inputs must be arrays or matrices");
  }

  return vectorfun(dim, x, (a: array) => _modigliani(a, y, frisk));
}
