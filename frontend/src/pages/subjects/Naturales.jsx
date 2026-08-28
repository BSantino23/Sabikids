import React from "react";
import { Box, Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

import "../../styles/Naturales.css";

const games = [
  {
    title: "Hábitats",
    image: "/juegos/naturales/estaciones/estacion-habitats.png",
    className: "naturales-station naturales-station-habitats",
    path: "/juegos/naturales/habitats",
  },
  {
    title: "Qué comen",
    image: "/juegos/naturales/estaciones/estacion-que-comen.png",
    className: "naturales-station naturales-station-que-comen",
    path: "/juegos/naturales/que-comen",
  },
  {
    title: "Plato saludable",
    image: "/juegos/naturales/estaciones/estacion-plato-saludable.png",
    className: "naturales-station naturales-station-plato",
    path: "/juegos/naturales/comida-saludable",
  },
  {
    title: "Los sentidos",
    image: "/juegos/naturales/estaciones/estacion-sentidos.png",
    className: "naturales-station naturales-station-sentidos",
    path: "/juegos/naturales/sentidos",
  },
  {
    title: "Ciclo del agua",
    image: "/juegos/naturales/estaciones/estacion-ciclo-agua.png",
    className: "naturales-station naturales-station-ciclo",
    path: "/juegos/naturales/ciclo-agua",
  },
];

export default function Naturales() {
  const navigate = useNavigate();

  const handleGameClick = (game) => {
    if (game.path) {
      navigate(game.path);
      return;
    }

    window.alert("Este juego todavía está en desarrollo.");
  };

  return (
    <Box className="naturales-page">
      <Box className="naturales-header">
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/juegos")}
          className="naturales-back-button"
        >
          Volver a materias
        </Button>

        <Box className="naturales-heading">
          <Typography variant="h2" component="h1" className="naturales-title">
            Ciencias Naturales
          </Typography>

          <Typography variant="h6" className="naturales-subtitle">
            ¡Elegí un desafío y comenzá a explorar!
          </Typography>
        </Box>
      </Box>

      <Box className="naturales-map-wrapper">
        <Box
          component="img"
          src="/juegos/naturales/naturales-isla.png"
          alt="Mapa de juegos de Ciencias Naturales"
          className="naturales-map-image"
        />

        <Box className="naturales-games-layer">
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
                className="naturales-station-image"
              />

              <Typography component="span" className="naturales-station-label">
                {game.title}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}