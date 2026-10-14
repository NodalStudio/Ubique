"""Independent float64 validation. Install reference-requirements.txt first.

Run: python scripts/test_reference.py [--module file:///.../npm/esm/index.js]
Reports live under /tmp unless --report is supplied. This is a correctness test,
not a cross-language speed benchmark. A fixed seed makes failures reproducible.
"""

import argparse
import json
import subprocess
from collections import Counter
from pathlib import Path

import mpmath as mp
import numpy as np
import scipy
from reference_extended import add_extended
from scipy import linalg, optimize

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("--module", default="")
parser.add_argument("--runtime", choices=["deno", "node"], default="deno")
parser.add_argument("--report", default="/tmp/ubique-reference-report.json")
options = parser.parse_args()
rng = np.random.default_rng(20261014)
mp.mp.dps = 80
requests, checks = [], []


def add(op, args, expected=None, *, tol=5e-13, scale=None, label="", check=None):
    def native(x):
        if isinstance(x, np.ndarray):
            return x.tolist()
        if isinstance(x, np.generic):
            return x.item()
        if isinstance(x, (list, tuple)):
            return [native(y) for y in x]
        return x

    requests.append({"op": op, "args": native(args)})
    checks.append(
        {
            "expected": expected,
            "tol": tol,
            "scale": scale,
            "label": label or op,
            "check": check,
        }
    )


# Exercise odd dimensions, kernel tile edges, dispatch thresholds, rectangular
# shapes and both very small and very large *representable* products.
for shape in [
    (1, 1, 1),
    (2, 3, 4),
    (4, 3, 2),
    (1, 31, 7),
    (19, 2, 1),
    (7, 8, 9),
    (31, 33, 35),
    (63, 64, 65),
    (65, 63, 67),
    (96, 96, 96),
]:
    for repeat in range(3):
        m, k, n = shape
        a, b = rng.normal(size=(m, k)), rng.normal(size=(k, n))
        magnitude = [1, 1e-100, 1e100][repeat]
        a *= magnitude
        reference = a @ b
        # Forward error is bounded relative to |A| |B|, not a cancelled result.
        scale = float(np.max(np.abs(a) @ np.abs(b)))
        for backend in ["js", "wasm", "auto"]:
            add(
                "matmul",
                [a, b, backend],
                reference,
                scale=scale,
                label=f"matmul/{backend}/{shape}/{repeat}",
            )
        add(
            "resident",
            [a, b],
            reference,
            scale=scale,
            label=f"resident/{shape}/{repeat}",
        )


def solve_check(a, b, expected, condition):
    # Compare forward error with conditioning; separately require backward
    # stability so a generous forward bound cannot hide a bad solution.
    def check(value):
        x = np.asarray(value, dtype=float)
        assert x.shape == expected.shape, (x.shape, expected.shape)
        assert np.all(np.isfinite(x)), "nonfinite solution"
        forward = np.max(np.abs(x - expected)) / max(np.max(np.abs(expected)), 1e-300)
        denom = np.abs(a) @ np.abs(x) + np.abs(b)
        residual = np.max(np.abs(a @ x - b) / np.maximum(denom, 1e-300))
        assert forward <= max(5e-13, 64 * np.finfo(float).eps * condition), (
            forward,
            condition,
        )
        assert residual <= 5e-13, ("backward error", residual)
        return float(residual)

    return check


for n in [1, 2, 3, 5, 10, 11, 20, 33]:
    for repeat in range(4):
        a = rng.normal(size=(n, n)) + (n + 1) * np.eye(n)
        b = rng.normal(size=(n, 3))
        ref = linalg.solve(a, b)
        condition = np.linalg.cond(a)
        validator = solve_check(a, b, ref, condition)
        add("linsolve", [a, b], check=validator, label=f"solve/{n}/{repeat}")
        add("mldivide", [a, b], check=validator)
        add("mrdivide", [b.T, a.T], ref.T)
        add("inv", [a], linalg.inv(a))
        add("det", [a], linalg.det(a))
        add("factorized", [a, b, b * 2], [ref, ref * 2])
        for exponent in [-2, 0, 1, 3, 8]:
            add("mpower", [a, exponent], np.linalg.matrix_power(a, exponent), tol=2e-12)
        # Rescaling equations changes their units, not their solution.
        scales = np.geomspace(1e-120, 1e120, n) if n > 1 else np.array([1e-120])
        add(
            "linsolve",
            [a * scales[:, None], b * scales[:, None]],
            check=solve_check(a, b, ref, condition),
            label=f"scaled-solve/{n}/{repeat}",
        )

