// funciones.js — Renderizado de clases, filtros y modales

export function renderizarClases(lista, contenedor) {
  contenedor.innerHTML = '';

  if (lista.length === 0) {
    contenedor.innerHTML = '<p style="grid-column:1/-1;text-align:center;padding:60px;color:#5a5650;font-size:13px;letter-spacing:2px;">SIN RESULTADOS PARA ESTE FILTRO</p>';
    return;
  }

  lista.forEach(clase => {
    const t = document.createElement('article');
    t.classList.add('tarjeta');

    const badgeClass = clase.nivel === 'Inicial' ? 'badge-i' : clase.nivel === 'Intermedio' ? 'badge-m' : 'badge-a';

    t.innerHTML = `
      <div class="tarjeta-img">
        <img src="${clase.imagen}" alt="${clase.nombre}" loading="lazy">
        <span class="tarjeta-badge ${badgeClass}">${clase.nivel.toUpperCase()}</span>
      </div>
      <div class="tarjeta-body">
        <h3>${clase.nombre}</h3>
        <span class="tarjeta-nivel">✦ ${clase.nivel.toUpperCase()}</span>
        <ul>
          ${clase.horarios?.map(h => `<li>${h}</li>`).join('') || '<li>Consultar horario</li>'}
        </ul>
        <button class="tarjeta-btn" type="button" data-id="${clase.id}">VER DETALLE</button>
      </div>`;

    contenedor.appendChild(t);
  });
}

export function filtrarPorNivel(lista, nivel) {
  return nivel === 'Todos' ? lista : lista.filter(c => c.nivel === nivel);
}

export function mostrarDetalle(clase) {
  const overlay = document.getElementById('modal-clase');
  if (!overlay) return;

  document.getElementById('modal-img').src       = clase.imagen;
  document.getElementById('modal-img').alt       = clase.nombre;
  document.getElementById('modal-nombre').textContent = clase.nombre;
  document.getElementById('modal-nivel').textContent  = '✦ ' + clase.nivel.toUpperCase();
  document.getElementById('modal-horarios').innerHTML =
    clase.horarios?.map(h => `<li>${h}</li>`).join('') || '<li>Consultar</li>';
  document.getElementById('modal-desc').textContent = clase.descripcion || '';

  const waLink = document.getElementById('modal-wa');
  if (waLink) {
    waLink.href = `https://api.whatsapp.com/send/?phone=5493512587281&text=Hola!%20Quisiera%20info%20sobre%20${encodeURIComponent(clase.nombre)}`;
  }

  overlay.classList.add('activo');
}

export function cerrarModal() {
  document.getElementById('modal-clase')?.classList.remove('activo');
}

// Cerrar con Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') cerrarModal();
});
