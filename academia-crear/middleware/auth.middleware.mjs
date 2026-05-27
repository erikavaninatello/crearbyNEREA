// middleware/auth.middleware.mjs
import jwt from 'jsonwebtoken';

export const SECRET = process.env.JWT_SECRET || 'crear_academia_secret_2026';

export function verificarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ mensaje: 'Token requerido' });
  }

  try {
    const payload = jwt.verify(token, SECRET);
    req.usuario = payload;
    next();
  } catch {
    return res.status(403).json({ mensaje: 'Token inválido o expirado' });
  }
}

export function soloAdmin(req, res, next) {
  if (req.usuario?.rol !== 'admin') {
    return res.status(403).json({ mensaje: 'Acceso solo para administradores' });
  }
  next();
}
