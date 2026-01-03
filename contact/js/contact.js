// js/contact.js
const yearEl = document.getElementById("year")
if (yearEl) yearEl.textContent = new Date().getFullYear()

const hamburger = document.getElementById("hamburger")
const mobilemenu = document.getElementById("mobilemenu")

const setMobileOpen = (open) => {
  if (!mobilemenu || !hamburger) return
  mobilemenu.style.display = open ? "block" : "none"
  hamburger.setAttribute("aria-expanded", open ? "true" : "false")
}

if (hamburger) {
  hamburger.addEventListener("click", () => {
    const open = mobilemenu && mobilemenu.style.display === "block"
    setMobileOpen(!open)
  })
}

if (mobilemenu) {
  mobilemenu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => setMobileOpen(false))
  })
}

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

const emailBtn = document.getElementById("copyEmail")
const toast = document.getElementById("copyToast")

const showToast = (msg) => {
  if (!toast) return
  toast.textContent = msg
  toast.style.opacity = "1"
  clearTimeout(showToast._t)
  showToast._t = setTimeout(() => {
    toast.textContent = ""
  }, 1600)
}

if (emailBtn) {
  emailBtn.addEventListener("click", async () => {
    const val = emailBtn.getAttribute("data-copy") || ""
    try {
      await navigator.clipboard.writeText(val)
      showToast("Copied.")
    } catch {
      showToast("Copy failed. Email is: " + val)
    }
  })
}

const form = document.getElementById("contactForm")
const formError = document.getElementById("formError")
const submitBtn = document.getElementById("submitBtn")
const prefillBtn = document.getElementById("prefillBtn")

const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s || "").trim())

const setError = (msg) => {
  if (formError) formError.textContent = msg || ""
}

if (form) {
  form.addEventListener("submit", (e) => {
    setError("")
    const email = document.getElementById("email")?.value || ""
    const stage = document.getElementById("stage")?.value || ""
    const build = document.getElementById("build")?.value || ""

    if (!isEmail(email)) {
      e.preventDefault()
      setError("Please enter a valid email so we can reply.")
      document.getElementById("email")?.focus()
      return
    }

    if (!stage) {
      e.preventDefault()
      setError("Please select a stage (it helps us respond accurately).")
      document.getElementById("stage")?.focus()
      return
    }

    if (String(build).trim().length < 12) {
      e.preventDefault()
      setError("Give us a little more detail—one or two sentences is enough.")
      document.getElementById("build")?.focus()
      return
    }

    if (submitBtn) submitBtn.disabled = true
    setTimeout(() => { if (submitBtn) submitBtn.disabled = false }, 1200)
  })
}

if (prefillBtn) {
  prefillBtn.addEventListener("click", () => {
    const name = document.getElementById("name")
    const company = document.getElementById("company")
    const stage = document.getElementById("stage")
    const timeline = document.getElementById("timeline")
    const budget = document.getElementById("budget")
    const build = document.getElementById("build")
    const nda = document.getElementById("nda")

    if (name && !name.value) name.value = "Jane Doe"
    if (company && !company.value) company.value = "Example Team"
    if (stage && !stage.value) stage.value = "Prototype"
    if (timeline && !timeline.value) timeline.value = "1-3 months"
    if (budget && !budget.value) budget.value = "15k-50k"
    if (build && !build.value) {
      build.value =
        "We need an interactive web app that visualizes live operational data and helps our team make faster decisions. " +
        "Users are internal operators. Success means clear dashboards, auditability, and a workflow that feels effortless."
    }
    if (nda && !nda.checked) nda.checked = true
    setError("")
  })
}
