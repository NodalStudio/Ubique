// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
// @ts-expect-error TS(2307): Cannot find module '../../stats/median.js' or its ... Remove this comment to see the full error message
import median from "../../stats/median.js";

// @ts-expect-error TS(2304): Cannot find name 'ubique'.
ubique.median([5, 6, 3]);

// @ts-expect-error TS(2304): Cannot find name 'ubique'.
ubique.median([[5, 6, 5], [7, 8, -1]]);

// @ts-expect-error TS(2304): Cannot find name 'ubique'.
ubique.median([[5, 6, 5], [7, 8, -1]], 1);
