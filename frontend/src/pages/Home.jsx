import React from 'react';
import { Box, Button, Container, Grid, Typography, Card, CardActionArea, useTheme } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CalculateIcon from '@mui/icons-material/Calculate';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PublicIcon from '@mui/icons-material/Public';
import BiotechIcon from '@mui/icons-material/Biotech';
import TranslateIcon from '@mui/icons-material/Translate';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { useNavigate } from 'react-router-dom';
import { useThemeMode } from '../context/ThemeContext';

import '../styles/Home.css';

const getSubjectsList = (mode) => [
  {
    name: 'Matemática',
    path: '/juegos/matematica',
    icon: <CalculateIcon sx={{ fontSize: 48, color: mode === 'dark' ? '#90caf9' : '#1565c0' }} />,
    bgColor: mode === 'dark' ? '#1e293b' : 'linear-gradient(135deg, #bbdefb 0%, #90caf9 100%)',
    textColor: mode === 'dark' ? '#90caf9' : '#0d47a1',
    boxShadow: mode === 'dark' ? '0 8px 0px #0f172a' : '0 8px 0px #64b5f6, 0 12px 18px rgba(21, 101, 192, 0.25)',
  },
  {
    name: 'Lengua',
    path: '/juegos/lengua',
    icon: <MenuBookIcon sx={{ fontSize: 48, color: mode === 'dark' ? '#ffcc80' : '#e65100' }} />,
    bgColor: mode === 'dark' ? '#3b2510' : 'linear-gradient(135deg, #ffe0b2 0%, #ffcc80 100%)',
    textColor: mode === 'dark' ? '#ffcc80' : '#e65100',
    boxShadow: mode === 'dark' ? '0 8px 0px #1c130a' : '0 8px 0px #ffb74d, 0 12px 18px rgba(230, 81, 0, 0.25)',
  },
  {
    name: 'Sociales',
    path: '/juegos/sociales',
    icon: <PublicIcon sx={{ fontSize: 48, color: mode === 'dark' ? '#a5d6a7' : '#2e7d32' }} />,
    bgColor: mode === 'dark' ? '#143818' : 'linear-gradient(135deg, #c8e6c9 0%, #a5d6a7 100%)',
    textColor: mode === 'dark' ? '#a5d6a7' : '#1b5e20',
    boxShadow: mode === 'dark' ? '0 8px 0px #0a170c' : '0 8px 0px #81c784, 0 12px 18px rgba(46, 125, 50, 0.25)',
  },
  {
    name: 'Naturales',
    path: '/juegos/naturales',
    icon: <BiotechIcon sx={{ fontSize: 48, color: mode === 'dark' ? '#f48fb1' : '#c2185b' }} />,
    bgColor: mode === 'dark' ? '#3d1424' : 'linear-gradient(135deg, #f8bbd0 0%, #f48fb1 100%)',
    textColor: mode === 'dark' ? '#f48fb1' : '#880e4f',
    boxShadow: mode === 'dark' ? '0 8px 0px #1a080f' : '0 8px 0px #f06292, 0 12px 18px rgba(194, 24, 91, 0.25)',
  },
  {
    name: 'Inglés',
    path: '/juegos/ingles',
    icon: <TranslateIcon sx={{ fontSize: 48, color: mode === 'dark' ? '#ce93d8' : '#6a1b9a' }} />,
    bgColor: mode === 'dark' ? '#2e1438' : 'linear-gradient(135deg, #e1bee7 0%, #ce93d8 100%)',
    textColor: mode === 'dark' ? '#ce93d8' : '#4a148c',
    boxShadow: mode === 'dark' ? '0 8px 0px #140819' : '0 8px 0px #ba68c8, 0 12px 18px rgba(106, 27, 154, 0.25)',
  },
  {
    name: 'Música',
    path: '/juegos/musica',
    icon: <MusicNoteIcon sx={{ fontSize: 48, color: mode === 'dark' ? '#fff59d' : '#f57f17' }} />,
    bgColor: mode === 'dark' ? '#383210' : 'linear-gradient(135deg, #fff9c4 0%, #fff59d 100%)',
    textColor: mode === 'dark' ? '#fff59d' : '#f57f17',
    boxShadow: mode === 'dark' ? '0 8px 0px #171406' : '0 8px 0px #ffee58, 0 12px 18px rgba(245, 127, 23, 0.25)',
  },
];

const getFeatures = (mode) => [
  { 
    emoji: '🎮', 
    title: 'Aprende Jugando', 
    desc: 'Desafíos interactivos estilo videojuego para practicar cada tema.', 
    bg: mode === 'dark' ? '#1e293b' : '#e3f2fd' 
  },
  { 
    emoji: '🌟', 
    title: 'Gana Desafíos', 
    desc: 'Demuestra lo que sabes superando niveles en cada materia.', 
    bg: mode === 'dark' ? '#3b2510' : '#fff3e0' 
  },
  { 
    emoji: '🛡️', 
    title: '100% Seguro', 
    desc: 'Espacio diseñado especialmente para chicos sin distracciones.', 
    bg: mode === 'dark' ? '#143818' : '#e8f5e9' 
  },
];

