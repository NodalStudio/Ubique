// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
import erfcinv from "../../lib/elmath/erfcinv.js";

// Example 1: Compute the inverse complementary error function for a value less than 1
assert.strictEqual(erfcinv(1.5), -0.476936236121904);

// Example 2: Compute the inverse complementary error function for a value greater than 1
assert.strictEqual(erfcinv(0.5), 0.476936236121904);

// Example 3: Compute the inverse complementary error function for 1
assert.strictEqual(erfcinv(1), 0);

// Example 4: Compute the inverse complementary error function for 2 (should return negative infinity)
assert.strictEqual(erfcinv(2), -Infinity);

// Example 5: Compute the inverse complementary error function for 0 (should return positive infinity)
assert.strictEqual(erfcinv(0), Infinity);
