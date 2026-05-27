// main.js — Carga clases desde la API, maneja filtros y modal
import { renderizarClases, filtrarPorNivel, mostrarDetalle, cerrarModal } from './funciones.js';

const contenedor = document.getElementById('contenedor');
const botones    = document.querySelectorAll('.btn-filtro');

async function cargarClases() {
  try {
    const res = await fetch('/api/clases');
    if (!res.ok) throw new Error('Error al cargar clases');
    const clases = await res.json();
    inicializar(clases);
  } catch (err) {
    console.error(err);
    if (contenedor) {
      contenedor.innerHTML = '<p style="grid-column:1/-1;text-align:center;padding:60px;color:#dc2626;font-size:12px;letter-spacing:2px;">ERROR AL CARGAR LAS CLASES. INTENTÁ DE NUEVO.</p>';
    }
  }
}

function inicializar(clases) {
  renderizarClases(clases, contenedor);

  // Filtros
  botones.forEach(btn => {
    btn.addEventListener('click', () => {
      botones.forEach(b => b.classList.remove('activo'));
      btn.classList.add('activo');
      renderizarClases(filtrarPorNivel(clases, btn.dataset.nivel), contenedor);
    });
  });

  // Delegación de eventos para "Ver detalle"
  contenedor?.addEventListener('click', e => {
    const btn = e.target.closest('button[data-id]');
    if (!btn) return;
    const clase = clases.find(c => String(c.id) === btn.dataset.id);
    if (clase) mostrarDetalle(clase);
  });

  // Cerrar modal al hacer click en el fondo
  document.getElementById('modal-clase')?.addEventListener('click', e => {
    if (e.target.id === 'modal-clase') cerrarModal();
  });
}

cargarClases();
