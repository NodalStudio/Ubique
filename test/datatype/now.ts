// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
import now from "../../lib/datatype/now.js";

// Example: Get the current Unix timestamp
const currentTimestamp = now();
assert.strictEqual(typeof currentTimestamp, "number");
assert.ok(currentTimestamp > 0); // Ensure it's a positive number
