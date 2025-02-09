// @ts-expect-error TS(2307): Cannot find module 'assert' or its corresponding t... Remove this comment to see the full error message
import assert from "assert";
// @ts-expect-error TS(2307): Cannot find module '../../quants/mdietz.js' or its... Remove this comment to see the full error message
import mdietz from "../../quants/mdietz.js";

var ev = 104.4, bv = 74.2, cf = 37.1, cfd = 14, cd = 31;
// @ts-expect-error TS(2304): Cannot find name 'ubique'.
ubique.mdietz(ev, bv, cf, cfd, cd);

// @ts-expect-error TS(2403): Subsequent variable declarations must have the sam... Remove this comment to see the full error message
var ev = 1200,
  bv = 1000,
  cf = [10, 50, 35, 20],
  cfd = [15, 38, 46, 79],
  cd = 90;
// @ts-expect-error TS(2304): Cannot find name 'ubique'.
ubique.mdietz(ev, bv, cf, cfd, cd);
