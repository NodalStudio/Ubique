// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
import annadjsharpe from "../../lib/quants/annadjsharpe.js";

// Example 1: Annualized Adjusted Sharpe Ratio for a single asset
const x = [
  0.003,
  0.026,
  0.015,
  -0.009,
  0.014,
  0.024,
  0.015,
  0.066,
  -0.014,
  0.039,
];
assert.strictEqual(annadjsharpe(x, 0.02, 12, "geometric"), 3.3767236091658313);

// Example 2: Throws error for invalid input
assert.throws(() => annadjsharpe(123), /Input must be an array or matrix/);
assert.throws(
  () => annadjsharpe("invalid"),
  /Input must be an array or matrix/,
);
