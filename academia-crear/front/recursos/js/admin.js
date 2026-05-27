// admin.js — Panel CMS: login JWT, CRUD clases y alumnos

let TOKEN = localStorage.getItem('crear_token') || null;

// ── LOGO SVG helper ──
const LOGO_SVG_BLACK = `<svg width="52" height="58" viewBox="0 0 170 195" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="85" cy="20" r="12" stroke="#0d0d0d" stroke-width="7" fill="none"/>
  <path d="M30 58 C10 78 14 108 40 120 C66 132 108 115 138 95 C158 80 160 60 144 48" stroke="#0d0d0d" stroke-width="7" stroke-linecap="round" fill="none"/>
  <path d="M85 33 L83 175" stroke="#0d0d0d" stroke-width="7" stroke-linecap="round"/>
  <path d="M83 115 L45 175" stroke="#0d0d0d" stroke-width="7" stroke-linecap="round"/>
  <path d="M85 58 L132 30" stroke="#0d0d0d" stroke-width="7" stroke-linecap="round"/>
</svg>`;

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.login-logo')?.insertAdjacentHTML('beforeend', LOGO_SVG_BLACK);

  if (TOKEN) {
    mostrarAdmin();
  } else {
    mostrarLogin();
  }
});

// ── LOGIN ──
document.getElementById('form-login')?.addEventListener('submit', async e => {
  e.preventDefault();
  const usuario  = document.getElementById('login-user').value;
  const password = document.getElementById('login-pass').value;
  const err      = document.getElementById('login-err');

  try {
    const res  = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, password })
    });
    const data = await res.json();

    if (!res.ok) {
      err.classList.add('show');
      err.textContent = data.mensaje || 'Credenciales incorrectas';
      return;
    }

    TOKEN = data.token;
    localStorage.setItem('crear_token', TOKEN);
    err.classList.remove('show');
    mostrarAdmin();

  } catch {
    err.classList.add('show');
    err.textContent = 'Error de conexión con el servidor';
  }
});

function mostrarLogin() {
  document.getElementById('login-section').style.display  = 'flex';
  document.getElementById('admin-section').style.display  = 'none';
}

function mostrarAdmin() {
  document.getElementById('login-section').style.display  = 'none';
  document.getElementById('admin-section').style.display  = 'block';
  cargarDashboard();
  cargarClasesAdmin();
}

// ── LOGOUT ──
document.getElementById('btn-logout')?.addEventListener('click', () => {
  TOKEN = null;
  localStorage.removeItem('crear_token');
  mostrarLogin();
});

// ── SIDEBAR NAVIGATION ──
document.querySelectorAll('.sidebar-item[data-panel]').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    document.getElementById('panel-' + item.dataset.panel)?.classList.add('active');
    if (item.dataset.panel === 'clases')  cargarClasesAdmin();
    if (item.dataset.panel === 'alumnos') cargarAlumnos();
  });
});

// ── DASHBOARD ──
async function cargarDashboard() {
  try {
    const [rClases, rAlumnos] = await Promise.all([
      fetch('/api/clases'),
      fetch('/api/alumnos', { headers: { Authorization: `Bearer ${TOKEN}` } })
    ]);
    const clases  = await rClases.json();
    const alumnos = rAlumnos.ok ? await rAlumnos.json() : [];
    document.getElementById('dash-clases').textContent  = clases.length;
    document.getElementById('dash-alumnos').textContent = alumnos.length;
  } catch {}
}

// ── CRUD CLASES ──
async function cargarClasesAdmin() {
  try {
    const res    = await fetch('/api/clases');
    const clases = await res.json();
    renderTablaClases(clases);
    poblarSelectClase(clases);
  } catch {}
}

