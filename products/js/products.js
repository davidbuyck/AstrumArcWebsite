// products/js/products.js
(function () {
  function qs(sel, root) { return (root || document).querySelector(sel); }
  function qsa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  var yearEl = qs("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  var hamburger = qs("#hamburger");
  var mobilemenu = qs("#mobilemenu");

  function setMenu(open) {
    if (!hamburger || !mobilemenu) return;
    hamburger.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) mobilemenu.classList.add("open");
    else mobilemenu.classList.remove("open");
  }

  if (hamburger && mobilemenu) {
    hamburger.addEventListener("click", function () {
      var isOpen = mobilemenu.classList.contains("open");
      setMenu(!isOpen);
    });

    qsa(".mobilemenu a").forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });
  }

  // Featured filter pills
  var pills = qsa(".pill");
  var cards = qsa(".productCard");

  function applyFilter(tag) {
    pills.forEach(function (p) {
      var on = p.getAttribute("data-filter") === tag;
      if (on) {
        p.classList.add("active");
        p.setAttribute("aria-selected", "true");
      } else {
        p.classList.remove("active");
        p.setAttribute("aria-selected", "false");
      }
    });

    cards.forEach(function (c) {
      var tags = (c.getAttribute("data-tags") || "").split(/\s+/).filter(Boolean);
      var show = (tag === "all") ? true : (tags.indexOf(tag) >= 0);
      if (show) c.classList.remove("hidden");
      else c.classList.add("hidden");
    });
  }

  if (pills.length && cards.length) {
    pills.forEach(function (p) {
      p.addEventListener("click", function () {
        var tag = p.getAttribute("data-filter") || "all";
        applyFilter(tag);
      });
    });

    applyFilter("all");
  }

  // Count-up stats when visible
  var statNums = qsa(".statNum");
  var hasCounted = false;

  function formatNumber(n) {
    return n.toLocaleString("en-US");
  }

  function runCount() {
    if (hasCounted) return;
    hasCounted = true;

    statNums.forEach(function (el) {
      var target = parseInt(el.getAttribute("data-count") || "0", 10);
      if (!isFinite(target)) target = 0;

      var start = 0;
      var duration = 900;
      var t0 = performance.now();

      function tick(t) {
        var p = Math.min(1, (t - t0) / duration);
        var eased = 1 - Math.pow(1 - p, 3);
        var val = Math.round(start + (target - start) * eased);
        el.textContent = formatNumber(val);
        if (p < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
    });
  }

  var impact = qs("#impact");
  if (impact && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          runCount();
          io.disconnect();
        }
      });
    }, { threshold: 0.25 });
    io.observe(impact);
  } else {
    runCount();
  }
})();


var badgeBtns = qsa(".badgeBtn");
var featuredSection = qs("#featured");

badgeBtns.forEach(function (b) {
  b.addEventListener("click", function () {
    var tag = b.getAttribute("data-filter");
    if (!tag) return;
    applyFilter(tag);
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});