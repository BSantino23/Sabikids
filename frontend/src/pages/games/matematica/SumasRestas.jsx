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

import '../../../styles/matematica/SumasRestas.css';


const API_URL = 'http://localhost:5000';
const GAME_KEY = 'sumas_restas';

const QUESTIONS_PER_GAME = 10;


const levels = {
  1: {
    name: 'Nivel 1',
    description: 'Sumas hasta 20',
  },

  2: {
    name: 'Nivel 2',
    description: 'Restas hasta 20',
  },

  3: {
    name: 'Nivel 3',
    description: 'Sumas y restas hasta 100',
  },

  4: {
    name: 'Nivel 4',
    description: 'Operaciones combinadas',
  },
};


function randomNumber(min, max) {
  return Math.floor(
    Math.random() * (max - min + 1)
  ) + min;
}


function shuffleArray(array) {
  const shuffled = [...array];

  for (
    let i = shuffled.length - 1;
    i > 0;
    i -= 1
  ) {
    const randomIndex =
      Math.floor(
        Math.random() * (i + 1)
      );

    [
      shuffled[i],
      shuffled[randomIndex]
    ] = [
      shuffled[randomIndex],
      shuffled[i]
    ];
  }

  return shuffled;
}


function createWrongAnswers(correctAnswer) {
  const wrongAnswers =
    new Set();

  while (
    wrongAnswers.size < 3
  ) {
    const difference =
      randomNumber(-8, 8);

    const possibleAnswer =
      correctAnswer + difference;

    if (
      possibleAnswer >= 0 &&
      possibleAnswer !== correctAnswer
    ) {
      wrongAnswers.add(
        possibleAnswer
      );
    }
  }

  return [...wrongAnswers];
}


