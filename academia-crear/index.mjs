import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import clasesRoutes   from './routes/clases.routes.mjs';
import authRoutes     from './routes/auth.routes.mjs';
import alumnosRoutes  from './routes/alumnos.routes.mjs';

const app   = express();
const PUERTO = process.env.PORT || 2026;

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// ── Middlewares ──
app.use(express.json());
app.use(express.static(path.join(__dirname, 'front')));

// ── Rutas API ──
app.use('/api/clases',  clasesRoutes);
app.use('/api/auth',    authRoutes);
app.use('/api/alumnos', alumnosRoutes);

// ── Fallback → index.html ──
app.get('/{*path}', (req, res) => {
  res.sendFile(path.join(__dirname, 'front', 'index.html'));
});

app.listen(PUERTO, () => {
  console.log(`✅  Servidor corriendo en http://localhost:${PUERTO}`);
});
