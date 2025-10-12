/**
 * @module datatype
 * @description Data type checking, assertion, and manipulation functions
 *
 * This module provides utilities for:
 * - Type checking (isarray, ismatrix, isvector, etc.)
 * - Type assertions (assertArray, assertMatrix, etc.)
 * - Array/vector operations (arrayfun, vectorfun)
 * - Date/time utilities (datenum, datestr, now, etc.)
 * - String utilities (randchar, strfind)
 */

// Type checking functions
export { default as isarray } from "./isarray.ts";
export { default as isempty } from "./isempty.ts";
export { default as isfunction } from "./isfunction.ts";
export { default as isinteger } from "./isinteger.ts";
export { default as islogical } from "./islogical.ts";
export { default as ismatrix } from "./ismatrix.ts";
export { default as isnull } from "./isnull.ts";
export { default as isnumber } from "./isnumber.ts";
export { default as isscalar } from "./isscalar.ts";
export { default as issingular } from "./issingular.ts";
export { default as isstring } from "./isstring.ts";
export { default as isundefined } from "./isundefined.ts";
export { default as isvector } from "./isvector.ts";

// Type assertion functions
export { default as assertArray } from "./assertArray.ts";
export { default as assertDimension } from "./assertDimension.ts";
export { default as assertMatrix } from "./assertMatrix.ts";
export { default as assertNormalizationFlag } from "./assertNormalizationFlag.ts";
export { default as assertNumber } from "./assertNumber.ts";

// Array and data manipulation functions
export { default as arrayfun } from "./arrayfun.ts";
export { default as vectorfun } from "./vectorfun.ts";

// Date and time functions
export { default as clock } from "./clock.ts";
export { default as datenum } from "./datenum.ts";
export { default as datestr } from "./datestr.ts";
export { default as datevec } from "./datevec.ts";
export { default as month } from "./month.ts";
export { default as now } from "./now.ts";
export { default as today } from "./today.ts";
export { default as weekday } from "./weekday.ts";

// String functions
export { default as randchar } from "./randchar.ts";
export { default as strfind } from "./strfind.ts";
