import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import SubjectIsland from '../components/SubjectIsland';
import '../styles/Games.css';

const subjects = [
  {
    name: 'Matemática',
    image: '/juegos/matematica.png',
    path: '/juegos/matematica',
  },
  {
    name: 'Lengua',
    image: '/juegos/lengua.png',
    path: '/juegos/lengua',
  },
  {
    name: 'Ciencias Sociales',
    image: '/juegos/sociales.png',
    path: '/juegos/sociales',
  },
  {
    name: 'Ciencias Naturales',
    image: '/juegos/naturales.png',
    path: '/juegos/naturales',
  },
  {
    name: 'Inglés',
    image: '/juegos/ingles.png',
    path: '/juegos/ingles',
  },
  {
    name: 'Música',
    image: '/juegos/musica.png',
    path: '/juegos/musica',
  },
];

export default function Games() {
  const navigate = useNavigate();

  const handleSubjectClick = (subject) => {
    navigate(subject.path);
  };

  return (
    <Box className="games-page">
      <Container maxWidth="lg" className="games-container">

        <Typography
          variant="h2"
          component="h1"
          className="games-title"
        >
          ¡Elegí tu aventura!
        </Typography>

        <Typography
          variant="h6"
          className="games-subtitle"
        >
          Seleccioná una materia y empezá a jugar
        </Typography>

        <Box className="islands-grid">
          {subjects.map((subject, index) => (
            <SubjectIsland
              key={subject.name}
              subject={subject}
              index={index}
              onClick={handleSubjectClick}
            />
          ))}
        </Box>

      </Container>
    </Box>
  );
}