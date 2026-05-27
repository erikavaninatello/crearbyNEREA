#  Academia CREAR — Sitio Web Full Stack

Sitio web oficial de la **Academia de Danzas CREAR** de Córdoba, Argentina.  
Desarrollado como proyecto universitario — **2do semestre AW2**.

---

# Estructura del proyecto

```bash
academia-crear/
│
├── index.mjs                         # Servidor Express principal
├── package.json
├── .gitignore
│
├── data/
│   └── db.mjs                        # Base de datos en memoria
│
├── middleware/
│   └── auth.middleware.mjs           # Verificación JWT + rol admin
│
├── controllers/
│   ├── auth.controller.mjs           # Login con bcrypt + JWT
│   ├── clases.controller.mjs         # CRUD de clases
│   └── alumnos.controller.mjs        # CRUD de alumnos
│
├── routes/
│   ├── auth.routes.mjs               # POST /api/auth/login
│   ├── clases.routes.mjs             # CRUD /api/clases
│   └── alumnos.routes.mjs            # CRUD /api/alumnos
│
└── front/                            # Frontend estático servido por Express
    ├── index.html                    # Página principal
    ├── clases.html                   # Catálogo de disciplinas
    ├── contacto.html                 # Formulario de inscripción
    ├── admin.html                    # Panel CMS administrativo
    │
    └── recursos/
        ├── css/
        │   └── estilos.css           # Estilos globales
        │
        ├── js/
        │   ├── main.js               # Consumo API + filtros
        │   ├── funciones.js          # Renderizados y modales
        │   ├── animaciones.js        # Scroll reveal y efectos
        │   ├── cursor.js             # Cursor personalizado
        │   └── admin.js              # Login + CRUD admin
        │
        └── imagenes/                 # Assets del sitio
```

---

#  Cómo correr el proyecto

## 1. Clonar e instalar

```bash
git clone https://github.com/TU_USUARIO/academia-crear.git

cd academia-crear

npm install
```

---

## 2. Iniciar el servidor

### Producción

```bash
npm start
```

### Desarrollo (auto reload)

```bash
npm run dev
```

---

## 3. Abrir en el navegador

```bash
http://localhost:2026
```

---

#  API REST — Endpoints

## Autenticación

| Método | Ruta             | Acceso | Descripción          |
| ------- | ----------------- | ------- | -------------------- |
| POST    | /api/auth/login   | Público | Login → retorna JWT |

### Body

```json
{
  "usuario": "admin",
  "password": "crear2026"
}
```

### Respuesta

```json
{
  "token": "eyJ...",
  "usuario": {
    "id": 1,
    "usuario": "admin",
    "rol": "admin"
  }
}
```

---

#  Clases

| Método | Ruta             | Acceso   | Descripción             |
| ------- | ---------------- | -------- | ----------------------- |
| GET     | /api/clases      | Público  | Listar clases           |
| GET     | /api/clases/:id  | Público  | Obtener clase           |
| POST    | /api/clases      |  Admin | Crear clase             |
| PUT     | /api/clases/:id  |  Admin | Actualizar clase        |
| DELETE  | /api/clases/:id  |  Admin | Eliminar clase          |

### Query params

```bash
GET /api/clases?nivel=Avanzado
```

### Ejemplo body POST/PUT

```json
{
  "nombre": "Danza Clásica",
  "nivel": "Avanzado",
  "horarios": [
    "Lunes 19:00 a 20:00",
    "Miércoles 17:00 a 18:00"
  ],
  "descripcion": "Formación técnica con trabajo en barra y puntas.",
  "imagen": "/recursos/imagenes/clasico_clases.webp"
}
```

---

# 👥 Alumnos / Inscripciones

| Método | Ruta              | Acceso   | Descripción                       |
| ------- | ----------------- | -------- | --------------------------------- |
| POST    | /api/alumnos      | Público  | Enviar inscripción                |
| GET     | /api/alumnos      |  Admin | Ver inscripciones                 |
| GET     | /api/alumnos/:id  |  Admin | Ver alumno                        |
| PUT     | /api/alumnos/:id  |  Admin | Actualizar estado                 |
| DELETE  | /api/alumnos/:id  |  Admin | Eliminar inscripción              |

---

# Seguridad

Las rutas protegidas requieren el header:

```bash
Authorization: Bearer <token>
```

El token se obtiene mediante:

```bash
POST /api/auth/login
```

Duración del token: **8 horas**

### Tecnologías utilizadas

- bcrypt → hash de contraseñas
- JWT → autenticación
- Middleware de autorización por rol
- Rutas públicas y protegidas

---

# Frontend

| Página      | Ruta             | Descripción                          |
| ------------ | ---------------- | ------------------------------------ |
| Inicio       | `/`              | Hero, historia y galería             |
| Clases       | `/clases.html`   | Catálogo con filtros y modal         |
| Contacto     | `/contacto.html` | Formulario + mapa                    |
| Panel Admin  | `/admin.html`    | Login y CMS administrativo           |

---

#  Diseño visual

## Paleta de colores

| Color          | Hex       |
| -------------- | ---------- |
| Negro          | `#0d0d0d` |
| Blanco         | `#ffffff` |
| Morado acento  | `#7c3aed` |
| Morado oscuro  | `#4c1d95` |

## Tipografías

- **Cormorant Garamond** → títulos
- **Jost** → cuerpo de texto

---

# Credenciales demo

```txt
Usuario: admin
Contraseña: crear2026
```

---

#  Dependencias

```json
{
  "express": "^5.2.1",
  "jsonwebtoken": "^9.0.2",
  "bcryptjs": "^2.4.3"
}
```
CAMBIAR A UNA TIPOGRAFIA MAS LEGIBLE!!!!!!! ---------



Proyecto  — **Academia de Danzas CREAR**  - Córdoba, Argentina · 2026