# Controlled condition numbers and an 80-decimal oracle for Hilbert systems.
for n in [3, 8, 12]:
    for condition in [1e4, 1e8]:
        q, _ = linalg.qr(rng.normal(size=(n, n)))
        v, _ = linalg.qr(rng.normal(size=(n, n)))
        a = q @ np.diag(np.geomspace(1, 1 / condition, n)) @ v.T
        b = rng.normal(size=(n, 2))
        add(
            "linsolve",
            [a, b],
            check=solve_check(a, b, linalg.solve(a, b), np.linalg.cond(a)),
            label=f"conditioned/{n}/{condition}",
        )
for n in [3, 5, 8, 10]:
    a = linalg.hilbert(n)
    b = np.ones(n)
    # mp.mpf(float) represents the actual binary64 input exactly.
    ref = np.array(
        list(mp.lu_solve(mp.matrix(a.tolist()), mp.matrix(b.tolist()))), dtype=float
    )
    add(
        "linsolve",
        [a, b],
        check=solve_check(a, b, ref, np.linalg.cond(a)),
        label=f"hilbert/{n}",
    )

for shape in [(1, 1), (2, 5), (5, 2), (10, 11), (11, 10), (33, 33)]:
    a = rng.normal(size=shape)

    def lu_check(value, a=a):
        lower, upper, p = np.array(value["L"]), np.array(value["U"]), value["P"]
        assert sorted(p) == list(range(len(a)))
        assert np.array_equal(lower, np.tril(lower))
        assert np.array_equal(upper, np.triu(upper))
        assert np.array_equal(np.diag(lower), np.ones(min(a.shape)))
        residual = np.max(np.abs(lower @ upper - a[p])) / np.max(np.abs(a))
        assert residual < 5e-13, residual
        # SciPy may choose different pivots; compare reconstructed matrices.
        sp, sl, su = linalg.lu(a)
        np.testing.assert_allclose(sp @ sl @ su, a, rtol=5e-13, atol=5e-13)
        return float(residual)

    add("lu", [a], check=lu_check, label=f"lu/{shape}")
for n in [2, 3, 10, 11, 20]:
    a = rng.integers(-5, 6, size=(n, n)).astype(float)
    a[-1] = a[0]
    assert np.linalg.matrix_rank(a) < n
    for op, args in [
        ("inv", [a]),
        ("linsolve", [a, np.ones(n)]),
        ("factorized", [a, np.ones(n)]),
    ]:
        add(op, args, check="throws", label=f"singular/{op}/{n}")
    add("issingular", [a], True)
    # Exact duplicate rows imply zero; allow rounding relative to input scale.
    add("det", [a], 0, scale=max(1, float(linalg.norm(a, 2) ** n)), tol=5e-14)
for scales in [[1e-150, 1e150], [1e-100, 1e-100], [1e100, 1e100]]:
    add("det", [np.diag(scales)], float(mp.fprod(scales)))

