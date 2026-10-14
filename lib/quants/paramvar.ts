import type { array, matrix } from "../types.d.ts";
import { norminv } from "../../index.ts";
import { normalRisk } from "../internal/normal_risk.ts";

/**
 * Parametric Value-At-Risk.
 *
 * Parametric Value-At-Risk assuming returns are normally distributed.
 * It can work with numbers, arrays, row vectors, and column vectors.
 *
 * Normal loss model: mean scales with period, volatility with sqrt(period).
 * Positive results represent losses; negative results are possible. Shapes are preserved.
 *
 * @param mu mean value (def: 0)
 * @param sigma standard deviation (def: 1)
 * @param p VaR confidence level in range (0,1) (def: 0.95)
 * @param amount portfolio/asset amount (def: 1)
 * @param period time horizon (def: 1)
 * @return Parametric Value-At-Risk
 *
 * @example VaR with default parameters
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(paramvar(0, 1), 1.6448536269514722, 8.224268134757361e-13);
 *
 * ```
 *
 * @example VaR with arrays
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * const expected = [1.6448536269514722, 3.2897072539029444, 4.934560880854417];
 * paramvar([0, 0, 0], [1, 2, 3]).forEach((v, i) => assertAlmostEquals(v, expected[i], 3e-12));
 *
 * ```
 *
 * @example Parametric VaR for a single asset
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(paramvar(0.0179, 0.023230487630602065), 0.020310751835047117, 1.0155375917523558e-14);
 * ```
 */
export default function paramvar(
  mu: number,
  sigma: number,
  p?: number,
  amount?: number,
  period?: number,
): number;
/**
 * Parametric Value-At-Risk.
 *
 * Parametric Value-At-Risk assuming returns are normally distributed.
 * It can work with numbers, arrays, row vectors, and column vectors.
 *
 * Normal loss model: mean scales with period, volatility with sqrt(period).
 * Positive results represent losses; negative results are possible. Shapes are preserved.
 *
 * @param mu mean value (def: 0)
 * @param sigma standard deviation (def: 1)
 * @param p VaR confidence level in range (0,1) (def: 0.95)
 * @param amount portfolio/asset amount (def: 1)
 * @param period time horizon (def: 1)
 * @return Parametric Value-At-Risk
 *
 * @example VaR with default parameters
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(paramvar(0, 1), 1.6448536269514722, 8.224268134757361e-13);
 *
 * ```
 *
 * @example VaR with arrays
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * const expected = [1.6448536269514722, 3.2897072539029444, 4.934560880854417];
 * paramvar([0, 0, 0], [1, 2, 3]).forEach((v, i) => assertAlmostEquals(v, expected[i], 3e-12));
 *
 * ```
 *
 * @example Parametric VaR for a single asset
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(paramvar(0.0179, 0.023230487630602065), 0.020310751835047117, 1.0155375917523558e-14);
 * ```
 */
export default function paramvar(
  mu: array,
  sigma: array,
  p?: number,
  amount?: number,
  period?: number,
): array;
/**
 * Parametric Value-At-Risk.
 *
 * Parametric Value-At-Risk assuming returns are normally distributed.
 * It can work with numbers, arrays, row vectors, and column vectors.
 *
 * Normal loss model: mean scales with period, volatility with sqrt(period).
 * Positive results represent losses; negative results are possible. Shapes are preserved.
 *
 * @param mu mean value (def: 0)
 * @param sigma standard deviation (def: 1)
 * @param p VaR confidence level in range (0,1) (def: 0.95)
 * @param amount portfolio/asset amount (def: 1)
 * @param period time horizon (def: 1)
 * @return Parametric Value-At-Risk
 *
 * @example VaR with default parameters
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(paramvar(0, 1), 1.6448536269514722, 8.224268134757361e-13);
 *
 * ```
 *
 * @example VaR with arrays
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * const expected = [1.6448536269514722, 3.2897072539029444, 4.934560880854417];
 * paramvar([0, 0, 0], [1, 2, 3]).forEach((v, i) => assertAlmostEquals(v, expected[i], 3e-12));
 *
 * ```
 *
 * @example Parametric VaR for a single asset
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(paramvar(0.0179, 0.023230487630602065), 0.020310751835047117, 1.0155375917523558e-14);
 * ```
 */
export default function paramvar(
  mu: matrix,
  sigma: matrix,
  p?: number,
  amount?: number,
  period?: number,
): array | matrix;
/**
 * Parametric Value-At-Risk.
 *
 * Parametric Value-At-Risk assuming returns are normally distributed.
 * It can work with numbers, arrays, row vectors, and column vectors.
 *
 * Normal loss model: mean scales with period, volatility with sqrt(period).
 * Positive results represent losses; negative results are possible. Shapes are preserved.
 *
 * @param mu mean value (def: 0)
 * @param sigma standard deviation (def: 1)
 * @param p VaR confidence level in range (0,1) (def: 0.95)
 * @param amount portfolio/asset amount (def: 1)
 * @param period time horizon (def: 1)
 * @return Parametric Value-At-Risk
 *
 * @example VaR with default parameters
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(paramvar(0, 1), 1.6448536269514722, 8.224268134757361e-13);
 *
 * ```
 *
 * @example VaR with arrays
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * const expected = [1.6448536269514722, 3.2897072539029444, 4.934560880854417];
 * paramvar([0, 0, 0], [1, 2, 3]).forEach((v, i) => assertAlmostEquals(v, expected[i], 3e-12));
 *
 * ```
 *
 * @example Parametric VaR for a single asset
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(paramvar(0.0179, 0.023230487630602065), 0.020310751835047117, 1.0155375917523558e-14);
 * ```
 */
export default function paramvar(
  mu: number | array | matrix,
  sigma: number | array | matrix,
  p: number = 0.95,
  amount: number = 1,
  period: number = 1,
): number | array | matrix {
  return normalRisk(mu, sigma, p, amount, period, -norminv(1 - p));
}
