import * as rubique from "../index.ts";
import type {
  array as RubiqueArray,
  matrix as RubiqueMatrix,
} from "../lib/types.d.ts";

type Matrix = RubiqueMatrix<number>;

type Assertion = {
  name: string;
  run: () => void | Promise<void>;
};

const EPSILON = 1e-9;

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function shallowEntries(value: unknown): [string, unknown][] {
  if (!isObject(value)) return [];
  return Object.entries(value);
}

function assert(condition: boolean, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function approxEqual(a: number, b: number, message: string): void {
  const diff = Math.abs(a - b);
  assert(diff <= EPSILON, `${message} (expected ≈ ${b}, received ${a})`);
}

function deepEquals(actual: unknown, expected: unknown): boolean {
  if (Array.isArray(actual) && Array.isArray(expected)) {
    if (actual.length !== expected.length) return false;
    return actual.every((item, index) => deepEquals(item, expected[index]));
  }

  if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();
  }

  if (isObject(actual) && isObject(expected)) {
    const actualEntries = shallowEntries(actual);
    const expectedEntries = shallowEntries(expected);
    if (actualEntries.length !== expectedEntries.length) return false;
    return actualEntries.every(([key, value]) =>
      deepEquals(value, (expected as Record<string, unknown>)[key])
    );
  }

  return Object.is(actual, expected);
}

function assertDeepEquals(
  actual: unknown,
  expected: unknown,
  message: string,
): void {
  assert(
    deepEquals(actual, expected),
    `${message} (expected ${
      JSON.stringify(
        expected,
      )
    }, received ${JSON.stringify(actual)})`,
  );
}

function assertMatrixClose(
  actual: Matrix,
  expected: Matrix,
  message: string,
): void {
  assert(Array.isArray(actual), `${message} (expected a matrix)`);
  assert(Array.isArray(expected), `${message} (expected comparison matrix)`);
  assert(actual.length === expected.length, `${message} (row mismatch)`);
  actual.forEach((row, i) => {
    assert(Array.isArray(row), `${message} (row ${i} is not an array)`);
    assert(
      row.length === expected[i].length,
      `${message} (col mismatch row ${i})`,
    );
    row.forEach((value, j) => {
      approxEqual(value, expected[i][j], `${message} [${i}, ${j}]`);
    });
  });
}

const tests: Assertion[] = [
  {
    name: "sum computes scalar totals",
    run: () => {
      const numbers: RubiqueArray<number> = [1, 2, 3, 4];
      const total = rubique.sum(numbers);
      assertDeepEquals(total, 10, "sum should add numbers");
    },
  },
  {
    name: "mean computes averages",
    run: () => {
      const numbers: RubiqueArray<number> = [1, 2, 3, 4];
      const average = rubique.mean(numbers);
      approxEqual(average as number, 2.5, "mean should compute average");
    },
  },
  {
    name: "inv inverts small matrices without WASM",
    run: () => {
      const matrix: Matrix = [
        [1, 2],
        [3, 4],
      ];
      const inverse = rubique.inv(matrix) as Matrix;
      const expected: Matrix = [
        [-2, 1],
        [1.5, -0.5],
      ];
      assertMatrixClose(
        inverse,
        expected,
        "inverse should match expected values",
      );
    },
  },
  {
    name: "mtimes multiplies matrices correctly",
    run: () => {
      const left: Matrix = [
        [1, 2],
        [3, 4],
      ];
      const right: Matrix = [
        [2, 0],
        [1, 2],
      ];
      const product = rubique.mtimes(left, right) as Matrix;
      const expected: Matrix = [
        [4, 4],
        [10, 8],
      ];
      assertMatrixClose(product, expected, "mtimes should multiply matrices");
    },
  },
  {
    name: "linspace generates evenly spaced vectors",
    run: () => {
      const vector = rubique.linspace(0, 1, 5);
      const expected: RubiqueArray<number> = [0, 0.25, 0.5, 0.75, 1];
      assertDeepEquals(
        vector,
        expected,
        "linspace should produce 5 evenly spaced points",
      );
    },
  },
  {
    name: "dot produces scalar product",
    run: () => {
      const result = rubique.dot([1, 3, -5], [4, -2, -1]);
      assertDeepEquals(result, 3, "dot product should be 3");
    },
  },
  {
    name: "dateutil handles month index",
    run: () => {
      const timestamp = Math.floor(Date.parse("2024-02-10T00:00:00Z") / 1000);
      const index = rubique.month(timestamp);
      assertDeepEquals(
        index,
        1,
        "month should return 1 for February (0-indexed)",
      );
    },
  },
  {
    name: "stats.quantile computes quartiles",
    run: () => {
      const values: RubiqueArray<number> = [7, 15, 36, 39, 40, 41];
      const q1 = rubique.quantile(values, 0.25);
      const q2 = rubique.quantile(values, 0.5);
      const q3 = rubique.quantile(values, 0.75);
      approxEqual(
        q1 as number,
        15,
        "quantile(0.25) should match first quartile",
      );
      approxEqual(q2 as number, 37.5, "quantile(0.5) should match median");
      approxEqual(
        q3 as number,
        40,
        "quantile(0.75) should match third quartile",
      );
    },
  },
];

export async function runSmokeSuite(): Promise<boolean> {
  for (const test of tests) {
    await test.run();
  }
  return true;
}

if (import.meta.main) {
  runSmokeSuite()
    .then(() => {
      console.log("Runtime smoke suite completed successfully.");
    })
    .catch((error) => {
      console.error("Runtime smoke suite failed", error);
      throw error;
    });
}
