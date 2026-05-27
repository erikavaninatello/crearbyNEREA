// controllers/auth.controller.mjs
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { usuarios } from '../data/db.mjs';
import { SECRET } from '../middleware/auth.middleware.mjs';

// Inicializar hash del admin si no existe
const DEFAULT_PASSWORD = 'crear2026';
(async () => {
  const admin = usuarios.find(u => u.usuario === 'admin');
  if (admin && !admin.passwordHash) {
    admin.passwordHash = await bcrypt.hash(DEFAULT_PASSWORD, 10);
    console.log('🔐 Admin inicializado (usuario: admin / pass: crear2026)');
  }
})();

export const login = async (req, res) => {
  const { usuario, password } = req.body;

  if (!usuario || !password) {
    return res.status(400).json({ mensaje: 'Usuario y contraseña requeridos' });
  }

  const user = usuarios.find(u => u.usuario === usuario);
  if (!user) {
    return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    return res.status(401).json({ mensaje: 'Credenciales incorrectas' });
  }

  const token = jwt.sign(
    { id: user.id, usuario: user.usuario, rol: user.rol },
    SECRET,
    { expiresIn: '8h' }
  );

  res.json({
    token,
    usuario: { id: user.id, usuario: user.usuario, rol: user.rol }
  });
};