function createQuestion(level) {
  let operation = '';
  let answer = 0;


  if (level === 1) {
    const first =
      randomNumber(1, 15);

    const second =
      randomNumber(
        1,
        20 - first
      );

    answer =
      first + second;

    operation =
      `${first} + ${second}`;
  }


  if (level === 2) {
    const first =
      randomNumber(5, 20);

    const second =
      randomNumber(
        1,
        first
      );

    answer =
      first - second;

    operation =
      `${first} − ${second}`;
  }


  if (level === 3) {
    const isAddition =
      Math.random() > 0.5;

    if (isAddition) {
      const first =
        randomNumber(10, 70);

      const second =
        randomNumber(
          1,
          100 - first
        );

      answer =
        first + second;

      operation =
        `${first} + ${second}`;

    } else {
      const first =
        randomNumber(20, 100);

      const second =
        randomNumber(
          1,
          first
        );

      answer =
        first - second;

      operation =
        `${first} − ${second}`;
    }
  }


  if (level === 4) {
    const first =
      randomNumber(10, 50);

    const second =
      randomNumber(5, 30);

    const third =
      randomNumber(1, 20);

    const useAdditionFirst =
      Math.random() > 0.5;


    if (useAdditionFirst) {
      const temporary =
        first + second;

      answer =
        Math.max(
          0,
          temporary - third
        );

      operation =
        `${first} + ${second} − ${third}`;

    } else {
      const safeFirst =
        Math.max(
          first,
          second
        );

      const safeSecond =
        Math.min(
          first,
          second
        );

      answer =
        safeFirst - safeSecond + third;

      operation =
        `${safeFirst} − ${safeSecond} + ${third}`;
    }
  }


  const wrongAnswers =
    createWrongAnswers(
      answer
    );

  const options =
    shuffleArray([
      answer,
      ...wrongAnswers
    ]);


  return {
    operation,
    answer,
    options,
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


export default function SumasRestas() {
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
              method:
                'POST',

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
        question.answer
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

          setSelectedAnswer(null);

          setIncorrectAnswers([]);

          setFeedback('');

          setLocked(false);
        }, 800);

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
          setSelectedAnswer(null);

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
      <Box className="sums-page">

        <Typography className="sums-loading">
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
    <Box className="sums-page">

      <Box className="sums-header">

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

          className="sums-back-button"
        >
          Volver a Matemática
        </Button>


        <Box className="sums-heading">

          <Typography
            variant="h3"
            component="h1"
            className="sums-title"
          >
            Sumas y Restas
          </Typography>


          <Typography className="sums-subtitle">
            Resolvé las cuentas y superá cada nivel
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

          className="sums-restart-button"
        >
          Reiniciar
        </Button>

      </Box>


      <Box className="sums-controls">

        <Box className="sums-level-control">

          <Typography className="sums-level-label">
            Dificultad
          </Typography>


          <Select
            value={level}

            onChange={
              handleLevelChange
            }

            size="small"

            className="sums-level-select"
          >

            <MenuItem value={1}>
              Nivel 1 - Sumas hasta 20
            </MenuItem>


            <MenuItem
              value={2}
              disabled={
                maxUnlockedLevel < 2
              }
            >
              Nivel 2 - Restas hasta 20
            </MenuItem>


            <MenuItem
              value={3}
              disabled={
                maxUnlockedLevel < 3
              }
            >
              Nivel 3 - Hasta 100
            </MenuItem>


            <MenuItem
              value={4}
              disabled={
                maxUnlockedLevel < 4
              }
            >
              Nivel 4 - Combinadas
            </MenuItem>

          </Select>

        </Box>


        <Box className="sums-stats">

          <Box className="sums-pill">
            Aciertos: {correctAnswers}
          </Box>


          <Box className="sums-pill">
            Errores: {errors}
          </Box>


          <Box className="sums-pill">
            Puntaje: {score}
          </Box>


          <Box className="sums-pill">
            Mejor: {bestScore}
          </Box>

        </Box>

      </Box>


      {progressError && (
        <Box className="sums-login-warning">

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
        <Box className="sums-game-area">

          <Box className="sums-progress-wrapper">

            <Typography className="sums-question-number">
              Pregunta {currentQuestion + 1} de {QUESTIONS_PER_GAME}
            </Typography>


            <LinearProgress
              variant="determinate"
              value={progress}
              className="sums-progress"
            />

          </Box>


          <Box className="sums-question-card">

            <Typography className="sums-level-description">
              {levels[level].description}
            </Typography>


            <Typography className="sums-operation">
              {question.operation}
            </Typography>


            <Typography className="sums-question-text">
              ¿Cuál es el resultado?
            </Typography>


            <Box className="sums-options">

              {question.options.map(
                (option) => {

                  const isWrong =
                    incorrectAnswers.includes(
                      option
                    );


                  const isCorrect =
                    selectedAnswer === option &&
                    option ===
                      question.answer;


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
                        sums-option
                        ${
                          isWrong
                            ? 'sums-option-wrong'
                            : ''
                        }
                        ${
                          isCorrect
                            ? 'sums-option-correct'
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
              className={`sums-feedback ${
                feedback ===
                'Respuesta correcta'
                  ? 'sums-feedback-correct'
                  : feedback
                    ? 'sums-feedback-error'
                    : ''
              }`}
            >
              {feedback}
            </Box>

          </Box>

        </Box>
      )}


      {gameFinished && (
        <Box className="sums-finished">

          <Typography
            variant="h4"
            className="sums-finished-title"
          >
            Nivel completado
          </Typography>


          <Typography className="sums-finished-text">
            Respondiste correctamente las {QUESTIONS_PER_GAME} preguntas.
          </Typography>


          <Typography className="sums-final-score">
            Puntaje: {score} / 100
          </Typography>


          <Typography className="sums-final-errors">
            Errores: {errors}
          </Typography>


          <Box className="sums-finished-actions">

            <Button
              variant="contained"

              onClick={() =>
                startGame()
              }

              className="sums-play-again"
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

                className="sums-next-level"
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