/* — Cursor — */
const cur = document.getElementById("cursor");
const ring = document.getElementById("cursor-ring");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0;
document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
});
(function loop() {
  rx += (mx - rx) * 0.18;
  ry += (my - ry) * 0.18;
  if (cur) {
    cur.style.left = mx + "px";
    cur.style.top = my + "px";
  }
  if (ring) {
    ring.style.left = rx + "px";
    ring.style.top = ry + "px";
  }
  requestAnimationFrame(loop);
})();

/* — Navbar scroll — */
window.addEventListener("scroll", () => {
  document
    .getElementById("navbar")
    .classList.toggle("scrolled", window.scrollY > 40);
});

/* — SPA navigation — */
function navigate(page) {
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active"));
  document.getElementById(page).classList.add("active");
  document.querySelectorAll(".nav-links a").forEach((a) => {
    a.classList.toggle("active", a.dataset.page === page);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
  setTimeout(observeReveal, 50);
  return false;
}

/* — Mobile nav — */
const mobileMenu = document.getElementById("mobileMenu");
document.getElementById("navToggle").addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});
function closeMobile() {
  mobileMenu.classList.remove("open");
}

/* — Scroll reveal — */
function observeReveal() {
  const els = document.querySelectorAll(".page.active .reveal");
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("visible");
      });
    },
    { threshold: 0.1 },
  );
  els.forEach((el) => {
    el.classList.remove("visible");
    obs.observe(el);
  });
  // Trigger immediately for above-fold
  setTimeout(
    () =>
      els.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight) el.classList.add("visible");
      }),
    50,
  );
}
observeReveal();

/* — Portfolio filter — */
function filterPortfolio(cat, btn) {
  document
    .querySelectorAll(".filter-btn")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  document.querySelectorAll(".pf-card").forEach((card) => {
    const match = cat === "all" || card.dataset.cat === cat;
    card.style.opacity = match ? "1" : "0.2";
    card.style.pointerEvents = match ? "all" : "none";
    card.style.transform = match ? "" : "scale(0.96)";
  });
}

/* — Lightbox — */
function openLightbox(item) {
  const cap = item.dataset.caption || "";
  const rect = item.querySelector(".gal-rect");
  const clone = rect.cloneNode(true);
  clone.classList.add("lb-rect");
  clone.style.minWidth = "400px";
  clone.style.minHeight = "320px";
  clone.style.width = "60vw";
  clone.style.maxWidth = "600px";
  document.getElementById("lightbox-content").innerHTML = "";
  document.getElementById("lightbox-content").appendChild(clone);
  document.getElementById("lightbox-caption").textContent = cap;
  document.getElementById("lightbox").classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeLightbox() {
  document.getElementById("lightbox").classList.remove("open");
  document.body.style.overflow = "";
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

/* — Contact form — */
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector(".btn-send");
  btn.textContent = "✓ Terkirim!";
  btn.style.background = "#2A6A3A";
  setTimeout(() => {
    btn.textContent = "Kirim Pesan →";
    btn.style.background = "";
    e.target.reset();
  }, 3000);
}

/* Prevent default on nav links */
document.querySelectorAll('a[href="#"]').forEach((a) => {
  a.addEventListener("click", (e) => e.preventDefault());
});
