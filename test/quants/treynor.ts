// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
// @ts-expect-error TS(2307): Cannot find module '../../quants/treynor.js' or it... Remove this comment to see the full error message
import treynor from "../../quants/treynor.js";

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
var y = [
  -0.005,
  0.081,
  0.04,
  -0.037,
  -0.061,
  0.058,
  -0.049,
  -0.021,
  0.062,
  0.058,
];
var z = [
  0.04,
  -0.022,
  0.043,
  0.028,
  -0.078,
  -0.011,
  0.033,
  -0.049,
  0.09,
  0.087,
];
// @ts-expect-error TS(2304): Cannot find name 'ubique'.
var cat = ubique.cat;

// @ts-expect-error TS(2304): Cannot find name 'ubique'.
ubique.treynor(x, z, 0.01 / 12);

// @ts-expect-error TS(2304): Cannot find name 'ubique'.
ubique.treynor(cat(0, x, y), z, 0.01 / 12);
