import React, { useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import PetsIcon from "@mui/icons-material/Pets";
import { useNavigate } from "react-router-dom";

import "../../../styles/naturales/Habitats.css";

const QUESTIONS = [
  {
    animal: "Pingüino",
    clue: "Vive en lugares muy fríos.",
    answer: "Hielo",
    options: ["Selva", "Agua", "Hielo", "Desierto"],
  },
  {
    animal: "Camello",
    clue: "Puede vivir en lugares secos y con mucha arena.",
    answer: "Desierto",
    options: ["Bosque", "Desierto", "Hielo", "Laguna"],
  },
  {
    animal: "Mono",
    clue: "Vive entre árboles y mucha vegetación.",
    answer: "Selva",
    options: ["Selva", "Desierto", "Hielo", "Océano"],
  },
  {
    animal: "Pez",
    clue: "Necesita vivir dentro del agua.",
    answer: "Agua",
    options: ["Bosque", "Agua", "Desierto", "Montaña"],
  },
  {
    animal: "Rana",
    clue: "Suele vivir cerca de charcos, ríos o lagunas.",
    answer: "Laguna",
    options: ["Desierto", "Laguna", "Hielo", "Ciudad"],
  },
  {
    animal: "Oso",
    clue: "Puede vivir en zonas con árboles, cuevas y montañas.",
    answer: "Bosque",
    options: ["Bosque", "Agua", "Desierto", "Océano"],
  },
  {
    animal: "Tigre",
    clue: "Vive en zonas con mucha vegetación y árboles.",
    answer: "Selva",
    options: ["Hielo", "Selva", "Desierto", "Laguna"],
  },
  {
    animal: "Tortuga marina",
    clue: "Pasa gran parte de su vida en el mar.",
    answer: "Océano",
    options: ["Bosque", "Océano", "Desierto", "Hielo"],
  },
];

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function Habitats() {
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
    <Box className="habitats-page">
      <Box className="habitats-header">
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/juegos/naturales")}
          className="habitats-back-button"
        >
          Volver a Naturales
        </Button>

        <Box className="habitats-title-box">
          <Typography variant="h3" component="h1" className="habitats-title">
            Hábitats de animales
          </Typography>

          <Typography variant="h6" className="habitats-subtitle">
            Elegí dónde vive cada animal
          </Typography>
        </Box>
      </Box>

      <Paper className="habitats-card" elevation={0}>
        {!finished ? (
          <>
            <Box className="habitats-progress-box">
              <Typography className="habitats-progress-text">
                Pregunta {currentIndex + 1} de {questions.length}
              </Typography>

              <Typography className="habitats-score-text">
                Puntaje: {score}
              </Typography>
            </Box>

            <Box className="habitats-question-box">
              <Box className="habitats-icon-circle">
                <PetsIcon className="habitats-main-icon" />
              </Box>

              <Typography className="habitats-animal">
                {currentQuestion.animal}
              </Typography>
            </Box>

            <Box className="habitats-options">
              {currentQuestion.options.map((option) => (
                <Button
                  key={option}
                  variant="contained"
                  className={`habitats-option-btn ${
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
              <Box className="habitats-feedback-box">
                <Typography className="habitats-feedback error">
                  Casi. Leé la pista e intentá otra vez.
                </Typography>

                <Typography className="habitats-clue">
                  Pista: {currentQuestion.clue}
                </Typography>
              </Box>
            )}

            {answeredCorrectly && (
              <Box className="habitats-feedback-box">
                <Typography className="habitats-feedback success">
                  {showClue
                    ? "Muy bien. Respuesta correcta."
                    : "Muy bien. Respuesta correcta."}
                </Typography>

                <Button
                  variant="contained"
                  onClick={handleNext}
                  className="habitats-next-button"
                >
                  {currentIndex === questions.length - 1
                    ? "Ver resultado"
                    : "Siguiente"}
                </Button>
              </Box>
            )}
          </>
        ) : (
          <Box className="habitats-result-box">
            <Typography className="habitats-result-title">
              Juego terminado
            </Typography>

            <Typography className="habitats-result-score">
              Tu puntaje fue: {score} / {questions.length}
            </Typography>

            <Typography className="habitats-result-message">
              {score >= 6
                ? "Excelente trabajo."
                : "Muy bien. Podés intentarlo otra vez para mejorar."}
            </Typography>

            <Box className="habitats-result-buttons">
              <Button
                variant="contained"
                startIcon={<RestartAltIcon />}
                onClick={handleRestart}
                className="habitats-restart-button"
              >
                Jugar otra vez
              </Button>

              <Button
                variant="outlined"
                onClick={() => navigate("/juegos/naturales")}
                className="habitats-exit-button"
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