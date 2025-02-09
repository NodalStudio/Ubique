// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
// @ts-expect-error TS(2307): Cannot find module '../../util/format.js' or its c... Remove this comment to see the full error message
import format from "../../util/format.js";

// @ts-expect-error TS(2304): Cannot find name 'ubique'.
ubique.format(5.6677798348349, 0);

// @ts-expect-error TS(2304): Cannot find name 'ubique'.
ubique.format([[-1000.47748, 0.000002], [0.1483478, 10.111100]], 2);
