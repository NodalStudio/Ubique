// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
// @ts-expect-error TS(2307): Cannot find module '../../quants/tomonthly.js' or ... Remove this comment to see the full error message
import tomonthly from "../../quants/tomonthly.js";

// @ts-expect-error TS(2304): Cannot find name 'ubique'.
ubique.tomonthly(
  ubique.datenum(
    ["15-01-18", "15-02-28", "15-03-05", "15-03-24", "15-04-27"],
    "YY-MM-DD",
  ),
  [100, 99, 102, 103, 98],
);
