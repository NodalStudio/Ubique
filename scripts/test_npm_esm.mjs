import assert from "node:assert/strict";
import {
  DenseMatrix,
  factorize,
  inv,
  matmul,
  mpower,
} from "../npm/esm/index.js";
assert.deepEqual(matmul([[1, 2]], [[3], [4]]), [[11]]);
factorize([[0, 2], [1, 3]]).solve([4, 7]).forEach((v, i) =>
  assert(Math.abs(v - [1, 2][i]) < 1e-12)
);
assert.deepEqual(mpower([[2]], 0), [[1]]);
assert.throws(() => inv([[1, 2], [2, 4]]));
const a = DenseMatrix.from([[2]]), out = new DenseMatrix(1, 1);
try {
  a.multiplyInto(a, out);
  assert.equal(out.view()[0], 4);
} finally {
  a.dispose();
  out.dispose();
}
assert.throws(() => out.view());
console.log(
  "ESM: dispatch, reusable LU, power, singular inverse and resident ownership passed",
);
