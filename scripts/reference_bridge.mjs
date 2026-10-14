// JSON bridge for the independent Python reference suite. Nonfinite values must
// remain distinguishable from null (JSON.stringify normally loses them).
import { readFileSync } from "node:fs";
const u = await import(process.argv[2] || "../index.ts");
const requests = JSON.parse(readFileSync(0, "utf8"));
const results = requests.map(({ op, args }) => {
  const before = JSON.stringify(args);
  try {
    let value;
    if (op === "resident") {
      const a = u.DenseMatrix.from(args[0]), b = u.DenseMatrix.from(args[1]);
      const out = new u.DenseMatrix(args[0].length, args[1][0].length);
      try {
        a.multiplyInto(b, out);
        value = out.toArray();
      } finally {
        a.dispose();
        b.dispose();
        out.dispose();
      }
    } else if (op === "factorized") {
      const f = u.factorize(args[0]);
      value = args.slice(1).map((b) => f.solve(b));
    } else if (op === "regression") {
      const fit = u.linearreg(...args);
      value = {
        beta: fit.beta,
        alpha: fit.alpha,
        rsq: fit.rsq,
        predictions: args[1].map(fit.fun),
      };
    } else {
      value = u[op](...args);
    }
    return { value, mutated: before !== JSON.stringify(args) };
  } catch (error) {
    return { error: String(error), mutated: before !== JSON.stringify(args) };
  }
});
console.log(
  JSON.stringify(
    results,
    (_, value) =>
      typeof value === "number" && !Number.isFinite(value)
        ? String(value)
        : value,
  ),
);
