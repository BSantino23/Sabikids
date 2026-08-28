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
            path="/juegos/ingles"
            element={<Ingles />}
          />

          <Route
            path="/juegos/musica"
            element={<Musica />}
          />
        </Routes>
      </Router>
    </CustomThemeProvider>
  );
}