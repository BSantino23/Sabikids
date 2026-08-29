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

import '../../../styles/matematica/FraccionesVisuales.css';


const API_URL = 'http://localhost:5000';
const GAME_KEY = 'fracciones_visuales';
const QUESTIONS_PER_GAME = 10;


const levels = {
  1: {
    name: 'Nivel 1',
    description: 'Mitades y cuartos',
    fractions: [
      { numerator: 1, denominator: 2 },
      { numerator: 1, denominator: 4 },
      { numerator: 2, denominator: 4 },
      { numerator: 3, denominator: 4 },
    ],
  },

  2: {
    name: 'Nivel 2',
    description: 'Tercios y sextos',
    fractions: [
      { numerator: 1, denominator: 3 },
      { numerator: 2, denominator: 3 },
      { numerator: 1, denominator: 6 },
      { numerator: 2, denominator: 6 },
      { numerator: 3, denominator: 6 },
      { numerator: 5, denominator: 6 },
    ],
  },

  3: {
    name: 'Nivel 3',
    description: 'Quintos y octavos',
    fractions: [
      { numerator: 1, denominator: 5 },
      { numerator: 2, denominator: 5 },
      { numerator: 3, denominator: 5 },
      { numerator: 4, denominator: 5 },
      { numerator: 1, denominator: 8 },
      { numerator: 3, denominator: 8 },
      { numerator: 5, denominator: 8 },
      { numerator: 7, denominator: 8 },
    ],
  },

  4: {
    name: 'Nivel 4',
    description: 'Fracciones mezcladas',
    fractions: [
      { numerator: 1, denominator: 2 },
      { numerator: 2, denominator: 3 },
      { numerator: 3, denominator: 4 },
      { numerator: 4, denominator: 5 },
      { numerator: 5, denominator: 6 },
      { numerator: 3, denominator: 8 },
      { numerator: 7, denominator: 8 },
      { numerator: 2, denominator: 5 },
    ],
  },
};


