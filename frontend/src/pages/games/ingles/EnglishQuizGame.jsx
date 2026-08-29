import React, { useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useNavigate } from "react-router-dom";

import "../../../styles/ingles/InglesGames.css";

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function EnglishQuizGame({
  title,
  subtitle,
  questions,
  Icon,
}) {
  const navigate = useNavigate();

  const [gameQuestions, setGameQuestions] = useState(() =>
    shuffleArray(questions).slice(0, 8)
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);
  const [showClue, setShowClue] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const currentQuestion = gameQuestions[currentIndex];

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
    if (currentIndex === gameQuestions.length - 1) {
      setFinished(true);
      return;
    }

    setCurrentIndex((prev) => prev + 1);
    setSelectedAnswer("");
    setAnsweredCorrectly(false);
    setShowClue(false);
  };

  const handleRestart = () => {
    setGameQuestions(shuffleArray(questions).slice(0, 8));
    setCurrentIndex(0);
    setSelectedAnswer("");
    setAnsweredCorrectly(false);
    setShowClue(false);
    setScore(0);
    setFinished(false);
  };

  return (
    <Box className="english-game-page">
      <Box className="english-game-header">
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/juegos/ingles")}
          className="english-back-button"
        >
          Volver a Inglés
        </Button>

        <Box className="english-title-box">
          <Typography variant="h3" component="h1" className="english-game-title">
            {title}
          </Typography>

          <Typography variant="h6" className="english-game-subtitle">
            {subtitle}
          </Typography>
        </Box>
      </Box>

      <Paper className="english-game-card" elevation={0}>
        {!finished ? (
          <>
            <Box className="english-progress-box">
              <Typography className="english-progress-text">
                Pregunta {currentIndex + 1} de {gameQuestions.length}
              </Typography>

              <Typography className="english-score-text">
                Puntaje: {score}
              </Typography>
            </Box>

            <Box className="english-question-box">
              <Box className="english-icon-circle">
                <Icon className="english-main-icon" />
              </Box>

              {currentQuestion.color && (
                <Box
                  className="english-color-sample"
                  style={{ backgroundColor: currentQuestion.color }}
                />
              )}

              <Typography className="english-question-text">
                {currentQuestion.prompt}
              </Typography>
            </Box>

            <Box className="english-options">
              {currentQuestion.options.map((option) => (
                <Button
                  key={option}
                  variant="contained"
                  className={`english-option-btn ${
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
              <Box className="english-feedback-box">
                <Typography className="english-feedback error">
                  Casi. Leé la pista e intentá otra vez.
                </Typography>

                <Typography className="english-clue">
                  Pista: {currentQuestion.clue}
                </Typography>
              </Box>
            )}

            {answeredCorrectly && (
              <Box className="english-feedback-box">
                <Typography className="english-feedback success">
                  {showClue
                    ? "Ahora sí. Respuesta correcta."
                    : "Muy bien. Respuesta correcta."}
                </Typography>

                <Button
                  variant="contained"
                  onClick={handleNext}
                  className="english-next-button"
                >
                  {currentIndex === gameQuestions.length - 1
                    ? "Ver resultado"
                    : "Siguiente"}
                </Button>
              </Box>
            )}
          </>
        ) : (
          <Box className="english-result-box">
            <Typography className="english-result-title">
              Juego terminado
            </Typography>

            <Typography className="english-result-score">
              Tu puntaje fue: {score} / {gameQuestions.length}
            </Typography>

            <Typography className="english-result-message">
              {score >= 6
                ? "Excelente trabajo."
                : "Muy bien. Podés intentarlo otra vez para mejorar."}
            </Typography>

            <Box className="english-result-buttons">
              <Button
                variant="contained"
                startIcon={<RestartAltIcon />}
                onClick={handleRestart}
                className="english-restart-button"
              >
                Jugar otra vez
              </Button>

              <Button
                variant="outlined"
                onClick={() => navigate("/juegos/ingles")}
                className="english-exit-button"
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
