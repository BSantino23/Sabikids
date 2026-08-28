import React, {
  useEffect,
  useRef,
  useState
} from 'react';

import {
  Box,
  Button,
  LinearProgress,
  MenuItem,
  Select,
  Typography
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReplayIcon from '@mui/icons-material/Replay';

import { useNavigate } from 'react-router-dom';

import '../../../styles/matematica/MayorMenorIgual.css';


const API_URL = 'http://localhost:5000';
const GAME_KEY = 'mayor_menor_igual';
const QUESTIONS_PER_GAME = 10;


const levels = {
  1: {
    name: 'Nivel 1',
    description: 'Compará números hasta 20',
  },

  2: {
    name: 'Nivel 2',
    description: 'Compará números hasta 100',
  },

  3: {
    name: 'Nivel 3',
    description: 'Compará números y cuentas simples',
  },

  4: {
    name: 'Nivel 4',
    description: 'Compará resultados de operaciones',
  },
};


function randomNumber(min, max) {
  return Math.floor(
    Math.random() * (max - min + 1)
  ) + min;
}


function getCorrectSymbol(
  leftValue,
  rightValue
) {
  if (leftValue > rightValue) {
    return '>';
  }

  if (leftValue < rightValue) {
    return '<';
  }

  return '=';
}


function createLevel1Question() {
  let left = randomNumber(0, 20);
  let right = randomNumber(0, 20);

  if (Math.random() < 0.2) {
    right = left;
  }

  return {
    leftText: String(left),
    rightText: String(right),
    leftValue: left,
    rightValue: right,
  };
}


function createLevel2Question() {
  let left = randomNumber(0, 100);
  let right = randomNumber(0, 100);

  if (Math.random() < 0.2) {
    right = left;
  }

  return {
    leftText: String(left),
    rightText: String(right),
    leftValue: left,
    rightValue: right,
  };
}


function createSimpleOperation(max = 50) {
  const useAddition =
    Math.random() > 0.5;

  if (useAddition) {
    const first =
      randomNumber(1, max - 1);

    const second =
      randomNumber(
        1,
        max - first
      );

    return {
      text:
        `${first} + ${second}`,

      value:
        first + second,
    };
  }

  const first =
    randomNumber(2, max);

  const second =
    randomNumber(
      0,
      first
    );

  return {
    text:
      `${first} − ${second}`,

    value:
      first - second,
  };
}


function createLevel3Question() {
  const operation =
    createSimpleOperation(60);

  let number =
    randomNumber(0, 60);

  if (Math.random() < 0.2) {
    number =
      operation.value;
  }

  if (Math.random() > 0.5) {
    return {
      leftText:
        operation.text,

      rightText:
        String(number),

      leftValue:
        operation.value,

      rightValue:
        number,
    };
  }

  return {
    leftText:
      String(number),

    rightText:
      operation.text,

    leftValue:
      number,

    rightValue:
      operation.value,
  };
}


function createLevel4Question() {
  const leftOperation =
    createSimpleOperation(100);

  let rightOperation =
    createSimpleOperation(100);

  if (Math.random() < 0.2) {
    const target =
      leftOperation.value;

    const first =
      randomNumber(
        0,
        target
      );

    rightOperation = {
      text:
        `${first} + ${target - first}`,

      value:
        target,
    };
  }

  return {
    leftText:
      leftOperation.text,

    rightText:
      rightOperation.text,

    leftValue:
      leftOperation.value,

    rightValue:
      rightOperation.value,
  };
}


function createQuestion(level) {
  let question;

  if (level === 1) {
    question =
      createLevel1Question();
  }

  if (level === 2) {
    question =
      createLevel2Question();
  }

  if (level === 3) {
    question =
      createLevel3Question();
  }

  if (level === 4) {
    question =
      createLevel4Question();
  }

  return {
    ...question,

    correctAnswer:
      getCorrectSymbol(
        question.leftValue,
        question.rightValue
      ),
  };
}


function createGame(level) {
  return Array.from(
    {
      length:
        QUESTIONS_PER_GAME
    },

    () =>
      createQuestion(level)
  );
}


export default function MayorMenorIgual() {
  const navigate =
    useNavigate();

  const [level, setLevel] =
    useState(1);

  const [
    maxUnlockedLevel,
    setMaxUnlockedLevel
  ] = useState(1);

  const [
    questions,
    setQuestions
  ] = useState([]);

  const [
    currentQuestion,
    setCurrentQuestion
  ] = useState(0);

  const [
    selectedAnswer,
    setSelectedAnswer
  ] = useState(null);

  const [
    incorrectAnswers,
    setIncorrectAnswers
  ] = useState([]);

  const [
    correctAnswers,
    setCorrectAnswers
  ] = useState(0);

  const [
    errors,
    setErrors
  ] = useState(0);

  const [
    feedback,
    setFeedback
  ] = useState('');

  const [
    locked,
    setLocked
  ] = useState(false);

  const [
    bestScore,
    setBestScore
  ] = useState(0);

  const [
    loadingProgress,
    setLoadingProgress
  ] = useState(true);

  const [
    progressError,
    setProgressError
  ] = useState('');

  const savedGameRef =
    useRef(false);


  const getLoggedUser = () => {
    const storedUser =
      localStorage.getItem(
        'usuario'
      );

    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(
        storedUser
      );
    } catch {
      return null;
    }
  };


  const startGame = (
    selectedLevel = level
  ) => {
    setQuestions(
      createGame(
        selectedLevel
      )
    );

    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIncorrectAnswers([]);
    setCorrectAnswers(0);
    setErrors(0);
    setFeedback('');
    setLocked(false);

    savedGameRef.current =
      false;
  };


  useEffect(() => {
    const loadProgress =
      async () => {
        const user =
          getLoggedUser();

        if (!user) {
          setProgressError(
            'Iniciá sesión para guardar tu progreso.'
          );

          setLoadingProgress(
            false
          );

          return;
        }

        try {
          const response =
            await fetch(
              `${API_URL}/api/progress/${user.id_usuario}/${GAME_KEY}`
            );

          const data =
            await response.json();

          if (!response.ok) {
            throw new Error(
              data.error ||
              'No se pudo cargar el progreso'
            );
          }

          const unlockedLevel =
            Math.min(
              Number(
                data.max_level || 1
              ),
              4
            );

          setMaxUnlockedLevel(
            unlockedLevel
          );

          setLevel(
            unlockedLevel
          );

          setBestScore(
            Number(
              data.best_score || 0
            )
          );

        } catch (error) {
          setProgressError(
            error.message
          );

        } finally {
          setLoadingProgress(
            false
          );
        }
      };


    loadProgress();
  }, []);


  useEffect(() => {
    if (!loadingProgress) {
      startGame(level);
    }
  }, [
    level,
    loadingProgress
  ]);


  const gameFinished =
    questions.length > 0 &&
    currentQuestion >=
      QUESTIONS_PER_GAME;


  const score =
    correctAnswers * 10;


  const saveProgress =
    async () => {
      const user =
        getLoggedUser();

      if (!user) {
        return;
      }

      try {
        const response =
          await fetch(
            `${API_URL}/api/progress`,
            {
              method: 'POST',

              headers: {
                'Content-Type':
                  'application/json',
              },

              body:
                JSON.stringify({
                  user_id:
                    user.id_usuario,

                  game_key:
                    GAME_KEY,

                  level,

                  score,

                  moves:
                    QUESTIONS_PER_GAME +
                    errors,
                }),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.error ||
            'No se pudo guardar el progreso'
          );
        }

        const savedProgress =
          data.progreso;

        const newUnlockedLevel =
          Math.min(
            Math.max(
              Number(
                savedProgress.max_level || 1
              ),

              level < 4
                ? level + 1
                : 4
            ),

            4
          );

        setMaxUnlockedLevel(
          newUnlockedLevel
        );

        setBestScore(
          Number(
            savedProgress.best_score || 0
          )
        );

        setProgressError('');

      } catch (error) {
        setProgressError(
          error.message
        );
      }
    };


  useEffect(() => {
    if (
      gameFinished &&
      !savedGameRef.current
    ) {
      savedGameRef.current =
        true;

      saveProgress();
    }
  }, [
    gameFinished
  ]);


  const handleAnswer =
    (answer) => {
      if (
        locked ||
        gameFinished
      ) {
        return;
      }

      const question =
        questions[
          currentQuestion
        ];

      if (
        incorrectAnswers.includes(
          answer
        )
      ) {
        return;
      }

      setSelectedAnswer(
        answer
      );

      if (
        answer ===
        question.correctAnswer
      ) {
        setCorrectAnswers(
          (current) =>
            current + 1
        );

        setFeedback(
          'Respuesta correcta'
        );

        setLocked(true);

        setTimeout(() => {
          setCurrentQuestion(
            (current) =>
              current + 1
          );

          setSelectedAnswer(
            null
          );

          setIncorrectAnswers([]);

          setFeedback('');

          setLocked(false);

        }, 850);

      } else {
        setIncorrectAnswers(
          (current) => [
            ...current,
            answer,
          ]
        );

        setErrors(
          (current) =>
            current + 1
        );

        setFeedback(
          'Probá otra vez'
        );

        setTimeout(() => {
          setSelectedAnswer(
            null
          );

          setFeedback('');

        }, 700);
      }
    };


  const handleLevelChange =
    (event) => {
      const selectedLevel =
        Number(
          event.target.value
        );

      if (
        selectedLevel <=
        maxUnlockedLevel
      ) {
        setLevel(
          selectedLevel
        );
      }
    };


  const handleNextLevel =
    () => {
      if (level >= 4) {
        return;
      }

      const nextLevel =
        level + 1;

      if (
        nextLevel <=
        maxUnlockedLevel
      ) {
        setLevel(
          nextLevel
        );
      }
    };


  if (loadingProgress) {
    return (
      <Box className="compare-page">

        <Typography className="compare-loading">
          Cargando progreso...
        </Typography>

      </Box>
    );
  }


  const question =
    !gameFinished
      ? questions[
          currentQuestion
        ]
      : null;


  const progress =
    Math.min(
      (
        currentQuestion /
        QUESTIONS_PER_GAME
      ) * 100,
      100
    );


  return (
    <Box className="compare-page">

      <Box className="compare-header">

        <Button
          variant="contained"
          startIcon={
            <ArrowBackIcon />
          }
          onClick={() =>
            navigate(
              '/juegos/matematica'
            )
          }
          className="compare-back-button"
        >
          Volver a Matemática
        </Button>


        <Box className="compare-heading">

          <Typography
            variant="h3"
            component="h1"
            className="compare-title"
          >
            Mayor, menor o igual
          </Typography>

          <Typography className="compare-subtitle">
            Compará los valores y elegí el símbolo correcto
          </Typography>

        </Box>


        <Button
          variant="contained"
          startIcon={
            <ReplayIcon />
          }
          onClick={() =>
            startGame()
          }
          className="compare-restart-button"
        >
          Reiniciar
        </Button>

      </Box>


      <Box className="compare-controls">

        <Box className="compare-level-control">

          <Typography className="compare-level-label">
            Dificultad
          </Typography>


          <Select
            value={level}
            onChange={
              handleLevelChange
            }
            size="small"
            className="compare-level-select"
          >

            <MenuItem value={1}>
              Nivel 1 - Hasta 20
            </MenuItem>

            <MenuItem
              value={2}
              disabled={
                maxUnlockedLevel < 2
              }
            >
              Nivel 2 - Hasta 100
            </MenuItem>

            <MenuItem
              value={3}
              disabled={
                maxUnlockedLevel < 3
              }
            >
              Nivel 3 - Cuentas simples
            </MenuItem>

            <MenuItem
              value={4}
              disabled={
                maxUnlockedLevel < 4
              }
            >
              Nivel 4 - Operaciones
            </MenuItem>

          </Select>

        </Box>


        <Box className="compare-stats">

          <Box className="compare-pill">
            Aciertos: {correctAnswers}
          </Box>

          <Box className="compare-pill">
            Errores: {errors}
          </Box>

          <Box className="compare-pill">
            Puntaje: {score}
          </Box>

          <Box className="compare-pill">
            Mejor: {bestScore}
          </Box>

        </Box>

      </Box>


      {progressError && (
        <Box className="compare-login-warning">

          <Typography>
            {progressError}
          </Typography>

          <Button
            variant="contained"
            size="small"
            onClick={() =>
              navigate('/login')
            }
          >
            Iniciar sesión
          </Button>

        </Box>
      )}


      {!gameFinished && question && (
        <Box className="compare-game-area">

          <Box className="compare-progress-wrapper">

            <Typography className="compare-question-number">
              Pregunta {currentQuestion + 1} de {QUESTIONS_PER_GAME}
            </Typography>

            <LinearProgress
              variant="determinate"
              value={progress}
              className="compare-progress"
            />

          </Box>


          <Box className="compare-question-card">

            <Typography className="compare-level-description">
              {levels[level].description}
            </Typography>

            <Typography className="compare-question-text">
              ¿Qué símbolo corresponde?
            </Typography>


            <Box className="compare-values">

              <Box className="compare-value-card">
                {question.leftText}
              </Box>

              <Box className="compare-question-mark">
                ?
              </Box>

              <Box className="compare-value-card">
                {question.rightText}
              </Box>

            </Box>


            <Box className="compare-options">

              {['>', '<', '='].map(
                (option) => {

                  const isWrong =
                    incorrectAnswers.includes(
                      option
                    );

                  const isCorrect =
                    selectedAnswer === option &&
                    option ===
                      question.correctAnswer;

                  return (
                    <Button
                      key={option}
                      variant="contained"
                      onClick={() =>
                        handleAnswer(
                          option
                        )
                      }
                      disabled={
                        locked ||
                        isWrong
                      }
                      className={`
                        compare-option
                        ${
                          isWrong
                            ? 'compare-option-wrong'
                            : ''
                        }
                        ${
                          isCorrect
                            ? 'compare-option-correct'
                            : ''
                        }
                      `}
                    >
                      {option}
                    </Button>
                  );
                }
              )}

            </Box>


            <Box
              className={`compare-feedback ${
                feedback ===
                'Respuesta correcta'
                  ? 'compare-feedback-correct'
                  : feedback
                    ? 'compare-feedback-error'
                    : ''
              }`}
            >
              {feedback}
            </Box>

          </Box>

        </Box>
      )}


      {gameFinished && (
        <Box className="compare-finished">

          <Typography
            variant="h4"
            className="compare-finished-title"
          >
            Nivel completado
          </Typography>

          <Typography className="compare-finished-text">
            Completaste las {QUESTIONS_PER_GAME} comparaciones.
          </Typography>

          <Typography className="compare-final-score">
            Puntaje: {score} / 100
          </Typography>

          <Typography className="compare-final-errors">
            Errores: {errors}
          </Typography>

          <Box className="compare-finished-actions">

            <Button
              variant="contained"
              onClick={() =>
                startGame()
              }
              className="compare-play-again"
            >
              Jugar otra vez
            </Button>

            {level < 4 && (
              <Button
                variant="contained"
                onClick={
                  handleNextLevel
                }
                disabled={
                  level + 1 >
                  maxUnlockedLevel
                }
                className="compare-next-level"
              >
                Siguiente nivel
              </Button>
            )}

          </Box>

        </Box>
      )}

    </Box>
  );
}