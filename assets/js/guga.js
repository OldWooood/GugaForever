(function () {
  "use strict";

  var detail = document.getElementById("gugaDetail");
  var loading = document.getElementById("detailLoading");
  var errorState = document.getElementById("detailError");

  if (!detail || !Array.isArray(window.GUGAS)) {
    return;
  }

  var params = new URLSearchParams(window.location.search);
  var id = params.get("id");
  var guga = window.GUGAS.find(function (item) {
    return item.id === id;
  });

  function showError() {
    if (loading) {
      loading.hidden = true;
    }
    detail.hidden = true;
    if (errorState) {
      errorState.hidden = false;
    }
    document.title = "找不到这只咕嘎｜咕嘎永远";
  }

  if (!guga) {
    showError();
    return;
  }

  function setText(id, value) {
    var node = document.getElementById(id);
    if (node) {
      node.textContent = value;
    }
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

  function safeExternalUrl(url) {
    try {
      var parsed = new URL(url);
      return parsed.protocol === "https:" || parsed.protocol === "http:"
        ? parsed.href
        : "#";
    } catch (error) {
      return "#";
    }
  }

  var title = guga.name + "｜毕业档案｜咕嘎永远";
  document.title = title;

  var ogTitle = document.querySelector('meta[property="og:title"]');
  var ogDescription = document.querySelector('meta[property="og:description"]');
  var ogImage = document.querySelector('meta[property="og:image"]');
  var description = document.querySelector('meta[name="description"]');

  if (ogTitle) {
    ogTitle.setAttribute("content", title);
  }
  if (ogDescription) {
    ogDescription.setAttribute("content", guga.description);
  }
  if (description) {
    description.setAttribute("content", guga.description);
  }
  if (ogImage) {
    ogImage.setAttribute("content", guga.imageLarge || guga.image);
  }

  var image = document.getElementById("detailImage");
  if (image) {
    image.src = guga.imageLarge || guga.image;
    image.alt = guga.detailAlt || guga.imageAlt;
    image.fetchPriority = "high";
    image.style.objectPosition = guga.imagePosition || "50% 50%";
  }

  setText("detailCredit", guga.credit);
  setText("detailStatus", guga.statusLabel + "档案");
  setText("detailName", guga.name);
  setText("detailHandle", "B站 @" + guga.handle);
  setText("detailLead", guga.description);
  setText("factDate", guga.dateHuman);
  setText("factStatus", guga.statusLabel);
  setText("factTraits", guga.traits.join(" / "));
  setText("factFarewell", "《" + guga.farewellTitle + "》");

  var factSpace = document.getElementById("factSpace");
  if (factSpace) {
    var spaceLink = document.createElement("a");
    spaceLink.href = safeExternalUrl(guga.spaceUrl);
    spaceLink.target = "_blank";
    spaceLink.rel = "noopener noreferrer";
    spaceLink.innerHTML =
      icon("bilibili", 16) + " B站 @" + guga.handle;
    factSpace.appendChild(spaceLink);
  }

  var watchButton = document.getElementById("watchButton");
  if (watchButton) {
    watchButton.href = safeExternalUrl(guga.farewellUrl);
  }

  var spaceButton = document.getElementById("spaceButton");
  if (spaceButton) {
    spaceButton.href = safeExternalUrl(guga.spaceUrl);
  }

  if (guga.quote) {
    var quote = document.getElementById("detailQuote");
    if (quote) {
      quote.hidden = false;
      setText("quoteText", guga.quote);
      setText("quoteSource", guga.quoteSource);
    }
  }

  setText("detailNote", guga.note);
  setText("statusNote", guga.statusNote);

  var index = window.GUGAS.indexOf(guga);
  var prev = window.GUGAS[(index - 1 + window.GUGAS.length) % window.GUGAS.length];
  var next = window.GUGAS[(index + 1) % window.GUGAS.length];

  function setPager(prefix, item) {
    var link = document.getElementById(prefix + "Link");
    var name = document.getElementById(prefix + "Name");
    if (link) {
      link.href = "guga.html?id=" + encodeURIComponent(item.id);
    }
    if (name) {
      name.textContent = item.name;
    }
  }

  setPager("prev", prev);
  setPager("next", next);

  if (loading) {
    loading.hidden = true;
  }
  detail.hidden = false;

})();
