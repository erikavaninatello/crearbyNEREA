// routes/alumnos.routes.mjs
import express from 'express';
import {
  obtenerAlumnos,
  obtenerAlumnoPorId,
  crearAlumno,
  actualizarAlumno,
  eliminarAlumno
} from '../controllers/alumnos.controller.mjs';
import { verificarToken, soloAdmin } from '../middleware/auth.middleware.mjs';

const router = express.Router();

// POST público — inscripción desde el sitio web
router.post('/', crearAlumno);

// Rutas protegidas — solo admin
router.get('/',     verificarToken, soloAdmin, obtenerAlumnos);
router.get('/:id',  verificarToken, soloAdmin, obtenerAlumnoPorId);
router.put('/:id',  verificarToken, soloAdmin, actualizarAlumno);
router.delete('/:id', verificarToken, soloAdmin, eliminarAlumno);

export default router;
