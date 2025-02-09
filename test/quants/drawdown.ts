// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
// @ts-expect-error TS(2307): Cannot find module '../../quants/drawdown.js' or i... Remove this comment to see the full error message
import drawdown from "../../quants/drawdown.js";

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
ubique.drawdown(x);
