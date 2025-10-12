/**
 * @module matarrs
 *
 * Matrix and array creation, manipulation, and transformation functions.
 *
 * This module provides utilities for:
 * - Matrix creation (zeros, ones, eye, rand, linspace, logspace, etc.)
 * - Matrix manipulation (reshape, transpose, flip, squeeze, repmat, etc.)
 * - Matrix querying (size, length, ndims, nrows, ncols, numel, etc.)
 * - Matrix access (getcol, getrow, setcol, setrow, subset, diag, etc.)
 * - Matrix concatenation (cat, horzcat, vertcat)
 * - Index conversion (sub2ind, ind2sub, find)
 * - Matrix properties (iscolumn, isrow, issquare)
 * - Sorting and cloning (sort, mergesort, clone)
 */

export { default as cat } from "./cat.ts";
export { default as clone } from "./clone.ts";
export { default as colon } from "./colon.ts";
export { default as diag } from "./diag.ts";
export { default as end } from "./end.ts";
export { default as eye } from "./eye.ts";
export { default as falses } from "./falses.ts";
export { default as find } from "./find.ts";
export { default as fix } from "./fix.ts";
export { default as flatten } from "./flatten.ts";
export { default as flipdim } from "./flipdim.ts";
export { default as fliplr } from "./fliplr.ts";
export { default as flipud } from "./flipud.ts";
export { default as getcol } from "./getcol.ts";
export { default as getrow } from "./getrow.ts";
export { default as horzcat } from "./horzcat.ts";
export { default as ind2sub } from "./ind2sub.ts";
export { default as iscolumn } from "./iscolumn.ts";
export { default as isrow } from "./isrow.ts";
export { default as issquare } from "./issquare.ts";
export { default as length } from "./length.ts";
export { default as linspace } from "./linspace.ts";
export { default as logspace } from "./logspace.ts";
export { default as mergesort } from "./mergesort.ts";
export { default as ncols } from "./ncols.ts";
export { default as ndims } from "./ndims.ts";
export { default as nrows } from "./nrows.ts";
export { default as numel } from "./numel.ts";
export { default as ones } from "./ones.ts";
export { default as rand } from "./rand.ts";
export { default as repmat } from "./repmat.ts";
export { default as reshape } from "./reshape.ts";
export { default as setcol } from "./setcol.ts";
export { default as setrow } from "./setrow.ts";
export { default as size } from "./size.ts";
export { default as sort } from "./sort.ts";
export { default as squeeze } from "./squeeze.ts";
export { default as sub2ind } from "./sub2ind.ts";
export { default as subset } from "./subset.ts";
export { default as subsetlin } from "./subsetlin.ts";
export { default as tomat } from "./tomat.ts";
export { default as transpose } from "./transpose.ts";
export { default as trues } from "./trues.ts";
export { default as vertcat } from "./vertcat.ts";
export { default as zeros } from "./zeros.ts";
