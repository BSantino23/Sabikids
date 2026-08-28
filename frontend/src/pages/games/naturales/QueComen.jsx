import React, { useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import PetsIcon from "@mui/icons-material/Pets";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { useNavigate } from "react-router-dom";

import "../../../styles/naturales/QueComen.css";

const QUESTIONS = [
  {
    animal: "León",
    clue: "Come principalmente otros animales.",
    answer: "Carnívoro",
  },
  {
    animal: "Vaca",
    clue: "Come pasto y plantas.",
    answer: "Herbívoro",
  },
  {
    animal: "Oso",
    clue: "Puede comer plantas, frutas, peces y otros animales.",
    answer: "Omnívoro",
  },
  {
    animal: "Conejo",
    clue: "Come zanahorias, hojas y otros vegetales.",
    answer: "Herbívoro",
  },
  {
    animal: "Tigre",
    clue: "Caza otros animales para alimentarse.",
    answer: "Carnívoro",
  },
  {
    animal: "Gallina",
    clue: "Puede comer semillas, insectos y otros alimentos.",
    answer: "Omnívoro",
  },
  {
    animal: "Caballo",
    clue: "Come pasto, heno y plantas.",
    answer: "Herbívoro",
  },
  {
    animal: "Zorro",
    clue: "Puede comer pequeños animales, frutas e insectos.",
    answer: "Omnívoro",
  },
];

const OPTIONS = ["Carnívoro", "Herbívoro", "Omnívoro"];

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function QueComen() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState(() =>
    shuffleArray(QUESTIONS).slice(0, 8)
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);
  const [showClue, setShowClue] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (answer) => {
    if (answeredCorrectly || finished) return;

    setSelectedAnswer(answer);

    if (answer === currentQuestion.answer) {
      setAnsweredCorrectly(true);

      if (!showClue) {
        setScore((prev) => prev + 1);
      }

      return;
    }

    setShowClue(true);
  };

  const handleNext = () => {
    if (currentIndex === questions.length - 1) {
      setFinished(true);
      return;
    }

    setCurrentIndex((prev) => prev + 1);
    setSelectedAnswer("");
    setAnsweredCorrectly(false);
    setShowClue(false);
  };

  const handleRestart = () => {
    setQuestions(shuffleArray(QUESTIONS).slice(0, 8));
    setCurrentIndex(0);
    setSelectedAnswer("");
    setAnsweredCorrectly(false);
    setShowClue(false);
    setScore(0);
    setFinished(false);
  };

  return (
    <Box className="eat-game-page">
      <Box className="eat-game-header">
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/juegos/naturales")}
          className="eat-back-button"
        >
          Volver a Naturales
        </Button>

        <Box className="eat-title-box">
          <Typography variant="h3" component="h1" className="eat-game-title">
            Qué comen los animales
          </Typography>

          <Typography variant="h6" className="eat-game-subtitle">
            Elegí si es carnívoro, herbívoro u omnívoro
          </Typography>
        </Box>
      </Box>

      <Paper className="eat-game-card" elevation={0}>
        {!finished ? (
          <>
            <Box className="eat-progress-box">
              <Typography className="eat-progress-text">
                Pregunta {currentIndex + 1} de {questions.length}
              </Typography>

              <Typography className="eat-score-text">
                Puntaje: {score}
              </Typography>
            </Box>

            <Box className="eat-question-box">
              <Box className="eat-icon-row">
                <Box className="eat-icon-circle">
                  <PetsIcon className="eat-main-icon" />
                </Box>

                <Box className="eat-icon-circle eat-food-circle">
                  <RestaurantIcon className="eat-main-icon" />
                </Box>
              </Box>

              <Typography className="eat-animal">
                {currentQuestion.animal}
              </Typography>
            </Box>

            <Box className="eat-options">
              {OPTIONS.map((option) => (
                <Button
                  key={option}
                  variant="contained"
                  className={`eat-option-btn ${
                    answeredCorrectly && option === currentQuestion.answer
                      ? "correct-option"
                      : ""
                  } ${
                    showClue &&
                    selectedAnswer === option &&
                    option !== currentQuestion.answer
                      ? "wrong-option"
                      : ""
                  }`}
                  onClick={() => handleAnswer(option)}
                >
                  {option}
                </Button>
              ))}
            </Box>

            {showClue && !answeredCorrectly && (
              <Box className="eat-feedback-box">
                <Typography className="eat-feedback error">
                  Casi. Leé la pista e intentá otra vez.
                </Typography>

                <Typography className="eat-clue">
                  Pista: {currentQuestion.clue}
                </Typography>
              </Box>
            )}

            {answeredCorrectly && (
              <Box className="eat-feedback-box">
                <Typography className="eat-feedback success">
                  {showClue
                    ? "Muy bien. Respuesta correcta."
                    : "Muy bien. Respuesta correcta."}
                </Typography>

                <Button
                  variant="contained"
                  onClick={handleNext}
                  className="eat-next-button"
                >
                  {currentIndex === questions.length - 1
                    ? "Ver resultado"
                    : "Siguiente"}
                </Button>
              </Box>
            )}
          </>
        ) : (
          <Box className="eat-result-box">
            <Typography className="eat-result-title">
              Juego terminado
            </Typography>

            <Typography className="eat-result-score">
              Tu puntaje fue: {score} / {questions.length}
            </Typography>

            <Typography className="eat-result-message">
              {score >= 6
                ? "Excelente trabajo."
                : "Muy bien. Podés intentarlo otra vez para mejorar."}
            </Typography>

            <Box className="eat-result-buttons">
              <Button
                variant="contained"
                startIcon={<RestartAltIcon />}
                onClick={handleRestart}
                className="eat-restart-button"
              >
                Jugar otra vez
              </Button>

              <Button
                variant="outlined"
                onClick={() => navigate("/juegos/naturales")}
                className="eat-exit-button"
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