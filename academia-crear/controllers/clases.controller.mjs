// controllers/clases.controller.mjs
import { clases, incrementClaseId } from '../data/db.mjs';

// GET /api/clases — público
export const obtenerClases = (req, res) => {
  const { nivel } = req.query;
  const resultado = nivel && nivel !== 'Todos'
    ? clases.filter(c => c.nivel === nivel)
    : clases;
  res.json(resultado);
};

// GET /api/clases/:id — público
export const obtenerClasePorId = (req, res) => {
  const clase = clases.find(c => c.id === Number(req.params.id));
  if (!clase) return res.status(404).json({ mensaje: 'Clase no encontrada' });
  res.json(clase);
};

// POST /api/clases — requiere auth admin
export const crearClase = (req, res) => {
  const { nombre, descripcion, nivel, horarios, imagen } = req.body;

  if (!nombre || !nivel || !horarios) {
    return res.status(400).json({ mensaje: 'nombre, nivel y horarios son requeridos' });
  }

  const nuevaClase = {
    id: incrementClaseId(),
    nombre,
    descripcion: descripcion || '',
    nivel,
    horarios: Array.isArray(horarios) ? horarios : [horarios],
    imagen: imagen || '/recursos/imagenes/clasico_clases.webp'
  };

  clases.push(nuevaClase);
  res.status(201).json(nuevaClase);
};

// PUT /api/clases/:id — requiere auth admin
export const actualizarClase = (req, res) => {
  const idx = clases.findIndex(c => c.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ mensaje: 'Clase no encontrada' });

  const { nombre, descripcion, nivel, horarios, imagen } = req.body;
  clases[idx] = {
    ...clases[idx],
    ...(nombre      && { nombre }),
    ...(descripcion && { descripcion }),
    ...(nivel       && { nivel }),
    ...(horarios    && { horarios: Array.isArray(horarios) ? horarios : [horarios] }),
    ...(imagen      && { imagen })
  };

  res.json(clases[idx]);
};

// DELETE /api/clases/:id — requiere auth admin
export const eliminarClase = (req, res) => {
  const idx = clases.findIndex(c => c.id === Number(req.params.id));
  if (idx === -1) return res.status(404).json({ mensaje: 'Clase no encontrada' });

  const eliminada = clases.splice(idx, 1)[0];
  res.json({ mensaje: 'Clase eliminada', clase: eliminada });
};
