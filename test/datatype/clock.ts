// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
import clock from "../../lib/datatype/clock";

// Example: Get the current date and time as a array
const currentTime = clock();

// The result should be an array
assert(Array.isArray(currentTime));

// The array should have 7 elements
assert(currentTime.length === 7);
