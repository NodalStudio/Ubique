// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
import today from "../../lib/datatype/today.js";
import dayjs from "dayjs";

// Example 1: Get the Unix timestamp for today's date
const todayTimestamp = today();
assert.strictEqual(typeof todayTimestamp, "number");
assert.strictEqual(todayTimestamp, dayjs().startOf("day").unix());
