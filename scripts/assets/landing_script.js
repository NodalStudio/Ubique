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

  const hero = document.createElement("section");
  hero.className = "landingHero";

  const title = document.createElement("h1");
  title.textContent = "Rubique API reference";
  hero.appendChild(title);

  const subtitle = document.createElement("p");
  subtitle.textContent =
    "Browse the library by functional area, or use the search bar above.";
  hero.appendChild(subtitle);

  main.appendChild(hero);

  const menu = document.createElement("div");
  menu.className = "landingMenu";

  for (const [category, entries] of sortedGroups) {
    const section = document.createElement("section");
    section.className = "landingSection";

    const heading = document.createElement("h2");
    heading.textContent = categoryLabels[category] ?? category;
    section.appendChild(heading);

    const list = document.createElement("ul");

    entries.sort((a, b) => a.name.localeCompare(b.name));

    for (const entry of entries) {
      const item = document.createElement("li");

      const link = document.createElement("a");
      link.href = entry.url.startsWith("./") ? entry.url : `./${entry.url}`;
      link.textContent = entry.name;
      link.className = "landingLink";
      item.appendChild(link);

      if (entry.description) {
        const description = document.createElement("p");
        description.textContent = entry.description;
        description.className = "landingDescription";
        item.appendChild(description);
      }

      list.appendChild(item);
    }

    section.appendChild(list);
    menu.appendChild(section);
  }

  main.appendChild(menu);
}

function injectBenchmarkLink() {
  const actionsContainer = document.querySelector(
    "#topnav .flex.items-center.gap-2"
  );
  if (!actionsContainer) return;
  if (actionsContainer.querySelector("[data-doc-benchmark-link]")) return;

  const link = document.createElement("a");
  link.href = "./benchmark.html";
  link.className = "docBenchmarkLink";
  link.dataset.docBenchmarkLink = "true";
  link.setAttribute("aria-label", "Open the Rubique benchmark demo");

  const icon = document.createElement("span");
  icon.className = "docBenchmarkIcon";
  icon.textContent = "🚀";

  const label = document.createElement("span");
  label.className = "docBenchmarkLabel";
  label.textContent = "Benchmark";

  link.append(icon, label);
  actionsContainer.prepend(link);
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
  injectBenchmarkLink();
});
