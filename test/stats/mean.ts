// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
import mean from "../../lib/stats/mean.js";

// Example 1: Mean of a vector
assert.strictEqual(mean([5, 6, 3]), 4.666666666666667);

// Example 2: Mean of a matrix along rows (dim=0)
assert.deepStrictEqual(mean([[5, 6, 5], [7, 8, -1]]), [
  5.333333333333333,
  4.666666666666667,
]);

// Example 3: Mean of a matrix along columns (dim=1)
assert.deepStrictEqual(mean([[5, 6, 5], [7, 8, -1]], 1), [5.5, 4.5, 2]);

// Example 4: Mean of a scalar
assert.strictEqual(mean(10), 10);
