const $ = (id) => document.getElementById(id);
let term = 0;
function dot() {
  const A = [[1, 2], [3, 4]],
    B = [[5, 6], [7, 8]],
    i = Number($("dot-row").value),
    j = Number($("dot-col").value);
  $("dot-result").textContent = `C[${i},${j}]: ${A[i][0]} × ${B[0][j]}${
    term ? ` + ${A[i][1]} × ${B[1][j]}` : ""
  } = ${A[i][0] * B[0][j] + (term ? A[i][1] * B[1][j] : 0)}${
    term ? " — complete" : " — partial sum"
  }`;
}
$("dot-next").onclick = () => {
  term = 1 - term;
  dot();
};
$("dot-row").onchange = $("dot-col").onchange = () => {
  term = 0;
  dot();
};
dot();
for (let i = 0; i < 16; i++) {
  const cell = document.createElement("span");
  cell.textContent = i;
  $("memory").append(cell);
}
let address = 0;
function walk() {
  const column = $("walk-mode").value === "column",
    index = column ? address * 4 : address;
  [...$("memory").children].forEach((c, i) =>
    c.classList.toggle("active", i === index)
  );
  $("walk-status").textContent = `B offset ${index} · byte ${
    8 * index
  } · stride ${column ? 32 : 8} bytes`;
}
$("walk-next").onclick = () => {
  address = (address + 1) % 4;
  walk();
};
$("walk-mode").onchange = () => {
  address = 0;
  walk();
};
walk();
const scalarBytes = new Uint8Array([
  0,
  97,
  115,
  109,
  1,
  0,
  0,
  0,
  1,
  7,
  1,
  96,
  2,
  124,
  124,
  1,
  124,
  3,
  2,
  1,
  0,
  7,
  12,
  1,
  8,
  109,
  117,
  108,
  116,
  105,
  112,
  108,
  121,
  0,
  0,
  10,
  9,
  1,
  7,
  0,
  32,
  0,
  32,
  1,
  162,
  11,
]);
$("wasm-run").onclick = async () => {
  try {
    const { instance } = await WebAssembly.instantiate(scalarBytes);
    const a = Number($("wasm-a").value), b = Number($("wasm-b").value);
    $("wasm-result").textContent = `WASM result: ${
      instance.exports.multiply(a, b)
    }`;
  } catch (e) {
    $("wasm-result").textContent = e.message;
  }
};
$("wasm-run").click();
let latest;
$("teach-run").onclick = () => {
  const input = Object.fromEntries(
    ["m", "k", "n", "tile"].map((k) => [k, Number($("teach-" + k).value)]),
  );
  $("teach-run").disabled = true;
  $("teach-download").disabled = true;
  $("teach-result").textContent = "Checking results and measuring in a worker…";
  const worker = new Worker("./article_worker.js", { type: "module" });
  const end = () => {
    worker.terminate();
    $("teach-run").disabled = false;
    clearTimeout(timer);
  };
  const timer = setTimeout(() => {
    end();
    $("teach-result").textContent = "Timed out; try smaller dimensions.";
  }, 30000);
  worker.onerror = () => {
    end();
    $("teach-result").textContent =
      "Worker failed to load. Serve this page over HTTP.";
  };
  worker.onmessage = ({ data }) => {
    end();
    if (data.error) {
      $("teach-result").textContent = data.error;
      return;
    }
    latest = {
      createdAt: new Date().toISOString(),
      userAgent: navigator.userAgent,
      ...data.result,
    };
    const r = data.result;
    $("teach-result").textContent = `${r.iterations} products per batch. Median milliseconds / product: dot ${
      r.medians.dot.toPrecision(4)
    } · row ${r.medians.row.toPrecision(4)} · tile ${
      r.medians.tile.toPrecision(4)
    }. Maximum absolute error: ${r.error.toExponential(2)}.`;
    $("teach-download").disabled = false;
  };
  worker.postMessage({ id: 1, kind: "tutorial", input });
};
$("teach-download").onclick = () => {
  const url = URL.createObjectURL(
      new Blob([JSON.stringify(latest, null, 2)], { type: "application/json" }),
    ),
    a = document.createElement("a");
  a.href = url;
  a.download = "ubique-teaching-kernels.json";
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};
