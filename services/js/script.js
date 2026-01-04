// services/js/script.js
const yearEl = document.getElementById("year")
if (yearEl) yearEl.textContent = new Date().getFullYear()

const hamburger = document.getElementById("hamburger")
const mobilemenu = document.getElementById("mobilemenu")

const setMobileOpen = (open) => {
  if (!mobilemenu || !hamburger) return
  mobilemenu.style.display = open ? "block" : "none"
  hamburger.setAttribute("aria-expanded", open ? "true" : "false")
}

if (hamburger && mobilemenu) {
  hamburger.addEventListener("click", () => {
    const open = mobilemenu.style.display === "block"
    setMobileOpen(!open)
  })

  mobilemenu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => setMobileOpen(false))
  })
}

const modal = document.getElementById("modal")
const closeModalBtn = document.getElementById("closeModal")
const modalTitle = document.getElementById("modalTitle")
const modalBody = document.getElementById("modalBody")

const serviceContent = {
  analytics: {
    title: "Data Analytics & Decision Support",
    bullets: [
      ["What we deliver", "Dashboards, KPI design, data pipelines, and interactive reporting."],
      ["Good for", "Operations visibility, product metrics, forecasting, decision support."],
      ["Typical outputs", "Data validation, metrics definitions, visualization + drilldowns."]
    ]
  },
  viz: {
    title: "Interactive 3D Visualization",
    bullets: [
      ["What we deliver", "Real-time 3D tools, scientific visualization, WebGL, performance rendering."],
      ["Good for", "Spatial workflows, digital twins, simulation, exploratory analysis."],
      ["Typical outputs", "3D interaction patterns, rendering pipelines, performance profiling."]
    ]
  },
  ai: {
    title: "AI & Machine Learning Integration",
    bullets: [
      ["What we deliver", "Model integration, inference pipelines, evaluation tooling, product UI."],
      ["Good for", "Automation, classification, assisted analysis, intelligent decision support."],
      ["Typical outputs", "Monitoring, guardrails, evaluation dashboards, user-facing explainability."]
    ]
  },
  auto: {
    title: "Automation & Workflow Systems",
    bullets: [
      ["What we deliver", "Workflow tooling, integrations, orchestration, CI/CD automation."],
      ["Good for", "Reducing manual steps, speeding releases, improving reliability."],
      ["Typical outputs", "Build/test/release pipelines, internal tools, API integrations."]
    ]
  },
  web: {
    title: "Web Applications & Product Interfaces",
    bullets: [
      ["What we deliver", "Web apps, portals, admin systems, modern UI engineered for usability."],
      ["Good for", "Client-facing products, internal operations tools, dashboards."],
      ["Typical outputs", "Auth patterns, secure APIs, maintainable architecture, performance tuning."]
    ]
  },
  xr: {
    title: "XR & Simulation Systems",
    bullets: [
      ["What we deliver", "Training simulators, real-time interaction, workflow-driven UX."],
      ["Good for", "Education, rehearsal, skill transfer, spatial problem-solving."],
      ["Typical outputs", "Physics interactions, device integration, cross-platform deployment."]
    ]
  }
}

const openModal = (key) => {
  if (!modal || !modalTitle || !modalBody) return
  const c = serviceContent[key]
  if (!c) return

  modalTitle.textContent = c.title
  modalBody.innerHTML = `
    <div style="color: rgba(183,194,225,.92); font-size: 14px;">
      ${c.title} delivered as clear outcomes and maintainable systems.
    </div>
    <div class="modalGrid">
      ${c.bullets.map(b => `
        <div class="mblock">
          <div class="h">${b[0]}</div>
          <div class="t">${b[1]}</div>
        </div>
      `).join("")}
    </div>
    <div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap">
      <a class="btn primary" href="../contact/">Talk About a Project</a>
    </div>
  `
  modal.classList.add("open")
  document.body.style.overflow = "hidden"
}

const closeModal = () => {
  if (!modal) return
  modal.classList.remove("open")
  document.body.style.overflow = ""
}

document.querySelectorAll(".service").forEach(el => {
  el.addEventListener("click", () => openModal(el.dataset.modal))
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") openModal(el.dataset.modal)
  })
  el.setAttribute("tabindex", "0")
  el.setAttribute("role", "button")
  el.setAttribute("aria-label", "Open service details")
})

if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal)
if (modal) modal.addEventListener("click", (e) => { if (e.target === modal) closeModal() })
window.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal() })

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href").slice(1)
    const target = document.getElementById(id)
    if (!target) return
    e.preventDefault()
    target.scrollIntoView({ behavior: "smooth", block: "start" })
    history.replaceState(null, "", "#" + id)
  })
})
