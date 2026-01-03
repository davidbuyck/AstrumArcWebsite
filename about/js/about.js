// /about/about.js

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
