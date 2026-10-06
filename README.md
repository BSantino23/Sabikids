# SabiKids

SabiKids es una plataforma web de refuerzo escolar orientada a estudiantes de educación primaria. El proyecto transforma contenidos de distintas materias en experiencias interactivas con juegos, niveles, puntajes y seguimiento del progreso.

Es un proyecto académico desarrollado en equipo con una arquitectura separada entre frontend y backend.

## Funcionalidades principales

- Registro e inicio de sesión de usuarios.
- Selección de materias y juegos educativos.
- Sistema de niveles con desbloqueo progresivo.
- Guardado del progreso y mejores puntajes por usuario.
- Seguimiento de aciertos, errores y movimientos.
- Juegos de Matemática, Lengua, Ciencias Sociales, Ciencias Naturales, Inglés y Música.
- Modos de visualización claro, oscuro y accesible para daltonismo.
- Diseño responsive para distintos dispositivos.
- Navegación mediante React Router.
- API REST desarrollada con Flask.
- Persistencia de datos mediante MySQL.

## Tecnologías utilizadas

### Frontend

- React
- Vite
- JavaScript
- HTML
- CSS
- Material UI
- React Router
- Fetch API

### Backend

- Python
- Flask
- Flask-SQLAlchemy
- Flask-CORS
- SQLAlchemy
- PyMySQL
- python-dotenv
- MySQL
- API REST

## Estructura del proyecto

```text
Sabikids/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── app.py
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── styles/
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/BSantino23/Sabikids.git
cd Sabikids
```

### 2. Configurar el backend

Entrar a la carpeta del backend:

```bash
cd backend
```

Crear un entorno virtual:

```bash
python -m venv venv
```

Activarlo en Windows:

```bash
venv\Scripts\activate
```

En Linux o macOS:

```bash
source venv/bin/activate
```

Instalar las dependencias:

```bash
pip install -r requirements.txt
```

Crear una base de datos en MySQL:

```sql
CREATE DATABASE sabikids;
```

Crear un archivo `.env` dentro de `backend/` tomando como referencia `.env.example`:

```env
MYSQL_USER=tu_usuario
MYSQL_PASSWORD=tu_password
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DB=sabikids
```

Ejecutar el backend:

```bash
python app.py
```

### 3. Configurar el frontend

Desde otra terminal:

```bash
cd frontend
npm install
npm run dev
```

## Seguridad y configuración

Las credenciales de la base de datos no se almacenan en el repositorio. Los archivos `.env` están excluidos mediante `.gitignore` y se incluye `.env.example` únicamente como referencia de configuración.

## Equipo

- Francisco Iglesias
- Franco Orellano
- Lautaro Lluebero
- Máximo Mercau
- Santino Barrionuevo

## Sobre el proyecto

SabiKids permite demostrar trabajo con desarrollo web full stack, consumo y creación de APIs REST, persistencia de datos, navegación con React, diseño responsive, accesibilidad visual y trabajo colaborativo con Git y GitHub.
