// Personal portfolio interactions — no build tools required.
const roles = ["Assistant Professor", "AI Researcher", "LLM Explorer", "Deep Learning Enthusiast", "Algorithm Thinker"];
const typedRole = document.getElementById("typedRole");
let roleIndex = 0, charIndex = 0, deleting = false;
function typeRole() {
  if (!typedRole) return;
  const word = roles[roleIndex];
  typedRole.textContent = word.slice(0, charIndex);
  if (!deleting && charIndex < word.length) {
    charIndex++;
    setTimeout(typeRole, 78);
  } else if (!deleting) {
    deleting = true;
    setTimeout(typeRole, 1350);
  } else if (charIndex > 0) {
    charIndex--;
    setTimeout(typeRole, 34);
  } else {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeRole, 350);
  }
}
typeRole();

// Reveal sections as they enter the viewport.
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// Project category filters.
const filterButtons = document.querySelectorAll(".filter-btn");
const projectItems = document.querySelectorAll(".project-item");
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    projectItems.forEach(item => {
      const visible = filter === "all" || item.dataset.category === filter;
      item.classList.toggle("is-hidden", !visible);
      if (visible) item.classList.add("revealed");
    });
  });
});

// Reading progress, navbar appearance, back-to-top button, and current year.
const progress = document.getElementById("readingProgress");
const backToTop = document.getElementById("backToTop");
function onScroll() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`;
  backToTop.classList.toggle("visible", window.scrollY > 550);
  document.querySelector(".site-nav").classList.toggle("nav-scrolled", window.scrollY > 30);
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();
backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
document.getElementById("year").textContent = new Date().getFullYear();

// Close the mobile menu after selecting a section.
document.querySelectorAll(".site-nav .nav-link").forEach(link => {
  link.addEventListener("click", () => {
    const nav = document.getElementById("mainNav");
    if (nav.classList.contains("show")) bootstrap.Collapse.getOrCreateInstance(nav).hide();
  });
});
