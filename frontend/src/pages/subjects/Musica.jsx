import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

import '../../styles/Musica.css';

export default function Musica() {
  const navigate = useNavigate();

  return (
    <Box className="music-page">

      {/* =====================================
          FONDO COMPLETO
      ====================================== */}
      <img
        src="/juegos/musica/fondo-musica.png"
        alt=""
        className="music-background"
      />

      {/* =====================================
          CONTENEDOR INTERACTIVO DE LA ISLA Y SU CARTELITO
      ====================================== */}
      <div 
        className="music-island-container"
        onClick={() => navigate('/juegos/musica/piano-magico')}
      >
        <img
          src="/juegos/musica/isla_musica.png"
          alt="Piano Mágico"
          className="music-memotest-island"
        />

        <Button
          className="music-game-spot music-memotest-spot"
          onClick={(e) => {
            e.stopPropagation();
            navigate('/juegos/musica/piano-magico');
          }}
        >
          Piano Mágico
        </Button>
      </div>

      {/* =====================================
          BOTÓN VOLVER
      ====================================== */}
      <Button
        variant="contained"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/juegos')}
        className="back-subjects-button"
      >
        Volver a materias
      </Button>

      {/* =====================================
          TÍTULO
      ====================================== */}
      <Box className="music-heading">
        <Typography
          component="h1"
          className="music-title"
        >
          Música
        </Typography>

        <Typography
          component="p"
          className="music-subtitle"
        >
          ¡Elegí un desafío musical y comenzá a jugar!
        </Typography>
      </Box>

    </Box>
  );
}