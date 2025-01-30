import assert from 'assert';
import { lu } from '../../lib/linalgebra/lu.js';

// Example 1: LU decomposition of a 2x2 square matrix
assert.deepStrictEqual(lu([[3, 2], [5, 2]]), {
  LU: [
    [5, 2],
    [0.6, 0.8]
  ],
  L: [
    [1, 0],
    [0.6, 1]
  ],
  U: [
    [5, 2],
    [0, 0.8]
  ],
  P: [1, 0],
  S: -1
});
// Example 2: LU decomposition of a 3x3 square matrix
assert.deepStrictEqual(lu([[1, 1, -1], [1, -2, 3], [2, 3, 1]]), {
  LU: [
    [2, 3, 1],
    [0.5, -3.5, 2.5],
    [0.5, 0.14285714285714285, -1.8571428571428572]
  ],
  L: [
    [1, 0, 0],
    [0.5, 1, 0],
    [0.5, 0.14285714285714285, 1]
  ],
  U: [
    [2, 3, 1],
    [0, -3.5, 2.5],
    [0, 0, -1.8571428571428572]
  ],
  P: [2, 1, 0],
  S: -1
});
// Example 3: LU decomposition of a 2x3 rectangular matrix
assert.deepStrictEqual(lu([[5, 6, 5], [7, 8, -1]]), {
  LU: [
    [ 7, 8, -1 ],
    [ 0.7142857142857143, 0.2857142857142856, 5.714285714285714 ]
  ],
  L: [ [ 1, 0, 0 ], [ 0.7142857142857143, 1, 0 ] ],
  U: [ [ 7, 8, -1 ], [ 0, 0.2857142857142856, 5.714285714285714 ] ],
  P: [ 1, 0 ],
  S: -1
});
// Example 4: LU decomposition of a singular 3x3 matrix
assert.deepStrictEqual(lu([[1, 2, 3], [4, 5, 6], [7, 8, 9]]), {
  LU: [
    [ 7, 8, 9 ],
    [ 0.14285714285714285, 0.8571428571428572, 1.7142857142857144 ],
    [
      0.5714285714285714,
      0.5000000000000002,
      1.1102230246251565e-16
    ]
  ],
  L: [
    [ 1, 0, 0 ],
    [ 0.14285714285714285, 1, 0 ],
    [ 0.5714285714285714, 0.5000000000000002, 1 ]
  ],
  U: [
    [ 7, 8, 9 ],
    [ 0, 0.8571428571428572, 1.7142857142857144 ],
    [ 0, 0, 1.1102230246251565e-16 ]
  ],
  P: [ 2, 0, 1 ],
  S: 1
});
// Example 5: LU decomposition of a 3x2 rectangular matrix
assert.deepStrictEqual(lu([[1, 2], [3, 4], [5, 6]]), {
  LU: [
    [ 5, 6 ],
    [ 0.2, 0.7999999999999998 ],
    [ 0.6, 0.5000000000000006 ]
  ],
  L: [ [ 1, 0 ], [ 0.2, 1 ], [ 0.6, 0.5000000000000006 ] ],
  U: [ [ 5, 6 ], [ 0, 0.7999999999999998 ], [ 0, 0 ] ],
  P: [ 2, 0, 1 ],
  S: 1
});
// Example 6: Error when input is not provided
assert.throws(() => lu(), Error, 'not enough input arguments');
