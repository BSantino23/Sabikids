import React, { useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import SpaIcon from "@mui/icons-material/Spa";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import { useNavigate } from "react-router-dom";

import "../../../styles/naturales/ComidaSaludable.css";

const FOODS = [
  { name: "Manzana", type: "saludable", icon: "healthy" },
  { name: "Hamburguesa", type: "chatarra", icon: "junk" },
  { name: "Banana", type: "saludable", icon: "healthy" },
  { name: "Papas fritas", type: "chatarra", icon: "junk" },
  { name: "Zanahoria", type: "saludable", icon: "healthy" },
  { name: "Gaseosa", type: "chatarra", icon: "drink" },
  { name: "Brócoli", type: "saludable", icon: "healthy" },
  { name: "Caramelo", type: "chatarra", icon: "junk" },
  { name: "Agua", type: "saludable", icon: "drink" },
  { name: "Pizza", type: "chatarra", icon: "junk" },
];

const ICONS = {
  healthy: SpaIcon,
  junk: FastfoodIcon,
  drink: LocalDrinkIcon,
};

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function ComidaSaludable() {
  const navigate = useNavigate();

  const [foods, setFoods] = useState(shuffleArray(FOODS).slice(0, 8));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentFood = foods[currentIndex];
  const CurrentIcon = currentFood ? ICONS[currentFood.icon] : RestaurantIcon;
  const isCorrect = selectedAnswer === currentFood?.type;

  const handleAnswer = (answer) => {
    if (answered || finished) return;

    setSelectedAnswer(answer);
    setAnswered(true);

    if (answer === currentFood.type) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex === foods.length - 1) {
      setFinished(true);
      return;
    }

    setCurrentIndex((prev) => prev + 1);
    setSelectedAnswer("");
    setAnswered(false);
  };

  const handleRestart = () => {
    setFoods(shuffleArray(FOODS).slice(0, 8));
    setCurrentIndex(0);
    setSelectedAnswer("");
    setAnswered(false);
    setScore(0);
    setFinished(false);
  };

  return (
    <Box className="food-game-page">
      <Box className="food-game-header">
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/juegos/naturales")}
          className="food-back-button"
        >
          Volver a Naturales
        </Button>

        <Box className="food-title-box">
          <Typography variant="h3" component="h1" className="food-game-title">
            Plato saludable
          </Typography>

          <Typography variant="h6" className="food-game-subtitle">
            Elegí si el alimento es saludable o comida chatarra
          </Typography>
        </Box>
      </Box>

      <Paper className="food-game-card" elevation={0}>
        {!finished ? (
          <>
            <Box className="food-progress-box">
              <Typography className="food-progress-text">
                Pregunta {currentIndex + 1} de {foods.length}
              </Typography>

              <Typography className="food-score-text">
                Puntaje: {score}
              </Typography>
            </Box>

            <Box className="food-item-box">
              <Box className="food-icon-circle">
                <CurrentIcon className="food-main-icon" />
              </Box>

              <Typography className="food-name">{currentFood.name}</Typography>
            </Box>

            <Box className="food-options">
              <Button
                className={`food-option-btn healthy-btn ${
                  answered && currentFood.type === "saludable"
                    ? "correct-option"
                    : ""
                } ${
                  answered &&
                  selectedAnswer === "saludable" &&
                  currentFood.type !== "saludable"
                    ? "wrong-option"
                    : ""
                }`}
                variant="contained"
                startIcon={<SpaIcon />}
                onClick={() => handleAnswer("saludable")}
              >
                Saludable
              </Button>

              <Button
                className={`food-option-btn junk-btn ${
                  answered && currentFood.type === "chatarra"
                    ? "correct-option"
                    : ""
                } ${
                  answered &&
                  selectedAnswer === "chatarra" &&
                  currentFood.type !== "chatarra"
                    ? "wrong-option"
                    : ""
                }`}
                variant="contained"
                startIcon={<FastfoodIcon />}
                onClick={() => handleAnswer("chatarra")}
              >
                Chatarra
              </Button>
            </Box>

            {answered && (
              <Box className="food-feedback-box">
                <Typography
                  className={`food-feedback ${isCorrect ? "success" : "error"}`}
                >
                  {isCorrect
                    ? "Muy bien. Respuesta correcta."
                    : `Casi. La respuesta correcta es: ${
                        currentFood.type === "saludable"
                          ? "Saludable"
                          : "Chatarra"
                      }.`}
                </Typography>

                <Button
                  variant="contained"
                  onClick={handleNext}
                  className="food-next-button"
                >
                  {currentIndex === foods.length - 1
                    ? "Ver resultado"
                    : "Siguiente"}
                </Button>
              </Box>
            )}
          </>
        ) : (
          <Box className="food-result-box">
            <Typography className="food-result-title">
              Juego terminado
            </Typography>

            <Typography className="food-result-score">
              Tu puntaje fue: {score} / {foods.length}
            </Typography>

            <Typography className="food-result-message">
              {score >= 6
                ? "Excelente trabajo."
                : "Muy bien. Podés intentarlo de nuevo para mejorar."}
            </Typography>

            <Box className="food-result-buttons">
              <Button
                variant="contained"
                startIcon={<RestartAltIcon />}
                onClick={handleRestart}
                className="food-restart-button"
              >
                Jugar otra vez
              </Button>

              <Button
                variant="outlined"
                onClick={() => navigate("/juegos/naturales")}
                className="food-exit-button"
              >
                Volver
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
}