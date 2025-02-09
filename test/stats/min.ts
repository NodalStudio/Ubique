// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
// @ts-expect-error TS(2307): Cannot find module '../../stats/min.js' or its cor... Remove this comment to see the full error message
import min from "../../stats/min.js";

// @ts-expect-error TS(2304): Cannot find name 'ubique'.
ubique.min([5, 6, -1]);

// @ts-expect-error TS(2304): Cannot find name 'ubique'.
ubique.min([[-1, 3, -1], [4, 5, 9]]);

// @ts-expect-error TS(2304): Cannot find name 'ubique'.
ubique.min([[-1, 3, -1], [4, 5, 9]], 1);
