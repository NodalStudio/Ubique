// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
import times from "../../lib/elemop/times.js";

// Example 1: Multiply two numbers
assert.strictEqual(times(5, 6), 30);

// Example 2: Element-wise multiplication of two vectors
assert.deepStrictEqual(times([5, 6, 4], [3, -1, 0]), [15, -6, 0]);

// Example 3: Multiply a vector by a scalar
assert.deepStrictEqual(times([5, 6, 4], 10), [50, 60, 40]);

// Example 4: Element-wise multiplication of two matrices
assert.deepStrictEqual(
  times([[5, 6, 5], [7, 8, -1]], [[-1, 3, -1], [4, 5, 9]]),
  [[-5, 18, -5], [28, 40, -9]],
);
