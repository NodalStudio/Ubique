// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
// @ts-expect-error TS(2307): Cannot find module '../../reglin/interp1.js' or it... Remove this comment to see the full error message
import interp1 from "../../reglin/interp1.js";

var x = [1, 2, 3, 4, 5, 6];
var y = [2, 4, 6, 8, 10, 12];
var xnew = [2, 4, 6];

// @ts-expect-error TS(2304): Cannot find name 'ubique'.
ubique.interp1(x, y, xnew);
