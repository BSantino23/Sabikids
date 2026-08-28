import React, { useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import VisibilityIcon from "@mui/icons-material/Visibility";
import HearingIcon from "@mui/icons-material/Hearing";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import SpaIcon from "@mui/icons-material/Spa";
import { useNavigate } from "react-router-dom";

import "../../../styles/naturales/Sentidos.css";

const QUESTIONS = [
  {
    situation: "Escuchás el sonido de una campana.",
    answer: "Oído",
    clue: "Usamos este sentido para reconocer sonidos.",
  },
  {
    situation: "Ves los colores de una mariposa.",
    answer: "Vista",
    clue: "Usamos este sentido para mirar formas, colores y tamaños.",
  },
  {
    situation: "Probás una fruta dulce.",
    answer: "Gusto",
    clue: "Usamos este sentido para reconocer sabores.",
  },
  {
    situation: "Sentís que una piedra es áspera.",
    answer: "Tacto",
    clue: "Usamos este sentido para sentir texturas, frío, calor o presión.",
  },
  {
    situation: "Olés una flor.",
    answer: "Olfato",
    clue: "Usamos este sentido para reconocer olores.",
  },
  {
    situation: "Tocás un hielo y sentís que está frío.",
    answer: "Tacto",
    clue: "Este sentido funciona con la piel.",
  },
  {
    situation: "Reconocés una canción.",
    answer: "Oído",
    clue: "Este sentido nos ayuda a escuchar música, voces y ruidos.",
  },
  {
    situation: "Sentís el olor de una comida recién hecha.",
    answer: "Olfato",
    clue: "Este sentido está relacionado con la nariz.",
  },
];

const OPTIONS = [
  {
    name: "Vista",
    Icon: VisibilityIcon,
  },
  {
    name: "Oído",
    Icon: HearingIcon,
  },
  {
    name: "Olfato",
    Icon: SpaIcon,
  },
  {
    name: "Gusto",
    Icon: RestaurantIcon,
  },
  {
    name: "Tacto",
    Icon: TouchAppIcon,
  },
];

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function Sentidos() {
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
    <Box className="senses-page">
      <Box className="senses-header">
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/juegos/naturales")}
          className="senses-back-button"
        >
          Volver a Naturales
        </Button>

        <Box className="senses-title-box">
          <Typography variant="h3" component="h1" className="senses-title">
            Los sentidos
          </Typography>

          <Typography variant="h6" className="senses-subtitle">
            Elegí qué sentido usamos en cada situación
          </Typography>
        </Box>
      </Box>

      <Paper className="senses-card" elevation={0}>
        {!finished ? (
          <>
            <Box className="senses-progress-box">
              <Typography className="senses-progress-text">
                Pregunta {currentIndex + 1} de {questions.length}
              </Typography>

              <Typography className="senses-score-text">
                Puntaje: {score}
              </Typography>
            </Box>

            <Box className="senses-question-box">
              <Box className="senses-icon-circle">
                <VisibilityIcon className="senses-main-icon" />
              </Box>

              <Typography className="senses-situation">
                {currentQuestion.situation}
              </Typography>
            </Box>

            <Box className="senses-options">
              {OPTIONS.map(({ name, Icon }) => (
                <Button
                  key={name}
                  variant="contained"
                  startIcon={<Icon />}
                  className={`senses-option-btn ${
                    answeredCorrectly && name === currentQuestion.answer
                      ? "correct-option"
                      : ""
                  } ${
                    showClue &&
                    selectedAnswer === name &&
                    name !== currentQuestion.answer
                      ? "wrong-option"
                      : ""
                  }`}
                  onClick={() => handleAnswer(name)}
                >
                  {name}
                </Button>
              ))}
            </Box>

            {showClue && !answeredCorrectly && (
              <Box className="senses-feedback-box">
                <Typography className="senses-feedback error">
                  Casi. Leé la pista e intentá otra vez.
                </Typography>

                <Typography className="senses-clue">
                  Pista: {currentQuestion.clue}
                </Typography>
              </Box>
            )}

            {answeredCorrectly && (
              <Box className="senses-feedback-box">
                <Typography className="senses-feedback success">
                  {showClue
                    ? "Ahora sí. Respuesta correcta."
                    : "Muy bien. Respuesta correcta."}
                </Typography>

                <Button
                  variant="contained"
                  onClick={handleNext}
                  className="senses-next-button"
                >
                  {currentIndex === questions.length - 1
                    ? "Ver resultado"
                    : "Siguiente"}
                </Button>
              </Box>
            )}
          </>
        ) : (
          <Box className="senses-result-box">
            <Typography className="senses-result-title">
              Juego terminado
            </Typography>

            <Typography className="senses-result-score">
              Tu puntaje fue: {score} / {questions.length}
            </Typography>

            <Typography className="senses-result-message">
              {score >= 6
                ? "Excelente trabajo."
                : "Muy bien. Podés intentarlo otra vez para mejorar."}
            </Typography>

            <Box className="senses-result-buttons">
              <Button
                variant="contained"
                startIcon={<RestartAltIcon />}
                onClick={handleRestart}
                className="senses-restart-button"
              >
                Jugar otra vez
              </Button>

              <Button
                variant="outlined"
                onClick={() => navigate("/juegos/naturales")}
                className="senses-exit-button"
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