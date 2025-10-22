import type { array, matrix, numarraymatrix } from "../types.d.ts";
import { clone, cumprod, isnumber, plus, vectorfun } from "../../index.ts";

/**
 * Simple Rate of Return.
 *
 * Simple rate of return calculated from the last and the first value of
 * an array of numbers. Can work with return series or cumulative value series.
 *
 * @param x array or matrix of returns or values
 * @param mode mode of values, 'ret' for returns, 'cum' for cumulative (def: 'ret')
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return Simple Rate of Return
 *
 * @example Simple rate of return on return series
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 * assertEquals(ror(x), 0.18779277315203946);
 *
 * ```
 *
 * @example Rate of return on cumulative value series
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(ror([100,101,99,98,97,102,103,104],'cum'), 0.040000000000000036);
 *
 * ```
 *
 * @example Rate of return on multiple series
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 *
 * var y = [-0.005,0.081,0.04,-0.037,-0.061,0.058,-0.049,-0.021,0.062,0.058];
 * assertEquals(ror(x,'ret'), 0.18779277315203946);
 * assertEquals(ror(y,'ret'), 0.12514883159358225);
 * ```
 */
export default function ror(
  x: array,
  mode?: string,
  dim?: 0 | 1,
): number;
/**
 * Simple Rate of Return.
 *
 * Simple rate of return calculated from the last and the first value of
 * an array of numbers. Can work with return series or cumulative value series.
 *
 * @param x array or matrix of returns or values
 * @param mode mode of values, 'ret' for returns, 'cum' for cumulative (def: 'ret')
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return Simple Rate of Return
 *
 * @example Simple rate of return on return series
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 * assertEquals(ror(x), 0.18779277315203946);
 *
 * ```
 *
 * @example Rate of return on cumulative value series
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(ror([100,101,99,98,97,102,103,104],'cum'), 0.040000000000000036);
 *
 * ```
 *
 * @example Rate of return on multiple series
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 *
 * var y = [-0.005,0.081,0.04,-0.037,-0.061,0.058,-0.049,-0.021,0.062,0.058];
 * assertEquals(ror(x,'ret'), 0.18779277315203946);
 * assertEquals(ror(y,'ret'), 0.12514883159358225);
 * ```
 */
export default function ror(
  x: matrix,
  mode?: string,
  dim?: 0 | 1,
): array | matrix;
/**
 * Simple Rate of Return.
 *
 * Simple rate of return calculated from the last and the first value of
 * an array of numbers. Can work with return series or cumulative value series.
 *
 * @param x array or matrix of returns or values
 * @param mode mode of values, 'ret' for returns, 'cum' for cumulative (def: 'ret')
 * @param dim dimension 0: row, 1: column (def: 0)
 * @return Simple Rate of Return
 *
 * @example Simple rate of return on return series
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 * assertEquals(ror(x), 0.18779277315203946);
 *
 * ```
 *
 * @example Rate of return on cumulative value series
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * assertEquals(ror([100,101,99,98,97,102,103,104],'cum'), 0.040000000000000036);
 *
 * ```
 *
 * @example Rate of return on multiple series
 * ```ts
 * import { assertEquals } from "jsr:@std/assert";
 *
 * var x = [0.003,0.026,0.015,-0.009,0.014,0.024,0.015,0.066,-0.014,0.039];
 *
 * var y = [-0.005,0.081,0.04,-0.037,-0.061,0.058,-0.049,-0.021,0.062,0.058];
 * assertEquals(ror(x,'ret'), 0.18779277315203946);
 * assertEquals(ror(y,'ret'), 0.12514883159358225);
 * ```
 */
export default function ror(
  x: numarraymatrix,
  mode: string = "ret",
  dim: 0 | 1 = 0,
): number | array | matrix {
  const _ror = function (a: array, mode: string): number {
    let eq;
    if (mode === "ret") {
      eq = cumprod(plus(1, a)) as array;
    } else if (mode === "cum") {
      eq = clone(a) as array;
    } else {
      throw new Error("unknown value");
    }
    return eq[eq.length - 1] / eq[0] - 1;
  };

  if (isnumber(x)) {
    return NaN;
  }

  return vectorfun(dim, x, _ror, mode);
}
