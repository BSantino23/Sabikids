import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import { CustomThemeProvider } from './context/ThemeContext';

import Navbar from './components/Navbar';

import Home from './pages/Home';
import Games from './pages/Games';
import Login from './pages/Login';
import Register from './pages/Register';

import Matematica from './pages/subjects/Matematica';
import Lengua from './pages/subjects/Lengua';
import Sociales from './pages/subjects/Sociales';
import Naturales from './pages/subjects/Naturales';
import Ingles from './pages/subjects/Ingles';
import Musica from './pages/subjects/Musica';

import MemoryTables from './pages/games/matematica/MemoryTables';
import SumasRestas from './pages/games/matematica/SumasRestas';
import FraccionesVisuales from './pages/games/matematica/FraccionesVisuales';
import MayorMenorIgual from './pages/games/matematica/MayorMenorIgual';
import Geometria from './pages/games/matematica/Geometria';

import WordSearch from './pages/games/lengua/WordSearch';
import PianoMagico from './pages/games/musica/PianoMagico';


export default function App() {
  return (
    <CustomThemeProvider>

      <Router>

        <Navbar />

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/juegos"
            element={<Games />}
          />


          {/* MATEMÁTICA */}

          <Route
            path="/juegos/matematica"
            element={<Matematica />}
          />

          <Route
            path="/juegos/matematica/memotest"
            element={<MemoryTables />}
          />

          <Route
            path="/juegos/matematica/sumas-restas"
            element={<SumasRestas />}
          />

          <Route
            path="/juegos/matematica/fracciones"
            element={<FraccionesVisuales />}
          />

          <Route
            path="/juegos/matematica/mayor-menor-igual"
            element={<MayorMenorIgual />}
          />

          <Route
            path="/juegos/matematica/geometria"
            element={<Geometria />}
          />


          {/* LENGUA */}

          <Route
            path="/juegos/lengua"
            element={<Lengua />}
          />

          <Route
            path="/juegos/lengua/sopa-letras"
            element={<WordSearch />}
          />


          {/* SOCIALES */}

          <Route
            path="/juegos/sociales"
            element={<Sociales />}
          />


          {/* NATURALES */}

          <Route
            path="/juegos/naturales"
            element={<Naturales />}
          />


          {/* INGLÉS */}

          <Route
            path="/juegos/ingles"
            element={<Ingles />}
          />


          {/* MÚSICA */}

          <Route
            path="/juegos/musica"
            element={<Musica />}
          />

          <Route
            path="/juegos/musica/piano-magico"
            element={<PianoMagico />}
          />

        </Routes>

      </Router>

    </CustomThemeProvider>
  );
}