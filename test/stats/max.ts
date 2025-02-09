// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
// @ts-expect-error TS(2307): Cannot find module '../../stats/max.js' or its cor... Remove this comment to see the full error message
import max from "../../stats/max.js";

// @ts-expect-error TS(2304): Cannot find name 'ubique'.
ubique.max([5, 6, -1]);

// @ts-expect-error TS(2304): Cannot find name 'ubique'.
ubique.max([[-1, 3, -1], [4, 5, 9]]);

// @ts-expect-error TS(2304): Cannot find name 'ubique'.
ubique.max([[-1, 3, -1], [4, 5, 9]], 1);
