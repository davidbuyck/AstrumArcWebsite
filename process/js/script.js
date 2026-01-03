const yearEl = document.getElementById("year")
yearEl.textContent = new Date().getFullYear()

const hamburger = document.getElementById("hamburger")
const mobilemenu = document.getElementById("mobilemenu")

const setMobileOpen = (open) => {
  mobilemenu.style.display = open ? "block" : "none"
  hamburger.setAttribute("aria-expanded", open ? "true" : "false")
}

hamburger.addEventListener("click", () => {
  const open = mobilemenu.style.display === "block"
  setMobileOpen(!open)
})

mobilemenu.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => setMobileOpen(false))
})

const modal = document.getElementById("modal")
const closeModalBtn = document.getElementById("closeModal")
const modalTitle = document.getElementById("modalTitle")
const modalBody = document.getElementById("modalBody")

const serviceContent = {
  analytics: {
    title: "Data Analytics",
    bullets: [
      ["What we deliver", "Dashboards, KPI design, data pipelines, and interactive reporting."],
      ["Good for", "Operations visibility, product metrics, forecasting, and decision support."],
      ["Tech", "APIs, ETL, warehousing, streaming, secure access patterns."]
    ]
  },
  viz: {
    title: "3D Visualization",
    bullets: [
      ["What we deliver", "Interactive 3D tools, scientific visualization, WebGL, and performance rendering."],
      ["Good for", "Complex spatial data, digital twins, training, and exploratory analysis."],
      ["Tech", "Unity, WebGL, GPU optimization, UX for 3D workflows."]
    ]
  },
  ai: {
    title: "AI & Machine Learning",
    bullets: [
      ["What we deliver", "Model integration, inference pipelines, evaluation, and product UI."],
      ["Good for", "Automation, classification, recommendations, and intelligent assistance."],
      ["Tech", "Python stacks, deployment patterns, monitoring + guardrails."]
    ]
  },
  auto: {
    title: "Process Automation",
    bullets: [
      ["What we deliver", "Workflow tools, integrations, orchestration, and CI/CD automation."],
      ["Good for", "Reducing manual steps, speeding releases, and improving reliability."],
      ["Tech", "Build/test/release automation, internal platforms, API integrations."]
    ]
  },
  web: {
    title: "Web Development",
    bullets: [
      ["What we deliver", "Marketing sites, web apps, portals, admin tooling, and modern UI."],
      ["Good for", "Client-facing products, internal operations tools, and dashboards."],
      ["Tech", "Modern frontend + backend, auth, performance, maintainability."]
    ]
  },
  xr: {
    title: "XR & Simulation",
    bullets: [
      ["What we deliver", "Training simulators, real-time interaction, and procedure-oriented UX."],
      ["Good for", "Education, rehearsal, skill transfer, and spatial workflows."],
      ["Tech", "Physics interaction, device integration, cross-platform builds."]
    ]
  }
}

const openModal = (key) => {
  const c = serviceContent[key]
  if (!c) return
  modalTitle.textContent = c.title
  modalBody.innerHTML = `
    <div>${c.title} capabilities designed for clear outcomes and real users.</div>
    <div class="modalGrid">
      ${c.bullets.map(b => `
        <div class="mblock">
          <div class="h">${b[0]}</div>
          <div class="t">${b[1]}</div>
        </div>
      `).join("")}
    </div>
    <div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap">
      <a class="btn primary" href="#contact">Talk About a Project</a>
      <a class="btn ghost" href="#services">Back to Services</a>
    </div>
  `
  modal.classList.add("open")
  document.body.style.overflow = "hidden"
}

const closeModal = () => {
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

closeModalBtn.addEventListener("click", closeModal)
modal.addEventListener("click", (e) => { if (e.target === modal) closeModal() })
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

document.querySelectorAll(".thumb[data-img]").forEach(t => {
  t.style.backgroundImage = `url("${t.dataset.img}")`
})







document.querySelectorAll("details.faqItem").forEach(d => {
  d.addEventListener("toggle", () => {
    if (!d.open) return
    document.querySelectorAll("details.faqItem").forEach(other => {
      if (other !== d) other.open = false
    })
  })
})
