import { PAGE_SIZE } from "../config";

const grid = document.getElementById("archiveGrid");

if (grid) {
  const archiveGrid = grid;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const filterButtons = Array.from(
    document.querySelectorAll<HTMLButtonElement>("[data-filter]")
  );
  const searchInput = document.getElementById("archiveSearch") as HTMLInputElement | null;
  const emptyState = document.getElementById("archiveEmpty");
  const pagination = document.getElementById("pagination");
  const pageNumbers = document.getElementById("pageNumbers");
  const prevPageButton = document.getElementById("prevPage") as HTMLButtonElement | null;
  const nextPageButton = document.getElementById("nextPage") as HTMLButtonElement | null;
  const archiveSection = document.getElementById("archive");
  const counters = Array.from(document.querySelectorAll<HTMLElement>("[data-count]"));

  const cards = Array.from(archiveGrid.querySelectorAll<HTMLAnchorElement>(".guga-card")).map(
    (element) => ({
      element,
      status: element.dataset.status ?? "",
      search: element.dataset.search ?? ""
    })
  );

  const liveRegion = document.createElement("p");
  liveRegion.className = "sr-only";
  liveRegion.setAttribute("aria-live", "polite");
  document.body.appendChild(liveRegion);

  let currentFilter = "all";
  let currentPage = 1;
  let searchQuery = searchInput ? searchInput.value.trim().toLowerCase() : "";
  let totalPages = 1;

  function matchesSearch(card: (typeof cards)[number]): boolean {
    return !searchQuery || card.search.includes(searchQuery);
  }

  function countFor(matches: typeof cards, key: string): number {
    if (key === "all") {
      return matches.length;
    }

    return matches.filter((card) => card.status === key).length;
  }

  function updateCounts(matches: typeof cards): void {
    counters.forEach((counter) => {
      const key = counter.dataset.count ?? "";
      const count = countFor(matches, key);
      counter.textContent = String(count);

      const button = counter.closest<HTMLButtonElement>("[data-filter]");
      if (button && key !== "all") {
        button.hidden = count === 0;
      }
    });
  }

  function renderPagination(): void {
    if (!pagination || !pageNumbers || !prevPageButton || !nextPageButton) {
      return;
    }

    pagination.hidden = totalPages <= 1;
    prevPageButton.disabled = currentPage <= 1;
    nextPageButton.disabled = currentPage >= totalPages;
    pageNumbers.replaceChildren();

    if (totalPages <= 1) {
      return;
    }

    for (let page = 1; page <= totalPages; page += 1) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "page-btn page-btn--number";
      button.textContent = String(page);
      button.setAttribute("aria-label", `第 ${page} 页`);

      if (page === currentPage) {
        button.setAttribute("aria-current", "page");
      }

      button.addEventListener("click", () => {
        goToPage(page);
      });
      pageNumbers.appendChild(button);
    }
  }

  function goToPage(page: number): void {
    if (page < 1 || page > totalPages || page === currentPage) {
      return;
    }

    currentPage = page;
    renderArchive(true);
  }

  function renderArchive(shouldScroll = false): void {
    const matches = cards.filter(matchesSearch);
    updateCounts(matches);

    let filtered =
      currentFilter === "all"
        ? matches
        : matches.filter((card) => card.status === currentFilter);

    if (currentFilter !== "all" && filtered.length === 0) {
      currentFilter = "all";
      filtered = matches;
    }

    filterButtons.forEach((button) => {
      button.setAttribute(
        "aria-pressed",
        button.dataset.filter === currentFilter ? "true" : "false"
      );
    });

    totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

    if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    const start = (currentPage - 1) * PAGE_SIZE;
    const pageItems = filtered.slice(start, start + PAGE_SIZE);
    const pageIds = new Set(pageItems.map((card) => card.element.dataset.id));

    cards.forEach((card) => {
      card.element.hidden = !pageIds.has(card.element.dataset.id);
    });

    archiveGrid.classList.toggle("is-single", pageItems.length === 1);

    if (emptyState) {
      emptyState.hidden = pageItems.length !== 0;
    }

    renderPagination();

    let summary = searchQuery
      ? `搜索到 ${filtered.length} 只咕嘎`
      : `共 ${filtered.length} 只咕嘎`;

    if (totalPages > 1) {
      summary += `，第 ${currentPage} 页，共 ${totalPages} 页`;
    }

    liveRegion.textContent = summary;

    if (shouldScroll && archiveSection) {
      archiveSection.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start"
      });
    }
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      currentFilter = button.dataset.filter ?? "all";
      currentPage = 1;
      renderArchive();
    });
  });

  searchInput?.addEventListener("input", () => {
    searchQuery = searchInput.value.trim().toLowerCase();
    currentPage = 1;
    renderArchive();
  });

  prevPageButton?.addEventListener("click", () => {
    goToPage(currentPage - 1);
  });

  nextPageButton?.addEventListener("click", () => {
    goToPage(currentPage + 1);
  });

  renderArchive();
}
