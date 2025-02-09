// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
import annreturn from "../../lib/quants/annreturn.js";

// Example 1: Annualized return for a single asset
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
assert.strictEqual(annreturn(x, 12), 0.2338146820656939);

// Example 2: Throws error for non-array input
assert.throws(() => annreturn(123, 12), /Input must be an array or matrix/);
assert.throws(
  () => annreturn("invalid", 12),
  /Input must be an array or matrix/,
);
