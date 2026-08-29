import React from 'react';

import {
  Box,
  Button,
  Typography,
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LockIcon from '@mui/icons-material/Lock';
import CheckIcon from '@mui/icons-material/Check';

import { useNavigate } from 'react-router-dom';

import '../../styles/Lengua.css';


export default function Lengua() {
  const navigate = useNavigate();


  const levels = [
    {
      number: 1,
      name: 'Sopa de Letras',
      path: '/juegos/lengua/sopa-letras',
      className: 'level-1',
      unlocked: true,
      completed: true,
    },

    {
      number: 2,
      name: 'Crucigrama',
      path: '/juegos/lengua/crucigrama',
      className: 'level-2',
      unlocked: true,
      completed: false,
    },

    {
      number: 3,
      name: 'Completar Palabras',
      path: '/juegos/lengua/completar-palabras',
      className: 'level-3',
      unlocked: false,
      completed: false,
    },

    {
      number: 4,
      name: 'Acentuación',
      path: '/juegos/lengua/acentuacion',
      className: 'level-4',
      unlocked: false,
      completed: false,
    },

    {
      number: 5,
      name: 'Desafío Final',
      path: '/juegos/lengua/desafio-final',
      className: 'level-5',
      unlocked: false,
      completed: false,
    },
  ];


  const handleLevelClick = (level) => {
    if (!level.unlocked) {
      return;
    }

    navigate(level.path);
  };


  return (
    <Box className="language-page">

      <Box className="language-map-wrapper">

        {/* =========================
            IMAGEN DEL MAPA
        ========================= */}

        <Box
          component="img"
          src="/juegos/lengua/mapa-lengua.png"
          alt="Mapa de juegos de Lengua"
          className="language-map-image"
        />


        {/* =========================
            VOLVER
        ========================= */}

        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/juegos')}
          className="language-back-button"
        >
          Volver a otras materias
        </Button>


        {/* =========================
            NIVELES
        ========================= */}

        <Box className="language-levels-layer">

          {levels.map((level) => (

            <Box
              key={level.number}
              component="button"
              type="button"
              className={`
                language-level
                ${level.className}
                ${!level.unlocked ? 'locked' : ''}
              `}
              onClick={() => handleLevelClick(level)}
              aria-label={level.name}
            >

              <Box className="language-level-number">

                {level.completed ? (
                  <CheckIcon />
                ) : !level.unlocked ? (
                  <LockIcon />
                ) : (
                  level.number
                )}

              </Box>


              <Typography
                component="span"
                className="language-level-title"
              >
                {level.name}
              </Typography>


              {!level.unlocked && (

                <Typography
                  component="span"
                  className="language-level-coming-soon"
                >
                  Próximamente
                </Typography>

              )}

            </Box>

          ))}

        </Box>

      </Box>

    </Box>
  );
}