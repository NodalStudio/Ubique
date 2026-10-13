// Nodal Studio brand behaviours shared by the Ubique pages.
// - .js-motion on <html> (unless reduced motion) gates the reveal system.
// - [data-reveal] elements fade up once when they enter the viewport.
// - canvas.ns-mesh draws the hero lattice: a matrix of nodes where a row and a
//   column sweep in and meet on one output cell — C[i,j] = Σ A[i,p]·B[p,j].
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reduced) document.documentElement.classList.add("js-motion");

function reveal() {
  const items = document.querySelectorAll("[data-reveal]");
  if (reduced || !("IntersectionObserver" in globalThis)) {
    items.forEach((el) => el.classList.add("is-in"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      e.target.classList.add("is-in");
      io.unobserve(e.target);
    }
  }, { rootMargin: "0px 0px -8% 0px" });
  items.forEach((el) => io.observe(el));
}

function mesh(canvas) {
  const ctx = canvas.getContext("2d");
  const INK = "3, 4, 6";
  let w = 0, h = 0, dpr = 1, cols = 0, rows = 0, step = 0, x0 = 0, y0 = 0;
  let pointer = null, visible = true, raf = 0, t0 = performance.now();
  let target = { i: 0, j: 0 }, lastCycle = 0;

  function layout() {
    const r = canvas.getBoundingClientRect();
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = r.width;
    h = r.height;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    step = Math.max(22, Math.min(34, w / 42));
    // The lattice is a square block on the right; text keeps the left side.
    // Desktop: bottom-right, clear of the tagline and the wordmark.
    // Phone: a band in the empty middle of the poster, between the two.
    const narrow = w < 760;
    if (narrow) step = 20;
    const size = narrow
      ? Math.min(w * 0.82, h * 0.26)
      : Math.min(h * 0.6, w * 0.46);
    cols = rows = Math.max(6, Math.floor(size / step));
    x0 = narrow ? (w - (cols - 1) * step) / 2 : w - cols * step - step * 1.6;
    y0 = narrow ? h * 0.34 : h - rows * step - step * 0.4;
    pick();
  }
  function pick() {
    target = {
      i: Math.floor(Math.random() * rows),
      j: Math.floor(Math.random() * cols),
    };
  }
  const ease = (x) => 1 - Math.pow(1 - Math.min(Math.max(x, 0), 1), 3);

  function frame(now) {
    const cycle = 3600, n = Math.floor((now - t0) / cycle);
    const local = ((now - t0) % cycle) / cycle;
    if (n !== lastCycle) {
      lastCycle = n;
      if (n > 0) pick();
    }
    ctx.clearRect(0, 0, w, h);
    const sweep = ease(local / 0.45), hold = local > 0.45 && local < 0.85;
    const fade = local > 0.85 ? 1 - (local - 0.85) / 0.15 : 1;
    const cx = x0 + target.j * step, cy = y0 + target.i * step;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = x0 + c * step, y = y0 + r * step;
        let a = 0.16, rad = 1.3;
        if (pointer) {
          const d = Math.hypot(pointer.x - x, pointer.y - y);
          if (d < 140) {
            a += 0.5 * (1 - d / 140);
            rad += 1.4 * (1 - d / 140);
          }
        }
        const onRow = r === target.i && c <= Math.round(sweep * (cols - 1));
        const onCol = c === target.j && r <= Math.round(sweep * (rows - 1));
        if (onRow || onCol) {
          a = Math.max(a, 0.85 * fade);
          rad = Math.max(rad, 2.2);
        }
        ctx.fillStyle = `rgba(${INK}, ${a})`;
        ctx.beginPath();
        ctx.arc(x, y, rad, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    // row of A and column of B, drawn as the NS hairline
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = `rgba(${INK}, ${0.75 * fade})`;
    ctx.beginPath();
    ctx.moveTo(x0, cy);
    ctx.lineTo(x0 + sweep * (cols - 1) * step, cy);
    ctx.moveTo(cx, y0);
    ctx.lineTo(cx, y0 + sweep * (rows - 1) * step);
    ctx.stroke();
    if (sweep >= 1) {
      const s = step * 0.62 * (hold ? 1 : fade);
      ctx.fillStyle = `rgba(${INK}, ${fade})`;
      ctx.beginPath();
      ctx.roundRect(cx - s / 2, cy - s / 2, s, s, s * 0.24);
      ctx.fill();
      ctx.font = `500 10px "Cabinet Grotesk", system-ui, sans-serif`;
      ctx.letterSpacing = "2px";
      ctx.fillStyle = `rgba(${INK}, ${0.7 * fade})`;
      const label = `C[${target.i},${target.j}]`;
      const lx = Math.min(cx + step * 0.6, w - 70);
      ctx.fillText(label, lx, cy - step * 0.55);
    }
    if (visible && !reduced) raf = requestAnimationFrame(frame);
  }

  layout();
  addEventListener("resize", layout);
  canvas.parentElement.addEventListener("pointermove", (e) => {
    const r = canvas.getBoundingClientRect();
    pointer = { x: e.clientX - r.left, y: e.clientY - r.top };
  });
  canvas.parentElement.addEventListener("pointerleave", () => pointer = null);
  if (reduced) {
    frame(t0 + 3600 * 0.6);
    return;
  }
  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    cancelAnimationFrame(raf);
    if (visible) raf = requestAnimationFrame(frame);
  }).observe(canvas);
}

// Pages that build their hero after load (API home) hand the canvas over.
addEventListener("ns:mesh", (e) => mesh(e.detail));

// The sticky header inverts while an ink block sits under it.
function inkHeader() {
  const head = document.querySelector(".ns-head");
  const inks = [...document.querySelectorAll(".ns-ink, .ns-foot")];
  if (!head || !inks.length) return;
  let ticking = false;
  const update = () => {
    ticking = false;
    const y = head.getBoundingClientRect().bottom - 1;
    head.classList.toggle(
      "on-ink",
      inks.some((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= y && r.bottom >= y;
      }),
    );
  };
  addEventListener("scroll", () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }, { passive: true });
  update();
}

function start() {
  reveal();
  inkHeader();
  document.querySelectorAll("canvas.ns-mesh").forEach(mesh);
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else start();
