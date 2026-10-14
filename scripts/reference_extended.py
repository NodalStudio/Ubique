"""Additional independent statistics, probability and financial references.

Quantiles explicitly use Hyndman-Fan type 5 (Hazen), not NumPy's default.
Financial references use NumPy expressions of the documented definitions;
these are separate from the library's implementation and not financial advice.
"""

import mpmath as mp
import numpy as np
from scipy import spatial, special, stats


def add_extended(add, rng):
    for n in [5, 12, 101]:
        for offset in [0, 1e12]:
            x = offset + rng.normal(size=n)
            exact = list(map(mp.mpf, x.tolist()))
            average = mp.fsum(exact) / n
            centered = np.array([float(v - average) for v in exact])
            add("mean", [x], float(average))
            for order in [2, 3, 4, 5]:
                add(
                    "moment",
                    [x, order],
                    float(mp.fsum((v - average) ** order for v in exact) / n),
                    label=f"moment/{n}/{offset}/{order}",
                )
            add(
                "mad",
                [x],
                float(mp.fsum(abs(v - average) for v in exact) / n),
                label=f"mad/{n}/{offset}",
            )
            for flag in [0, 1]:
                add(
                    "skewness",
                    [x, flag],
                    stats.skew(centered, bias=bool(flag)),
                    label=f"skew/{n}/{offset}/{flag}",
                )
                add(
                    "kurtosis",
                    [x, flag],
                    stats.kurtosis(centered, bias=bool(flag), fisher=False),
                    label=f"kurtosis/{n}/{offset}/{flag}",
                )
                add(
                    "xkurtosis",
                    [x, flag],
                    stats.kurtosis(centered, bias=bool(flag)),
                    label=f"excess/{n}/{offset}/{flag}",
                )
                add(
                    "zscore",
                    [x, flag],
                    stats.zscore(centered, ddof=flag),
                    label=f"zscore/{n}/{offset}/{flag}",
                )
            add(
                "jbtest",
                [x],
                stats.jarque_bera(centered).statistic,
                label=f"jarque-bera/{n}/{offset}",
            )
            for q in [0, 0.01, 0.1, 0.25, 0.5, 0.75, 0.99, 1]:
                ref = np.quantile(x, q, method="hazen")
                add("quantile", [x, q], ref)
                add("prctile", [x, 100 * q], ref)
            add("quartile", [x], np.quantile(x, [0.25, 0.5, 0.75], method="hazen"))
            add("iqr", [x], np.diff(np.quantile(x, [0.25, 0.75], method="hazen"))[0])
            add("range", [x], np.ptp(x))
            add("min", [x], np.min(x))
            add("max", [x], np.max(x))
            y = rng.normal(size=n)
            for mode, ref in [
                ("euclidean", spatial.distance.euclidean(x, y)),
                ("manhattan", spatial.distance.cityblock(x, y)),
                ("chebychev", spatial.distance.chebyshev(x, y)),
                ("hamming", spatial.distance.hamming(x, y) * n),
            ]:
                add("pdist", [x, y, mode], ref)
        a = rng.normal(size=(n, 4))
        for dim in [0, 1]:
            axis = 1 - dim
            for op, ref in [
                ("mean", np.mean(a, axis=axis)),
                ("median", np.median(a, axis=axis)),
                ("range", np.ptp(a, axis=axis)),
                ("skewness", stats.skew(a, axis=axis)),
                ("kurtosis", stats.kurtosis(a, axis=axis, fisher=False)),
            ]:
                args = [a, 1, dim] if op in ["skewness", "kurtosis"] else [a, dim]
                add(op, args, ref, label=f"matrix/{op}/{dim}/{n}")
            for flag in [0, 1]:
                add("varc", [a, flag, dim], [np.var(a, axis=axis, ddof=flag)])
                add("std", [a, flag, dim], [np.std(a, axis=axis, ddof=flag)])
                add("zscore", [a, flag, dim], stats.zscore(a, axis=axis, ddof=flag))
    for z in [-38, -20, -10, -8, -6, -3, -1, -0.1, 0, 0.1, 1, 3, 6, 8, 10, 20, 38]:
        for mu, sigma in [(0, 1), (5, 2)]:
            x = mu + sigma * z
            add(
                "normcdf",
                [x, mu, sigma],
                stats.norm.cdf(z),
                tol=5e-12,
                label=f"normcdf/{z}/{sigma}",
            )
            add(
                "normpdf",
                [x, mu, sigma],
                stats.norm.pdf(z) / sigma,
                tol=5e-12,
                label=f"normpdf/{z}/{sigma}",
            )
        add("erf", [z], special.erf(z), tol=5e-13)
        add("erfc", [z], special.erfc(z), tol=5e-12, label=f"erfc/{z}")
    for p in [
        1e-100,
        1e-30,
        1e-15,
        1e-8,
        0.001,
        0.1,
        0.5,
        0.9,
        0.999,
        1 - 1e-8,
        1 - 1e-15,
    ]:
        add("norminv", [p], stats.norm.ppf(p), tol=5e-12, label=f"norminv/{p}")
    # Classical ratios use sample volatility; downside deviation uses the full
    # sample RMS shortfall from MAR; Omega uses both unconditional partial moments.
    for n in [12, 53, 252]:
        r = rng.normal(0.002, 0.03, n)
        bench = rng.normal(0.001, 0.02, n)
        for mar in [0, 0.005]:
            short = np.minimum(r - mar, 0)
            gain = np.maximum(r - mar, 0)
            downside = np.sqrt(np.mean(short**2))
            add("downsiderisk", [r, mar], downside, label=f"downside/{n}/{mar}")
            add("downsidepot", [r, mar], -np.mean(short))
            add("upsidepot", [r, mar], np.mean(gain), label=f"upside/{n}/{mar}")
            add(
                "omegaratio",
                [r, mar],
                np.sum(gain) / -np.sum(short),
                label=f"omega/{n}/{mar}",
            )
            add(
                "sortino",
                [r, 0, mar],
                np.mean(r) / downside,
                label=f"sortino/{n}/{mar}",
            )
        add("sharpe", [r, 0.001], (np.mean(r) - 0.001) / np.std(r, ddof=1))
        add("trackerr", [r, bench], np.std(r - bench, ddof=1))
        add("inforatio", [r, bench], np.mean(r - bench) / np.std(r - bench, ddof=1))
        add("percpos", [r], np.mean(r >= 0))
        for freq in [12, 252]:
            annual = np.expm1(np.sum(np.log1p(r)) * freq / n)
            add("annreturn", [r, freq], annual, tol=2e-12)
            add("annreturn", [r, freq, "simple"], np.mean(r) * freq)
            add("annrisk", [r, freq], np.std(r, ddof=1) * np.sqrt(freq))
            add(
                "activereturn",
                [r, bench, freq],
                annual - np.expm1(np.sum(np.log1p(bench)) * freq / n),
                tol=2e-12,
            )
        wealth = np.r_[1, np.cumprod(1 + r)] * 100
        add("ret2tick", [r, "simple", 100], wealth)
        add("tick2ret", [wealth, "simple", 1], r)
        add("tick2ret", [wealth, "continuous", 1], np.log1p(r))
        add("ret2tick", [np.log1p(r), "continuous", 100], wealth)
        add("twr", [wealth], wealth[-1] / wealth[0] - 1)
        add(
            "cagr",
            [wealth, np.arange(n + 1) / 12],
            (wealth[-1] / wealth[0]) ** (12 / n) - 1,
        )
        for p in [0.9, 0.95, 0.99]:
            q = np.quantile(r, 1 - p, method="hazen")
            add("histvar", [r, p, 1000], -q * 1000)
            add("histcondvar", [r, p, 1000], -np.mean(r[r <= q]) * 1000)
            for amount, period in [(1, 1), (1000, 10)]:
                mu, sigma = np.mean(r), np.std(r, ddof=1)
                add(
                    "paramvar",
                    [mu, sigma, p, amount, period],
                    (sigma * np.sqrt(period) * stats.norm.ppf(p) - mu * period)
                    * amount,
                    tol=5e-12,
                    label=f"paramvar/{n}/{p}/{amount}/{period}",
                )
                add(
                    "paramcondvar",
                    [mu, sigma, p, amount, period],
                    (
                        sigma
                        * np.sqrt(period)
                        * stats.norm.pdf(stats.norm.ppf(p))
                        / (1 - p)
                        - mu * period
                    )
                    * amount,
                    tol=5e-12,
                    label=f"paramcondvar/{n}/{p}/{amount}/{period}",
                )
        flows = np.array([50.0, -10.0, 20.0])
        dates = np.array([0.1, 0.5, 0.9])
        add(
            "mdietz",
            [1200, 1000, flows, dates],
            (1200 - 1000 - flows.sum()) / (1000 + np.dot(flows, 1 - dates)),
        )
    # Matrix loss estimates retain layout; compare every cell independently.
    mu = np.array([[0.001, 0.002], [-0.01, 0.03]])
    sigma = np.array([[0.02, 0.03], [0.04, 0.05]])
    for p in [0.9, 0.99]:
        for period in [1, 10]:
            add(
                "paramvar",
                [mu, sigma, p, 1000, period],
                (sigma * np.sqrt(period) * stats.norm.ppf(p) - mu * period) * 1000,
            )
            add(
                "paramcondvar",
                [mu, sigma, p, 1000, period],
                (
                    sigma
                    * np.sqrt(period)
                    * stats.norm.pdf(stats.norm.ppf(p))
                    / (1 - p)
                    - mu * period
                )
                * 1000,
            )
    for p in [-0.99, -0.5, 0, 0.5, 0.99]:
        add("erfinv", [p], special.erfinv(p), tol=5e-12)
    for p in [1e-100, 1e-30, 1e-10, 0.1, 1, 1.9, 2 - 1e-12]:
        add("erfcinv", [p], special.erfcinv(p), tol=5e-12)
    for n in [12, 53]:
        r = rng.normal(0.002, 0.03, n)
        b = rng.normal(0.001, 0.02, n)
        for mar in [0, 0.005]:
            dr = lambda x, threshold=mar: np.sqrt(
                np.mean(np.minimum(x - threshold, 0) ** 2)
            )
            annual = np.expm1(np.log1p(r).sum() * 12 / n)
            add(
                "m2sortino",
                [r, b, 0, mar, 12],
                annual + np.mean(r) / dr(r) * (dr(b) - dr(r)) * np.sqrt(12),
            )
