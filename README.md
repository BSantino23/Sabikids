# SABIKIDS
Sábikids es una plataforma web de refuerzo escolar diseñada para transformar el aprendizaje de materias curriculares primordiales en una experiencia de juego interactivo para estudiantes de educación primaria.


# Integrantes

- Francisco Iglesias
- Franco Orellano
- Lautaro Lluebero
- Maximo Mercau
- Santino Barrionuevo


## Tecnologías utilizadas

### Frontend

- React JS
- Vite
- JavaScript
- HTML
- CSS
- Consumo de API REST mediante Fetch

### Backend

- Python
- Flask
- Flask-SQLAlchemy
- Flask-CORS
- PyMySQL
- python-dotenv
- Base de datos MySQL 
- API REST


## Funcionalidades principales

- Registro e inicio de sesión de usuarios.
- Selección de materias y juegos educativos.
- Sistema de niveles con desbloqueo progresivo.
- Guardado del progreso y mejores puntajes por usuario.
- Juegos interactivos de Matemática, Lengua, Ciencias Sociales, Ciencias Naturales, Inglés y Música.
- Seguimiento de aciertos, errores y movimientos.
- Modos de visualización claro, oscuro y accesible para daltonismo.
- Diseño responsive para distintos dispositivos.
- Navegación con React Router.
- API REST desarrollada con Flask.
- Persistencia de datos mediante MySQL.


## Instalación

### 1. Clonar el repositorio

```sh
git clone <url_del_repositorio>
cd <nombre_del_proyecto>
```

### 2. Instalación del backend

- Entrar a la carpeta del backend:

```sh
cd backend
```

#### 2.1. Crear un entorno virtual

- En Linux / macOS:

```sh
python3 -m venv <nombre_del_entorno>
```

- En Windows:

```sh
python -m venv <nombre_del_entorno>
```

#### 2.2. Activar el entorno virtual

- En Linux / macOS:

```sh
source <nombre_del_entorno>/bin/activate
```

- En Windows:

```sh
<nombre_del_entorno>\Scripts\activate
```

#### 2.3. Instalar dependencias

```sh
python -m pip install Flask Flask-SQLAlchemy PyMySQL python-dotenv flask-cors
```

o

```sh
pip install -r requirements.txt
```

#### 2.4. Configuración de la base de datos

- Crear una base de datos en MySQL:

```sql
CREATE DATABASE nombre_de_la_base_de_datos;
```

- Crear el archivo .env dentro de la carpeta backend:

```sh
MYSQL_USER=tu_usuario
MYSQL_PASSWORD=tu_password
MYSQL_HOST=host_de_mysql
MYSQL_PORT=port_de_mysql
MYSQL_DB=nombre_de_la_base_de_datos
```

#### 2.5. Ejecutar el backend

- Desde la carpeta backend, con el entorno virtual activado:

```sh
python app.py
```


### 3. Instalación del frontend

- En otra terminal, entrar a la carpeta del frontend:

```sh
cd frontend
```

#### 3.1 Instalar dependencias:

```sh
npm install
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
npm install react-router-dom
```

#### 3.2. Ejecutar el frontend

```sh
npm run dev
```


## Comandos útiles
- Activar entorno virtual

```sh
<nombre_del_entorno>\Scripts\activate
```

- Salir del entorno virtual

```sh
deactivate
```

- Guardar dependencias

```sh
python -m pip freeze > requirements.txt
```

-Ejecutar backend

```sh
python app.py
```

- Ejecutar frontend

```sh
npm run dev
```
