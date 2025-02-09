// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
// @ts-expect-error TS(2307): Cannot find module '../../quants/tick2ret.js' or i... Remove this comment to see the full error message
import tick2ret from "../../quants/tick2ret.js";

// @ts-expect-error TS(2304): Cannot find name 'ubique'.
ubique.tick2ret([0.5, -3, 2.3]);

// @ts-expect-error TS(2304): Cannot find name 'ubique'.
ubique.tick2ret([[9, 5], [6, 1]]);
