// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
// @ts-expect-error TS(2307): Cannot find module '../../quants/montecarlovar.js'... Remove this comment to see the full error message
import montecarlovar from "../../quants/montecarlovar.js";

var x = [
  0.003,
  0.026,
  0.015,
  -0.009,
  0.014,
  0.024,
  0.015,
  0.066,
  -0.014,
  0.039,
];

// @ts-expect-error TS(2304): Cannot find name 'ubique'.
ubique.montecarlovar(x, 0.95, 1, 0, 1, 10000);

// @ts-expect-error TS(2304): Cannot find name 'ubique'.
ubique.montecarlovar(ubique.std(x), 0.99, 10, 0, 100000);
