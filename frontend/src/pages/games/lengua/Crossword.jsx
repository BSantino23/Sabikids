import React, {
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  Box,
  Button,
  Typography,
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RefreshIcon from '@mui/icons-material/Refresh';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

import { useNavigate } from 'react-router-dom';

import '../../../styles/lengua/Crossword.css';


/* =========================================================
   DIFICULTADES
========================================================= */

const DIFFICULTIES = {
  easy: {
    label: 'Fácil',
    words: 3,
    gridSize: 12,
    hints: 3,
  },

  medium: {
    label: 'Medio',
    words: 6,
    gridSize: 15,
    hints: 3,
  },

  hard: {
    label: 'Difícil',
    words: 9,
    gridSize: 18,
    hints: 2,
  },
};


/* =========================================================
   REGLAS ORTOGRÁFICAS
========================================================= */

const LEARNING_RULES = {
  cion: {
    id: 'cion',

    title: 'Terminación -ción',

    short:
      'Las palabras terminadas en -ción se escriben con C.',

    explanation:
      'Muchas palabras que expresan una acción o el resultado de una acción terminan en -ción.',

    examples:
      'educación · protección · información',
  },

  bilidad: {
    id: 'bilidad',

    title: 'Terminación -bilidad',

    short:
      'La terminación -bilidad se escribe con B.',

    explanation:
      'Muchas palabras que expresan una cualidad terminan en -bilidad.',

    examples:
      'amabilidad · posibilidad · sensibilidad',
  },

  sub: {
    id: 'sub',

    title: 'Prefijo sub-',

    short:
      'El prefijo sub- se escribe con B.',

    explanation:
      'Sub- suele indicar que algo está debajo, pertenece a una parte menor o está en un nivel inferior.',

    examples:
      'submarino · subsuelo · subtítulo',
  },
};


/* =========================================================
   BANCO DE PALABRAS
========================================================= */

const WORD_BANK = [

  /* =======================================================
     TERMINACIÓN -CIÓN
  ======================================================= */

  {
    word: 'CANCION',
    clue:
      'Composición musical que generalmente tiene letra.',
    family: 'cion',
  },

  {
    word: 'NACION',
    clue:
      'Conjunto de personas que comparten un territorio y una historia.',
    family: 'cion',
  },

  {
    word: 'ACCION',
    clue:
      'Algo que una persona realiza o hace.',
    family: 'cion',
  },

  {
    word: 'FUNCION',
    clue:
      'Tarea o actividad que cumple algo o alguien.',
    family: 'cion',
  },

  {
    word: 'OPCION',
    clue:
      'Una posibilidad entre varias alternativas.',
    family: 'cion',
  },

  {
    word: 'SOLUCION',
    clue:
      'Respuesta que permite resolver un problema.',
    family: 'cion',
  },

  {
    word: 'ATENCION',
    clue:
      'Capacidad de concentrarse en algo.',
    family: 'cion',
  },

  {
    word: 'DIRECCION',
    clue:
      'Lugar hacia donde se dirige algo.',
    family: 'cion',
  },

  {
    word: 'PROTECCION',
    clue:
      'Acción de cuidar o defender algo.',
    family: 'cion',
  },

  {
    word: 'EDUCACION',
    clue:
      'Proceso mediante el cual aprendemos conocimientos y valores.',
    family: 'cion',
  },

  {
    word: 'INFORMACION',
    clue:
      'Conjunto de datos que comunican algo.',
    family: 'cion',
  },

  {
    word: 'OPERACION',
    clue:
      'Conjunto de acciones realizadas para conseguir un resultado.',
    family: 'cion',
  },

  {
    word: 'CREACION',
    clue:
      'Acción de producir o inventar algo nuevo.',
    family: 'cion',
  },

  {
    word: 'CELEBRACION',
    clue:
      'Reunión o actividad realizada para festejar algo.',
    family: 'cion',
  },

  {
    word: 'EXPLICACION',
    clue:
      'Información que ayuda a comprender algo.',
    family: 'cion',
  },

  {
    word: 'ORGANIZACION',
    clue:
      'Forma ordenada de distribuir tareas, objetos o personas.',
    family: 'cion',
  },

  {
    word: 'COMUNICACION',
    clue:
      'Intercambio de información entre personas.',
    family: 'cion',
  },

  {
    word: 'IMAGINACION',
    clue:
      'Capacidad de crear ideas o imágenes en la mente.',
    family: 'cion',
  },

  {
    word: 'INVITACION',
    clue:
      'Mensaje utilizado para pedirle a alguien que participe de algo.',
    family: 'cion',
  },

  {
    word: 'UBICACION',
    clue:
      'Lugar donde se encuentra una persona o una cosa.',
    family: 'cion',
  },


  /* =======================================================
     TERMINACIÓN -BILIDAD
  ======================================================= */

  {
    word: 'HABILIDAD',
    clue:
      'Capacidad para realizar algo correctamente.',
    family: 'bilidad',
  },

  {
    word: 'AMABILIDAD',
    clue:
      'Forma respetuosa y agradable de tratar a los demás.',
    family: 'bilidad',
  },

  {
    word: 'DEBILIDAD',
    clue:
      'Falta de fuerza o resistencia.',
    family: 'bilidad',
  },

  {
    word: 'POSIBILIDAD',
    clue:
      'Situación que puede llegar a suceder.',
    family: 'bilidad',
  },

  {
    word: 'ESTABILIDAD',
    clue:
      'Capacidad de mantenerse firme o sin grandes cambios.',
    family: 'bilidad',
  },

  {
    word: 'SENSIBILIDAD',
    clue:
      'Capacidad de percibir o sentir algo.',
    family: 'bilidad',
  },

  {
    word: 'PROBABILIDAD',
    clue:
      'Posibilidad de que ocurra un determinado hecho.',
    family: 'bilidad',
  },

  {
    word: 'FLEXIBILIDAD',
    clue:
      'Capacidad para adaptarse o doblarse con facilidad.',
    family: 'bilidad',
  },

  {
    word: 'VISIBILIDAD',
    clue:
      'Condición de aquello que puede verse.',
    family: 'bilidad',
  },

  {
    word: 'COMPATIBILIDAD',
    clue:
      'Capacidad de dos cosas para funcionar correctamente juntas.',
    family: 'bilidad',
  },


  /* =======================================================
     PREFIJO SUB-
  ======================================================= */

  {
    word: 'SUBMARINO',
    clue:
      'Vehículo capaz de desplazarse debajo del agua.',
    family: 'sub',
  },

  {
    word: 'SUBTITULO',
    clue:
      'Texto que aparece debajo de un título principal.',
    family: 'sub',
  },

  {
    word: 'SUBSUELO',
    clue:
      'Parte de una construcción ubicada debajo del nivel del suelo.',
    family: 'sub',
  },

  {
    word: 'SUBRAYAR',
    clue:
      'Marcar una palabra colocando una línea debajo.',
    family: 'sub',
  },

  {
    word: 'SUBGRUPO',
    clue:
      'Grupo más pequeño que pertenece a otro mayor.',
    family: 'sub',
  },

  {
    word: 'SUBCLASE',
    clue:
      'Clase más específica que pertenece a una categoría mayor.',
    family: 'sub',
  },

  {
    word: 'SUBREGION',
    clue:
      'Parte más pequeña que pertenece a una región.',
    family: 'sub',
  },

  {
    word: 'SUBTEMA',
    clue:
      'Tema más pequeño incluido dentro de otro principal.',
    family: 'sub',
  },

  {
    word: 'SUBDIVISION',
    clue:
      'Parte que resulta de dividir algo en secciones menores.',
    family: 'sub',
  },

  {
    word: 'SUBCAMPEON',
    clue:
      'Persona o equipo que termina en segundo lugar en una competencia.',
    family: 'sub',
  },

  {
    word: 'SUBDIRECTOR',
    clue:
      'Persona que ocupa un cargo inmediatamente inferior al director.',
    family: 'sub',
  },

  {
    word: 'SUBCONJUNTO',
    clue:
      'Conjunto cuyos elementos pertenecen a otro conjunto mayor.',
    family: 'sub',
  },

  {
    word: 'SUBPRODUCTO',
    clue:
      'Producto secundario obtenido durante la elaboración de otro.',
    family: 'sub',
  },

];


/* =========================================================
   FUNCIONES AUXILIARES
========================================================= */

function shuffle(array) {
  return [...array].sort(
    () => Math.random() - 0.5
  );
}


function getCellKey(row, col) {
  return `${row}-${col}`;
}


/* =========================================================
   VALIDAR POSICIÓN
========================================================= */

function canPlaceWord(
  grid,
  word,
  row,
  col,
  direction,
  gridSize
) {
  for (
    let index = 0;
    index < word.length;
    index++
  ) {
    const currentRow =
      direction === 'vertical'
        ? row + index
        : row;

    const currentCol =
      direction === 'horizontal'
        ? col + index
        : col;

    if (
      currentRow < 0 ||
      currentCol < 0 ||
      currentRow >= gridSize ||
      currentCol >= gridSize
    ) {
      return false;
    }

    const cell =
      grid[currentRow][currentCol];

    if (
      cell &&
      cell.letter !== word[index]
    ) {
      return false;
    }
  }

  return true;
}


/* =========================================================
   COLOCAR PALABRA
========================================================= */

function placeWord(
  grid,
  item,
  row,
  col,
  direction,
  number
) {
  const positions = [];

  for (
    let index = 0;
    index < item.word.length;
    index++
  ) {
    const currentRow =
      direction === 'vertical'
        ? row + index
        : row;

    const currentCol =
      direction === 'horizontal'
        ? col + index
        : col;

    if (!grid[currentRow][currentCol]) {
      grid[currentRow][currentCol] = {
        letter: item.word[index],
        numbers: [],
      };
    }

    if (index === 0) {
      grid[currentRow][currentCol]
        .numbers
        .push(number);
    }

    positions.push({
      row: currentRow,
      col: currentCol,
    });
  }

  return {
    ...item,
    number,
    row,
    col,
    direction,
    positions,
  };
}


/* =========================================================
   GENERAR CRUCIGRAMA
========================================================= */

function generateCrossword(difficulty) {
  const config =
    DIFFICULTIES[difficulty];

  const gridSize =
    config.gridSize;

  const grid =
    Array.from(
      { length: gridSize },
      () =>
        Array(gridSize).fill(null)
    );

  const selectedWords =
    shuffle(WORD_BANK)
      .slice(
        0,
        config.words
      )
      .sort(
        (a, b) =>
          b.word.length -
          a.word.length
      );

  const placedWords = [];

  const first =
    selectedWords[0];

  const firstRow =
    Math.floor(
      gridSize / 2
    );

  const firstCol =
    Math.max(
      0,
      Math.floor(
        (
          gridSize -
          first.word.length
        ) / 2
      )
    );

  placedWords.push(
    placeWord(
      grid,
      first,
      firstRow,
      firstCol,
      'horizontal',
      1
    )
  );

  for (
    let wordIndex = 1;
    wordIndex <
    selectedWords.length;
    wordIndex++
  ) {
    const item =
      selectedWords[
        wordIndex
      ];

    let placed =
      false;

    const existingCells =
      [];

    for (
      let row = 0;
      row < gridSize;
      row++
    ) {
      for (
        let col = 0;
        col < gridSize;
        col++
      ) {
        if (
          grid[row][col]
        ) {
          existingCells.push({
            row,
            col,

            letter:
              grid[row][col]
                .letter,
          });
        }
      }
    }

    for (
      const cell
      of shuffle(
        existingCells
      )
    ) {
      if (placed) {
        break;
      }

      for (
        let letterIndex = 0;
        letterIndex <
        item.word.length;
        letterIndex++
      ) {
        if (
          item.word[
            letterIndex
          ] !==
          cell.letter
        ) {
          continue;
        }

        for (
          const direction
          of shuffle([
            'horizontal',
            'vertical',
          ])
        ) {
          let startRow =
            cell.row;

          let startCol =
            cell.col;

          if (
            direction ===
            'horizontal'
          ) {
            startCol -=
              letterIndex;
          }

          if (
            direction ===
            'vertical'
          ) {
            startRow -=
              letterIndex;
          }

          if (
            canPlaceWord(
              grid,
              item.word,
              startRow,
              startCol,
              direction,
              gridSize
            )
          ) {
            placedWords.push(
              placeWord(
                grid,
                item,
                startRow,
                startCol,
                direction,
                placedWords.length +
                  1
              )
            );

            placed =
              true;

            break;
          }
        }

        if (placed) {
          break;
        }
      }
    }

    if (!placed) {
      for (
        let row = 0;
        row < gridSize;
        row++
      ) {
        if (placed) {
          break;
        }

        for (
          let col = 0;
          col < gridSize;
          col++
        ) {
          for (
            const direction
            of [
              'horizontal',
              'vertical',
            ]
          ) {
            if (
              canPlaceWord(
                grid,
                item.word,
                row,
                col,
                direction,
                gridSize
              )
            ) {
              placedWords.push(
                placeWord(
                  grid,
                  item,
                  row,
                  col,
                  direction,
                  placedWords.length +
                    1
                )
              );

              placed =
                true;

              break;
            }
          }

          if (placed) {
            break;
          }
        }
      }
    }
  }

  return {
    grid,
    words:
      placedWords,
    gridSize,
  };
}


/* =========================================================
   RECORTAR TABLERO
========================================================= */

function getGridBounds(grid) {
  let minRow =
    Infinity;

  let maxRow =
    -Infinity;

  let minCol =
    Infinity;

  let maxCol =
    -Infinity;

  grid.forEach(
    (
      row,
      rowIndex
    ) => {
      row.forEach(
        (
          cell,
          colIndex
        ) => {
          if (!cell) {
            return;
          }

          minRow =
            Math.min(
              minRow,
              rowIndex
            );

          maxRow =
            Math.max(
              maxRow,
              rowIndex
            );

          minCol =
            Math.min(
              minCol,
              colIndex
            );

          maxCol =
            Math.max(
              maxCol,
              colIndex
            );
        }
      );
    }
  );

  if (
    minRow === Infinity
  ) {
    return {
      minRow: 0,
      maxRow: 0,
      minCol: 0,
      maxCol: 0,
    };
  }

  const margin = 1;

  return {
    minRow:
      Math.max(
        0,
        minRow - margin
      ),

    maxRow:
      Math.min(
        grid.length - 1,
        maxRow + margin
      ),

    minCol:
      Math.max(
        0,
        minCol - margin
      ),

    maxCol:
      Math.min(
        grid[0].length -
          1,
        maxCol + margin
      ),
  };
}


/* =========================================================
   OBTENER REGLAS DEL CRUCIGRAMA ACTUAL
========================================================= */

function getPuzzleRules(words) {
  const families =
    new Set(
      words.map(
        word =>
          word.family
      )
    );

  return Array.from(
    families
  )
    .map(
      family =>
        LEARNING_RULES[
          family
        ]
    )
    .filter(Boolean);
}


/* =========================================================
   COMPONENTE
========================================================= */

export default function Crossword() {
  const navigate =
    useNavigate();

  const inputRefs =
    useRef({});

  const [
    difficulty,
    setDifficulty,
  ] =
    useState('easy');

  const [
    gameId,
    setGameId,
  ] =
    useState(0);

  const puzzle =
    useMemo(
      () =>
        generateCrossword(
          difficulty
        ),
      [
        difficulty,
        gameId,
      ]
    );

  const puzzleRules =
    useMemo(
      () =>
        getPuzzleRules(
          puzzle.words
        ),
      [puzzle]
    );

  const bounds =
    useMemo(
      () =>
        getGridBounds(
          puzzle.grid
        ),
      [puzzle]
    );

  const visibleRows =
    useMemo(
      () =>
        puzzle.grid.slice(
          bounds.minRow,
          bounds.maxRow + 1
        ),
      [
        puzzle,
        bounds,
      ]
    );

  const visibleColumnCount =
    bounds.maxCol -
    bounds.minCol +
    1;

  const [
    answers,
    setAnswers,
  ] =
    useState({});

  const [
    hintedCells,
    setHintedCells,
  ] =
    useState({});

  const [
    checked,
    setChecked,
  ] =
    useState(false);

  const [
    completed,
    setCompleted,
  ] =
    useState(false);

  const [
    message,
    setMessage,
  ] =
    useState(
      'Leé las pistas y completá las palabras.'
    );

  const [
    hintsRemaining,
    setHintsRemaining,
  ] =
    useState(
      DIFFICULTIES
        .easy
        .hints
    );


  /* =======================================================
     ENFOCAR CASILLERO
  ======================================================= */

  const focusCell = (
    row,
    col
  ) => {
    const key =
      getCellKey(
        row,
        col
      );

    const input =
      inputRefs.current[
        key
      ];

    if (input) {
      input.focus();
      input.select();

      return true;
    }

    return false;
  };


  /* =======================================================
     BUSCAR CASILLERO CON FLECHAS
  ======================================================= */

  const findNextCell = (
    row,
    col,
    rowStep,
    colStep
  ) => {
    let currentRow =
      row + rowStep;

    let currentCol =
      col + colStep;

    while (
      currentRow >=
        bounds.minRow &&
      currentRow <=
        bounds.maxRow &&
      currentCol >=
        bounds.minCol &&
      currentCol <=
        bounds.maxCol
    ) {
      if (
        puzzle.grid[
          currentRow
        ][
          currentCol
        ]
      ) {
        return {
          row:
            currentRow,

          col:
            currentCol,
        };
      }

      currentRow +=
        rowStep;

      currentCol +=
        colStep;
    }

    return null;
  };


  /* =======================================================
     TECLADO
  ======================================================= */

  const handleKeyDown = (
    event,
    row,
    col
  ) => {
    const movements = {
      ArrowUp:
        [-1, 0],

      ArrowDown:
        [1, 0],

      ArrowLeft:
        [0, -1],

      ArrowRight:
        [0, 1],
    };

    if (
      movements[
        event.key
      ]
    ) {
      event.preventDefault();

      const [
        rowStep,
        colStep,
      ] =
        movements[
          event.key
        ];

      const next =
        findNextCell(
          row,
          col,
          rowStep,
          colStep
        );

      if (next) {
        focusCell(
          next.row,
          next.col
        );
      }

      return;
    }

    const key =
      getCellKey(
        row,
        col
      );

    if (
      hintedCells[
        key
      ]
    ) {
      if (
        event.key !==
          'Tab' &&
        !event.key
          .startsWith(
            'Arrow'
          )
      ) {
        event
          .preventDefault();
      }
    }
  };


  /* =======================================================
     CAMBIAR DIFICULTAD
  ======================================================= */

  const changeDifficulty = (
    newDifficulty
  ) => {
    setDifficulty(
      newDifficulty
    );

    setAnswers({});

    setHintedCells({});

    setChecked(false);

    setCompleted(false);

    setHintsRemaining(
      DIFFICULTIES[
        newDifficulty
      ].hints
    );

    setMessage(
      'Leé las pistas y completá las palabras.'
    );

    setGameId(
      previous =>
        previous + 1
    );
  };


  /* =======================================================
     NUEVO JUEGO
  ======================================================= */

  const newGame = () => {
    setAnswers({});

    setHintedCells({});

    setChecked(false);

    setCompleted(false);

    setHintsRemaining(
      DIFFICULTIES[
        difficulty
      ].hints
    );

    setMessage(
      '¡Nuevo crucigrama generado!'
    );

    setGameId(
      previous =>
        previous + 1
    );
  };


  /* =======================================================
     ESCRIBIR
  ======================================================= */

  const handleChange = (
    row,
    col,
    value
  ) => {
    const key =
      getCellKey(
        row,
        col
      );

    if (
      hintedCells[
        key
      ]
    ) {
      return;
    }

    const cleanValue =
      value
        .toUpperCase()
        .replace(
          /[^A-ZÑ]/g,
          ''
        )
        .slice(-1);

    setAnswers(
      previous => ({
        ...previous,

        [key]:
          cleanValue,
      })
    );

    setChecked(false);

    setCompleted(false);
  };


  /* =======================================================
     PALABRAS COMPLETADAS
  ======================================================= */

  const completedWords =
    puzzle.words.filter(
      item =>
        item.positions
          .every(
            position => {
              const key =
                getCellKey(
                  position.row,
                  position.col
                );

              return (
                answers[
                  key
                ] ===
                puzzle.grid[
                  position.row
                ][
                  position.col
                ].letter
              );
            }
          )
    ).length;


  /* =======================================================
     COMPROBAR
  ======================================================= */

  const handleCheck = () => {
    let allCorrect =
      true;

    for (
      let row = 0;
      row <
      puzzle.gridSize;
      row++
    ) {
      for (
        let col = 0;
        col <
        puzzle.gridSize;
        col++
      ) {
        const cell =
          puzzle.grid[
            row
          ][col];

        if (!cell) {
          continue;
        }

        const key =
          getCellKey(
            row,
            col
          );

        if (
          answers[
            key
          ] !==
          cell.letter
        ) {
          allCorrect =
            false;
        }
      }
    }

    setChecked(true);

    if (allCorrect) {
      setCompleted(true);

      setMessage(
        '🎉 ¡Excelente! Completaste todo el crucigrama.'
      );
    } else {
      setCompleted(false);

      setMessage(
        'Todavía hay letras incorrectas o casilleros vacíos.'
      );
    }
  };


  /* =======================================================
     REVELAR LETRA
  ======================================================= */

  const revealLetter = () => {
    if (
      hintsRemaining <= 0
    ) {
      setMessage(
        'Ya utilizaste todas las pistas disponibles.'
      );

      return;
    }

    const available =
      [];

    puzzle.grid.forEach(
      (
        row,
        rowIndex
      ) => {
        row.forEach(
          (
            cell,
            colIndex
          ) => {
            if (!cell) {
              return;
            }

            const key =
              getCellKey(
                rowIndex,
                colIndex
              );

            if (
              answers[
                key
              ] !==
              cell.letter
            ) {
              available.push({
                row:
                  rowIndex,

                col:
                  colIndex,

                letter:
                  cell.letter,
              });
            }
          }
        );
      }
    );

    if (
      available.length ===
      0
    ) {
      return;
    }

    const selected =
      available[
        Math.floor(
          Math.random() *
          available.length
        )
      ];

    const key =
      getCellKey(
        selected.row,
        selected.col
      );

    setAnswers(
      previous => ({
        ...previous,

        [key]:
          selected.letter,
      })
    );

    setHintedCells(
      previous => ({
        ...previous,

        [key]:
          true,
      })
    );

    setHintsRemaining(
      previous =>
        previous - 1
    );

    setChecked(false);

    setMessage(
      `💡 Revelamos una letra. Te quedan ${
        hintsRemaining - 1
      } pistas.`
    );
  };


  /* =======================================================
     BORRAR
  ======================================================= */

  const clearBoard = () => {
    const preserved =
      {};

    Object.keys(
      hintedCells
    ).forEach(
      key => {
        if (
          hintedCells[
            key
          ]
        ) {
          preserved[
            key
          ] =
            answers[
              key
            ];
        }
      }
    );

    setAnswers(
      preserved
    );

    setChecked(false);

    setCompleted(false);

    setMessage(
      'Tablero borrado. Las letras reveladas como pista se mantienen.'
    );
  };


  /* =======================================================
     ESTADO VISUAL
  ======================================================= */

  const getCellStatus = (
    row,
    col,
    correctLetter
  ) => {
    const key =
      getCellKey(
        row,
        col
      );

    if (
      hintedCells[
        key
      ]
    ) {
      return 'hinted';
    }

    if (!checked) {
      return '';
    }

    const answer =
      answers[key] ||
      '';

    return (
      answer ===
      correctLetter
        ? 'correct'
        : 'incorrect'
    );
  };


  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <Box className="crossword-page">

      <Box className="crossword-overlay" />


      <Box className="crossword-interface">

        {/* =================================================
            BARRA SUPERIOR
        ================================================= */}

        <Box className="crossword-toolbar">

          <Button
            variant="contained"
            startIcon={
              <ArrowBackIcon />
            }
            onClick={() =>
              navigate(
                '/juegos/lengua'
              )
            }
            className="crossword-back-button"
          >
            Volver a Lengua
          </Button>


          <Box className="crossword-difficulties">

            {Object.entries(
              DIFFICULTIES
            ).map(
              ([
                key,
                config
              ]) => (

                <Button
                  key={key}
                  onClick={() =>
                    changeDifficulty(
                      key
                    )
                  }
                  className={
                    difficulty ===
                    key
                      ? 'crossword-difficulty active'
                      : 'crossword-difficulty'
                  }
                >
                  {
                    config.label
                  }
                </Button>

              )
            )}

          </Box>


          <Button
            variant="contained"
            startIcon={
              <RefreshIcon />
            }
            onClick={
              newGame
            }
            className="crossword-new-button"
          >
            Nuevo desafío
          </Button>

        </Box>


        {/* =================================================
            ENCABEZADO
        ================================================= */}

        <Box className="crossword-heading">

          <Typography
            component="h1"
            className="crossword-title"
          >
            Crucigrama
          </Typography>

          <Typography className="crossword-subtitle">
            Completá las palabras usando las pistas.
          </Typography>

        </Box>


        {/* =================================================
            JUEGO
        ================================================= */}

        <Box className="crossword-game-layout">

          {/* ===============================================
              PANEL IZQUIERDO
          =============================================== */}

          <Box className="crossword-board-panel">

            {/* =============================================
                APRENDIZAJE + PROGRESO
            ============================================= */}

            <Box className="crossword-learning-header">

              <Box className="crossword-progress-box">

                <Typography className="crossword-progress-label">
                  Palabras completadas
                </Typography>

                <Typography className="crossword-progress-value">
                  {completedWords}
                  /
                  {puzzle.words.length}
                </Typography>

                <Typography className="crossword-progress-difficulty">
                  Nivel{' '}
                  {
                    DIFFICULTIES[
                      difficulty
                    ].label
                  }
                </Typography>

              </Box>


              <Box className="crossword-learning-box">

                <Typography className="crossword-learning-title">
                  📚 Reglas que estás practicando
                </Typography>


                <Box className="crossword-learning-rules">

                  {puzzleRules.map(
                    rule => (

                      <Box
                        key={
                          rule.id
                        }
                        className={
                          `crossword-learning-rule rule-${rule.id}`
                        }
                      >

                        <Typography className="crossword-learning-rule-title">
                          {rule.title}
                        </Typography>

                        <Typography className="crossword-learning-rule-short">
                          {rule.short}
                        </Typography>

                        <Typography className="crossword-learning-rule-examples">
                          Ejemplos: {rule.examples}
                        </Typography>

                      </Box>

                    )
                  )}

                </Box>

              </Box>

            </Box>


            {/* =============================================
                TABLERO
            ============================================= */}

            <Box
              className="crossword-board"
              style={{
                gridTemplateColumns:
                  `repeat(${visibleColumnCount}, var(--crossword-cell-size))`,
              }}
            >

              {visibleRows.map(
                (
                  row,
                  visibleRowIndex
                ) => {
                  const actualRow =
                    bounds.minRow +
                    visibleRowIndex;

                  return row
                    .slice(
                      bounds.minCol,
                      bounds.maxCol +
                        1
                    )
                    .map(
                      (
                        cell,
                        visibleColIndex
                      ) => {
                        const actualCol =
                          bounds.minCol +
                          visibleColIndex;

                        const key =
                          getCellKey(
                            actualRow,
                            actualCol
                          );

                        if (!cell) {
                          return (
                            <Box
                              key={key}
                              className="crossword-empty-cell"
                            />
                          );
                        }

                        const status =
                          getCellStatus(
                            actualRow,
                            actualCol,
                            cell.letter
                          );

                        const isHinted =
                          Boolean(
                            hintedCells[
                              key
                            ]
                          );

                        return (
                          <Box
                            key={key}
                            className={
                              `crossword-letter-cell ${status}`
                            }
                          >

                            {cell.numbers
                              .length >
                              0 && (
                              <span className="crossword-cell-number">
                                {
                                  cell
                                    .numbers[0]
                                }
                              </span>
                            )}


                            <input
                              ref={
                                element => {
                                  if (
                                    element
                                  ) {
                                    inputRefs.current[
                                      key
                                    ] =
                                      element;
                                  }
                                }
                              }

                              value={
                                answers[
                                  key
                                ] || ''
                              }

                              maxLength={1}

                              readOnly={
                                isHinted
                              }

                              onChange={
                                event =>
                                  handleChange(
                                    actualRow,
                                    actualCol,
                                    event
                                      .target
                                      .value
                                  )
                              }

                              onKeyDown={
                                event =>
                                  handleKeyDown(
                                    event,
                                    actualRow,
                                    actualCol
                                  )
                              }

                              aria-label={
                                isHinted
                                  ? 'Letra revelada como pista'
                                  : `Casillero fila ${
                                      actualRow +
                                      1
                                    }, columna ${
                                      actualCol +
                                      1
                                    }`
                              }
                            />

                          </Box>
                        );
                      }
                    );
                }
              )}

            </Box>

          </Box>


          {/* ===============================================
              PISTAS
          =============================================== */}

          <Box className="crossword-clues-panel">

            <Typography className="crossword-clues-title">
              Pistas
            </Typography>


            <Box className="crossword-clues-list">

              {puzzle.words.map(
                item => (

                  <Box
                    key={
                      item.number
                    }
                    className="crossword-clue"
                  >

                    <Box className="crossword-clue-header">

                      <Box className="crossword-clue-number">
                        {
                          item.number
                        }
                      </Box>

                      <Typography className="crossword-clue-direction">
                        {
                          item.direction ===
                          'horizontal'
                            ? '➡ Horizontal'
                            : '⬇ Vertical'
                        }
                      </Typography>

                      <span className="crossword-clue-length">
                        {
                          item.word
                            .length
                        }{' '}
                        letras
                      </span>

                    </Box>

                    <Typography className="crossword-clue-text">
                      {
                        item.clue
                      }
                    </Typography>

                  </Box>

                )
              )}

            </Box>


            <Box
              className={
                completed
                  ? 'crossword-message success'
                  : 'crossword-message'
              }
            >
              {message}
            </Box>


            <Button
              fullWidth
              variant="contained"
              startIcon={
                <LightbulbIcon />
              }
              onClick={
                revealLetter
              }
              disabled={
                hintsRemaining <=
                0
              }
              className="crossword-hint-button"
            >
              Revelar una letra
              {' '}
              ({hintsRemaining})
            </Button>


            <Box className="crossword-actions">

              <Button
                variant="contained"
                startIcon={
                  <CheckCircleIcon />
                }
                onClick={
                  handleCheck
                }
                className="crossword-check-button"
              >
                Comprobar
              </Button>


              <Button
                variant="contained"
                startIcon={
                  <RefreshIcon />
                }
                onClick={
                  clearBoard
                }
                className="crossword-clear-button"
              >
                Borrar
              </Button>

            </Box>

          </Box>

        </Box>

      </Box>


      {/* ===================================================
          FINAL
      =================================================== */}

      {completed && (

        <Box className="crossword-complete-overlay">

          <Box className="crossword-complete-card">

            <Typography className="crossword-complete-icon">
              🏆
            </Typography>

            <Typography className="crossword-complete-title">
              ¡Crucigrama completado!
            </Typography>

            <Typography className="crossword-complete-text">
              Resolviste correctamente las{' '}
              {puzzle.words.length}{' '}
              palabras.
            </Typography>


            <Typography className="crossword-complete-learning">
              Además practicaste:{' '}
              {
                puzzleRules
                  .map(
                    rule =>
                      rule.title
                  )
                  .join(' · ')
              }
            </Typography>


            <Box className="crossword-complete-actions">

              <Button
                variant="contained"
                onClick={
                  newGame
                }
              >
                Otro crucigrama
              </Button>

              <Button
                variant="contained"
                onClick={() =>
                  navigate(
                    '/juegos/lengua'
                  )
                }
              >
                Volver al mapa
              </Button>

            </Box>

          </Box>

        </Box>

      )}

    </Box>
  );
}