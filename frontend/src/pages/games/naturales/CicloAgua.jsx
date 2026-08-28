import React, { useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import CloudIcon from "@mui/icons-material/Cloud";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import UmbrellaIcon from "@mui/icons-material/Umbrella";
import WavesIcon from "@mui/icons-material/Waves";
import { useNavigate } from "react-router-dom";

import "../../../styles/naturales/CicloAgua.css";

const QUESTIONS = [
  {
    question: "El sol calienta el agua de ríos, lagos y mares. ¿Qué etapa es?",
    answer: "Evaporación",
    clue: "El agua líquida se transforma en vapor y sube.",
  },
  {
    question: "El vapor de agua se junta y forma nubes. ¿Qué etapa es?",
    answer: "Condensación",
    clue: "El vapor se enfría y forma pequeñas gotas en las nubes.",
  },
  {
    question: "El agua cae desde las nubes en forma de lluvia. ¿Qué etapa es?",
    answer: "Precipitación",
    clue: "Puede caer como lluvia, nieve o granizo.",
  },
  {
    question: "El agua vuelve a juntarse en ríos, lagos y mares. ¿Qué etapa es?",
    answer: "Acumulación",
    clue: "El agua se reúne nuevamente en distintos lugares.",
  },
  {
    question: "Después de que se forman las nubes, ¿qué puede pasar?",
    answer: "Precipitación",
    clue: "El agua puede caer desde las nubes.",
  },
  {
    question: "¿Qué etapa ocurre gracias al calor del sol?",
    answer: "Evaporación",
    clue: "El calor hace que parte del agua suba como vapor.",
  },
  {
    question: "¿Qué etapa ayuda a formar las nubes?",
    answer: "Condensación",
    clue: "El vapor se enfría y se agrupa en pequeñas gotas.",
  },
  {
    question: "¿Qué etapa ocurre cuando el agua llega otra vez a mares, ríos o lagos?",
    answer: "Acumulación",
    clue: "El agua queda reunida para comenzar otra vez el ciclo.",
  },
];

const OPTIONS = [
  {
    name: "Evaporación",
    Icon: WbSunnyIcon,
  },
  {
    name: "Condensación",
    Icon: CloudIcon,
  },
  {
    name: "Precipitación",
    Icon: UmbrellaIcon,
  },
  {
    name: "Acumulación",
    Icon: WavesIcon,
  },
];

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function CicloAgua() {
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
    <Box className="water-game-page">
      <Box className="water-game-header">
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/juegos/naturales")}
          className="water-back-button"
        >
          Volver a Naturales
        </Button>

        <Box className="water-title-box">
          <Typography variant="h3" component="h1" className="water-game-title">
            Ciclo del agua
          </Typography>

          <Typography variant="h6" className="water-game-subtitle">
            Elegí la etapa correcta del ciclo
          </Typography>
        </Box>
      </Box>

      <Paper className="water-game-card" elevation={0}>
        {!finished ? (
          <>
            <Box className="water-progress-box">
              <Typography className="water-progress-text">
                Pregunta {currentIndex + 1} de {questions.length}
              </Typography>

              <Typography className="water-score-text">
                Puntaje: {score}
              </Typography>
            </Box>

            <Box className="water-question-box">
              <Box className="water-icon-circle">
                <WaterDropIcon className="water-main-icon" />
              </Box>

              <Typography className="water-question">
                {currentQuestion.question}
              </Typography>
            </Box>

            <Box className="water-options">
              {OPTIONS.map(({ name, Icon }) => (
                <Button
                  key={name}
                  variant="contained"
                  startIcon={<Icon />}
                  className={`water-option-btn ${
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
              <Box className="water-feedback-box">
                <Typography className="water-feedback error">
                  Casi. Leé la pista e intentá otra vez.
                </Typography>

                <Typography className="water-clue">
                  Pista: {currentQuestion.clue}
                </Typography>
              </Box>
            )}

            {answeredCorrectly && (
              <Box className="water-feedback-box">
                <Typography className="water-feedback success">
                  {showClue
                    ? "Ahora sí. Respuesta correcta."
                    : "Muy bien. Respuesta correcta."}
                </Typography>

                <Button
                  variant="contained"
                  onClick={handleNext}
                  className="water-next-button"
                >
                  {currentIndex === questions.length - 1
                    ? "Ver resultado"
                    : "Siguiente"}
                </Button>
              </Box>
            )}
          </>
        ) : (
          <Box className="water-result-box">
            <Typography className="water-result-title">
              Juego terminado
            </Typography>

            <Typography className="water-result-score">
              Tu puntaje fue: {score} / {questions.length}
            </Typography>

            <Typography className="water-result-message">
              {score >= 6
                ? "Excelente trabajo."
                : "Muy bien. Podés intentarlo otra vez para mejorar."}
            </Typography>

            <Box className="water-result-buttons">
              <Button
                variant="contained"
                startIcon={<RestartAltIcon />}
                onClick={handleRestart}
                className="water-restart-button"
              >
                Jugar otra vez
              </Button>

              <Button
                variant="outlined"
                onClick={() => navigate("/juegos/naturales")}
                className="water-exit-button"
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