function randomItem(array) {
  return array[
    Math.floor(
      Math.random() * array.length
    )
  ];
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


function fractionToText(
  numerator,
  denominator
) {
  return `${numerator}/${denominator}`;
}


function createWrongAnswers(
  correctFraction
) {
  const answers = new Set();

  const denominator =
    correctFraction.denominator;

  const numerator =
    correctFraction.numerator;


  while (answers.size < 3) {
    let wrongNumerator =
      Math.floor(
        Math.random() * denominator
      ) + 1;

    let wrongDenominator =
      denominator;


    if (
      Math.random() > 0.55
    ) {
      const possibleDenominators =
        [2, 3, 4, 5, 6, 8].filter(
          (value) =>
            value !== denominator
        );

      wrongDenominator =
        randomItem(
          possibleDenominators
        );

      wrongNumerator =
        Math.floor(
          Math.random() *
          wrongDenominator
        ) + 1;
    }


    const text =
      fractionToText(
        wrongNumerator,
        wrongDenominator
      );


    if (
      text !==
      fractionToText(
        numerator,
        denominator
      )
    ) {
      answers.add(text);
    }
  }


  return [...answers];
}


function createQuestion(level) {
  const selectedFraction =
    randomItem(
      levels[level].fractions
    );


  const correctAnswer =
    fractionToText(
      selectedFraction.numerator,
      selectedFraction.denominator
    );


  const wrongAnswers =
    createWrongAnswers(
      selectedFraction
    );


  return {
    ...selectedFraction,

    correctAnswer,

    options:
      shuffleArray([
        correctAnswer,
        ...wrongAnswers,
      ]),
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


function FractionCircle({
  numerator,
  denominator
}) {
  const radius = 84;
  const center = 100;


  const createSlicePath = (
    index
  ) => {
    const startAngle =
      (
        index /
        denominator
      ) *
        Math.PI *
        2 -
      Math.PI / 2;


    const endAngle =
      (
        (index + 1) /
        denominator
      ) *
        Math.PI *
        2 -
      Math.PI / 2;


    const startX =
      center +
      radius *
        Math.cos(
          startAngle
        );


    const startY =
      center +
      radius *
        Math.sin(
          startAngle
        );


    const endX =
      center +
      radius *
        Math.cos(
          endAngle
        );


    const endY =
      center +
      radius *
        Math.sin(
          endAngle
        );


    return `
      M ${center} ${center}
      L ${startX} ${startY}
      A ${radius} ${radius}
      0 0 1
      ${endX} ${endY}
      Z
    `;
  };


  return (
    <svg
      className="fraction-svg"
      viewBox="0 0 200 200"
      role="img"
      aria-label={`${numerator} de ${denominator} partes coloreadas`}
    >
      {Array.from(
        {
          length:
            denominator
        },

        (_, index) => (
          <path
            key={index}

            d={
              createSlicePath(
                index
              )
            }

            className={
              index < numerator
                ? 'fraction-slice fraction-slice-filled'
                : 'fraction-slice'
            }
          />
        )
      )}

      <circle
        cx="100"
        cy="100"
        r="84"
        className="fraction-outline"
      />
    </svg>
  );
}


export default function FraccionesVisuales() {
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
      <Box className="fractions-page">

        <Typography className="fractions-loading">
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
    <Box className="fractions-page">

      <Box className="fractions-header">

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

          className="fractions-back-button"
        >
          Volver a Matemática
        </Button>


        <Box className="fractions-heading">

          <Typography
            variant="h3"
            component="h1"
            className="fractions-title"
          >
            Fracciones Visuales
          </Typography>


          <Typography className="fractions-subtitle">
            Mirá la figura y elegí la fracción correcta
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

          className="fractions-restart-button"
        >
          Reiniciar
        </Button>

      </Box>


      <Box className="fractions-controls">

        <Box className="fractions-level-control">

          <Typography className="fractions-level-label">
            Dificultad
          </Typography>


          <Select
            value={level}

            onChange={
              handleLevelChange
            }

            size="small"

            className="fractions-level-select"
          >

            <MenuItem value={1}>
              Nivel 1 - Mitades y cuartos
            </MenuItem>


            <MenuItem
              value={2}
              disabled={
                maxUnlockedLevel < 2
              }
            >
              Nivel 2 - Tercios y sextos
            </MenuItem>


            <MenuItem
              value={3}
              disabled={
                maxUnlockedLevel < 3
              }
            >
              Nivel 3 - Quintos y octavos
            </MenuItem>


            <MenuItem
              value={4}
              disabled={
                maxUnlockedLevel < 4
              }
            >
              Nivel 4 - Mezcladas
            </MenuItem>

          </Select>

        </Box>


        <Box className="fractions-stats">

          <Box className="fractions-pill">
            Aciertos: {correctAnswers}
          </Box>


          <Box className="fractions-pill">
            Errores: {errors}
          </Box>


          <Box className="fractions-pill">
            Puntaje: {score}
          </Box>


          <Box className="fractions-pill">
            Mejor: {bestScore}
          </Box>

        </Box>

      </Box>


      {progressError && (
        <Box className="fractions-login-warning">

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
        <Box className="fractions-game-area">

          <Box className="fractions-progress-wrapper">

            <Typography className="fractions-question-number">
              Pregunta {currentQuestion + 1} de {QUESTIONS_PER_GAME}
            </Typography>


            <LinearProgress
              variant="determinate"
              value={progress}
              className="fractions-progress"
            />

          </Box>


          <Box className="fractions-question-card">

            <Typography className="fractions-level-description">
              {levels[level].description}
            </Typography>


            <Box className="fraction-visual-container">

              <FractionCircle
                numerator={
                  question.numerator
                }

                denominator={
                  question.denominator
                }
              />

            </Box>


            <Typography className="fractions-question-text">
              ¿Qué fracción está coloreada?
            </Typography>


            <Box className="fractions-options">

              {question.options.map(
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
                        fractions-option
                        ${
                          isWrong
                            ? 'fractions-option-wrong'
                            : ''
                        }
                        ${
                          isCorrect
                            ? 'fractions-option-correct'
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
              className={`fractions-feedback ${
                feedback ===
                'Respuesta correcta'
                  ? 'fractions-feedback-correct'
                  : feedback
                    ? 'fractions-feedback-error'
                    : ''
              }`}
            >
              {feedback}
            </Box>

          </Box>

        </Box>
      )}


      {gameFinished && (
        <Box className="fractions-finished">

          <Typography
            variant="h4"
            className="fractions-finished-title"
          >
            Nivel completado
          </Typography>


          <Typography className="fractions-finished-text">
            Completaste las {QUESTIONS_PER_GAME} fracciones.
          </Typography>


          <Typography className="fractions-final-score">
            Puntaje: {score} / 100
          </Typography>


          <Typography className="fractions-final-errors">
            Errores: {errors}
          </Typography>


          <Box className="fractions-finished-actions">

            <Button
              variant="contained"

              onClick={() =>
                startGame()
              }

              className="fractions-play-again"
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

                className="fractions-next-level"
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