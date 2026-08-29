import React from 'react';

import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Card,
  CardActionArea,
  useTheme
} from '@mui/material';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CalculateIcon from '@mui/icons-material/Calculate';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PublicIcon from '@mui/icons-material/Public';
import BiotechIcon from '@mui/icons-material/Biotech';
import TranslateIcon from '@mui/icons-material/Translate';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ShieldIcon from '@mui/icons-material/Shield';

import { useNavigate } from 'react-router-dom';
import { useThemeMode } from '../context/ThemeContext';

import '../styles/Home.css';


const getSubjectsList = (mode) => [
  {
    name: 'Matemática',

    path: '/juegos/matematica',

    icon: (
      <CalculateIcon
        sx={{
          fontSize: 38,

          color:
            mode === 'dark'
              ? '#90caf9'
              : '#1565c0'
        }}
      />
    ),

    bgColor:
      mode === 'dark'
        ? '#1e293b'
        : 'linear-gradient(135deg, #bbdefb 0%, #90caf9 100%)',

    textColor:
      mode === 'dark'
        ? '#90caf9'
        : '#0d47a1',

    boxShadow:
      mode === 'dark'
        ? '0 8px 0px #0f172a'
        : '0 8px 0px #64b5f6, 0 12px 18px rgba(21, 101, 192, 0.25)',
  },

  {
    name: 'Lengua',

    path: '/juegos/lengua',

    icon: (
      <MenuBookIcon
        sx={{
          fontSize: 38,

          color:
            mode === 'dark'
              ? '#ffcc80'
              : '#e65100'
        }}
      />
    ),

    bgColor:
      mode === 'dark'
        ? '#3b2510'
        : 'linear-gradient(135deg, #ffe0b2 0%, #ffcc80 100%)',

    textColor:
      mode === 'dark'
        ? '#ffcc80'
        : '#e65100',

    boxShadow:
      mode === 'dark'
        ? '0 8px 0px #1c130a'
        : '0 8px 0px #ffb74d, 0 12px 18px rgba(230, 81, 0, 0.25)',
  },

  {
    name: 'Sociales',

    path: '/juegos/sociales',

    icon: (
      <PublicIcon
        sx={{
          fontSize: 38,

          color:
            mode === 'dark'
              ? '#a5d6a7'
              : '#2e7d32'
        }}
      />
    ),

    bgColor:
      mode === 'dark'
        ? '#143818'
        : 'linear-gradient(135deg, #c8e6c9 0%, #a5d6a7 100%)',

    textColor:
      mode === 'dark'
        ? '#a5d6a7'
        : '#1b5e20',

    boxShadow:
      mode === 'dark'
        ? '0 8px 0px #0a170c'
        : '0 8px 0px #81c784, 0 12px 18px rgba(46, 125, 50, 0.25)',
  },

  {
    name: 'Naturales',

    path: '/juegos/naturales',

    icon: (
      <BiotechIcon
        sx={{
          fontSize: 38,

          color:
            mode === 'dark'
              ? '#f48fb1'
              : '#c2185b'
        }}
      />
    ),

    bgColor:
      mode === 'dark'
        ? '#3d1424'
        : 'linear-gradient(135deg, #f8bbd0 0%, #f48fb1 100%)',

    textColor:
      mode === 'dark'
        ? '#f48fb1'
        : '#880e4f',

    boxShadow:
      mode === 'dark'
        ? '0 8px 0px #1a080f'
        : '0 8px 0px #f06292, 0 12px 18px rgba(194, 24, 91, 0.25)',
  },

  {
    name: 'Inglés',

    path: '/juegos/ingles',

    icon: (
      <TranslateIcon
        sx={{
          fontSize: 38,

          color:
            mode === 'dark'
              ? '#ce93d8'
              : '#6a1b9a'
        }}
      />
    ),

    bgColor:
      mode === 'dark'
        ? '#2e1438'
        : 'linear-gradient(135deg, #e1bee7 0%, #ce93d8 100%)',

    textColor:
      mode === 'dark'
        ? '#ce93d8'
        : '#4a148c',

    boxShadow:
      mode === 'dark'
        ? '0 8px 0px #140819'
        : '0 8px 0px #ba68c8, 0 12px 18px rgba(106, 27, 154, 0.25)',
  },

  {
    name: 'Música',

    path: '/juegos/musica',

    icon: (
      <MusicNoteIcon
        sx={{
          fontSize: 38,

          color:
            mode === 'dark'
              ? '#fff59d'
              : '#f57f17'
        }}
      />
    ),

    bgColor:
      mode === 'dark'
        ? '#383210'
        : 'linear-gradient(135deg, #fff9c4 0%, #fff59d 100%)',

    textColor:
      mode === 'dark'
        ? '#fff59d'
        : '#f57f17',

    boxShadow:
      mode === 'dark'
        ? '0 8px 0px #171406'
        : '0 8px 0px #ffee58, 0 12px 18px rgba(245, 127, 23, 0.25)',
  },
];


