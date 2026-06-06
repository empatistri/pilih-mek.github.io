/* — SPA navigation — */
function go(page) {
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active"));
  document.getElementById(page).classList.add("active");
  document.querySelectorAll("[data-p]").forEach((a) => {
    a.classList.toggle("active", a.dataset.p === page);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
  // Close mobile menu
  const menu = document.getElementById("navMenu");
  if (menu.classList.contains("show"))
    bootstrap.Collapse.getInstance(menu)?.hide();
  return false;
}

/* — Portfolio filter — */
function filter(cat, btn) {
  document
    .querySelectorAll(".filter-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  document.querySelectorAll(".pf-card-wrap").forEach((c) => {
    const show = cat === "all" || c.dataset.cat === cat;
    c.style.display = show ? "" : "none";
  });
}

/* — Contact form — */
function sendMsg(e) {
  e.preventDefault();
  const btn = document.getElementById("sendBtn");
  btn.textContent = "✓ Terkirim!";
  btn.style.background = "#2A6A3A";
  setTimeout(() => {
    btn.textContent = "Kirim Pesan →";
    btn.style.background = "";
    e.target.reset();
  }, 3000);
}

/* — Prevent default on # links — */
document
  .querySelectorAll('a[href="#"]')
  .forEach((a) => a.addEventListener("click", (e) => e.preventDefault()));
