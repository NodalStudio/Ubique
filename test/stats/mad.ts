// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
// @ts-expect-error TS(2307): Cannot find module '../../stats/mad.js' or its cor... Remove this comment to see the full error message
import mad from "../../stats/mad.js";

var a = [[5, 6, 5], [7, 8, -1]];
var c = [5, 6, 3];

// @ts-expect-error TS(2304): Cannot find name 'ubique'.
ubique.mad(c);

// @ts-expect-error TS(2304): Cannot find name 'ubique'.
ubique.mad(a, 1);

// @ts-expect-error TS(2304): Cannot find name 'ubique'.
ubique.mad(a);
