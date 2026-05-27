// data/db.mjs — Base de datos en memoria (reemplazable por MySQL/PostgreSQL)

export const clases = [
  {
    id: 1,
    nombre: "Iniciación a la Danza (2 a 6 años)",
    descripcion: "Primeros pasos en la danza con juegos y exploración de movimiento corporal.",
    nivel: "Inicial",
    horarios: ["Martes y Jueves - 18:00 a 19:00"],
    imagen: "/recursos/imagenes/babys_clases.webp"
  },
  {
    id: 2,
    nombre: "Iniciación a la Danza (7 a 10 años)",
    descripcion: "Profundización en técnica clásica y jazz, combinando creatividad con disciplina.",
    nivel: "Intermedio",
    horarios: ["Martes y Jueves - 19:00 a 20:00"],
    imagen: "/recursos/imagenes/babys_clases.webp"
  },
  {
    id: 3,
    nombre: "Danza Clásica",
    descripcion: "Formación técnica con trabajo en barra, puntas y creación coreográfica.",
    nivel: "Avanzado",
    horarios: ["Lunes 19:00 a 20:00", "Miércoles 17:00 a 18:00"],
    imagen: "/recursos/imagenes/clasico_clases.webp"
  },
  {
    id: 4,
    nombre: "Danza Jazz",
    descripcion: "Entrenamiento expresivo y energético que fusiona técnica, ritmo y creatividad.",
    nivel: "Avanzado",
    horarios: ["Miércoles 18:00 a 19:00", "Miércoles 19:00 a 20:00"],
    imagen: "/recursos/imagenes/jazz_clases.webp"
  },
  {
    id: 5,
    nombre: "Danza Española",
    descripcion: "Uso de castañuelas, mantón y abanico. Se trabaja fuerza, presencia y ritmo.",
    nivel: "Avanzado",
    horarios: ["Lunes 18:00 a 19:00"],
    imagen: "/recursos/imagenes/clasico_clases.webp"
  },
  {
    id: 6,
    nombre: "Tap (Zapateo Americano)",
    descripcion: "Técnica rítmica que combina música y movimiento con el sonido del zapateo.",
    nivel: "Avanzado",
    horarios: ["Lunes 17:00 a 18:00"],
    imagen: "/recursos/imagenes/tap_clases.webp"
  },
  {
    id: 7,
    nombre: "Ritmos Urbanos y Latinos",
    descripcion: "Hip hop, reggaetón y salsa. Un espacio de juego, coordinación y ritmo.",
    nivel: "Inicial",
    horarios: ["Martes y Jueves 20:00 a 21:00"],
    imagen: "/recursos/imagenes/hiphop_clases.webp"
  },
  {
    id: 8,
    nombre: "Ritmos Urbanos y Latinos (Intermedio)",
    descripcion: "Hip hop, commercial pop, bachata y salsa. Técnica, musicalidad y proyección.",
    nivel: "Intermedio",
    horarios: ["Lunes y Miércoles 20:00 a 21:00"],
    imagen: "/recursos/imagenes/latino_clases.webp"
  },
  {
    id: 9,
    nombre: "Danza Contemporánea",
    descripcion: "Exploración del movimiento desde la libertad corporal y la expresión individual.",
    nivel: "Avanzado",
    horarios: ["Viernes 18:00 a 19:30"],
    imagen: "/recursos/imagenes/jazz_clases.webp"
  }
];

export const alumnos = [];

// Usuarios del sistema (contraseñas hasheadas con bcrypt en auth.controller)
export const usuarios = [
  {
    id: 1,
    usuario: "admin",
    // Hash de "crear2026"  — se genera al arrancar si no existe
    passwordHash: "",
    rol: "admin"
  }
];

export let nextClaseId  = clases.length + 1;
export let nextAlumnoId = 1;
export const incrementClaseId  = () => nextClaseId++;
export const incrementAlumnoId = () => nextAlumnoId++;
