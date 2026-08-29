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

import '../../../styles/matematica/Geometria.css';


const API_URL = 'http://localhost:5000';

const GAME_KEY = 'geometria';

const QUESTIONS_PER_GAME = 10;


const levelInfo = {
  1: {
    label: 'Nivel 1 - Reconocer figuras',
    description: 'Reconocé las figuras geométricas',
  },

  2: {
    label: 'Nivel 2 - Lados y vértices',
    description: 'Contá lados y vértices',
  },

  3: {
    label: 'Nivel 3 - Perímetro',
    description: 'Calculá perímetros simples',
  },

  4: {
    label: 'Nivel 4 - Desafío mixto',
    description: 'Combiná todo lo aprendido',
  },
};


const shapes = [
  {
    name: 'Triángulo',
    sides: 3,
    vertices: 3,
    type: 'triangle',
  },

  {
    name: 'Cuadrado',
    sides: 4,
    vertices: 4,
    type: 'square',
  },

  {
    name: 'Rectángulo',
    sides: 4,
    vertices: 4,
    type: 'rectangle',
  },

  {
    name: 'Pentágono',
    sides: 5,
    vertices: 5,
    type: 'pentagon',
  },

  {
    name: 'Hexágono',
    sides: 6,
    vertices: 6,
    type: 'hexagon',
  },

  {
    name: 'Círculo',
    sides: 0,
    vertices: 0,
    type: 'circle',
  },
];


function randomItem(array) {
  return array[
    Math.floor(
      Math.random() * array.length
    )
  ];
}


function shuffle(array) {
  return [...array].sort(
    () => Math.random() - 0.5
  );
}


function makeOptions(
  correct,
  possibleValues
) {
  const wrongOptions =
    shuffle(
      possibleValues.filter(
        (value) =>
          String(value) !==
          String(correct)
      )
    ).slice(0, 3);

  return shuffle([
    String(correct),
    ...wrongOptions.map(String),
  ]);
}


function ShapeVisual({
  type
}) {
  return (
    <Box
      className={`geometry-shape geometry-${type}`}
    />
  );
}


function createLevel1Question() {
  const shape =
    randomItem(shapes);

  const names =
    shapes.map(
      (item) => item.name
    );

  return {
    type: 'identify',

    question:
      '¿Qué figura es esta?',

    shapeType:
      shape.type,

    correctAnswer:
      shape.name,

    options:
      makeOptions(
        shape.name,
        names
      ),
  };
}


function createLevel2Question() {
  const availableShapes =
    shapes.filter(
      (shape) =>
        shape.type !== 'circle'
    );

  const shape =
    randomItem(
      availableShapes
    );

  const askSides =
    Math.random() > 0.5;

  const correct =
    askSides
      ? shape.sides
      : shape.vertices;

  return {
    type: 'properties',

    question:
      askSides
        ? `¿Cuántos lados tiene un ${shape.name.toLowerCase()}?`
        : `¿Cuántos vértices tiene un ${shape.name.toLowerCase()}?`,

    shapeType:
      shape.type,

    correctAnswer:
      String(correct),

    options:
      makeOptions(
        correct,
        [3, 4, 5, 6]
      ),
  };
}


function createLevel3Question() {
  const squareQuestion =
    Math.random() > 0.5;

  if (squareQuestion) {
    const side =
      Math.floor(
        Math.random() * 8
      ) + 2;

    const perimeter =
      side * 4;

    return {
      type: 'perimeter',

      question:
        `Un cuadrado tiene lados de ${side} cm. ¿Cuál es su perímetro?`,

      shapeType:
        'square',

      detail:
        `Lado: ${side} cm`,

      correctAnswer:
        String(perimeter),

      options:
        makeOptions(
          perimeter,
          [
            perimeter + 4,
            perimeter - 4,
            side * 2,
            side * 3,
            perimeter + 8,
          ]
        ),
    };
  }


  const width =
    Math.floor(
      Math.random() * 7
    ) + 3;

  const height =
    Math.floor(
      Math.random() * 6
    ) + 2;

  const perimeter =
    2 * (
      width + height
    );

  return {
    type: 'perimeter',

    question:
      `Un rectángulo mide ${width} cm de largo y ${height} cm de alto. ¿Cuál es su perímetro?`,

    shapeType:
      'rectangle',

    detail:
      `${width} cm × ${height} cm`,

    correctAnswer:
      String(perimeter),

    options:
      makeOptions(
        perimeter,
        [
          width + height,
          width * height,
          perimeter + 2,
          perimeter - 2,
          perimeter + 4,
        ]
      ),
  };
}


function createLevel4Question() {
  const questionType =
    Math.floor(
      Math.random() * 3
    );

  if (questionType === 0) {
    return createLevel1Question();
  }

  if (questionType === 1) {
    return createLevel2Question();
  }

  return createLevel3Question();
}


