# SABIKIDS

Sábikids es una plataforma de refuerzo escolar con juegos interactivos para estudiantes de nivel primario.

## Tecnologías

- Frontend: React, Vite, JavaScript y CSS.
- Backend activo: NestJS con TypeScript, REST y GraphQL.
- Persistencia: MySQL existente mediante `mysql2`; no se recrean ni sincronizan tablas.
- Microservicio: NestJS Microservices con transporte TCP para guardar y consolidar progreso.

## Arquitectura del backend

El backend NestJS está en `backend/src` y se organiza por módulos de autenticación, progreso, base de datos y microservicio de progreso. La API HTTP conserva el puerto `5000` y las rutas REST que usa el frontend:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/progress/:userId/:gameKey`
- `POST /api/progress`
- `GET /test-db`

El acceso a MySQL utiliza las variables de entorno `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_HOST`, `MYSQL_PORT` y `MYSQL_DB`. Se reutilizan las tablas `users` y `game_progress`. No se ejecutan migraciones ni cambios automáticos de esquema. Los hashes de contraseña existentes de Werkzeug (`scrypt` y `pbkdf2`) se siguen verificando.

Los archivos Flask que estaban en `backend/` se conservan como referencia de la migración. El servidor activo se inicia con los scripts npm y no requiere instalar Python ni las dependencias de `requirements.txt`.

## GraphQL

El resolver `gameProgress` consulta la tabla `game_progress` y devuelve datos reales. GraphiQL está disponible en desarrollo en `http://localhost:5000/graphql`.

Ejemplo:

```graphql
query {
  gameProgress(userId: 1, gameKey: "sumas-restas") {
    user_id
    game_key
    current_level
    max_level
    best_score
    best_moves
    updated_at
  }
}
```

La API REST se conserva para el frontend existente. Para consultar progreso, el `userId` debe existir en `users`.

## Microservicio de progreso

El proceso independiente de progreso escucha por TCP (por defecto `127.0.0.1:8877`). La API NestJS envía el patrón `progress.save` cuando recibe `POST /api/progress`. El microservicio valida la jugada, calcula desbloqueo de nivel y mejores resultados, y persiste el progreso en MySQL. La comunicación se puede comprobar desde la API con `GET /api/progress/microservice-health`.

El campo `moves` es opcional para admitir juegos como Piano Mágico, que no lo envía; los demás juegos pueden seguir enviándolo. El microservicio conserva la puntuación más alta, el menor número de movimientos y el mayor nivel desbloqueado.

## Instalación y ejecución

Requisitos: Node.js 22.6 o superior, npm y acceso a la base MySQL del proyecto.

1. En `backend/`, instala las dependencias:

   ```sh
   npm install
   ```

2. Crea `backend/.env` copiando `backend/.env.example` solo si todavía no existe. Completa las credenciales de MySQL. La API usa `PORT=5000`; Vite usa `CORS_ORIGIN=http://localhost:5173`. El puerto TCP por defecto es `8877`.

3. En una terminal, desde `backend/`, inicia el microservicio:

   ```sh
   npm run start:microservice:dev
   ```

4. En otra terminal, desde `backend/`, inicia la API:

   ```sh
   npm run start:dev
   ```

5. En otra terminal, desde `frontend/`, instala e inicia el frontend:

   ```sh
   npm install
   npm run dev
   ```

Para compilar el backend y ejecutar los procesos compilados:

```sh
cd backend
npm run build
```

Luego, en dos terminales desde `backend/`:

```sh
npm run start:microservice
```

```sh
npm run start
```

La API REST, GraphQL y el frontend quedan disponibles en `http://localhost:5000`, `http://localhost:5000/graphql` y la dirección que indique Vite, respectivamente.

## Pruebas

Desde `backend/`:

```sh
npm test
```

Esto ejecuta pruebas de las reglas que consolidan progreso y de compatibilidad del hash de contraseña. Para verificar la base MySQL, inicia la API y consulta `GET /test-db`. Para verificar el transporte entre API y microservicio, inicia ambos procesos y consulta `GET /api/progress/microservice-health`. Una consulta GraphQL real necesita un usuario existente en MySQL.

## Integrantes

- Francisco Iglesias
- Franco Orellano
- Lautaro Lluebero
- Maximo Mercau
- Santino Barrionuevo
