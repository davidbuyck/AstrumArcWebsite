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
      setMenu(!mobilemenu.classList.contains("open"));
    });

    qsa(".mobilemenu a").forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenu(false);
    });
  }

  var pills = qsa(".pill");
  var cards = qsa(".productCard");
  var featuredSection = qs("#featured");

  function setActivePill(tag) {
    if (!pills.length) return;
    pills.forEach(function (p) {
      var on = (p.getAttribute("data-filter") === tag);
      if (on) {
        p.classList.add("active");
        p.setAttribute("aria-selected", "true");
      } else {
        p.classList.remove("active");
        p.setAttribute("aria-selected", "false");
      }
    });
  }

  function applyFilter(tag) {
    setActivePill(tag);
    cards.forEach(function (c) {
      var t = (c.getAttribute("data-tags") || "").split(/\s+/).filter(Boolean);
      var show = (tag === "all") ? true : (t.indexOf(tag) >= 0);
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

  var badgeBtns = qsa(".badgeBtn");
  if (badgeBtns.length) {
    badgeBtns.forEach(function (b) {
      b.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        var tag = b.getAttribute("data-filter");
        if (!tag) return;
        applyFilter(tag);
        if (featuredSection) featuredSection.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  var modal = qs("#modal");
  var modalTitle = qs("#modalTitle");
  var modalBody = qs("#modalBody");
  var closeModalBtn = qs("#closeModal");
  var modalCloseBtn = qs("#modalCloseBtn");
  var lastFocus = null;

  var DETAILS = {
    xr_suite: {
      title: "XR Training & Simulation Suite",
      intro: "Procedure-oriented simulators with high-fidelity interaction, repeatable workflows, and measurable training outcomes. Built to ship across devices and evolve over time.",
      blocks: [
        { h: "What it can include", items: [
          "Scenario library and instructor controls",
          "Physics-driven interaction and procedural constraints",
          "Skills scoring, replay, and objective feedback",
          "Multi-user sessions and guided instruction modes",
          "Content pipeline for new procedures and devices"
        ]},
        { h: "Typical outputs", items: [
          "Standalone XR simulator",
          "Desktop instructor console",
          "Mobile companion for review and reinforcement",
          "Session analytics and exportable reports"
        ]}
      ]
    },

    preop_planning: {
      title: "Pre-Procedural Planning Tools",
      intro: "Planning software that makes complex cases clearer: measurement, device fit checks, scenario exploration, and visualization that supports confident decisions.",
      blocks: [
        { h: "What it can include", items: [
          "3D measurement tooling and landmarks",
          "Device fit checks and geometric constraints",
          "Case comparison and saved planning states",
          "Annotation, reporting, and export formats",
          "Integration with existing imaging and data systems"
        ]},
        { h: "Typical outputs", items: [
          "Desktop planning application",
          "Web viewer for broader access",
          "XR planning mode for spatial review",
          "Data export and reporting pipeline"
        ]}
      ]
    },

    realtime_guidance: {
      title: "Real-Time Guidance Displays",
      intro: "Low-latency operator interfaces that turn streaming data into actionable understanding: signals, context overlays, and workflow-first UI designed for speed and clarity.",
      blocks: [
        { h: "What it can include", items: [
          "Signal plotting, overlays, and derived metrics",
          "Live system integration and data synchronization",
          "Latency-aware rendering and buffering",
          "Operator UX optimized for real workflows",
          "Logging, replay, and QA tooling"
        ]},
        { h: "Typical outputs", items: [
          "Device-adjacent UI module",
          "Desktop console application",
          "Embedded tooling or companion display",
          "Exportable case/session artifacts"
        ]}
      ]
    },

    ai_workflow: {
      title: "AI-Assisted Workflow Tools",
      intro: "AI features that actually help: embedded directly into the product UI, with evaluation, monitoring, and workflows that keep outputs trustworthy.",
      blocks: [
        { h: "What it can include", items: [
          "In-app assistant experiences (not a chat toy)",
          "Summaries, drafting, and structured extraction",
          "Guided workflows and automation steps",
          "Evaluation harnesses and monitoring dashboards",
          "Human-in-the-loop review and approval patterns"
        ]},
        { h: "Typical outputs", items: [
          "Product UI + backend inference integration",
          "Internal tooling for evaluation and ops",
          "Guardrails and usage analytics",
          "Deployment and maintenance plan"
        ]}
      ]
    },

    foundations: {
      title: "Reusable Product Foundations",
      intro: "A modular core that accelerates new products and keeps behavior consistent: shared UI patterns, data layers, logging, deployment pipelines, and maintainable architecture.",
      blocks: [
        { h: "What it can include", items: [
          "Shared UI components and interaction patterns",
          "Data access layer and API conventions",
          "Auth, roles, and audit trails when needed",
          "Logging, telemetry, and replay workflows",
          "Build, packaging, and release automation"
        ]},
        { h: "Typical outputs", items: [
          "Internal SDK / reusable modules",
          "Reference implementations and docs",
          "CI/CD and deployment templates",
          "Long-term maintainability upgrades"
        ]}
      ]
    },

    hardware_integration: {
      title: "Hardware Integration & Control",
      intro: "Real-time integration between software and physical systems: tracking, microcontrollers, robotics, device IO, and test rigs—built for reliability and repeatability.",
      blocks: [
        { h: "What it can include", items: [
          "Microcontroller firmware + host integration",
          "Sensor ingestion and synchronization",
          "Robotic actuation control and safety constraints",
          "Calibration, diagnostics, and test tooling",
          "Streaming pipelines and low-latency UI"
        ]},
        { h: "Typical outputs", items: [
          "Device control app + integration layer",
          "Test rigs and automation harnesses",
          "Calibration and QA workflows",
          "Deployment and support plan"
        ]}
      ]
    },

    modernization: {
      title: "Product Modernization & Expansion",
      intro: "Upgrade, scale, and extend existing devices and software packages. Improve UX, performance, reliability, and ship new features without breaking what already works.",
      blocks: [
        { h: "Common work", items: [
          "Architecture cleanup and modularization",
          "Performance profiling and latency reduction",
          "UX redesign while preserving user workflows",
          "Stability improvements, testing, and CI/CD",
          "New modules, integrations, and feature expansion"
        ]},
        { h: "Results you can expect", items: [
          "Faster iteration and fewer regressions",
          "Better performance and responsiveness",
          "Clearer UI and reduced user friction",
          "Lower operational risk in releases",
          "A codebase your team can maintain"
        ]}
      ]
    },

    ml_vision: {
      title: "ML Models & Computer Vision",
      intro: "Image recognition, prediction, and generative outputs delivered as real product capability: integrated, evaluated, monitored, and designed for usability.",
      blocks: [
        { h: "Capabilities", items: [
          "Classification, detection, and segmentation",
          "Forecasting and predictive analytics",
          "Generative workflows for content and tooling",
          "Evaluation tooling and model monitoring",
          "Product UI patterns that keep outputs trustworthy"
        ]},
        { h: "How it ships", items: [
          "On-device inference or server inference",
          "APIs + pipelines + dashboards",
          "Human-in-the-loop review workflows",
          "Observability and drift monitoring"
        ]}
      ]
    },

    data_platforms: {
      title: "Data Analytics Systems & Databases",
      intro: "Data systems that are fast, consistent, and maintainable: clean models, pipelines, APIs, dashboards, and operational monitoring across domains.",
      blocks: [
        { h: "Examples", items: [
          "Finance analytics and reporting",
          "Medical prediction and interpretation tools",
          "Economics dashboards and modeling",
          "Sports scoring databases and live updating apps"
        ]},
        { h: "What you get", items: [
          "Data model + storage layer",
          "ETL with validation and monitoring",
          "Dashboards and product UI",
          "APIs and integration points"
        ]}
      ]
    },

    simulation_twins: {
      title: "Scientific Simulation & Digital Twins",
      intro: "High-fidelity simulation with real datasets and correct physics, designed for exploration, training, R&D, and decision support.",
      blocks: [
        { h: "Examples", items: [
          "Space travel simulation with kinematics and dynamics",
          "NASA-based astronomical system visualization",
          "Interactive digital twins of complex systems",
          "Real-time simulation + visualization tooling"
        ]},
        { h: "Key features", items: [
          "Accurate motion and state modeling",
          "Performance-first rendering and interaction",
          "Data-driven parameters and reproducibility",
          "Export, replay, and analysis tooling"
        ]}
      ]
    },

    recon_2d3d: {
      title: "2D-to-3D Reconstruction",
      intro: "Generate usable 3D anatomy or geometry from 2D imaging, then ship it inside planning and visualization tools people can actually use.",
      blocks: [
        { h: "What it can include", items: [
          "Segmentation workflows and QA tooling",
          "Mesh generation and post-processing",
          "Landmarking, measurement, and reporting",
          "Batch pipelines for many studies/cases",
          "Export formats and integration into viewers"
        ]},
        { h: "How it ships", items: [
          "Desktop tool, web viewer, or integrated module",
          "Automated pipeline with review UI",
          "Dataset + annotation management",
          "Validation and traceability patterns"
        ]}
      ]
    },

    adaptive_edu: {
      title: "Adaptive Education Platforms",
      intro: "Automated learning platforms where AI generates material and XR experiences, adapting difficulty using real user signals (including wearables) and measurable learning loops.",
      blocks: [
        { h: "Core components", items: [
          "AI content generation pipeline and curation tools",
          "XR lessons, interactive modules, and assessments",
          "Personalization engine (behavior + wearable signals)",
          "Admin portal for instructors and program owners",
          "Analytics, progress tracking, and reporting"
        ]},
        { h: "Wearable-driven adaptation", items: [
          "Difficulty pacing and breaks based on load signals",
          "Adaptive repetition and reinforcement timing",
          "Engagement and retention optimization workflows",
          "Safe defaults and explainable personalization"
        ]}
      ]
    }
  };

  function openModal(key) {
    if (!modal || !modalTitle || !modalBody) return;
    var d = DETAILS[key];
    if (!d) return;

    lastFocus = document.activeElement;

    modalTitle.textContent = d.title;

    var html = "";
    html += '<p class="mIntro">' + d.intro + "</p>";
    html += '<div class="modalGrid">';
    d.blocks.forEach(function (b) {
      html += '<div class="mblock">';
      html += '<div class="h">' + b.h + "</div>";
      html += "<ul>";
      b.items.forEach(function (it) { html += "<li>" + it + "</li>"; });
      html += "</ul>";
      html += "</div>";
    });
    html += "</div>";

    modalBody.innerHTML = html;
    modal.classList.add("open");
    document.body.style.overflow = "hidden";

    if (closeModalBtn) closeModalBtn.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove("open");
    document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
  if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);

  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });

  qsa(".productCard").forEach(function (card) {
    var key = card.getAttribute("data-key");
    if (!key) return;

    var btn = card.querySelector(".detailsBtn");
    if (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        openModal(key);
      });
    }

    card.addEventListener("click", function (e) {
      var t = e.target;
      if (!t) return;
      if (t.classList.contains("pill")) return;
      if (t.classList.contains("badgeBtn")) return;
      if (t.classList.contains("detailsBtn")) return;
      openModal(key);
    });

    card.style.cursor = "pointer";
  });

  var statNums = qsa(".statNum");
  var hasCounted = false;

  function formatNumber(n) { return n.toLocaleString("en-US"); }

  function runCount() {
    if (hasCounted) return;
    hasCounted = true;

    statNums.forEach(function (el) {
      var target = parseInt(el.getAttribute("data-count") || "0", 10);
      if (!isFinite(target)) target = 0;

      var duration = 900;
      var t0 = performance.now();

      function tick(t) {
        var p = Math.min(1, (t - t0) / duration);
        var eased = 1 - Math.pow(1 - p, 3);
        var val = Math.round(target * eased);
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

  var intentPanel = qs("#intentPanel");
  var intentHint = qs("#intentHint");
  var intentTitle = qs("#intentTitle");
  var intentDesc = qs("#intentDesc");
  var intentList = qs("#intentList");
  var intentCTA = qs("#intentCTA");
  var intentClose = qs("#intentClose");

  var INTENTS = {
    scratch: {
      title: "Build a product from scratch",
      desc: "You have an idea and want a production-grade product built end-to-end.",
      bullets: [
        "Clarify users, workflows, and constraints",
        "Design architecture and UX together",
        "Build a working system (not just screens)",
        "Ship with docs, packaging, and a growth path"
      ],
      cta: "Start a product conversation"
    },
    prototype: {
      title: "Prototype to validate an idea",
      desc: "You want to prove feasibility and usability before going all-in.",
      bullets: [
        "Fast vertical slice with real interaction",
        "De-risk performance, UX, or integration",
        "Built to evolve into production if it hits",
        "Clear next-step plan after validation"
      ],
      cta: "Discuss a prototype"
    },
    upgrade: {
      title: "Upgrade performance + UX",
      desc: "You already have software, but it’s slow, brittle, or hard to use.",
      bullets: [
        "Performance profiling and bottleneck removal",
        "UX cleanup without breaking workflows",
        "Architecture hardening and maintainability",
        "Incremental releases, not risky rewrites"
      ],
      cta: "Plan an upgrade"
    },
    integrate: {
      title: "Integrate with existing systems",
      desc: "You need new capability to work cleanly with your current stack/devices/data.",
      bullets: [
        "API + data integrations",
        "Device/sensor/hardware IO as needed",
        "Reliable sync, logging, and error handling",
        "UI that fits existing workflows"
      ],
      cta: "Talk through integration"
    },
    automate: {
      title: "Automate a manual workflow",
      desc: "People are doing repetitive, error-prone work that software should handle.",
      bullets: [
        "Map the real workflow (not the ideal one)",
        "Design automation users trust",
        "Integrate with current tools and data",
        "Measure time saved and reliability gains"
      ],
      cta: "Explore automation"
    }
  };

  function clearIntentSelection() {
    qsa(".choice").forEach(function (b) { b.classList.remove("active"); });
    if (intentPanel) intentPanel.hidden = true;
    if (intentHint) intentHint.hidden = false;
  }

  qsa(".choice").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var key = btn.getAttribute("data-intent");
      var d = INTENTS[key];
      if (!d) return;

      qsa(".choice").forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");

      intentTitle.textContent = d.title;
      intentDesc.textContent = d.desc;
      intentCTA.textContent = d.cta;

      intentList.innerHTML = "";
      d.bullets.forEach(function (t) {
        var li = document.createElement("li");
        li.textContent = t;
        intentList.appendChild(li);
      });

      intentHint.hidden = true;
      intentPanel.hidden = false;
    });
  });

  if (intentClose) intentClose.addEventListener("click", clearIntentSelection);


})();



