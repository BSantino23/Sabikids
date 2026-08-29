import React from 'react';
import { CssBaseline } from '@mui/material';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import { CustomThemeProvider } from './context/ThemeContext';

import Navbar from './components/Navbar';

import Home from './pages/Home';
import Games from './pages/Games';

import Matematica from './pages/subjects/Matematica';
import Lengua from './pages/subjects/Lengua';
import Sociales from './pages/subjects/Sociales';
import Naturales from './pages/subjects/Naturales';
import Ingles from './pages/subjects/Ingles';
import Musica from './pages/subjects/Musica';

import MemoryTables from './pages/games/matematica/MemoryTables';

import CrucigramaSocial from './pages/games/Sociales/CrucigramaSocial';
import Banderas from './pages/games/Sociales/Banderas';
import DondePertenece from './pages/games/Sociales/DondePertenece';

export default function App() {
  return (
    <CustomThemeProvider>
      <CssBaseline />

      <Router>
        <Navbar />

        <Routes>

          {/* =====================================
              PÁGINAS PRINCIPALES
          ===================================== */}

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/juegos"
            element={<Games />}
          />


          {/* =====================================
              MATEMÁTICA
          ===================================== */}

          <Route
            path="/juegos/matematica"
            element={<Matematica />}
          />

          <Route
            path="/juegos/matematica/memotest"
            element={<MemoryTables />}
          />


          {/* =====================================
              LENGUA
          ===================================== */}

          <Route
            path="/juegos/lengua"
            element={<Lengua />}
          />


          {/* =====================================
              CIENCIAS SOCIALES
          ===================================== */}

          <Route
            path="/juegos/sociales"
            element={<Sociales />}
          />

          <Route
            path="/juegos/sociales/crucigrama"
            element={<CrucigramaSocial />}
          />

          <Route
            path="/juegos/sociales/banderas"
            element={<Banderas />}
          />

          <Route
            path="/juegos/sociales/donde-pertenece"
            element={<DondePertenece />}
          />


          {/* =====================================
              CIENCIAS NATURALES
          ===================================== */}

          <Route
            path="/juegos/naturales"
            element={<Naturales />}
          />


          {/* =====================================
              INGLÉS
          ===================================== */}

          <Route
            path="/juegos/ingles"
            element={<Ingles />}
          />


          {/* =====================================
              MÚSICA
          ===================================== */}

          <Route
            path="/juegos/musica"
            element={<Musica />}
          />

        </Routes>

      </Router>
    </CustomThemeProvider>
  );
}