export default function Home() {
  const navigate = useNavigate();
  const theme = useTheme();
  const { mode } = useThemeMode();

  const subjectsList = getSubjectsList(mode);
  const features = getFeatures(mode);

  const heroBackgrounds = {
    light: 'linear-gradient(135deg, #1e88e5 0%, #1565c0 50%, #0d47a1 100%)',
    dark: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #020617 100%)',
    colorblind: 'linear-gradient(135deg, #005ab5 0%, #003366 100%)',
  };

  const textColors = {
    light: '#1565c0',
    dark: '#90caf9',
    colorblind: '#005ab5',
  };

  const subtitleColors = {
    light: '#546e7a',
    dark: '#94a3b8',
    colorblind: '#222222',
  };

  return (
    <Box 
      className="home-container"
      sx={{ 
        backgroundColor: 'background.default',
        color: 'text.primary',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        transition: 'background-color 0.3s ease, color 0.3s ease'
      }}
    >
      {/* 1. HERO BANNER PRINCIPAL */}
      <Box className="home-hero" sx={{ background: heroBackgrounds[mode] || heroBackgrounds.light }}>
        <Box className="hero-badge">🚀 ¡Plataforma Interactiva!</Box>
        
        <Typography variant="h1" className="home-title">
          ¡Aprender nunca fue tan <span className="home-title-highlight">DIVERTIDO!</span>
        </Typography>

        <Typography variant="h6" className="home-subtitle">
          Explora mundos interactivos, supera minijuegos y conviértete en un experto de tu materia favorita.
        </Typography>

        <Button
          variant="contained"
          startIcon={<PlayArrowIcon sx={{ fontSize: '2.5rem !important' }} />}
          className="home-cta-button"
          onClick={() => navigate('/juegos')}
        >
          ¡EMPEZAR A JUGAR!
        </Button>
      </Box>

      {/* 2. SECCIÓN DE SELECCIÓN DE MATERIAS */}
      <Container className="subjects-section" sx={{ py: 6 }}>
        <Box className="section-header">
          <Typography variant="h2" className="section-title" sx={{ color: textColors[mode] || textColors.light }}>
            Elegí tu Mapa de Aventura 🗺️
          </Typography>
          <Typography variant="h6" className="section-subtitle" sx={{ color: subtitleColors[mode] || subtitleColors.light }}>
            Hacé clic en la materia que quieras explorar hoy
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {subjectsList.map((subject) => (
            <Grid item xs={12} sm={6} md={4} key={subject.name} className="subject-card-wrapper">
              <Card
                className="subject-card"
                sx={{
                  background: subject.bgColor,
                  boxShadow: subject.boxShadow,
                }}
              >
                <CardActionArea
                  onClick={() => navigate(subject.path)}
                  className="subject-card-content"
                >
                  <Box className="subject-icon-box">
                    {subject.icon}
                  </Box>

                  <Typography
                    variant="h5"
                    className="subject-card-title"
                    sx={{ color: subject.textColor }}
                  >
                    {subject.name}
                  </Typography>

                  <Box className="subject-badge-play">
                    ▶ Jugar Ahora
                  </Box>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* 3. CARACTERÍSTICAS / INFORMATIVO */}
      <Box className="features-section" sx={{ backgroundColor: theme.palette.background.default, py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {features.map((feat) => (
              <Grid item xs={12} md={4} key={feat.title}>
                <Box className="feature-box" sx={{ backgroundColor: feat.bg, p: 3, borderRadius: 3 }}>
                  <span className="feature-emoji">{feat.emoji}</span>
                  <Typography variant="h6" className="feature-title" sx={{ color: mode === 'dark' ? '#ffffff' : '#263238', mt: 1 }}>
                    {feat.title}
                  </Typography>

                  <Typography variant="body2" sx={{ color: mode === 'dark' ? '#cbd5e1' : '#546e7a', mt: 0.5 }}>
                    {feat.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 4. PIE DE PÁGINA (FOOTER ADAPTATIVO) */}
      <Box 
        component="footer" 
        className="footer-container" 
        sx={{ 
          mt: 'auto',
          backgroundColor: mode === 'dark' ? '#0f172a' : '#ffffff',
          color: mode === 'dark' ? '#ffffff' : '#334155',
          borderTop: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid #e2e8f0',
          py: 2.5,
          px: 3,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'background-color 0.3s ease, color 0.3s ease'
        }}
      >
        <Box 
          className="footer-content"
          sx={{
            maxWidth: '1200px',
            width: '100%',
            mx: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            flexWrap: 'wrap',
            textAlign: 'center'
          }}
        >
          <Button 
            className="footer-btn" 
            onClick={() => navigate('/aviso-legal')} 
            sx={{ color: mode === 'dark' ? '#ffffff !important' : '#334155 !important', textTransform: 'none', fontWeight: 600 }}
          >
            Aviso legal y condiciones de uso
          </Button>
          <Typography component="span" sx={{ opacity: 0.5, color: mode === 'dark' ? '#ffffff' : '#475569' }}>|</Typography>
          <Button 
            className="footer-btn" 
            onClick={() => navigate('/cookies')} 
            sx={{ color: mode === 'dark' ? '#ffffff !important' : '#334155 !important', textTransform: 'none', fontWeight: 600 }}
          >
            Política de cookies
          </Button>
          <Typography component="span" sx={{ opacity: 0.5, color: mode === 'dark' ? '#ffffff' : '#475569' }}>|</Typography>
          <Button 
            className="footer-btn" 
            onClick={() => navigate('/privacidad')} 
            sx={{ color: mode === 'dark' ? '#ffffff !important' : '#334155 !important', textTransform: 'none', fontWeight: 600 }}
          >
            Política de privacidad
          </Button>
          <Typography component="span" sx={{ opacity: 0.5, color: mode === 'dark' ? '#ffffff' : '#475569' }}>|</Typography>
          <Typography component="span" sx={{ fontSize: '0.95rem', fontWeight: 600, opacity: 0.9, color: mode === 'dark' ? '#ffffff' : '#475569', px: 1 }}>
            © Sabikids {new Date().getFullYear()}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}