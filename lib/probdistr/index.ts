/**
 * @module probdistr
 *
 * Probability distributions and statistical tests.
 *
 * This module provides utilities for:
 * - Normal distribution functions (normcdf, normpdf, norminv)
 * - Statistical tests (jbtest - Jarque-Bera test)
 */

export { default as jbtest } from "./jbtest.ts";
export { default as normcdf } from "./normcdf.ts";
export { default as norminv } from "./norminv.ts";
export { default as normpdf } from "./normpdf.ts";
