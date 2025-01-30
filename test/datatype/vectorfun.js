import assert from 'assert';
import { vectorfun } from '../../lib/datatype/vectorfun.js';

// Example 1: Apply function along rows of a matrix
const testfun1 = (a, b, c) => a.reduce((sum, num) => sum + num, 0) / a.length * b + c;
assert.deepStrictEqual(vectorfun(0, [[4, 6, 8, 10], [-2, -4, -6, -8]], testfun1, 4, 12), [[40], [-8]]);

// Example 2: Apply function along columns of a matrix
const testfun2 = (a, b, c) => a.reduce((sum, num) => sum + num, 0) / a.length * b + c;
assert.deepStrictEqual(vectorfun(1, [[5, 6, 5], [7, 8, -1]], testfun2, 5, 10), [[40, 45, 20]]);

// Example 3: Apply function to a 1D array
assert.deepStrictEqual(vectorfun(0, [1, 2, 3], testfun1, 2, 5), 9);

// Example 4: Invalid dimension argument
assert.throws(() => { vectorfun(2, [[5, 6, 5], [7, 8, -1]], testfun1, 5, 10) }, Error, 'dimension must be 0 (rows) or 1 (columns)');

// Example 5: Missing arguments
assert.throws(() => { vectorfun(0, [[5, 6, 5], [7, 8, -1]]) }, Error, 'not enough input arguments');

// Example 6: Invalid function argument
assert.throws(() => { vectorfun(0, [[5, 6, 5], [7, 8, -1]], "notAFunction", 5, 10) }, Error, 'third input argument must be a function');

// Example 7: Apply function to a matrix with empty additional arguments
assert.deepStrictEqual(vectorfun(1, [[5, 6, 5], [7, 8, -1]], a => a), [[5, 6, 5], [7, 8, -1]]);

// Example 8: Apply function along rows of a single row matrix
assert.deepStrictEqual(vectorfun(0, [[5, 6, 5]], testfun1, 3, 2), [[18]]);

// Example 9: Apply function along columns of a single column matrix
assert.deepStrictEqual(vectorfun(1, [[5], [6], [7]], testfun1, 3, 2), [[20]]);

// Example 10: Apply function to a 1D array without additional arguments
const sumFunction = a => a.reduce((sum, num) => sum + num, 0);
assert.deepStrictEqual(vectorfun(0, [1, 2, 3], sumFunction), 6);
