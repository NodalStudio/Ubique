import { DenseMatrix } from "../index.ts";

// Allocate all matrices first, then acquire views: allocating may grow memory.
const transform = new DenseMatrix(2, 2);
const points = DenseMatrix.from([[1, 2, 3], [4, 5, 6]]);
const output = new DenseMatrix(2, 3);
try {
  // Column-major: a parser/generator can write here directly, with no intermediate
  // JS array. An existing JS buffer needs one setData() copy instead.
  transform.view().set([2, 0, 0, 3]);
  transform.multiplyInto(points, output);
  console.log(output.toArray()); // [[2,4,6],[12,15,18]]
  // Reuse the same inputs and output for the next frame or iteration.
  transform.view()[0] = 4;
  transform.multiplyInto(points, output);
  console.log(output.toArray()); // [[4,8,12],[12,15,18]]
} finally {
  transform.dispose();
  points.dispose();
  output.dispose();
}
