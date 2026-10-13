function findParent(el, find) {
  let current = el;
  while (current) {
    if (find(current)) {
      return current;
    }
    current = current.parentElement;
  }
}

document.addEventListener("click", (e) => {
  const target = findParent(
    e.target,
    (el) => el instanceof HTMLButtonElement && el.dataset["copy"]
  );
  if (target) {
    navigator?.clipboard?.writeText(target.dataset["copy"]);
    target.classList.add("copied");
    setTimeout(() => target.classList.remove("copied"), 1000);
  }
});

function getMetaContent(name) {
  const meta = document.querySelector(`meta[name="${name}"]`);
  return meta?.content ?? "";
}

function buildIndexMenu() {
  const currentFile = getMetaContent("doc-current-file");
  if (currentFile) return;

  const searchIndex = globalThis.DENO_DOC_SEARCH_INDEX?.nodes;
  const main = document.querySelector("main");
  if (!Array.isArray(searchIndex) || !main) return;

  const categoryOrder = [
    "datatype",
    "elemop",
    "elmath",
    "linalgebra",
    "matarrs",
    "probdistr",
    "quants",
    "reglin",
    "stats",
  ];

  const categoryLabels = {
    datatype: "Data types & helpers",
    elemop: "Element-wise operations",
    elmath: "Elementary math",
    linalgebra: "Linear algebra",
    matarrs: "Matrix & array ops",
    probdistr: "Probability distributions",
    quants: "Quant finance",
    reglin: "Regression & interpolation",
    stats: "Statistics",
  };

  const groups = new Map();

  for (const node of searchIndex) {
    if (!node?.url) continue;
    const hasFunctionKind =
      Array.isArray(node.kind) && node.kind.some((k) => k?.kind === "Function");
    if (!hasFunctionKind) continue;

    const filePath = String(node.file ?? "").replace(/\\/g, "/");
    const [category] = filePath.split("/");
    if (!category) continue;

    const url = String(node.url ?? "").replace(/\\/g, "/");

    if (!groups.has(category)) {
      groups.set(category, []);
    }

    const description =
      String(node.doc ?? "")
        .split(/\r?\n/)
        .map((part) => part.trim())
        .find((part) => part.length > 0) ?? "";
    const summary =
      description.length > 180
        ? `${description.slice(0, 177).trimEnd()}…`
        : description;

    groups.get(category).push({
      name: node.name,
      description: summary,
      url,
    });
  }

  const sortedGroups = Array.from(groups.entries()).sort((a, b) => {
    const [categoryA] = a;
    const [categoryB] = b;
    const indexA = categoryOrder.indexOf(categoryA);
    const indexB = categoryOrder.indexOf(categoryB);

    if (indexA === -1 && indexB === -1) {
      return categoryA.localeCompare(categoryB);
    }
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const pad = (n) => String(n).padStart(2, "0");
  const total = sortedGroups.reduce((sum, [, entries]) => sum + entries.length, 0);

  // Poster hero, as on nodalstudio.io: framed, lattice behind, giant wordmark.
  const hero = el("section", "ns-hero api-hero");
  hero.setAttribute("aria-labelledby", "api-title");
  const frame = el("div", "ns-frame");
  const mesh = el("canvas", "ns-mesh");
  mesh.setAttribute("aria-hidden", "true");
  const top = el("div", "ns-frame-top");
  top.append(
    el("p", "kicker", "Mathematical & quantitative library"),
    el(
      "p",
      "ns-tag",
      "Vectors, matrices, statistics and quantitative finance for TypeScript. Linear algebra runs in Rust, compiled to WebAssembly.",
    ),
  );
  const bottom = el("div", "ns-frame-bottom");
  const titleWrap = el("div");
  const title = el("h1", "ns-wordmark", "Ubique");
  title.id = "api-title";
  const install = el("div", "api-install");
  const command = "deno add jsr:@nodalstudio/ubique";
  install.append(el("span", "prompt", "$"), el("span", "", command));
  const copy = el("button", "copy-install", "Copy");
  copy.type = "button";
  copy.addEventListener("click", () => {
    navigator?.clipboard?.writeText(command);
    copy.textContent = "Copied";
    setTimeout(() => copy.textContent = "Copy", 1200);
  });
  install.append(copy);
  const ctas = el("div", "api-hero-ctas");
  for (const [href, label, solid] of [
    ["#api", "Browse the API", true],
    ["./learn.html", "Read the article", false],
    ["./benchmark.html", "Run the benchmark", false],
  ]) {
    const a = el("a", solid ? "ns-btn ns-btn--solid" : "ns-btn");
    a.href = href;
    a.append(document.createTextNode(label + " "), el("span", "arr", "→"));
    ctas.append(a);
  }
  titleWrap.append(title, install, ctas);
  const foot = el("div", "ns-hero-foot");
  foot.append(el("span", "tick"), el("span", "", `${total} functions`));
  bottom.append(titleWrap, foot);
  frame.append(mesh, top, el("div"), bottom);
  hero.append(frame);
  main.appendChild(hero);

  const intro = el("section", "api-intro");
  intro.id = "api";
  const head = el("div", "ns-block-head");
  head.append(
    el("h2", "ns-display", "The library"),
    el("p", "kicker", `§ — ${sortedGroups.length} areas`),
  );
  const filters = el("nav", "api-filters");
  filters.setAttribute("aria-label", "Functional areas");
  intro.append(head, filters);
  main.appendChild(intro);

  sortedGroups.forEach(([category, entries], index) => {
    const label = categoryLabels[category] ?? category;
    const chip = el("a", "chip", label);
    chip.href = `#cat-${category}`;
    chip.append(el("span", "n", String(entries.length)));
    filters.append(chip);

    const section = el("section", "api-cat");
    section.id = `cat-${category}`;
    const catHead = el("div", "api-cat-head");
    catHead.append(
      el("span", "idx-num", `§${pad(index + 1)}`),
      el("h2", "", label),
      el("span", "count", `${entries.length} fn`),
    );
    const list = el("ul", "api-list");
    entries.sort((a, b) => a.name.localeCompare(b.name));
    for (const entry of entries) {
      const item = el("li");
      const link = el("a");
      link.href = entry.url.startsWith("./") ? entry.url : `./${entry.url}`;
      link.append(el("span", "fn", entry.name));
      if (entry.description) link.append(el("span", "desc", entry.description));
      item.append(link);
      list.append(item);
    }
    section.append(catHead, list);
    main.appendChild(section);
  });
  // nodal.js may already have run: start the lattice for this late canvas.
  globalThis.dispatchEvent(new CustomEvent("ns:mesh", { detail: mesh }));
}

globalThis.addEventListener("load", () => {
  const usageSelector = document.getElementById("usageSelector");

  document.addEventListener("mouseup", (e) => {
    if (
      findParent(
        e.target,
        (el) =>
          el?.parentElement === usageSelector && el instanceof HTMLDivElement
      )
    ) {
      usageSelector.open = false;
    }
  });

  buildIndexMenu();
});
