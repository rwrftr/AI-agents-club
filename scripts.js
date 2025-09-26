/* -------------------------------------------------------------
   Minimal interactivity & form handling
   - Image URLs defined here for easy swapping later.
   - Mobile nav toggle
   - Smooth scroll for in-page links
   - Client-side validation + async form submission
-------------------------------------------------------------- */

// ===== Image URL placeholders (swap these later) =====
const HERO_IMAGE_URL = "assets/hero-placeholder.jpg";     // Replace with your image path or remote URL
const ABOUT_IMAGE_URL = "assets/about-placeholder.jpg";   // If you decide to use one later

// Apply hero image background once DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  const art = document.querySelector(".hero-art");
  if (art && HERO_IMAGE_URL) {
    art.style.backgroundImage = `linear-gradient(135deg, rgba(124,195,255,.2), rgba(124,255,205,.08)), url("${HERO_IMAGE_URL}")`;
  }

  // Set current year in footer
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  setupNavToggle();
  setupSmoothScroll();
  setupContactForm();
});

/* ---------- Mobile nav toggle ---------- */
function setupNavToggle(){
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("navMenu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  // Close the menu on link click (mobile)
  menu.addEventListener("click", (e) => {
    if (e.target.matches("a")) {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

/* ---------- Smooth scroll for hash links ---------- */
function setupSmoothScroll(){
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href");
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.pushState(null, "", id);
  });
}

/* ---------- Contact form handling ---------- */
function setupContactForm(){
  const form = document.getElementById("contactForm");
  if (!form) return;

  const status = document.getElementById("formStatus");
  const fields = {
    fullName: document.getElementById("fullName"),
    email: document.getElementById("email"),
    message: document.getElementById("message"),
  };
  const errors = {
    fullName: document.getElementById("fullNameError"),
    email: document.getElementById("emailError"),
    message: document.getElementById("messageError"),
  };
}
  // Replace this with your endpoint (Formspree/Netlify function/etc.)
