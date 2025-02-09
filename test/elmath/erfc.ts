// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
import erfc from "../../lib/elmath/erfc.js";

// Example 1: Compute the complementary error function for a single value
assert.strictEqual(erfc(0.5), 0.47950009227675744);

// Example 2: Compute the complementary error function for a negative value
assert.strictEqual(erfc(-1), 1.8427007877600068);

// Example 3: Compute the complementary error function for zero
assert.strictEqual(erfc(0), 1);

// Example 4: Compute the complementary error function for a large positive value
assert.strictEqual(erfc(2), 0.004677734989334044);

// Example 5: Compute the complementary error function for a large negative value
assert.strictEqual(erfc(-2), 1.995322265010666);
