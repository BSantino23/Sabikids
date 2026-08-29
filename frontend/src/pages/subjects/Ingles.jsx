import React from "react";
import { Box, Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

import "../../styles/Ingles.css";

const games = [
  {
    title: "Vocabulario",
    image: "/juegos/ingles/estaciones/estacion-vocabulario.png",
    className: "ingles-station ingles-station-vocabulario",
    path: "/juegos/ingles/vocabulario",
  },
  {
    title: "Animales",
    image: "/juegos/ingles/estaciones/estacion-animales.png",
    className: "ingles-station ingles-station-animales",
    path: "/juegos/ingles/animales",
  },
  {
    title: "Colores",
    image: "/juegos/ingles/estaciones/estacion-colores.png",
    className: "ingles-station ingles-station-colores",
    path: "/juegos/ingles/colores",
  },
  {
    title: "Deportes",
    image: "/juegos/ingles/estaciones/estacion-deportes.png",
    className: "ingles-station ingles-station-deportes",
    path: "/juegos/ingles/deportes",
  },
  {
    title: "Rutinas",
    image: "/juegos/ingles/estaciones/estacion-rutinas.png",
    className: "ingles-station ingles-station-rutinas",
    path: "/juegos/ingles/rutinas",
  },
];

export default function Ingles() {
  const navigate = useNavigate();

  const handleGameClick = (game) => {
    if (game.path) {
      navigate(game.path);
      return;
    }

    window.alert("Este juego todavía está en desarrollo.");
  };

  return (
    <Box className="ingles-page">
      <Box className="ingles-header">
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/juegos")}
          className="ingles-back-button"
        >
          Volver a materias
        </Button>

        <Box className="ingles-heading">
          <Typography variant="h2" component="h1" className="ingles-title">
            Inglés
          </Typography>

          <Typography variant="h6" className="ingles-subtitle">
            Elegí un desafío y comenzá a aprender
          </Typography>
        </Box>
      </Box>

      <Box className="ingles-map-wrapper">
        <Box
          component="img"
          src="/juegos/ingles/ingles-isla.png"
          alt="Mapa de juegos de Inglés"
          className="ingles-map-image"
        />

        <Box className="ingles-games-layer">
          {games.map((game) => (
            <Box
              key={game.title}
              component="button"
              type="button"
              className={game.className}
              onClick={() => handleGameClick(game)}
              aria-label={`Abrir juego ${game.title}`}
            >
              <Box
                component="img"
                src={game.image}
                alt=""
                className="ingles-station-image"
              />

              <Typography component="span" className="ingles-station-label">
                {game.title}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}