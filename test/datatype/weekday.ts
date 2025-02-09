// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
import weekday from "../../lib/datatype/weekday.js";

// Example 1: Single Unix timestamp
assert.strictEqual(weekday(1426636800), 3); // (Wednesday)

// Example 2: Array of Unix timestamps
assert.deepStrictEqual(weekday([1424908800, 1426636800]), [4, 3]); // (Thursday, Wednesday)

// Example 3: Matrix of Unix timestamps
assert.deepStrictEqual(
  weekday([[1424908800, 1426636800], [1427328000, 1429315200]]),
  [[4, 3], [4, 6]],
); // (Thursday, Wednesday, Thursday, Saturday)
