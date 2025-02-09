// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
// @ts-expect-error TS(2307): Cannot find module '../../quants/toweekly.js' or i... Remove this comment to see the full error message
import toweekly from "../../quants/toweekly.js";

// @ts-expect-error TS(2304): Cannot find name 'ubique'.
ubique.toweekly(
  ubique.datenum(["15-01-15", "15-01-23", "15-01-30", "15-02-04"], "YY-MM-DD"),
  [100, 99, 102, 103, 98],
);
