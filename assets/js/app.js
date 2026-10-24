(function () {
  "use strict";

  var root = document.documentElement;
  var themeToggle = document.getElementById("themeToggle");
  var themeMeta = document.querySelector('meta[name="theme-color"]');
  var prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  function readSavedTheme() {
    try {
      return localStorage.getItem("guga-theme");
    } catch (error) {
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem("guga-theme", theme);
    } catch (error) {
      /* localStorage may be unavailable */
    }
  }

  function paintTheme(theme) {
    root.dataset.theme = theme;
    if (themeToggle) {
      themeToggle.setAttribute(
        "aria-label",
        theme === "dark" ? "切换到浅色模式" : "切换到深色模式"
      );
      themeToggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    }
    if (themeMeta) {
      themeMeta.setAttribute("content", theme === "dark" ? "#101a20" : "#f6f7f2");
    }
  }

  paintTheme(root.dataset.theme || (prefersDark.matches ? "dark" : "light"));

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next = root.dataset.theme === "dark" ? "light" : "dark";
      paintTheme(next);
      saveTheme(next);
    });
  }

  function syncSystemTheme(event) {
    if (!readSavedTheme()) {
      paintTheme(event.matches ? "dark" : "light");
    }
  }

  if (prefersDark.addEventListener) {
    prefersDark.addEventListener("change", syncSystemTheme);
  } else if (prefersDark.addListener) {
    prefersDark.addListener(syncSystemTheme);
  }

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var grid = document.getElementById("archiveGrid");
  if (!grid || !Array.isArray(window.GUGAS)) {
    return;
  }

  var PAGE_SIZE = 2;
  var filterButtons = Array.prototype.slice.call(
    document.querySelectorAll("[data-filter]")
  );
  var searchInput = document.getElementById("archiveSearch");
  var emptyState = document.getElementById("archiveEmpty");
  var pagination = document.getElementById("pagination");
  var pageNumbers = document.getElementById("pageNumbers");
  var prevPageButton = document.getElementById("prevPage");
  var nextPageButton = document.getElementById("nextPage");
  var archiveSection = document.getElementById("archive");

  var liveRegion = document.createElement("p");
  liveRegion.className = "sr-only";
  liveRegion.setAttribute("aria-live", "polite");
  document.body.appendChild(liveRegion);

  var currentFilter = "all";
  var currentPage = 1;
  var searchQuery = searchInput ? searchInput.value.trim().toLowerCase() : "";
  var totalPages = 1;
  var firstRender = true;
  var cards = [];

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function icon(name, size) {
    return (
      '<svg class="icon" width="' +
      size +
      '" height="' +
      size +
      '" aria-hidden="true"><use href="#icon-' +
      name +
      '"></use></svg>'
    );
  }

  function cardTemplate(guga) {
    return (
      '<a class="guga-card reveal" href="guga.html?id=' +
      encodeURIComponent(guga.id) +
      '" data-id="' +
      escapeHtml(guga.id) +
      '" data-status="' +
      escapeHtml(guga.statusKey) +
      '">' +
      '<div class="guga-card__media" style="--pos: ' +
      escapeHtml(guga.imagePosition || "50% 50%") +
      '">' +
      '<img src="' +
      escapeHtml(guga.image) +
      '" width="1200" height="900" alt="' +
      escapeHtml(guga.imageAlt) +
      '" loading="lazy" decoding="async">' +
      '<span class="tape" aria-hidden="true"></span>' +
      "</div>" +
      '<div class="guga-card__body">' +
      '<div class="guga-card__meta">' +
      '<span class="status status--' +
      escapeHtml(guga.statusKey) +
      '">' +
      escapeHtml(guga.statusLabel) +
      "</span>" +
      '<time datetime="' +
      escapeHtml(guga.date) +
      '">毕业 ' +
      escapeHtml(guga.dateLabel) +
      "</time>" +
      "</div>" +
      "<h3>" +
      escapeHtml(guga.name) +
      "</h3>" +
      '<p class="handle">' +
      icon("bilibili", 15) +
      " B站 @" +
      escapeHtml(guga.handle) +
      "</p>" +
      '<p class="traits">' +
      escapeHtml(guga.traits.join(" / ")) +
      "</p>" +
      '<span class="card-link">翻开档案 ' +
      icon("arrow-up-right", 16) +
      "</span>" +
      "</div>" +
      "</a>"
    );
  }

  grid.innerHTML = window.GUGAS.map(cardTemplate).join("");
  cards = Array.prototype.slice.call(grid.querySelectorAll(".guga-card"));

  var counters = document.querySelectorAll("[data-count]");

  if (!reduceMotion && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" }
    );
    cards.forEach(function (card) {
      observer.observe(card);
    });
  } else {
    cards.forEach(function (card) {
      card.classList.add("is-visible");
    });
  }

  function matchesSearch(guga) {
    if (!searchQuery) {
      return true;
    }
    var haystack = [
      guga.name,
      guga.handle,
      guga.traits.join(" "),
      guga.description,
      guga.statusLabel,
      guga.dateLabel
    ]
      .join(" ")
      .toLowerCase();
    return haystack.indexOf(searchQuery) !== -1;
  }

  function countFor(matches, key) {
    if (key === "all") {
      return matches.length;
    }
    return matches.filter(function (guga) {
      return guga.statusKey === key;
    }).length;
  }

  function updateCounts(matches) {
    counters.forEach(function (counter) {
      var key = counter.getAttribute("data-count");
      var count = countFor(matches, key);
      counter.textContent = String(count);

      var button = counter.closest("[data-filter]");
      if (button && key !== "all") {
        button.hidden = count === 0;
      }
    });
  }

  function renderPagination() {
    if (!pagination || !pageNumbers) {
      return;
    }

    pagination.hidden = totalPages <= 1;
    prevPageButton.disabled = currentPage <= 1;
    nextPageButton.disabled = currentPage >= totalPages;
    pageNumbers.innerHTML = "";

    if (totalPages <= 1) {
      return;
    }

    for (var page = 1; page <= totalPages; page += 1) {
      (function (pageNumber) {
        var button = document.createElement("button");
        button.type = "button";
        button.className = "page-btn page-btn--number";
        button.textContent = String(pageNumber);
        button.setAttribute("aria-label", "第 " + pageNumber + " 页");
        if (pageNumber === currentPage) {
          button.setAttribute("aria-current", "page");
        }
        button.addEventListener("click", function () {
          goToPage(pageNumber);
        });
        pageNumbers.appendChild(button);
      })(page);
    }
  }

  function goToPage(page) {
    if (page < 1 || page > totalPages || page === currentPage) {
      return;
    }
    currentPage = page;
    renderArchive(true);
  }

  function renderArchive(shouldScroll) {
    var matches = window.GUGAS.filter(matchesSearch);
    updateCounts(matches);

    var filtered =
      currentFilter === "all"
        ? matches
        : matches.filter(function (guga) {
            return guga.statusKey === currentFilter;
          });

    if (currentFilter !== "all" && filtered.length === 0) {
      currentFilter = "all";
      filtered = matches;
    }

    filterButtons.forEach(function (button) {
      button.setAttribute(
        "aria-pressed",
        button.getAttribute("data-filter") === currentFilter ? "true" : "false"
      );
    });

    totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    var start = (currentPage - 1) * PAGE_SIZE;
    var pageItems = filtered.slice(start, start + PAGE_SIZE);
    var pageIds = {};
    pageItems.forEach(function (guga) {
      pageIds[guga.id] = true;
    });

    cards.forEach(function (card) {
      var show = pageIds[card.getAttribute("data-id")] === true;
      card.hidden = !show;
      if (show && !firstRender) {
        card.classList.add("is-visible");
      }
    });

    grid.classList.toggle("is-single", pageItems.length === 1);

    if (emptyState) {
      emptyState.hidden = pageItems.length !== 0;
    }

    renderPagination();

    var summary = searchQuery
      ? "搜索到 " + filtered.length + " 只咕嘎"
      : "共 " + filtered.length + " 只咕嘎";
    if (totalPages > 1) {
      summary += "，第 " + currentPage + " 页，共 " + totalPages + " 页";
    }
    liveRegion.textContent = summary;

    if (shouldScroll && archiveSection) {
      archiveSection.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start"
      });
    }

    firstRender = false;
  }

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      currentFilter = button.getAttribute("data-filter");
      currentPage = 1;
      renderArchive();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", function () {
      searchQuery = searchInput.value.trim().toLowerCase();
      currentPage = 1;
      renderArchive();
    });
  }

  if (prevPageButton) {
    prevPageButton.addEventListener("click", function () {
      goToPage(currentPage - 1);
    });
  }

  if (nextPageButton) {
    nextPageButton.addEventListener("click", function () {
      goToPage(currentPage + 1);
    });
  }

  renderArchive();
})();
