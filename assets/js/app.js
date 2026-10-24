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

  var filterButtons = Array.prototype.slice.call(
    document.querySelectorAll("[data-filter]")
  );
  var emptyState = document.getElementById("archiveEmpty");
  var liveRegion = document.createElement("p");
  liveRegion.className = "sr-only";
  liveRegion.setAttribute("aria-live", "polite");
  document.body.appendChild(liveRegion);

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

  var cards = Array.prototype.slice.call(grid.querySelectorAll(".guga-card"));
  var counters = document.querySelectorAll("[data-count]");

  function updateCounts() {
    counters.forEach(function (counter) {
      var key = counter.getAttribute("data-count");
      var count =
        key === "all"
          ? window.GUGAS.length
          : window.GUGAS.filter(function (guga) {
              return guga.statusKey === key;
            }).length;
      counter.textContent = String(count);

      var button = counter.closest("[data-filter]");
      if (button && key !== "all") {
        button.hidden = count === 0;
      }
    });
  }

  updateCounts();

  function applyFilter(filter) {
    var visible = 0;
    cards.forEach(function (card) {
      var show = filter === "all" || card.getAttribute("data-status") === filter;
      card.hidden = !show;
      if (show) {
        visible += 1;
        card.classList.add("is-visible");
      }
    });

    filterButtons.forEach(function (button) {
      button.setAttribute(
        "aria-pressed",
        button.getAttribute("data-filter") === filter ? "true" : "false"
      );
    });

    if (emptyState) {
      emptyState.hidden = visible !== 0;
    }

    grid.classList.toggle("is-single", visible === 1);

    liveRegion.textContent =
      filter === "all"
        ? "已显示全部 " + visible + " 只咕嘎"
        : "已显示 " + visible + " 只咕嘎";
  }

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      applyFilter(button.getAttribute("data-filter"));
    });
  });

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

  if (reduceMotion || !("IntersectionObserver" in window)) {
    cards.forEach(function (card) {
      card.classList.add("is-visible");
    });
  } else {
    cards.forEach(function (card) {
      observer.observe(card);
    });
  }
})();
