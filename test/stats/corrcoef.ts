// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
// @ts-expect-error TS(2307): Cannot find module '../../stats/corrcoef.js' or it... Remove this comment to see the full error message
import corrcoef from "../../stats/corrcoef.js";

var c = [5, 6, 3];
var d = [0.5, -3, 2.3];
var l = [[1, 1, -1], [1, -2, 3], [2, 3, 1]];

// @ts-expect-error TS(2304): Cannot find name 'ubique'.
ubique.corrcoef(l);

// @ts-expect-error TS(2304): Cannot find name 'ubique'.
ubique.corrcoef(c, d);
