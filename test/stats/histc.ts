// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
// @ts-expect-error TS(2307): Cannot find module '../../stats/histc.js' or its c... Remove this comment to see the full error message
import histc from "../../stats/histc.js";

var A = [87, 27, 45, 62, 3, 52, 20, 43, 74, 61];
var B = [12, 34, 57, 43, 88, 75, 89, 2, 27, 29];

// @ts-expect-error TS(2304): Cannot find name 'ubique'.
ubique.histc(A, [0, 20, 40, 60, 80, 100]);

// @ts-expect-error TS(2304): Cannot find name 'ubique'.
ubique.histc(ubique.cat(0, A, B), [0, 50, 100]);
