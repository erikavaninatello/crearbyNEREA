# 🩰 Academia CREAR — Sitio Web Full Stack

Sitio web oficial de la **Academia de Danzas CREAR** de Córdoba, Argentina.  
Desarrollado como proyecto universitario — 2do semestre AW2.

---

## 🗂 Estructura del proyecto

```
academia-crear/
├── index.mjs                        # Servidor Express principal
├── package.json
├── .gitignore
│
├── data/
│   └── db.mjs                       # Base de datos en memoria (clases, alumnos, usuarios)
│
├── middleware/
│   └── auth.middleware.mjs          # Verificación JWT + rol admin
│
├── controllers/
│   ├── auth.controller.mjs          # Login con bcrypt + JWT
│   ├── clases.controller.mjs        # CRUD de clases
│   └── alumnos.controller.mjs      # CRUD de alumnos/inscripciones
│
├── routes/
│   ├── auth.routes.mjs              # POST /api/auth/login
│   ├── clases.routes.mjs            # GET/POST/PUT/DELETE /api/clases
│   └── alumnos.routes.mjs           # GET/POST/PUT/DELETE /api/alumnos
│
└── front/                           # Frontend estático servido por Express
    ├── index.html                   # Página de inicio
    ├── clases.html                  # Catálogo de disciplinas
    ├── contacto.html                # Formulario de inscripción
    ├── admin.html                   # Panel CMS (requiere login)
    └── recursos/
        ├── css/
        │   └── estilos.css          # Estilos globales (paleta blanco/negro/morado)
        ├── js/
        │   ├── main.js              # Carga clases desde API, filtros, modal
        │   ├── funciones.js         # Renderizado, filtros, modales (ES modules)
        │   ├── animaciones.js       # Scroll reveal, nav effect, progress bar
        │   ├── cursor.js            # Cursor personalizado con efecto lerp
        │   └── admin.js             # Login JWT, CRUD clases y alumnos
        └── imagenes/                # Imágenes .webp del sitio
```

---

## 🚀 Cómo correr el proyecto

### 1. Clonar e instalar

```bash
git clone https://github.com/TU_USUARIO/academia-crear.git
cd academia-crear
npm install
```

### 2. Iniciar el servidor

```bash
# Producción
npm start

# Desarrollo (con auto-reload)
npm run dev
```

### 3. Abrir en el navegador

```
http://localhost:2026
```

---

## 🔌 API REST — Endpoints

### Autenticación

| Método | Ruta              | Acceso  | Descripción         |
|--------|-------------------|---------|---------------------|
| POST   | /api/auth/login   | Público | Login → retorna JWT |

**Body:**
```json
{ "usuario": "admin", "password": "crear2026" }
```
**Respuesta:**
```json
{ "token": "eyJ...", "usuario": { "id": 1, "usuario": "admin", "rol": "admin" } }
```

---

### Clases

| Método | Ruta              | Acceso       | Descripción             |
|--------|-------------------|--------------|-------------------------|
| GET    | /api/clases       | Público      | Listar todas las clases |
| GET    | /api/clases/:id   | Público      | Obtener una clase       |
| POST   | /api/clases       | 🔐 Admin     | Crear clase             |
| PUT    | /api/clases/:id   | 🔐 Admin     | Actualizar clase        |
| DELETE | /api/clases/:id   | 🔐 Admin     | Eliminar clase          |

**Query params:** `GET /api/clases?nivel=Avanzado`

**Ejemplo body POST/PUT:**
```json
{
  "nombre": "Danza Clásica",
  "nivel": "Avanzado",
  "horarios": ["Lunes 19:00 a 20:00", "Miércoles 17:00 a 18:00"],
  "descripcion": "Formación técnica con trabajo en barra y puntas.",
  "imagen": "/recursos/imagenes/clasico_clases.webp"
}
```

---

### Alumnos / Inscripciones

| Método | Ruta               | Acceso       | Descripción                          |
|--------|--------------------|--------------|--------------------------------------|
| POST   | /api/alumnos       | Público      | Enviar inscripción desde el sitio    |
| GET    | /api/alumnos       | 🔐 Admin     | Ver todas las inscripciones          |
| GET    | /api/alumnos/:id   | 🔐 Admin     | Ver un alumno                        |
| PUT    | /api/alumnos/:id   | 🔐 Admin     | Actualizar estado de alumno          |
| DELETE | /api/alumnos/:id   | 🔐 Admin     | Eliminar inscripción                 |

---

## 🔐 Seguridad

Las rutas protegidas requieren el header:

```
Authorization: Bearer <token>
```

El token se obtiene haciendo POST a `/api/auth/login` y tiene una duración de **8 horas**.

- Contraseñas hasheadas con **bcrypt** (salt rounds: 10)
- Autenticación con **JWT** (`jsonwebtoken`)
- Middleware de rol: `verificarToken` + `soloAdmin`

---

## 🎨 Frontend

| Página         | Ruta            | Descripción                           |
|----------------|-----------------|---------------------------------------|
| Inicio         | `/`             | Hero, galería, historia               |
| Clases         | `/clases.html`  | Catálogo con filtros y modal detalle  |
| Contacto       | `/contacto.html`| Formulario de inscripción + mapa      |
| Panel Admin    | `/admin.html`   | Login + CMS con CRUD completo         |

**Paleta de colores:**
- Negro: `#0d0d0d`
- Blanco: `#ffffff`
- Morado acento: `#7c3aed`
- Morado oscuro: `#4c1d95`

**Tipografías:** Cormorant Garamond (títulos) · Jost (cuerpo)

---

## 🧩 Credenciales de demo

```
Usuario:    admin
Contraseña: crear2026
```

---

## 📦 Dependencias

```json
{
  "express":    "^5.2.1",   // Servidor web
  "jsonwebtoken": "^9.0.2", // Autenticación JWT
  "bcryptjs":   "^2.4.3"    // Hash de contraseñas
}
```

---

## 📋 Requisitos cumplidos (materia AW2)

- [x] Servidor Express sirviendo frontend estático
- [x] API REST con rutas separadas por recurso
- [x] Controladores independientes de las rutas
- [x] CRUD completo para Clases y Alumnos
- [x] Login con bcrypt + JWT
- [x] Middleware de autenticación y autorización por rol
- [x] Rutas públicas y rutas protegidas
- [x] Frontend conectado a la API con `fetch()`
- [x] Panel CMS administrativo

---

## 👥 Equipo

Proyecto universitario — Academia de Danzas CREAR  
Córdoba, Argentina · 2026
