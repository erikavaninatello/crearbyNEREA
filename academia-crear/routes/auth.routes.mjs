// routes/auth.routes.mjs
import express from 'express';
import { login } from '../controllers/auth.controller.mjs';

const router = express.Router();

// POST /api/auth/login
router.post('/login', login);

export default router;
