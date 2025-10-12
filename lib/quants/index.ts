/**
 * @module quants
 * @description Quantitative finance and portfolio analytics functions
 *
 * This module provides utilities for:
 * - Performance metrics (Sharpe, Sortino, Treynor, Jensen alpha, etc.)
 * - Risk metrics (drawdown, VaR, tracking error, downside risk, etc.)
 * - Return calculations (CAGR, TWR, IRR, annualized returns, etc.)
 * - Portfolio metrics (information ratio, active return, etc.)
 * - Time-series conversion (toweekly, tomonthly, ret2tick, tick2ret)
 * - Statistical measures (Hurst exponent, etc.)
 */

export { default as activereturn } from "./activereturn.ts";
export { default as adjsharpe } from "./adjsharpe.ts";
export { default as annadjsharpe } from "./annadjsharpe.ts";
export { default as annreturn } from "./annreturn.ts";
export { default as annrisk } from "./annrisk.ts";
export { default as avgdrawdown } from "./avgdrawdown.ts";
export { default as burkeratio } from "./burkeratio.ts";
export { default as cagr } from "./cagr.ts";
export { default as calmarratio } from "./calmarratio.ts";
export { default as cdrawdown } from "./cdrawdown.ts";
export { default as downsidepot } from "./downsidepot.ts";
export { default as downsiderisk } from "./downsiderisk.ts";
export { default as drawdown } from "./drawdown.ts";
export { default as histcondvar } from "./histcondvar.ts";
export { default as histvar } from "./histvar.ts";
export { default as hurst } from "./hurst.ts";
export { default as inforatio } from "./inforatio.ts";
export { default as irr } from "./irr.ts";
export { default as jensenalpha } from "./jensenalpha.ts";
export { default as m2sortino } from "./m2sortino.ts";
export { default as martinratio } from "./martinratio.ts";
export { default as mdietz } from "./mdietz.ts";
export { default as modigliani } from "./modigliani.ts";
export { default as montecarlovar } from "./montecarlovar.ts";
export { default as omegaratio } from "./omegaratio.ts";
export { default as painindex } from "./painindex.ts";
export { default as painratio } from "./painratio.ts";
export { default as paramcondvar } from "./paramcondvar.ts";
export { default as paramvar } from "./paramvar.ts";
export { default as percpos } from "./percpos.ts";
export { default as ret2tick } from "./ret2tick.ts";
export { default as ror } from "./ror.ts";
export { default as sharpe } from "./sharpe.ts";
export { default as sortino } from "./sortino.ts";
export { default as sterlingratio } from "./sterlingratio.ts";
export { default as tick2ret } from "./tick2ret.ts";
export { default as tomonthly } from "./tomonthly.ts";
export { default as toweekly } from "./toweekly.ts";
export { default as trackerr } from "./trackerr.ts";
export { default as treynor } from "./treynor.ts";
export { default as twr } from "./twr.ts";
export { default as ulcerindex } from "./ulcerindex.ts";
export { default as upsidepot } from "./upsidepot.ts";
