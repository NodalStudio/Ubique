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
      Array.isArray(node.kind) && node.kind.some((k) => ["Function", "Class"].includes(k?.kind));
    if (!hasFunctionKind) continue;

    const filePath = String(node.file ?? "").replace(/\\/g, "/");
    const [category] = filePath.split("/");
    if (!category || category === "internal") continue;

    const url = String(node.url ?? "").replace(/\\/g, "/");

    if (!groups.has(category)) {
      groups.set(category, []);
    }

    const description =
      String(node.doc ?? "")
        .split(/\r?\n/)
        .map((part) => part.trim())
        .find((part) => part.length > 0)?.split(/(?<=[.!?])(?=[A-Z]|\s)/)[0] ?? "";
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

  const header = el("section", "docs-intro");
  const title = el("h1", "", "API reference"); title.id = "api-title";
  header.append(title, el("p", "", "Matrices, statistics and quantitative tools for TypeScript. Choose a function, inspect its contract, and run an example."));
  const install = el("pre", "docs-install");
  install.textContent = "npm install ubique@1.0.4\n# Deno: deno add jsr:@nodalstudio/ubique@1.0.4";
  header.append(install);
  const quick = el("nav", "docs-quick"); quick.setAttribute("aria-label", "Start here");
  for (const [href,label] of [["./linalgebra/matmul.ts/~/matmul.html","Matrix products"],["./linalgebra/dense_matrix.ts/~/DenseMatrix.html","Resident matrices"],["./linalgebra/factorize.ts/~/factorize.html","Solve a system"],["./learn.html","Under the hood"]]) {
    const a=el("a","",label);a.href=href;quick.append(a);
  }
  header.append(quick);main.append(header);
  const intro = el("section", "api-intro"); intro.id="api";
  const filters=el("nav","api-filters");filters.setAttribute("aria-label","Functional areas");
  intro.append(filters);main.append(intro);
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
      el("span", "idx-num", pad(index + 1)),
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
