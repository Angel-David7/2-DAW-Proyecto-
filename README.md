# GreenWork Co-Working Management System

Este README describe el estado actual del proyecto **GreenWork** comparado con el enunciado original y explica cómo configurar, levantar y probar la aplicación en un entorno de desarrollo.

---

## Especificaciones del Proyecto

- **Gestión de usuarios:** registro, login, roles (`user` y `admin`), validación.
- **Gestión de espacios:** listado, paginación.
- **Reservas:** crear, listar propias, control de solapamientos.
- **Notificaciones:** crear y listar notificaciones de reservas.
- **Administración:** endpoints protegidos para listar y eliminar reservas; gestión de usuarios.
- **Autenticación:** JWT seguro con `JWT_SECRET`.
- **Base de datos:** PostgreSQL configurado con migraciones y seeds (Faker).
- **Backend:** Node.js (v18+), Express.js, Knex.js.
- **Frontend:** React o similar (Vite).
- **Docker:** contenedores para DB, pgAdmin, backend, frontend, servicio PHP.
- **PDF Manual:** microservicio PHP que expone `/manual` para descargar un PDF.
- **HTTPS:** desarrollo con certs auto-firmados o proxy.

---

## Funcionalidades Implementadas

| Área           | Implementado | Detalles                                                                                   |
|----------------|:------------:|-------------------------------------------------------------------------------------------|
| Usuarios       |      ✔️      | Registro con name+surname, login, JWT, role, campo validated y endpoints admin.            |
| Espacios       |      ✔️      | Endpoint `GET /api/spaces` con paginación.                                                |
| Reservas       |      ✔️      | `POST /api/reservations`, GET propias con paginación, control de solapamientos.           |
| Notificaciones |      ✔️      | `POST /api/notifications`, GET propias con paginación.                                    |
| Administración |      ✔️      | Admin: `GET /api/admin/reservations`, `DELETE /api/admin/reservations/:id`, usuarios.      |
| Swagger UI     |      ✔️      | Documentación interactiva en `/api/docs`.                                                 |
| CORS & Helmet  |      ✔️      | Configurado correctamente para dev en `app.js`.                                           |
| DB & Knex      |      ✔️      | Migraciones para users, spaces, reservations, notifications; seeds con Faker.              |
| Docker Compose |      ✔️      | Servicios db, pgadmin, backend, frontend, php_service en un solo `docker-compose.yml`.     |
| Servicio PHP   |      ✔️      | `/manual` sirve `manual-usuario.pdf` desde carpeta local en contenedor PHP.                |
| HTTPS (dev)    |      ✔️      | Express HTTPS con certs auto-firmados o posible proxy Nginx.                              |

---

## Instalación y Levantamiento

1. **Clonar el repositorio:**
    ```
    git clone <tu-repo-url>
    cd coworking-web
    ```

2. **Crear `.env` en la raíz (basado en `.env.example`):**
    ```
    JWT_SECRET=supersecretkey123
    PORT_BACKEND=4000
    FRONTEND_URL=http://localhost:5173
    DB_HOST=db
    DB_PORT=5432
    DB_NAME=greenwork
    DB_USER=greenwork
    DB_PASSWORD=secret
    PGADMIN_DEFAULT_EMAIL=admin@greenwork.com
    PGADMIN_DEFAULT_PASSWORD=secret
    ```

3. **Colocar el manual de usuario en:**
    ```
    php_service/manual/manual-usuario.pdf
    ```

4. **Iniciar Docker Compose:**
    ```
    docker compose up --build -d
    ```

5. **Verificar servicios:**

    - **PostgreSQL:** `localhost:5432`
    - **pgAdmin:** [http://localhost:5050](http://localhost:5050) (`admin@…` / `secret`)
    - **Backend HTTP:** [http://localhost:4000](http://localhost:4000)
    - **Backend HTTPS:** [https://localhost:4000](https://localhost:4000) (certs auto-firmados)
    - **Frontend:** [http://localhost:3000](http://localhost:3000)
    - **PHP Service:** [http://localhost:8080/manual](http://localhost:8080/manual)

---

## Endpoints Principales

### Auth

- `POST /api/auth/register`  → Registro (`name`, `surname`, `email`, `password`)
- `POST /api/auth/login`     → Login (`email`, `password`)

### Spaces

- `GET  /api/spaces?page=&limit=` → Listado espacios

### Reservations

- `POST /api/reservations` → Crear reserva (`space_id`, `start_time`, `end_time`)
- `GET  /api/reservations?page=&limit=` → Listar propias

### Notifications

- `POST /api/notifications` → Crear notificación (`reservation_id`, `type`)
- `GET  /api/notifications?page=&limit=` → Listar propias

### Admin

- `GET    /api/admin/reservations?page=&limit=` → Listar todas
- `DELETE /api/admin/reservations/:id`          → Eliminar
- `GET    /api/admin/users?page=&limit=`        → Listar usuarios
- `PATCH  /api/admin/users/:id/validate`        → Validar usuario
- `GET    /api/admin/stats`                     → Estadísticas
- `GET    /api/admin/logs`                      → Registros sistema

### Manual PDF

- `GET /manual` (PHP service) → Descargar `manual-usuario.pdf`

---

## ⚙Tareas Pendientes / TODO

- Añadir tests unitarios e2e (Jest/Supertest).
- Mejorar UI del frontend.
- Configurar renovación automática de certs Let’s Encrypt para producción.
- Añadir logs avanzados y métricas (Prometheus/Grafana).

---

## Licencia

MIT © 2025 GreenWork

