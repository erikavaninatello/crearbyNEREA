// routes/clases.routes.mjs
import express from 'express';
import {
  obtenerClases,
  obtenerClasePorId,
  crearClase,
  actualizarClase,
  eliminarClase
} from '../controllers/clases.controller.mjs';
import { verificarToken, soloAdmin } from '../middleware/auth.middleware.mjs';

const router = express.Router();

// Rutas públicas
router.get('/',    obtenerClases);
router.get('/:id', obtenerClasePorId);

// Rutas protegidas — requieren token de admin
router.post('/',    verificarToken, soloAdmin, crearClase);
router.put('/:id',  verificarToken, soloAdmin, actualizarClase);
router.delete('/:id', verificarToken, soloAdmin, eliminarClase);

export default router;
