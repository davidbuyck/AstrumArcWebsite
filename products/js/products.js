// products/products.js
const pills = Array.from(document.querySelectorAll(".pill"))
const cards = Array.from(document.querySelectorAll(".productCard"))

const setActivePill = (pill) => {
  pills.forEach(p => {
    const on = p === pill
    p.classList.toggle("active", on)
    p.setAttribute("aria-selected", on ? "true" : "false")
  })
}

const applyFilter = (key) => {
  cards.forEach(c => {
    const tags = (c.dataset.tags || "").split(" ").filter(Boolean)
    const show = key === "all" || tags.includes(key)
    c.style.display = show ? "flex" : "none"
  })
}

pills.forEach(p => {
  p.addEventListener("click", () => {
    const key = p.dataset.filter
    setActivePill(p)
    applyFilter(key)
  })
})

const modal = document.getElementById("modal")
const closeModalBtn = document.getElementById("closeModal")
const modalTitle = document.getElementById("modalTitle")
const modalBody = document.getElementById("modalBody")

const productContent = {
  suite_xr: {
    title: "XR Training & Simulation Suite",
    bullets: [
      ["What it is", "High-fidelity XR simulators designed around repeatable, procedure-oriented workflows."],
      ["Highlights", "Physics-driven interaction, scenario design, multi-platform builds, performance-first rendering."],
      ["Typical outcomes", "Faster onboarding, safer practice, consistent repetition, improved confidence."]
    ]
  },
  suite_planning: {
    title: "Pre-Procedural Planning Tools",
    bullets: [
      ["What it is", "Patient-specific visualization and measurement tooling for confident planning."],
      ["Highlights", "3D workflows, device-fit reasoning, scene exploration, exportable visuals for review."],
      ["Typical outcomes", "Clearer decision-making, better planning communication, reduced uncertainty."]
    ]
  },
  suite_guidance: {
    title: "Real-Time Guidance Displays",
    bullets: [
      ["What it is", "Operator-centric displays that combine signal + context with low-latency interaction."],
      ["Highlights", "Fast charting, clean UI patterns, integration-ready architecture, resilient performance."],
      ["Typical outcomes", "Better situational awareness, faster interpretation, fewer manual steps."]
    ]
  },
  suite_ai: {
    title: "AI-Assisted Workflow Tools",
    bullets: [
      ["What it is", "LLM and ML integrations embedded into real product flows (not bolted-on demos)."],
      ["Highlights", "Guardrailed outputs, workflow automation, evaluation patterns, reliable UI/UX."],
      ["Typical outcomes", "Less admin work, faster summarization, consistent documentation and ops tasks."]
    ]
  },
  platform_core: {
    title: "Simulation & Intelligence Platform",
    bullets: [
      ["What it is", "A modular foundation that accelerates building new products across devices."],
      ["Includes", "Engines, UI patterns, data layers, integration primitives, deployment-ready structure."],
      ["Why it matters", "Reuse reduces timeline and risk while keeping behavior consistent."]
    ]
  },
  hardware_stack: {
    title: "Device Control & Hardware Integration",
    bullets: [
      ["What it is", "Bridging software to hardware: robotics, controllers, tracking, real-time IO."],
      ["Includes", "Microcontroller-based interfaces (ex: Pico), control loops, integration into apps."],
      ["Typical outcomes", "Reliable prototypes, test rigs, device-adjacent workflows, integrated training."]
    ]
  }
}

const openProductModal = (key) => {
  const c = productContent[key]
  if (!c) return
  modalTitle.textContent = c.title
  modalBody.innerHTML = `
    <div>${c.title} — scoped and engineered as a real system.</div>
    <div class="modalGrid">
      ${c.bullets.map(b => `
        <div class="mblock">
          <div class="h">${b[0]}</div>
          <div class="t">${b[1]}</div>
        </div>
      `).join("")}
    </div>
    <div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap">
      <a class="btn primary" href="../index.html#contact">Talk About a Product</a>
      <a class="btn ghost" href="#catalog">Back to Product Families</a>
    </div>
  `
  modal.classList.add("open")
  document.body.style.overflow = "hidden"
}

const closeModal = () => {
  modal.classList.remove("open")
  document.body.style.overflow = ""
}

document.querySelectorAll("[data-modal]").forEach(el => {
  el.addEventListener("click", () => openProductModal(el.dataset.modal))
  el.setAttribute("role", "button")
})

closeModalBtn.addEventListener("click", closeModal)
modal.addEventListener("click", (e) => { if (e.target === modal) closeModal() })
window.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal() })

const statEls = Array.from(document.querySelectorAll(".statNum"))

const formatNumber = (n) => {
  const s = String(n)
  if (s.length <= 3) return s
  let out = ""
  let count = 0
  for (let i = s.length - 1; i >= 0; i--) {
    out = s[i] + out
    count++
    if (count === 3 && i !== 0) {
      out = "," + out
      count = 0
    }
  }
  return out
}

const animateCount = (el, target) => {
  const start = 0
  const durMs = 900
  const t0 = performance.now()
  const step = (t) => {
    const p = Math.min(1, (t - t0) / durMs)
    const eased = 1 - Math.pow(1 - p, 3)
    const val = Math.round(start + (target - start) * eased)
    el.textContent = formatNumber(val)
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return
    const el = e.target
    const target = Number(el.dataset.count || "0")
    if (el.dataset.did === "1") return
    el.dataset.did = "1"
    animateCount(el, target)
  })
}, { threshold: 0.35 })

statEls.forEach(el => io.observe(el))
