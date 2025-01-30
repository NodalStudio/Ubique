/**
 * name: ubique
 * version: 0.5.1
 * update date: 2015-09-23
 *
 * author: Max Todaro <m.todaro.ge@gmail.com>
 * homepage: http://maxto.github.io/index.html
 *
 * description: A mathematical and quantitative library for JavaScript and Node.js
 *
 * The MIT License (MIT)
 *
 * Copyright© 2014-2015 Max Todaro
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

// Constants
export const Inf = Number.POSITIVE_INFINITY;
export const maxval = Number.MAX_VALUE;
export const minval = Number.MIN_VALUE;
export const PI = Math.PI;
export const E = Math.E;
export const LN2 = Math.LN2;
export const LN10 = Math.LN10;
export const LOG2E = Math.LOG2E;
export const LOG10E = Math.LOG10E;
export const SQRT1_2 = Math.SQRT1_2;
export const SQRT2 = Math.SQRT2;
export const eps = 2.2204460492503130808472633361816E-16;
export const phi = 1.618033988749894;

// Import all datatype modules using default imports
// import arrayfun from './datatype/arrayfun.js';
// import clock from './datatype/clock.js';
// import datavec from './datatype/datavec.js';
// import datenum from './datatype/datenum.js';
// import datestr from './datatype/datestr.js';
// import isvector from './datatype/isvector.js';
// import isEmpty from './datatype/isempty.js';
// import isFunction from './datatype/isfunction.js';
// import isInteger from './datatype/isinteger.js';
// import isLogical from './datatype/islogical.js';
export { ismatrix } from './datatype/ismatrix.js';
// export { isnull } from './datatype/isnull.js';
// export { isnumber } from './datatype/isnumber.js';
// export { isscalar } from './datatype/isscalar.js';
// import isSingular from './datatype/issingular.js';
// import isString from './datatype/isstring.js';
// import isUndefined from './datatype/isundefined.js';
// import isvector from './datatype/isvector.js';
// import month from './datatype/month.js';
// import now from './datatype/now.js';
// import randChar from './datatype/randchar.js';
// import strFind from './datatype/strfind.js';
// import today from './datatype/today.js';
// import vectorFun from './datatype/vectorfun.js';
// import weekday from './datatype/weekday.js';

// Import all elemop modules using default imports
// import ceil from './elemop/ceil.js';
// import cumDev from './elemop/cumdev.js';
// import cumMax from './elemop/cummax.js';
// import cumMin from './elemop/cummin.js';
// import cumProd from './elemop/cumprod.js';
// import cumSum from './elemop/cumsum.js';
// import diff from './elemop/diff.js';
// import dot from './elemop/dot.js';
// import eq from './elemop/eq.js';
// import floor from './elemop/floor.js';
// import ge from './elemop/ge.js';
// import gt from './elemop/gt.js';
// import lDivide from './elemop/ldivide.js';
// import le from './elemop/le.js';
// import lt from './elemop/lt.js';
// import minus from './elemop/minus.js';
// import mLDivide from './elemop/mldivide.js';
// import mod from './elemop/mod.js';
// import mPower from './elemop/mpower.js';
// import mRDivide from './elemop/mrdivide.js';
// import mTimes from './elemop/mtimes.js';
// import ne from './elemop/ne.js';
// import plus from './elemop/plus.js';
// import power from './elemop/power.js';
// import prod from './elemop/prod.js';
// import rDivide from './elemop/rdivide.js';
// import rem from './elemop/rem.js';
// import round from './elemop/round.js';
// import sum from './elemop/sum.js';
// import times from './elemop/times.js';
// import uMinus from './elemop/uminus.js';
// import unique from './elemop/unique.js';

// Import all elmath modules using default imports
// import abs from './elmath/abs.js';
// import erf from './elmath/erf.js';
// import erfc from './elmath/erfc.js';
// import erfcInv from './elmath/erfcinv.js';
// import erfInv from './elmath/erfinv.js';
// import exp from './elmath/exp.js';
// import log from './elmath/log.js';
// import sign from './elmath/sign.js';
// import sqrt from './elmath/sqrt.js';

// Import all linalgebra modules using default imports
// import det from './linalgebra/det.js';
// import inv from './linalgebra/inv.js';
// import linSolve from './linalgebra/linsolve.js';
// import lu from './linalgebra/lu.js';

// Import all matarrs modules using default imports
// import array from './matarrs/array.js';
// import cat from './matarrs/cat.js';
// import clone from './matarrs/clone.js';
// import colon from './matarrs/colon.js';
// import diag from './matarrs/diag.js';
// import end from './matarrs/end.js';
// import eye from './matarrs/eye.js';
// import falses from './matarrs/falses.js';
// import find from './matarrs/find.js';
// import fix from './matarrs/fix.js';
// import flatten from './matarrs/flatten.js';
// import flipDim from './matarrs/flipdim.js';
// import flipLR from './matarrs/fliplr.js';
// import flipUD from './matarrs/flipud.js';
// import getCol from './matarrs/getcol.js';
// import getRow from './matarrs/getrow.js';
// import horzCat from './matarrs/horzcat.js';
// import ind2Sub from './matarrs/ind2sub.js';
// import isColumn from './matarrs/iscolumn.js';
// import isRow from './matarrs/isrow.js';
// import isSquare from './matarrs/issquare.js';
// import length from './matarrs/length.js';
// import linSpace from './matarrs/linspace.js';
// import logSpace from './matarrs/logspace.js';
// import matrix from './matarrs/matrix.js';
// import mergeSort from './matarrs/mergesort.js';
// import nCols from './matarrs/ncols.js';
// import nDims from './matarrs/ndims.js';
// import nRows from './matarrs/nrows.js';
// import numEl from './matarrs/numel.js';
// import ones from './matarrs/ones.js';
// import rand from './matarrs/rand.js';
// import repMat from './matarrs/repmat.js';
// import reShape from './matarrs/reshape.js';
// import setCol from './matarrs/setcol.js';
// import setRow from './matarrs/setrow.js';
// import size from './matarrs/size.js';
// import sort from './matarrs/sort.js';
// import squeeze from './matarrs/squeeze.js';
// import sub2Ind from './matarrs/sub2ind.js';
// import subset from './matarrs/subset.js';
// import subsetLin from './matarrs/subsetlin.js';
// import toMat from './matarrs/tomat.js';
// import transpose from './matarrs/transpose.js';
// import trues from './matarrs/trues.js';
// import vertCat from './matarrs/vertcat.js';
// import zeros from './matarrs/zeros.js';

// Import all probdistr modules using default imports
// import jbTest from './probdistr/jbtest.js';
// import normCDF from './probdistr/normcdf.js';
// import normInv from './probdistr/norminv.js';
// import normPDF from './probdistr/normpdf.js';

// Import all quants modules using default imports
// import activeReturn from './quants/activereturn.js';
// import adjSharpe from './quants/adjsharpe.js';
// import annAdjSharpe from './quants/annadjsharpe.js';
// import annReturn from './quants/annreturn.js';
// import annRisk from './quants/annrisk.js';
// import avgDrawdown from './quants/avgdrawdown.js';
// import burkeRatio from './quants/burkeratio.js';
// import cagr from './quants/cagr.js';
// import calmarRatio from './quants/calmarratio.js';
// import cDrawdown from './quants/cdrawdown.js';
// import downsidePot from './quants/downsidepot.js';
// import downsideRisk from './quants/downsiderisk.js';
// import drawdown from './quants/drawdown.js';
// import histCondVar from './quants/histcondvar.js';
// import histVar from './quants/histvar.js';
// import hurst from './quants/hurst.js';
// import infoRatio from './quants/inforatio.js';
// import irr from './quants/irr.js';
// import jensenAlpha from './quants/jensenalpha.js';
// import m2Sortino from './quants/m2sortino.js';
// import martinRatio from './quants/martinratio.js';
// import mDietz from './quants/mdietz.js';
// import modigliani from './quants/modigliani.js';
// import monteCarloVar from './quants/montecarlovar.js';
// import omegaRatio from './quants/omegaratio.js';
// import painIndex from './quants/painindex.js';
// import painRatio from './quants/painratio.js';
// import paramCondVar from './quants/paramcondvar.js';
// import paramVar from './quants/paramvar.js';
// import percPos from './quants/percpos.js';
// import ret2Tick from './quants/ret2tick.js';
// import ror from './quants/ror.js';
// import sharpe from './quants/sharpe.js';
// import sortino from './quants/sortino.js';
// import sterlingRatio from './quants/sterlingratio.js';
// import tick2Ret from './quants/tick2ret.js';
// import toMonthly from './quants/tomonthly.js';
// import toWeekly from './quants/toweekly.js';
// import trackErr from './quants/trackerr.js';
// import treynor from './quants/treynor.js';
// import twr from './quants/twr.js';
// import ulcerIndex from './quants/ulcerindex.js';
// import upsidePot from './quants/upsidepot.js';

// Import all reglin modules using default imports
// import interp1 from './reglin/interp1.js';
// import linearReg from './reglin/linearreg.js';

// Import all stats modules using default imports
// import corrCoef from './stats/corrcoef.js';
// import cov from './stats/cov.js';
// import histc from './stats/histc.js';
// import iqr from './stats/iqr.js';
// import kurtosis from './stats/kurtosis.js';
// import mad from './stats/mad.js';
// import max from './stats/max.js';
// import mean from './stats/mean.js';
// import median from './stats/median.js';
// import min from './stats/min.js';
// import mode from './stats/mode.js';
// import moment from './stats/moment.js';
// import pdist from './stats/pdist.js';
// import prctile from './stats/prctile.js';
// import quantile from './stats/quantile.js';
// import quartile from './stats/quartile.js';
// import range from './stats/range.js';
// import skewness from './stats/skewness.js';
// import std from './stats/std.js';
// import varc from './stats/varc.js';
// import xKurtosis from './stats/xkurtosis.js';
// import zScore from './stats/zscore.js';

// Import all util modules using default imports
// import argsArray from './util/argsarray.js';
// import format from './util/format.js';

// Import all datafeed modules using default imports
// import yahoo from './datafeed/yahoo.js';
// import yahooSync from './datafeed/yahooSync.js';

// Aggregate all the imported functions into the ubique object
// const ubique = {
//   arrayfun,
//   clock,
//   datavec,
//   datenum,
//   datestr,
//   isvector,
//   isEmpty,
//   isFunction,
//   isInteger,
//   isLogical,
//   isMatrix,
//   isNull,
//   isNumber,
//   isScalar,
//   isSingular,
//   isString,
//   isUndefined,
//   isvector,
//   month,
//   now,
//   randChar,
//   strFind,
//   today,
//   vectorFun,
//   weekday,
//   ceil,
//   cumDev,
//   cumMax,
//   cumMin,
//   cumProd,
//   cumSum,
//   diff,
//   dot,
//   eq,
//   floor,
//   ge,
//   gt,
//   lDivide,
//   le,
//   lt,
//   minus,
//   mLDivide,
//   mod,
//   mPower,
//   mRDivide,
//   mTimes,
//   ne,
//   plus,
//   power,
//   prod,
//   rDivide,
//   rem,
//   round,
//   sum,
//   times,
//   uMinus,
//   unique,
//   abs,
//   erf,
//   erfc,
//   erfcInv,
//   erfInv,
//   exp,
//   log,
//   sign,
//   sqrt,
//   det,
//   inv,
//   linSolve,
//   lu,
//   array,
//   cat,
//   clone,
//   colon,
//   diag,
//   end,
//   eye,
//   falses,
//   find,
//   fix,
//   flatten,
//   flipDim,
//   flipLR,
//   flipUD,
//   getCol,
//   getRow,
//   horzCat,
//   ind2Sub,
//   isColumn,
//   isRow,
//   isSquare,
//   length,
//   linSpace,
//   logSpace,
//   matrix,
//   mergeSort,
//   nCols,
//   nDims,
//   nRows,
//   numEl,
//   ones,
//   rand,
//   repMat,
//   reShape,
//   setCol,
//   setRow,
//   size,
//   sort,
//   squeeze,
//   sub2Ind,
//   subset,
//   subsetLin,
//   toMat,
//   transpose,
//   trues,
//   vertCat,
//   zeros,
//   jbTest,
//   normCDF,
//   normInv,
//   normPDF,
//   activeReturn,
//   adjSharpe,
//   annAdjSharpe,
//   annReturn,
//   annRisk,
//   avgDrawdown,
//   burkeRatio,
//   cagr,
//   calmarRatio,
//   cDrawdown,
//   downsidePot,
//   downsideRisk,
//   drawdown,
//   histCondVar,
//   histVar,
//   hurst,
//   infoRatio,
//   irr,
//   jensenAlpha,
//   m2Sortino,
//   martinRatio,
//   mDietz,
//   modigliani,
//   monteCarloVar,
//   omegaRatio,
//   painIndex,
//   painRatio,
//   paramCondVar,
//   paramVar,
//   percPos,
//   ret2Tick,
//   ror,
//   sharpe,
//   sortino,
//   sterlingRatio,
//   tick2Ret,
//   toMonthly,
//   toWeekly,
//   trackErr,
//   treynor,
//   twr,
//   ulcerIndex,
//   upsidePot,
//   interp1,
//   linearReg,
//   corrCoef,
//   cov,
//   histc,
//   iqr,
//   kurtosis,
//   mad,
//   max,
//   mean,
//   median,
//   min,
//   mode,
//   moment,
//   pdist,
//   prctile,
//   quantile,
//   quartile,
//   range,
//   skewness,
//   std,
//   varc,
//   xKurtosis,
//   zScore,
//   argsArray,
//   format,
//   yahoo,
//   yahooSync,
//   // Add other imports as necessary...
// };

// Export the ubique object as the default export
// export default ubique;
