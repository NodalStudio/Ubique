import type { array, matrix } from "../types.d.ts";
import { norminv, normpdf } from "../../index.ts";
import { normalRisk } from "../internal/normal_risk.ts";

/**
 * Parametric Conditional Value-At-Risk.
 *
 * Parametric Conditional Value-At-Risk measures the expected loss
 * exceeding the VaR. Also known as Expected Shortfall (ES) or Expected Tail Loss (ETL).
 * It is more sensitive to the shape of the loss distribution in the tails.
 *
 * Normal loss model: mean scales with period, volatility with sqrt(period).
 * Positive results represent losses; negative results are possible. Shapes are preserved.
 *
 * @param mu mean value (def: 0)
 * @param sigma standard deviation (def: 1)
 * @param p cVaR confidence level in range (0,1) (def: 0.95)
 * @param amount portfolio/asset amount (def: 1)
 * @param period time horizon (def: 1)
 * @return Parametric Conditional Value-At-Risk
 *
 * @example Parametric daily CVaR with mean and std
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(paramcondvar(0.0179, 0.023230487630602065), 0.030017824360285716, 1.5008912180142857e-14);
 *
 * ```
 *
 * @example Parametric CVaR with additional parameters
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(paramcondvar(0.0179, 0.023230487630602065, 0.99, 100000, 10), 1678.99736588952, 8.3949868294476e-10);
 *
 * ```
 *
 * @example Different asset parameters
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(paramcondvar(0.01125, 0.04727061065899899, 0.99, 100000, 10), 28590.3673781403, 1.429518368907015e-08);
 * ```
 */
export default function paramcondvar(
  mu: number,
  sigma: number,
  p?: number,
  amount?: number,
  period?: number,
): number;
/**
 * Parametric Conditional Value-At-Risk.
 *
 * Parametric Conditional Value-At-Risk measures the expected loss
 * exceeding the VaR. Also known as Expected Shortfall (ES) or Expected Tail Loss (ETL).
 * It is more sensitive to the shape of the loss distribution in the tails.
 *
 * Normal loss model: mean scales with period, volatility with sqrt(period).
 * Positive results represent losses; negative results are possible. Shapes are preserved.
 *
 * @param mu mean value (def: 0)
 * @param sigma standard deviation (def: 1)
 * @param p cVaR confidence level in range (0,1) (def: 0.95)
 * @param amount portfolio/asset amount (def: 1)
 * @param period time horizon (def: 1)
 * @return Parametric Conditional Value-At-Risk
 *
 * @example Parametric daily CVaR with mean and std
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(paramcondvar(0.0179, 0.023230487630602065), 0.030017824360285716, 1.5008912180142857e-14);
 *
 * ```
 *
 * @example Parametric CVaR with additional parameters
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(paramcondvar(0.0179, 0.023230487630602065, 0.99, 100000, 10), 1678.99736588952, 8.3949868294476e-10);
 *
 * ```
 *
 * @example Different asset parameters
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(paramcondvar(0.01125, 0.04727061065899899, 0.99, 100000, 10), 28590.3673781403, 1.429518368907015e-08);
 * ```
 */
export default function paramcondvar(
  mu: array,
  sigma: array,
  p?: number,
  amount?: number,
  period?: number,
): array;
/**
 * Parametric Conditional Value-At-Risk.
 *
 * Parametric Conditional Value-At-Risk measures the expected loss
 * exceeding the VaR. Also known as Expected Shortfall (ES) or Expected Tail Loss (ETL).
 * It is more sensitive to the shape of the loss distribution in the tails.
 *
 * Normal loss model: mean scales with period, volatility with sqrt(period).
 * Positive results represent losses; negative results are possible. Shapes are preserved.
 *
 * @param mu mean value (def: 0)
 * @param sigma standard deviation (def: 1)
 * @param p cVaR confidence level in range (0,1) (def: 0.95)
 * @param amount portfolio/asset amount (def: 1)
 * @param period time horizon (def: 1)
 * @return Parametric Conditional Value-At-Risk
 *
 * @example Parametric daily CVaR with mean and std
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(paramcondvar(0.0179, 0.023230487630602065), 0.030017824360285716, 1.5008912180142857e-14);
 *
 * ```
 *
 * @example Parametric CVaR with additional parameters
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(paramcondvar(0.0179, 0.023230487630602065, 0.99, 100000, 10), 1678.99736588952, 8.3949868294476e-10);
 *
 * ```
 *
 * @example Different asset parameters
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(paramcondvar(0.01125, 0.04727061065899899, 0.99, 100000, 10), 28590.3673781403, 1.429518368907015e-08);
 * ```
 */
export default function paramcondvar(
  mu: matrix,
  sigma: matrix,
  p?: number,
  amount?: number,
  period?: number,
): array | matrix;
/**
 * Parametric Conditional Value-At-Risk.
 *
 * Parametric Conditional Value-At-Risk measures the expected loss
 * exceeding the VaR. Also known as Expected Shortfall (ES) or Expected Tail Loss (ETL).
 * It is more sensitive to the shape of the loss distribution in the tails.
 *
 * Normal loss model: mean scales with period, volatility with sqrt(period).
 * Positive results represent losses; negative results are possible. Shapes are preserved.
 *
 * @param mu mean value (def: 0)
 * @param sigma standard deviation (def: 1)
 * @param p cVaR confidence level in range (0,1) (def: 0.95)
 * @param amount portfolio/asset amount (def: 1)
 * @param period time horizon (def: 1)
 * @return Parametric Conditional Value-At-Risk
 *
 * @example Parametric daily CVaR with mean and std
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(paramcondvar(0.0179, 0.023230487630602065), 0.030017824360285716, 1.5008912180142857e-14);
 *
 * ```
 *
 * @example Parametric CVaR with additional parameters
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(paramcondvar(0.0179, 0.023230487630602065, 0.99, 100000, 10), 1678.99736588952, 8.3949868294476e-10);
 *
 * ```
 *
 * @example Different asset parameters
 * ```ts
 * import { assertEquals, assertAlmostEquals } from "jsr:@std/assert";
 *
 * assertAlmostEquals(paramcondvar(0.01125, 0.04727061065899899, 0.99, 100000, 10), 28590.3673781403, 1.429518368907015e-08);
 * ```
 */
export default function paramcondvar(
  mu: number | array | matrix,
  sigma: number | array | matrix,
  p: number = 0.95,
  amount: number = 1,
  period: number = 1,
): number | array | matrix {
  return normalRisk(
    mu,
    sigma,
    p,
    amount,
    period,
    normpdf(norminv(1 - p)) / (1 - p),
  );
}
