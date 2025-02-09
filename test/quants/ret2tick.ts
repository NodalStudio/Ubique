// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
// @ts-expect-error TS(2307): Cannot find module '../../quants/ret2tick.js' or i... Remove this comment to see the full error message
import ret2tick from "../../quants/ret2tick.js";

// @ts-expect-error TS(2304): Cannot find name 'ubique'.
ubique.ret2tick([0.5, -3, 2.3], "simple", 100);

// @ts-expect-error TS(2304): Cannot find name 'ubique'.
ubique.ret2tick([[9, 5], [6, 1]], "simple", 100);
