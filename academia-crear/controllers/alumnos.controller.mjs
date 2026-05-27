// controllers/alumnos.controller.mjs
import { alumnos, incrementAlumnoId } from '../data/db.mjs';

// GET /api/alumnos — solo admin
export const obtenerAlumnos = (req, res) => {
  res.json(alumnos);
};

// GET /api/alumnos/:id — solo admin
export const obtenerAlumnoPorId = (req, res) => {
  const alumno = alumnos.find(a => a.id === Number(req.params.id));
  if (!alumno) return res.status(404).json({ mensaje: 'Alumno no encontrado' });
  res.json(alumno);
};

// POST /api/alumnos — público (inscripción desde el sitio)
export const crearAlumno = (req, res) => {
  const { nombre, apellido, email, telefono, disciplina, edad, mensaje } = req.body;

  if (!nombre || !email || !disciplina) {
    return res.status(400).json({ mensaje: 'nombre, email y disciplina son requeridos' });
  }

  const nuevoAlumno = {
    id: incrementAlumnoId(),
    nombre,
    apellido: apellido || '',
    email,
    telefono: telefono || '',
    disciplina,
    edad: edad || '',
    mensaje: mensaje || '',
    estado: 'Pendiente',
    fechaInscripcion: new Date().toISOString()
  };

  alumnos.push(nuevoAlumno);
  res.status(201).json({ mensaje: 'Inscripción recibida con éxito', alumno: nuevoAlumno });
};

// PUT /api/alumnos/:id — solo admin
export const actualizarAlumno = (req, res) => {
  const idx = alumnos.findIndex(a => a.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ mensaje: 'Alumno no encontrado' });

  alumnos[idx] = { ...alumnos[idx], ...req.body };
  res.json(alumnos[idx]);
};

// DELETE /api/alumnos/:id — solo admin
export const eliminarAlumno = (req, res) => {
  const idx = alumnos.findIndex(a => a.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ mensaje: 'Alumno no encontrado' });

  const eliminado = alumnos.splice(idx, 1)[0];
  res.json({ mensaje: 'Alumno eliminado', alumno: eliminado });
};
