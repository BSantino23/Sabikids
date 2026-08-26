import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

import '../../styles/Lengua.css';

export default function Lengua() {
  const navigate = useNavigate();

  const games = [
    {
      name: 'Sopa de Letras',
      path: '/juegos/lengua/sopa-letras',
      className: 'language-level level-1',
    },
    {
      name: 'Crucigrama',
      path: '/juegos/lengua/crucigrama',
      className: 'language-level level-2',
    },
    {
      name: 'Completar Palabras',
      path: '/juegos/lengua/completar-palabras',
      className: 'language-level level-3',
    },
    {
      name: 'Acentuación',
      path: '/juegos/lengua/acentuacion',
      className: 'language-level level-4',
    },
    {
      name: 'Desafío Final',
      path: '/juegos/lengua/desafio-final',
      className: 'language-level level-5',
    },
  ];

  return (
    <Box className="language-page">

      <Box className="language-header">
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/juegos')}
          className="back-subjects-button"
        >
          Volver a materias
        </Button>

        <Box className="language-heading">
          <Typography
            variant="h2"
            component="h1"
            className="language-title"
          >
            Lengua
          </Typography>

          <Typography
            variant="h6"
            className="language-subtitle"
          >
            ¡Recorré el mundo de las palabras!
          </Typography>
        </Box>
      </Box>

      <Box className="language-map-wrapper">

        <Box
          component="img"
          src="/juegos/lengua/mapa-lengua.png"
          alt="Mapa de juegos de Lengua"
          className="language-map-image"
        />

        <Box className="language-levels-layer">
          {games.map((game, index) => (
            <Box
              key={game.name}
              component="button"
              type="button"
              className={game.className}
              onClick={() => navigate(game.path)}
              aria-label={`Jugar ${game.name}`}
            >
              <Box className="language-level-number">
                {index + 1}
              </Box>

              <Typography
                component="span"
                className="language-level-title"
              >
                {game.name}
              </Typography>
            </Box>
          ))}
        </Box>

      </Box>

    </Box>
  );
}