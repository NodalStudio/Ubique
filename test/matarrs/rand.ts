// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
import rand from "../../lib/matarrs/rand.js";

// Example 1: Single random number
assert.strictEqual(typeof rand(), "number");

// Example 2: Empty matrix
assert.deepStrictEqual(rand(0), []);

// Example 3: 1x1 matrix
const result1x1 = rand(1);
// @ts-expect-error TS(2339): Property 'length' does not exist on type 'number |... Remove this comment to see the full error message
assert.strictEqual(result1x1.length, 1);
// @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
assert.strictEqual(result1x1[0].length, 1);

// Example 4: 2x2 matrix
const result2x2 = rand(2);
// @ts-expect-error TS(2339): Property 'length' does not exist on type 'number |... Remove this comment to see the full error message
assert.strictEqual(result2x2.length, 2);
// @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
assert.strictEqual(result2x2[0].length, 2);

// Example 5: 2x1 matrix
const result2x1 = rand([2, 1]);
// @ts-expect-error TS(2339): Property 'length' does not exist on type 'number |... Remove this comment to see the full error message
assert.strictEqual(result2x1.length, 2);
// @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
assert.strictEqual(result2x1[0].length, 1);

// Example 6: 1x2 matrix
const result1x2 = rand(1, 2);
// @ts-expect-error TS(2339): Property 'length' does not exist on type 'number |... Remove this comment to see the full error message
assert.strictEqual(result1x2.length, 1);
// @ts-expect-error TS(7053): Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
assert.strictEqual(result1x2[0].length, 2);
