const $ = (id) => document.getElementById(id);
let worker = new Worker("./article_worker.js", { type: "module" }), nextId = 0;
const pending = new Map(),
  report = {
    createdAt: new Date().toISOString(),
    userAgent: navigator.userAgent,
    experiments: {},
  };
function listen() {
  worker.onmessage = ({ data }) => {
    const p = pending.get(data.id);
    if (!p) return;
    clearTimeout(p.timer);
    pending.delete(data.id);
    data.error ? p.reject(new Error(data.error)) : p.resolve(data.result);
  };
}
listen();
function call(kind, input) {
  return new Promise((resolve, reject) => {
    const id = ++nextId;
    const timer = setTimeout(() => {
      worker.terminate();
      for (const p of pending.values()) {
        clearTimeout(p.timer);
        p.reject(new Error("Calculation timed out; try a smaller input."));
      }
      pending.clear();
      worker = new Worker("./article_worker.js", { type: "module" });
      listen();
    }, 30000);
    pending.set(id, { resolve, reject, timer });
    worker.postMessage({ id, kind, input });
  });
}
function save(kind, input, result) {
  report.experiments[kind] = { input, result };
  $("download").disabled = false;
}
const number = (n) =>
  n === null || !Number.isFinite(n) ? "undefined" : Number(n).toPrecision(5);
function table(headers, rows) {
  const t = document.createElement("table");
  const tr = document.createElement("tr");
  headers.forEach((v) => {
    const th = document.createElement("th");
    th.textContent = v;
    tr.append(th);
  });
  t.append(tr);
  rows.forEach((row) => {
    const r = document.createElement("tr");
    row.forEach((v, i) => {
      const c = document.createElement(i ? "td" : "th");
      c.textContent = v;
      r.append(c);
    });
    t.append(r);
  });
  return t;
}
function fail(el, error) {
  el.classList.add("error");
  el.textContent = error.message;
}
let points, fitVersion = 0;
const canvas = $("plot"), ctx = canvas.getContext("2d"), margin = 55;
const px = (x) => margin + x * (canvas.width - 2 * margin) / 10,
  py = (y) => canvas.height - margin - y * (canvas.height - 2 * margin) / 10;
function draw(fit) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = '500 20px "JetBrains Mono", ui-monospace, monospace';
  ctx.strokeStyle = "rgba(3, 4, 6, 0.14)";
  ctx.fillStyle = "rgba(3, 4, 6, 0.45)";
  for (let i = 0; i <= 10; i += 2) {
    ctx.beginPath();
    ctx.moveTo(px(i), py(0));
    ctx.lineTo(px(i), py(10));
    ctx.stroke();
    ctx.fillText(i, px(i) - 6, py(0) + 35);
    ctx.beginPath();
    ctx.moveTo(px(0), py(i));
    ctx.lineTo(px(10), py(i));
    ctx.stroke();
    ctx.fillText(i, 15, py(i) + 8);
  }
  ctx.save();
  ctx.beginPath();
  ctx.rect(
    margin,
    margin,
    canvas.width - 2 * margin,
    canvas.height - 2 * margin,
  );
  ctx.clip();
  if (fit) {
    ctx.strokeStyle = "#2d7f8c";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(px(0), py(fit.endpoints[0]));
    ctx.lineTo(px(10), py(fit.endpoints[1]));
    ctx.stroke();
    ctx.lineWidth = 1;
    points.forEach((p, i) => {
      ctx.beginPath();
      ctx.moveTo(px(p[0]), py(p[1]));
      ctx.lineTo(px(p[0]), py(fit.predicted[i]));
      ctx.stroke();
    });
  }
  ctx.fillStyle = "#030406";
  points.forEach(([x, y]) => {
    ctx.beginPath();
    ctx.arc(px(x), py(y), 7, 0, 2 * Math.PI);
    ctx.fill();
  });
  ctx.restore();
}
async function updateFit() {
  const version = ++fitVersion, status = $("fit-status");
  const input = {
    points: points.map((p) => p.slice()),
    offset: $("offset").checked ? 1e12 : 0,
  };
  status.classList.remove("error");
  try {
    const fit = await call("regression", input);
    if (version !== fitVersion) return;
    draw(fit);
    status.textContent = `${points.length} points · slope ${
      number(fit.beta)
    } · intercept ${number(fit.alpha)} · R² ${number(fit.rsq)}`;
    save("regression", input, fit);
  } catch (e) {
    if (version !== fitVersion) return;
    draw();
    fail(status, e);
  }
}
function add(x, y) {
  if (
    points.length >= 1000 || !Number.isFinite(x) || !Number.isFinite(y) ||
    x < 0 || x > 10 || y < 0 || y > 10
  ) return;
  points.push([x, y]);
  updateFit();
}
canvas.onclick = (e) => {
  const rect = canvas.getBoundingClientRect();
  add(
    ((e.clientX - rect.left) / rect.width * canvas.width - margin) /
      (canvas.width - 2 * margin) * 10,
    (canvas.height - margin -
      (e.clientY - rect.top) / rect.height * canvas.height) /
      (canvas.height - 2 * margin) * 10,
  );
};
$("add-point").onclick = () =>
  add(Number($("point-x").value), Number($("point-y").value));
$("reset").onclick = () => {
  points = [[1, 2], [2, 3.5], [3, 3], [4, 5], [5, 5.5], [6, 6], [7, 8], [
    8,
    7.5,
  ], [9, 9]];
  updateFit();
};
$("offset").onchange = updateFit;
$("reset").click();
$("measure").onclick = async () => {
  const status = $("matrix-status");
  status.classList.remove("error");
  status.textContent = "Validating, warming up and measuring…";
  $("measure").disabled = true;
  $("matrix-result").replaceChildren();
  try {
    const input = Number($("size").value), r = await call("matrix", input);
    save("matrix", input, r);
    status.textContent = `Correctness gate passed · maximum absolute error ${
      r.maxError.toExponential(2)
    } · ${r.iterations} products per batch`;
    $("matrix-result").append(
      table(["Contract", "Median ms / product"], [
        ["JS · nested input/output", number(r.medians.js)],
        ["WASM · nested input/output", number(r.medians.wasm)],
        ["WASM · resident input/output", number(r.medians.resident)],
      ]),
    );
  } catch (e) {
    fail(status, e);
  } finally {
    $("measure").disabled = false;
  }
};
$("download").onclick = () => {
  const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: "application/json",
    }),
    url = URL.createObjectURL(blob),
    a = document.createElement("a");
  a.href = url;
  a.download = "ubique-experiments.json";
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};
fetch("./benchmark_build.json").then((r) => r.json()).then((data) =>
  report.build = data
).catch(() => {});
