import assert from 'assert';
import { setcol } from '../../lib/matarrs/setcol.js';

// Example 1: Replace the first column of a matrix
 assert.deepStrictEqual(setcol([2, 0], [[5, 6, 5], [7, 8, -1]], 0), [
   [2, 6, 5],
   [0, 8, -1]
 ]);

 // Example 2: Replace the third column of a matrix
 assert.deepStrictEqual(setcol([9, 21], [[5, 6, 5], [7, 8, -1]], 2), [
   [5, 6, 9],
   [7, 8, 21]
 ]);

 // Example 3: Column vector length mismatch error
 assert.throws(() => setcol([1, 2, 3], [[4, 5], [6, 7]], 1), /Column vector length must match the number of matrix rows./);

 // Example 4: Column index out of bounds error
 assert.throws(() => setcol([1, 2], [[4, 5], [6, 7]], 2), /Column index must be an integer between 0 and N-1./);

 // Example 5: Invalid matrix error
 assert.throws(() => setcol([1, 2], "not a matrix", 1), /Input matrix must be a 2D array./);

 // Example 6: Invalid column vector error
 assert.throws(() => setcol("not a vector", [[4, 5], [6, 7]], 1), /Column vector must be an array./);
