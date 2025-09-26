/* -------------------------------------------------------------
   Minimal interactivity & form handling
   - Image URLs defined here for easy swapping later.
   - Mobile nav toggle
   - Smooth scroll for in-page links
   - Client-side validation + async form submission
-------------------------------------------------------------- */

// ===== Image URL placeholders (swap these later) =====
const HERO_IMAGE_URL = "assets/hero-img.png";     
const ABOUT_IMAGE_URL = "assets/about-placeholder.jpg";  

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
  setupCursorGlow();
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

/* ---------- Cursor glow (follow pointer) ---------- */
function setupCursorGlow(){
  // Respect user preference for reduced motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  glow.setAttribute('aria-hidden', 'true');
  document.body.appendChild(glow);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let targetX = mouseX;
  let targetY = mouseY;
  let visible = false;
  let lastMove = Date.now();

  const lerp = (a, b, n) => (1 - n) * a + n * b;
  const smoothing = prefersReduced ? 1 : 0.14; // higher = snappier when reduced-motion

  function showAt(x, y){
    targetX = x;
    targetY = y;
    lastMove = Date.now();
    if(!visible){
      visible = true;
      glow.style.opacity = '1';
    }
  }

  function hideGlow(){
    visible = false;
    glow.style.opacity = '0';
  }

  function onPointer(e){
    const clientX = (e.touches && e.touches[0]) ? e.touches[0].clientX : e.clientX;
    const clientY = (e.touches && e.touches[0]) ? e.touches[0].clientY : e.clientY;
    showAt(clientX, clientY);
  }

  window.addEventListener('pointermove', onPointer, {passive:true});
  window.addEventListener('pointerdown', onPointer, {passive:true});
  window.addEventListener('pointerleave', hideGlow);
  window.addEventListener('touchstart', onPointer, {passive:true});
  window.addEventListener('touchmove', onPointer, {passive:true});
  window.addEventListener('touchend', hideGlow);

  function update(){
    if(prefersReduced){
      mouseX = targetX;
      mouseY = targetY;
    } else {
      mouseX = lerp(mouseX, targetX, smoothing);
      mouseY = lerp(mouseY, targetY, smoothing);
    }

    glow.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;

    // Fade out when idle
    const idle = Date.now() - lastMove;
    if(idle > 1200) {
      glow.style.opacity = '0';
    }

    requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}