const getFeatures = (mode) => [
  {
    icon: (
      <SportsEsportsIcon
        sx={{
          fontSize: 43,

          color:
            mode === 'dark'
              ? '#90caf9'
              : '#1565c0'
        }}
      />
    ),

    title: 'Aprende Jugando',

    desc:
      'Desafíos interactivos estilo videojuego para practicar cada tema.',

    bg:
      mode === 'dark'
        ? '#1e293b'
        : '#e3f2fd'
  },

  {
    icon: (
      <EmojiEventsIcon
        sx={{
          fontSize: 43,

          color:
            mode === 'dark'
              ? '#fff59d'
              : '#f9a825'
        }}
      />
    ),

    title: 'Gana Desafíos',

    desc:
      'Demuestra lo que sabes superando niveles en cada materia.',

    bg:
      mode === 'dark'
        ? '#3b2510'
        : '#fff3e0'
  },

  {
    icon: (
      <ShieldIcon
        sx={{
          fontSize: 43,

          color:
            mode === 'dark'
              ? '#a5d6a7'
              : '#2e7d32'
        }}
      />
    ),

    title: '100% Seguro',

    desc:
      'Espacio diseñado especialmente para chicos sin distracciones.',

    bg:
      mode === 'dark'
        ? '#143818'
        : '#e8f5e9'
  },
];


