import React from 'react';
import {
  CssBaseline,
  ThemeProvider,
  createTheme
} from '@mui/material';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Navbar from './components/Navbar';

import Home from './pages/Home';
import Games from './pages/Games';

import Matematica from './pages/subjects/Matematica';
import Lengua from './pages/subjects/Lengua';
import Sociales from './pages/subjects/Sociales';
import Naturales from './pages/subjects/Naturales';
import Ingles from './pages/subjects/Ingles';
import Musica from './pages/subjects/Musica';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/juegos" element={<Games />} />

          <Route
            path="/juegos/matematica"
            element={<Matematica />}
          />

          <Route
            path="/juegos/lengua"
            element={<Lengua />}
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
    </ThemeProvider>
  );
}