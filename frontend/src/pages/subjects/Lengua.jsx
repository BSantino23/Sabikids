import React, {
  useEffect,
  useState,
} from 'react';

import {
  Box,
  Button,
  Typography,
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LockIcon from '@mui/icons-material/Lock';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { useNavigate } from 'react-router-dom';

import '../../styles/Lengua.css';


const PROGRESS_KEY =
  'sadikids_lengua_progress';


export default function Lengua() {
  const navigate =
    useNavigate();

  const [
    progress,
    setProgress,
  ] =
    useState({});


  useEffect(() => {
    const saved =
      JSON.parse(
        localStorage.getItem(
          PROGRESS_KEY
        )
      ) || {};

    setProgress(saved);
  }, []);


  const level1Completed =
    progress.level1?.completed;

  const level1Stars =
    progress.level1?.stars || 0;

  const level2Unlocked =
    progress.level2?.unlocked ||
    level1Completed;


  const games = [
    {
      number: 1,

      name:
        'Sopa de Letras',

      path:
        '/juegos/lengua/sopa-letras',

      className:
        'language-level level-1',

      unlocked: true,

      completed:
        level1Completed,

      stars:
        level1Stars,
    },

    {
      number: 2,

      name:
        'Crucigrama',

      path:
        '/juegos/lengua/crucigrama',

      className:
        'language-level level-2',

      unlocked:
        level2Unlocked,

      completed: false,

      stars: 0,

      comingSoon: true,
    },

    {
      number: 3,

      name:
        'Completar Palabras',

      path:
        '/juegos/lengua/completar-palabras',

      className:
        'language-level level-3',

      unlocked: false,

      completed: false,

      stars: 0,
    },

    {
      number: 4,

      name:
        'Acentuación',

      path:
        '/juegos/lengua/acentuacion',

      className:
        'language-level level-4',

      unlocked: false,

      completed: false,

      stars: 0,
    },

    {
      number: 5,

      name:
        'Desafío Final',

      path:
        '/juegos/lengua/desafio-final',

      className:
        'language-level level-5',

      unlocked: false,

      completed: false,

      stars: 0,
    },
  ];


  const handleLevelClick =
    (game) => {

      if (!game.unlocked) {
        return;
      }

      if (game.comingSoon) {
        return;
      }

      navigate(
        game.path
      );
    };


  return (
    <Box className="language-page">

      <Box className="language-header">

        <Button
          variant="contained"
          startIcon={
            <ArrowBackIcon />
          }
          onClick={() =>
            navigate(
              '/juegos'
            )
          }
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

          {games.map(
            (game) => (

              <Box
                key={
                  game.number
                }
                component="button"
                type="button"
                className={`
                  ${game.className}

                  ${
                    !game.unlocked
                      ? 'locked'
                      : ''
                  }

                  ${
                    game.completed
                      ? 'completed'
                      : ''
                  }

                  ${
                    game.comingSoon
                      ? 'coming-soon'
                      : ''
                  }
                `}
                onClick={() =>
                  handleLevelClick(
                    game
                  )
                }
                aria-label={
                  game.name
                }
              >

                <Box className="language-level-number">

                  {game.completed ? (
                    <CheckCircleIcon />
                  ) : !game.unlocked ? (
                    <LockIcon />
                  ) : (
                    game.number
                  )}

                </Box>


                <Typography
                  component="span"
                  className="language-level-title"
                >
                  {game.name}
                </Typography>


                {game.completed && (
                  <Box className="language-level-stars">

                    {'⭐'.repeat(
                      game.stars
                    )}

                  </Box>
                )}


                {game.comingSoon &&
                  game.unlocked && (

                    <Box className="language-coming-soon">
                      Próximamente
                    </Box>

                  )}

              </Box>

            )
          )}

        </Box>

      </Box>

    </Box>
  );
}