export default function Home() {
  const navigate = useNavigate();

  const theme = useTheme();

  const { mode } =
    useThemeMode();

  const subjectsList =
    getSubjectsList(mode);

  const features =
    getFeatures(mode);


  const subtitleColors = {
    light: '#546e7a',

    dark: '#94a3b8',

    colorblind: '#222222',
  };


  return (
    <Box
      className="home-container"

      sx={{
        backgroundColor:
          'background.default',

        color:
          'text.primary',

        minHeight:
          '100vh',

        display:
          'flex',

        flexDirection:
          'column',

        transition:
          'background-color 0.3s ease, color 0.3s ease'
      }}
    >

      {/* HERO */}

      <Box className="home-hero">

        <Box
          className="hero-badge"

          sx={{
            zIndex: 3
          }}
        >
          ¡Explora y Diviértete!
        </Box>


        <Box
          sx={{
            width: '100%',

            maxWidth: '750px',

            margin: '0 auto',

            zIndex: 2,

            display: 'flex',

            flexDirection: 'column',

            alignItems: 'center'
          }}
        >

          <img
            src="/inicio/fondo_inicio.png"

            alt="Mascotas Sabikids"

            className={
              `hero-image ${
                mode === 'dark'
                  ? 'dark-mode-image'
                  : 'light-mode-image'
              }`
            }
          />


          <Box className="sabikids-curve-container">

            <svg
              viewBox="0 0 500 130"

              width="100%"

              height="100%"

              style={{
                overflow: 'visible'
              }}
            >

              <path
                id="sabikids-arc"

                d="M 20,110 Q 250,10 480,110"

                fill="transparent"
              />


              <text
                className="sabikids-svg-text"

                fill={
                  mode === 'dark'
                    ? '#ffffff'
                    : '#111111'
                }
              >

                <textPath
                  href="#sabikids-arc"

                  startOffset="50%"

                  textAnchor="middle"
                >
                  SABIKIDS
                </textPath>

              </text>

            </svg>

          </Box>

        </Box>


        <Button
          variant="contained"

          startIcon={
            <PlayArrowIcon
              sx={{
                fontSize:
                  '2.5rem !important'
              }}
            />
          }

          className="home-cta-button"

          onClick={() =>
            navigate('/juegos')
          }

          sx={{
            zIndex: 3,
            mt: 3
          }}
        >
          ¡EMPEZAR A JUGAR!
        </Button>


        <Box
          sx={{
            position:
              'absolute',

            bottom:
              0,

            left:
              0,

            width:
              '100%',

            height:
              '80px',

            background:
              `linear-gradient(to bottom, transparent, ${theme.palette.background.default})`,

            pointerEvents:
              'none',

            zIndex:
              1
          }}
        />

      </Box>


      {/* MATERIAS */}

      <Container
        className="subjects-section"

        sx={{
          py: 8,

          maxWidth:
            '1400px !important'
        }}
      >

        <Box
          className="section-header"

          sx={{
            textAlign:
              'center',

            mb:
              6
          }}
        >

          <Typography
            variant="h2"

            className="section-title"

            sx={{
              color:
                mode === 'dark'
                  ? '#90caf9'
                  : '#1565c0',

              mb:
                1
            }}
          >
            Elegí tu Mapa de Aventura
          </Typography>


          <Typography
            variant="h6"

            className="section-subtitle"

            sx={{
              color:
                subtitleColors[mode] ||
                subtitleColors.light
            }}
          >
            Hacé clic en la materia que quieras explorar hoy
          </Typography>

        </Box>


        <Box className="subjects-flex-container">

          {subjectsList.map(
            (subject) => (

              <Card
                key={
                  subject.name
                }

                className="subject-card"

                sx={{
                  background:
                    subject.bgColor,

                  boxShadow:
                    subject.boxShadow,

                  width:
                    '170px',

                  height:
                    '210px',

                  borderRadius:
                    '24px',

                  flexShrink:
                    0
                }}
              >

                <CardActionArea
                  onClick={() =>
                    navigate(
                      subject.path
                    )
                  }

                  className="subject-card-content"

                  sx={{
                    p:
                      2,

                    display:
                      'flex',

                    flexDirection:
                      'column',

                    alignItems:
                      'center',

                    justifyContent:
                      'space-between',

                    height:
                      '100%'
                  }}
                >

                  <Box
                    className="subject-icon-box"

                    sx={{
                      width:
                        56,

                      height:
                        56,

                      borderRadius:
                        '50%',

                      display:
                        'flex',

                      alignItems:
                        'center',

                      justifyContent:
                        'center',

                      background:
                        'rgba(255, 255, 255, 0.85)',

                      boxShadow:
                        '0 4px 10px rgba(0,0,0,0.1)'
                    }}
                  >
                    {subject.icon}
                  </Box>


                  <Typography
                    variant="h6"

                    className="subject-card-title"

                    sx={{
                      color:
                        subject.textColor,

                      fontSize:
                        '1.05rem',

                      fontWeight:
                        900,

                      textAlign:
                        'center',

                      my:
                        0.5
                    }}
                  >
                    {subject.name}
                  </Typography>


                  <Box
                    className="subject-badge-play"

                    sx={{
                      fontSize:
                        '0.75rem',

                      py:
                        0.4,

                      px:
                        1.8,

                      borderRadius:
                        '20px',

                      background:
                        'rgba(255, 255, 255, 0.9)',

                      fontWeight:
                        800,

                      color:
                        '#333'
                    }}
                  >
                    ▶ Jugar
                  </Box>

                </CardActionArea>

              </Card>

            )
          )}

        </Box>

      </Container>


      {/* CARACTERÍSTICAS */}

      <Box
        className="features-section"

        sx={{
          backgroundColor:
            theme.palette.background.default,

          py:
            6,

          mb:
            4
        }}
      >

        <Container
          maxWidth="lg"
        >

          <Grid
            container

            spacing={4}

            justifyContent="center"

            alignItems="stretch"
          >

            {features.map(
              (feat) => (

                <Grid
                  item

                  xs={12}

                  sm={6}

                  md={4}

                  key={
                    feat.title
                  }

                  sx={{
                    display:
                      'flex',

                    justifyContent:
                      'center'
                  }}
                >

                  <Box
                    className="feature-box"

                    sx={{
                      backgroundColor:
                        feat.bg,

                      width:
                        '100%',

                      maxWidth:
                        '360px'
                    }}
                  >

                    <Box className="feature-icon">
                      {feat.icon}
                    </Box>


                    <Typography
                      variant="h6"

                      className="feature-title"

                      sx={{
                        color:
                          mode === 'dark'
                            ? '#ffffff'
                            : '#263238'
                      }}
                    >
                      {feat.title}
                    </Typography>


                    <Typography
                      variant="body2"

                      sx={{
                        color:
                          mode === 'dark'
                            ? '#cbd5e1'
                            : '#546e7a'
                      }}
                    >
                      {feat.desc}
                    </Typography>

                  </Box>

                </Grid>

              )
            )}

          </Grid>

        </Container>

      </Box>

    </Box>
  );
}