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

import WordSearch from './pages/games/lengua/WordSearch';
import Crossword from './pages/games/lengua/Crossword';

import MemoryTables from './pages/games/matematica/MemoryTables';
import FraccionesVisuales from './pages/games/matematica/FraccionesVisuales';
import Geometria from './pages/games/matematica/Geometria';
import MayorMenorIgual from './pages/games/matematica/MayorMenorIgual';
import SumasRestas from './pages/games/matematica/SumasRestas';

import PianoMagico from './pages/games/musica/PianoMagico';

import ComidaSaludable from './pages/games/naturales/ComidaSaludable';
import Habitats from './pages/games/naturales/Habitats';
import QueComen from './pages/games/naturales/QueComen';
import Sentidos from './pages/games/naturales/Sentidos';
import CicloAgua from './pages/games/naturales/CicloAgua';

import VocabularioIngles from './pages/games/ingles/VocabularioIngles';
import AnimalesIngles from './pages/games/ingles/AnimalesIngles';
import ColoresIngles from './pages/games/ingles/ColoresIngles';
import DeportesIngles from './pages/games/ingles/DeportesIngles';
import RutinasIngles from './pages/games/ingles/RutinasIngles';

export default function App() {
  return (
    <CustomThemeProvider>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />

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

          <Route
            path="/juegos/matematica"
            element={<Matematica />}
          />

          <Route
            path="/juegos/matematica/memotest"
            element={<MemoryTables />}
          />

          <Route
            path="/juegos/matematica/fracciones-visuales"
            element={<FraccionesVisuales />}
          />

          <Route
            path="/juegos/matematica/geometria"
            element={<Geometria />}
          />

          <Route
            path="/juegos/matematica/mayor-menor-igual"
            element={<MayorMenorIgual />}
          />

          <Route
            path="/juegos/matematica/sumas-restas"
            element={<SumasRestas />}
          />

          <Route
            path="/juegos/lengua"
            element={<Lengua />}
          />

          <Route
            path="/juegos/lengua/sopa-letras"
            element={<WordSearch />}
          />

          <Route
            path="/juegos/lengua/crucigrama"
            element={<Crossword />}
          />

          <Route
            path="/juegos/sociales"
            element={<Sociales />}
          />

          <Route
            path="/juegos/naturales"
            element={<Naturales />}
          />

          <Route
            path="/juegos/naturales/comida-saludable"
            element={<ComidaSaludable />}
          />

          <Route
            path="/juegos/naturales/habitats"
            element={<Habitats />}
          />

          <Route
            path="/juegos/naturales/que-comen"
            element={<QueComen />}
          />

          <Route
            path="/juegos/naturales/sentidos"
            element={<Sentidos />}
          />

          <Route
            path="/juegos/naturales/ciclo-agua"
            element={<CicloAgua />}
          />

          <Route
            path="/juegos/ingles"
            element={<Ingles />}
          />

          <Route
            path="/juegos/ingles/vocabulario"
            element={<VocabularioIngles />}
          />

          <Route
            path="/juegos/ingles/animales"
            element={<AnimalesIngles />}
          />

          <Route
            path="/juegos/ingles/colores"
            element={<ColoresIngles />}
          />

          <Route
            path="/juegos/ingles/deportes"
            element={<DeportesIngles />}
          />

          <Route
            path="/juegos/ingles/rutinas"
            element={<RutinasIngles />}
          />

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