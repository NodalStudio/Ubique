// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
// @ts-expect-error TS(2307): Cannot find module '../../quants/twr.js' or its co... Remove this comment to see the full error message
import twr from "../../quants/twr.js";

var mv = [250000, 255000, 257000, 288000, 293000, 285000],
  cf = [0, 0, 25000, 0, -10000, 0];

// @ts-expect-error TS(2304): Cannot find name 'ubique'.
ubique.twr(mv, cf);
