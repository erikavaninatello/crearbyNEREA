// cursor.js — Cursor personalizado con 3 capas y efecto lerp
(function () {
  const dot   = document.getElementById('cursor-dot');
  const ring  = document.getElementById('cursor-ring');
  const trail = document.getElementById('cursor-trail');
  if (!dot || !ring || !trail) return;

  let mx = -100, my = -100;
  let rx = -100, ry = -100;
  let tx = -100, ty = -100;

  window.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  // Ring y trail con lerp suave
  (function lerpLoop() {
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';

    tx += (mx - tx) * 0.07;
    ty += (my - ty) * 0.07;
    trail.style.left = tx + 'px';
    trail.style.top  = ty + 'px';

    requestAnimationFrame(lerpLoop);
  })();

  // Hover sobre elementos interactivos
  const HOVER_SEL = 'a, button, [onclick], .tarjeta, .galeria-item, .sidebar-item, .btn-filtro, input, select, textarea';
  document.addEventListener('mouseover', e => {
    if (e.target.closest(HOVER_SEL)) document.body.classList.add('cursor-hover');
  });
  document.addEventListener('mouseout', e => {
    if (e.target.closest(HOVER_SEL)) document.body.classList.remove('cursor-hover');
  });

  // Efecto click
  document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
  document.addEventListener('mouseup',   () => document.body.classList.remove('cursor-click'));

  // Ocultar al salir de la ventana
  document.addEventListener('mouseleave', () => {
    [dot, ring, trail].forEach(el => el.style.opacity = '0');
  });
  document.addEventListener('mouseenter', () => {
    [dot, ring, trail].forEach(el => el.style.opacity = '1');
  });
})();
