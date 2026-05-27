// animaciones.js — Scroll reveal, nav effect, progress bar

// ── Scroll reveal ──
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ── Nav scroll effect ──
window.addEventListener('scroll', () => {
  document.querySelector('nav')?.classList.toggle('scrolled', scrollY > 60);
  updateScrollBar();
});

// ── Progress bar ──
function updateScrollBar() {
  const bar = document.querySelector('.scrollBar');
  if (!bar) return;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const pct = max > 0 ? (scrollY / max) * 100 : 0;
  bar.style.setProperty('--scroll-fill', pct + '%');
}
updateScrollBar();
