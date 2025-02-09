// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
// @ts-expect-error TS(2307): Cannot find module '../../stats/cov.js' or its cor... Remove this comment to see the full error message
import cov from "../../stats/cov.js";

var c = [5, 6, 3];
var d = [0.5, -3, 2.3];
var e = [[9, 5], [6, 1]];
var f = [[3, 2], [5, 2]];
var l = [[1, 1, -1], [1, -2, 3], [2, 3, 1]];

// @ts-expect-error TS(2304): Cannot find name 'ubique'.
ubique.cov(c);

// @ts-expect-error TS(2304): Cannot find name 'ubique'.
ubique.cov(c, d);

// @ts-expect-error TS(2304): Cannot find name 'ubique'.
ubique.cov(c, d, 0);

// @ts-expect-error TS(2304): Cannot find name 'ubique'.
ubique.cov(e, f);

// @ts-expect-error TS(2304): Cannot find name 'ubique'.
ubique.cov(l);
