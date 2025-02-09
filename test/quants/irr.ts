// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
// @ts-expect-error TS(2307): Cannot find module '../../quants/irr.js' or its co... Remove this comment to see the full error message
import irr from "../../quants/irr.js";

// @ts-expect-error TS(2304): Cannot find name 'ubique'.
ubique.irr([250000, 25000, -10000, -285000]);

// @ts-expect-error TS(2304): Cannot find name 'ubique'.
ubique.irr([74.2, 37.1, -104.4], [0, 1, 2], 2);

// @ts-expect-error TS(2304): Cannot find name 'ubique'.
ubique.irr([250000, 25000, -10000, -285000], [0, 45, 69, 90], 90);

// @ts-expect-error TS(2304): Cannot find name 'ubique'.
ubique.irr([74.2, 37.1, -104.4], [0, 14, 31], 31);