function renderTablaClases(clases) {
  const tbody = document.querySelector('#tabla-clases tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  clases.forEach(c => {
    const bdg = c.nivel === 'Inicial' ? 'badge-i' : c.nivel === 'Intermedio' ? 'badge-m' : 'badge-a';
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${c.nombre}</strong></td>
      <td><span class="badge-nivel ${bdg}">${c.nivel}</span></td>
      <td style="font-size:11px;color:#5a5650">${c.horarios.join(' · ')}</td>
      <td>
        <button class="action-btn" onclick="editarClase(${c.id})">EDITAR</button>
        <button class="action-btn del" onclick="eliminarClase(${c.id})">ELIMINAR</button>
      </td>`;
    tbody.appendChild(tr);
  });
}

// Mostrar/ocultar form nueva clase
document.getElementById('btn-nueva-clase')?.addEventListener('click', () => {
  resetFormClase();
  document.getElementById('form-clase').classList.toggle('show');
});

function resetFormClase() {
  document.getElementById('clase-id').value       = '';
  document.getElementById('clase-nombre').value   = '';
  document.getElementById('clase-nivel').value    = 'Inicial';
  document.getElementById('clase-horario1').value = '';
  document.getElementById('clase-horario2').value = '';
  document.getElementById('clase-desc').value     = '';
  document.getElementById('form-clase-title').textContent = 'Nueva Clase';
}

window.editarClase = async (id) => {
  try {
    const res   = await fetch(`/api/clases/${id}`);
    const clase = await res.json();
    document.getElementById('clase-id').value       = clase.id;
    document.getElementById('clase-nombre').value   = clase.nombre;
    document.getElementById('clase-nivel').value    = clase.nivel;
    document.getElementById('clase-horario1').value = clase.horarios[0] || '';
    document.getElementById('clase-horario2').value = clase.horarios[1] || '';
    document.getElementById('clase-desc').value     = clase.descripcion || '';
    document.getElementById('form-clase-title').textContent = 'Editar Clase';
    document.getElementById('form-clase').classList.add('show');
  } catch {}
};

window.eliminarClase = async (id) => {
  if (!confirm('¿Eliminar esta clase?')) return;
  await fetch(`/api/clases/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${TOKEN}` }
  });
  cargarClasesAdmin();
  cargarDashboard();
};

document.getElementById('btn-guardar-clase')?.addEventListener('click', async () => {
  const id       = document.getElementById('clase-id').value;
  const nombre   = document.getElementById('clase-nombre').value.trim();
  const nivel    = document.getElementById('clase-nivel').value;
  const h1       = document.getElementById('clase-horario1').value.trim();
  const h2       = document.getElementById('clase-horario2').value.trim();
  const desc     = document.getElementById('clase-desc').value.trim();

  if (!nombre || !h1) { alert('Completá nombre y al menos un horario.'); return; }

  const body = { nombre, nivel, horarios: h2 ? [h1, h2] : [h1], descripcion: desc };
  const url  = id ? `/api/clases/${id}` : '/api/clases';
  const met  = id ? 'PUT' : 'POST';

  await fetch(url, {
    method: met,
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` },
    body: JSON.stringify(body)
  });

  document.getElementById('form-clase').classList.remove('show');
  cargarClasesAdmin();
  cargarDashboard();
});

document.getElementById('btn-cancelar-clase')?.addEventListener('click', () => {
  document.getElementById('form-clase').classList.remove('show');
});

// ── CRUD ALUMNOS ──
async function cargarAlumnos() {
  try {
    const res     = await fetch('/api/alumnos', { headers: { Authorization: `Bearer ${TOKEN}` } });
    const alumnos = await res.json();
    renderTablaAlumnos(alumnos);
  } catch {}
}

function renderTablaAlumnos(alumnos) {
  const tbody = document.querySelector('#tabla-alumnos tbody');
  if (!tbody) return;
  tbody.innerHTML = '';

  if (alumnos.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:40px;color:#c8c4be;font-size:11px;letter-spacing:2px;">SIN INSCRIPCIONES AÚN</td></tr>';
    return;
  }

  alumnos.forEach(a => {
    const estadoClass = a.estado === 'Activo' ? 'badge-i' : 'badge-m';
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${a.nombre} ${a.apellido}</strong></td>
      <td>${a.email}</td>
      <td style="font-size:11px">${a.disciplina}</td>
      <td><span class="badge-nivel ${estadoClass}">${a.estado}</span></td>
      <td>${new Date(a.fechaInscripcion).toLocaleDateString('es-AR')}</td>
      <td><button class="action-btn del" onclick="eliminarAlumno(${a.id})">ELIMINAR</button></td>`;
    tbody.appendChild(tr);
  });
}

window.eliminarAlumno = async (id) => {
  if (!confirm('¿Eliminar esta inscripción?')) return;
  await fetch(`/api/alumnos/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${TOKEN}` }
  });
  cargarAlumnos();
  cargarDashboard();
};

// Mostrar/ocultar form nuevo alumno
document.getElementById('btn-nuevo-alumno')?.addEventListener('click', () => {
  document.getElementById('form-alumno').classList.toggle('show');
});

document.getElementById('btn-guardar-alumno')?.addEventListener('click', async () => {
  const body = {
    nombre:     document.getElementById('al-nombre').value.trim(),
    apellido:   document.getElementById('al-apellido').value.trim(),
    email:      document.getElementById('al-email').value.trim(),
    telefono:   document.getElementById('al-tel').value.trim(),
    disciplina: document.getElementById('al-disciplina').value,
    estado:     document.getElementById('al-estado').value
  };
  if (!body.nombre || !body.email) { alert('Completá nombre y email.'); return; }

  await fetch('/api/alumnos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  document.getElementById('form-alumno').classList.remove('show');
  cargarAlumnos();
  cargarDashboard();
});

document.getElementById('btn-cancelar-alumno')?.addEventListener('click', () => {
  document.getElementById('form-alumno').classList.remove('show');
});

function poblarSelectClase(clases) {
  const sel = document.getElementById('al-disciplina');
  if (!sel) return;
  sel.innerHTML = clases.map(c => `<option value="${c.nombre}">${c.nombre}</option>`).join('');
}
