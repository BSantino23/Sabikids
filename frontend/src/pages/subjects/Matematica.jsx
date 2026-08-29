import React from 'react';

import {
  Box,
  Button,
  Typography
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useNavigate } from 'react-router-dom';

import '../../styles/Matematica.css';


export default function Matematica() {
  const navigate = useNavigate();

  const games = [
    {
      name: 'Memotest de Tablas',
      image: '/juegos/matematica/memotest.png',
      path: '/juegos/matematica/memotest',
      className: 'game-spot memotest-spot',
    },

    {
      name: 'Sumas y Restas',
      image: '/juegos/matematica/sumas-restas.png',
      path: '/juegos/matematica/sumas-restas',
      className: 'game-spot calculo-spot',
    },

    {
      name: 'Fracciones Visuales',
      image: '/juegos/matematica/fracciones-visuales.png',

      // CORREGIDO
      path: '/juegos/matematica/fracciones-visuales',

      className: 'game-spot fracciones-spot',
    },

    {
      name: 'Mayor, menor o igual',
      image: '/juegos/matematica/mayor-menor-igual.png',
      path: '/juegos/matematica/mayor-menor-igual',
      className: 'game-spot comparacion-spot',
    },

    {
      name: 'Geometría',
      image: '/juegos/matematica/geometria.png',
      path: '/juegos/matematica/geometria',
      className: 'game-spot geometria-spot',
    },
  ];

  return (
    <Box className="math-page">

      <Box className="math-header">

        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/juegos')}
          className="back-subjects-button"
        >
          Volver a materias
        </Button>

        <Box className="math-heading">

          <Typography
            variant="h2"
            component="h1"
            className="math-title"
          >
            Matemática
          </Typography>

          <Typography
            variant="h6"
            className="math-subtitle"
          >
            ¡Elegí un desafío y comenzá a jugar!
          </Typography>

        </Box>

      </Box>


      <Box className="math-map-wrapper">

        <Box className="math-map-container">

          <Box
            component="img"
            src="/juegos/matematica/mapa-matematica.png"
            alt="Mapa de juegos de Matemática"
            className="math-map-image"
          />

          <Box className="math-games-layer">

            {games.map((game) => (
              <Box
                key={game.name}
                component="button"
                type="button"
                className={game.className}
                onClick={() => navigate(game.path)}
                aria-label={`Jugar ${game.name}`}
              >

                <Box
                  component="img"
                  src={game.image}
                  alt=""
                  className="game-spot-image"
                />

                <Typography
                  component="span"
                  className="game-spot-title"
                >
                  {game.name}
                </Typography>

              </Box>
            ))}

          </Box>

        </Box>

      </Box>

    </Box>
  );
}