# Sample/population conventions are explicit. High-offset values are checked
# against 80-digit arithmetic, so a NumPy rounding artifact is not our oracle.
for n in [2, 3, 17, 100, 1001]:
    for offset in [0, 1e8, 1e12]:
        x = offset + rng.normal(size=n)
        y = -offset + 0.3 * (x - offset) + rng.normal(size=n)
        mx = list(map(mp.mpf, x.tolist()))
        avg = mp.fsum(mx) / n
        variance = float(mp.fsum((v - avg) ** 2 for v in mx) / (n - 1))
        add("varc", [x], variance, label=f"variance/{n}/{offset}")
        add("varc", [x, 0], variance * (n - 1) / n)
        add("std", [x], np.sqrt(variance))
        add("median", [x], np.median(x))
        # Center in high precision before correlation/regression.
        my = list(map(mp.mpf, y.tolist()))
        ay = mp.fsum(my) / n
        xx = mp.fsum((v - avg) ** 2 for v in mx)
        yy = mp.fsum((v - ay) ** 2 for v in my)
        xy = mp.fsum((v - avg) * (w - ay) for v, w in zip(mx, my))
        correlation = float(xy / mp.sqrt(xx * yy))
        covariance = [
            [float(xx / (n - 1)), float(xy / (n - 1))],
            [float(xy / (n - 1)), float(yy / (n - 1))],
        ]
        add("cov", [x, y], covariance, label=f"covariance-vectors/{n}/{offset}")
        add(
            "cov",
            [np.column_stack([x, y])],
            covariance,
            label=f"covariance-matrix/{n}/{offset}",
        )
        add(
            "corrcoef",
            [np.column_stack([x, y])],
            [[1, correlation], [correlation, 1]],
            scale=1,
            label=f"correlation-matrix/{n}/{offset}",
        )
        add(
            "corrcoef",
            [x, y],
            [[1, correlation], [correlation, 1]],
            scale=1,
            label=f"correlation/{n}/{offset}",
        )
        expected = {
            "beta": float(xy / xx),
            "alpha": float(ay - xy / xx * avg),
            "rsq": correlation**2,
            "predictions": np.array([float(ay + xy / xx * (v - avg)) for v in mx]),
        }

        def regression_check(value, expected=expected):
            for key, ref in expected.items():
                np.testing.assert_allclose(value[key], ref, rtol=5e-12, atol=5e-13)
            return 0.0

        add(
            "regression",
            [y, x],
            check=regression_check,
            label=f"regression/{n}/{offset}",
        )

for repeat in range(30):
    cash = np.r_[-rng.uniform(100, 1000), rng.uniform(1, 300, size=8)]
    t = np.arange(len(cash), dtype=float)
    # One sign change guarantees a unique positive-discount-factor root.
    root = optimize.brentq(
        lambda z, cash=cash, t=t: np.dot(cash, np.exp(-t * z)), -10, 10, xtol=1e-14
    )
    add("irr", [cash], np.expm1(root), tol=2e-11, label=f"irr/{repeat}")
for cash in [[-100, 1000], [-100, 1], [-100, 121]]:
    add("irr", [cash], cash[1] / -cash[0] - 1, tol=2e-11)


add_extended(add, rng)

root = Path(__file__).resolve().parent.parent
command = (
    ["deno", "run", "--allow-read"] if options.runtime == "deno" else ["node"]
) + ["scripts/reference_bridge.mjs"]
if options.module:
    command.append(options.module)
process = subprocess.run(
    command,
    cwd=root,
    input=json.dumps(requests, allow_nan=False),
    text=True,
    capture_output=True,
    check=True,
)
results = json.loads(process.stdout)
assert len(results) == len(checks)
failures, metrics = [], []
for request, rule, result in zip(requests, checks, results):
    try:
        assert not result["mutated"], "input mutated"
        if rule["check"] == "throws":
            assert "error" in result, "expected rejection"
        else:
            assert "error" not in result, result.get("error")
            value = result["value"]
            if rule["check"]:
                error = rule["check"](value)
            else:
                actual, expected = (
                    np.asarray(value, dtype=float),
                    np.asarray(rule["expected"], dtype=float),
                )
                assert actual.shape == expected.shape, (actual.shape, expected.shape)
                assert np.all(np.isfinite(actual)), "nonfinite result"
                scale = (
                    rule["scale"]
                    if rule["scale"] is not None
                    else max(float(np.max(np.abs(expected))), 1e-300)
                )
                error = float(np.max(np.abs(actual - expected))) / scale
                assert error <= rule["tol"], (
                    f"normalized error {error:.4g} > {rule['tol']}"
                )
            metrics.append({"case": rule["label"], "error": error})
    except (AssertionError, ValueError, TypeError) as error:
        failures.append({"case": rule["label"], "error": str(error)})
report = {
    "seed": 20261014,
    "module": options.module or "source",
    "runtime": options.runtime,
    "references": {
        "numpy": np.__version__,
        "scipy": scipy.__version__,
        "mpmath": mp.__version__,
        "precision": 80,
    },
    "cases": len(checks),
    "passed": len(checks) - len(failures),
    "failed": len(failures),
    "operations": dict(Counter(r["op"] for r in requests)),
    "failures": failures,
    "largest_errors": sorted(metrics, key=lambda m: m["error"], reverse=True)[:15],
}
Path(options.report).write_text(json.dumps(report, indent=2) + "\n")
print(json.dumps(report, indent=2))
raise SystemExit(bool(failures))