function createQuestion(level) {
  if (level === 1) {
    return createLevel1Question();
  }

  if (level === 2) {
    return createLevel2Question();
  }

  if (level === 3) {
    return createLevel3Question();
  }

  return createLevel4Question();
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


export default function Geometria() {
  const navigate =
    useNavigate();


  const [
    level,
    setLevel
  ] = useState(1);


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


  /*
    Acá sí penalizamos errores.

    Si no, como puede volver a intentar,
    siempre terminaría con 100.
  */

  const score =
    Math.max(
      0,
      100 - errors * 5
    );


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
        String(answer) ===
        String(
          question.correctAnswer
        )
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
          setSelectedAnswer(
            null
          );

          setFeedback('');

        }, 650);
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
      <Box className="geometry-page">

        <Typography className="geometry-loading">
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
    <Box className="geometry-page">

      <Box className="geometry-header">

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

          className="geometry-back-button"
        >
          Volver a Matemática
        </Button>


        <Box className="geometry-heading">

          <Typography
            variant="h3"
            component="h1"
            className="geometry-title"
          >
            Geometría
          </Typography>


          <Typography className="geometry-subtitle">
            Aprendé jugando con figuras, lados y perímetros
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

          className="geometry-restart-button"
        >
          Reiniciar
        </Button>

      </Box>


      <Box className="geometry-controls">

        <Box className="geometry-level-control">

          <Typography className="geometry-level-label">
            Dificultad
          </Typography>


          <Select
            value={level}

            onChange={
              handleLevelChange
            }

            size="small"

            className="geometry-level-select"
          >

            <MenuItem value={1}>
              Nivel 1 - Figuras
            </MenuItem>


            <MenuItem
              value={2}
              disabled={
                maxUnlockedLevel < 2
              }
            >
              Nivel 2 - Lados y vértices
            </MenuItem>


            <MenuItem
              value={3}
              disabled={
                maxUnlockedLevel < 3
              }
            >
              Nivel 3 - Perímetros
            </MenuItem>


            <MenuItem
              value={4}
              disabled={
                maxUnlockedLevel < 4
              }
            >
              Nivel 4 - Mixto
            </MenuItem>

          </Select>

        </Box>


        <Box className="geometry-stats">

          <Box className="geometry-pill">
            Aciertos: {correctAnswers}
          </Box>


          <Box className="geometry-pill">
            Errores: {errors}
          </Box>


          <Box className="geometry-pill">
            Puntaje: {score}
          </Box>


          <Box className="geometry-pill">
            Mejor: {bestScore}
          </Box>

        </Box>

      </Box>


      {progressError && (
        <Box className="geometry-login-warning">

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
        <Box className="geometry-game-area">

          <Box className="geometry-progress-wrapper">

            <Typography className="geometry-question-number">
              Pregunta {currentQuestion + 1} de {QUESTIONS_PER_GAME}
            </Typography>


            <LinearProgress
              variant="determinate"

              value={progress}

              className="geometry-progress"
            />

          </Box>


          <Box className="geometry-question-card">

            <Typography className="geometry-level-description">
              {levelInfo[level].description}
            </Typography>


            <Typography className="geometry-question-text">
              {question.question}
            </Typography>


            <Box className="geometry-visual-area">

              <ShapeVisual
                type={
                  question.shapeType
                }
              />


              {question.detail && (
                <Typography className="geometry-detail">
                  {question.detail}
                </Typography>
              )}

            </Box>


            <Box className="geometry-options">

              {question.options.map(
                (option) => {

                  const isWrong =
                    incorrectAnswers.includes(
                      option
                    );


                  const isCorrect =
                    selectedAnswer === option &&
                    String(option) ===
                    String(
                      question.correctAnswer
                    );


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
                        geometry-option

                        ${
                          isWrong
                            ? 'geometry-option-wrong'
                            : ''
                        }

                        ${
                          isCorrect
                            ? 'geometry-option-correct'
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
              className={`geometry-feedback ${
                feedback ===
                'Respuesta correcta'
                  ? 'geometry-feedback-correct'
                  : feedback
                    ? 'geometry-feedback-error'
                    : ''
              }`}
            >
              {feedback}
            </Box>

          </Box>

        </Box>
      )}


      {gameFinished && (
        <Box className="geometry-finished">

          <Typography
            variant="h4"
            className="geometry-finished-title"
          >
            Nivel completado
          </Typography>


          <Typography className="geometry-finished-text">
            Terminaste las {QUESTIONS_PER_GAME} preguntas.
          </Typography>


          <Typography className="geometry-final-score">
            Puntaje: {score} / 100
          </Typography>


          <Typography className="geometry-final-errors">
            Errores: {errors}
          </Typography>


          <Box className="geometry-finished-actions">

            <Button
              variant="contained"

              onClick={() =>
                startGame()
              }

              className="geometry-play-again"
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

                className="geometry-next-level"
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