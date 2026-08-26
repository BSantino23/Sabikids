import React, { useMemo, useState } from 'react';
import {
  Box,
  Button,
  Typography,
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RefreshIcon from '@mui/icons-material/Refresh';

import { useNavigate } from 'react-router-dom';

import '../../../styles/lengua/WordSearch.css';


const WORD_GROUPS = [
  {
    id: 'bilidad',
    title: 'Terminación -bilidad',
    rule:
      'Las palabras terminadas en -bilidad se escriben con B.',
    words: [
      'HABILIDAD',
      'AMABILIDAD',
      'DEBILIDAD',
      'POSIBILIDAD',
      'ESTABILIDAD',
      'SENSIBILIDAD',
      'PROBABILIDAD',
      'FLEXIBILIDAD',
      'VISIBILIDAD',
      'COMPATIBILIDAD',
    ],
  },

  {
    id: 'cion',
    title: 'Terminación -ción',
    rule:
      'Las palabras terminadas en -ción llevan tilde en la Ó.',
    words: [
      'CANCIÓN',
      'NACIÓN',
      'ACCIÓN',
      'ATENCIÓN',
      'FUNCIÓN',
      'OPCIÓN',
      'SOLUCIÓN',
      'EDUCACIÓN',
      'PROTECCIÓN',
      'DIRECCIÓN',
      'INFORMACIÓN',
      'OPERACIÓN',
    ],
  },

  {
    id: 'sub',
    title: 'Prefijo sub-',
    rule:
      'El prefijo sub- se escribe con B.',
    words: [
      'SUBMARINO',
      'SUBRAYAR',
      'SUBTÍTULO',
      'SUBSUELO',
      'SUBGRUPO',
      'SUBCLASE',
      'SUBREGIÓN',
      'SUBTEMA',
      'SUBDIVISIÓN',
    ],
  },
];


const DIFFICULTIES = {
  easy: {
    label: 'Fácil',
    words: 3,
    gridSize: 12,
    distribution: [2, 1],
  },

  medium: {
    label: 'Media',
    words: 6,
    gridSize: 15,
    distribution: [4, 2],
  },

  hard: {
    label: 'Alta',
    words: 9,
    gridSize: 18,
    distribution: [6, 3],
  },
};


const DIRECTIONS = [
  [0, 1],
  [0, -1],

  [1, 0],
  [-1, 0],

  [1, 1],
  [1, -1],

  [-1, 1],
  [-1, -1],
];


const RANDOM_LETTERS =
  'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';


function randomNumber(max) {
  return Math.floor(Math.random() * max);
}


function shuffle(array) {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = randomNumber(i + 1);

    [copy[i], copy[j]] = [
      copy[j],
      copy[i],
    ];
  }

  return copy;
}


function createEmptyGrid(size) {
  return Array.from(
    { length: size },
    () => Array(size).fill('')
  );
}


function cellKey(row, col) {
  return `${row}-${col}`;
}


function canPlaceWord(
  grid,
  word,
  startRow,
  startCol,
  rowDirection,
  colDirection
) {
  const size = grid.length;

  for (let i = 0; i < word.length; i++) {
    const row =
      startRow + i * rowDirection;

    const col =
      startCol + i * colDirection;

    if (
      row < 0 ||
      row >= size ||
      col < 0 ||
      col >= size
    ) {
      return false;
    }

    const existingLetter =
      grid[row][col];

    if (
      existingLetter !== '' &&
      existingLetter !== word[i]
    ) {
      return false;
    }
  }

  return true;
}


function writeWord(
  grid,
  word,
  startRow,
  startCol,
  rowDirection,
  colDirection
) {
  const cells = [];

  for (let i = 0; i < word.length; i++) {
    const row =
      startRow + i * rowDirection;

    const col =
      startCol + i * colDirection;

    grid[row][col] = word[i];

    cells.push({
      row,
      col,
    });
  }

  return cells;
}


function tryPlaceWithIntersection(
  grid,
  word
) {
  const size = grid.length;

  const possibleCrossings = [];

  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const gridLetter =
        grid[row][col];

      if (!gridLetter) {
        continue;
      }

      for (
        let wordIndex = 0;
        wordIndex < word.length;
        wordIndex++
      ) {
        if (
          word[wordIndex] ===
          gridLetter
        ) {
          possibleCrossings.push({
            row,
            col,
            wordIndex,
          });
        }
      }
    }
  }

  const crossings =
    shuffle(possibleCrossings);

  const directions =
    shuffle(DIRECTIONS);

  for (const crossing of crossings) {
    for (const [
      rowDirection,
      colDirection,
    ] of directions) {
      const startRow =
        crossing.row -
        crossing.wordIndex *
          rowDirection;

      const startCol =
        crossing.col -
        crossing.wordIndex *
          colDirection;

      if (
        canPlaceWord(
          grid,
          word,
          startRow,
          startCol,
          rowDirection,
          colDirection
        )
      ) {
        return writeWord(
          grid,
          word,
          startRow,
          startCol,
          rowDirection,
          colDirection
        );
      }
    }
  }

  return null;
}


function tryPlaceRandomly(
  grid,
  word
) {
  const size = grid.length;

  for (
    let attempt = 0;
    attempt < 300;
    attempt++
  ) {
    const [
      rowDirection,
      colDirection,
    ] =
      DIRECTIONS[
        randomNumber(
          DIRECTIONS.length
        )
      ];

    const startRow =
      randomNumber(size);

    const startCol =
      randomNumber(size);

    if (
      canPlaceWord(
        grid,
        word,
        startRow,
        startCol,
        rowDirection,
        colDirection
      )
    ) {
      return writeWord(
        grid,
        word,
        startRow,
        startCol,
        rowDirection,
        colDirection
      );
    }
  }

  return null;
}


function placeWord(
  grid,
  word,
  isFirstWord
) {
  if (!isFirstWord) {
    const crossed =
      tryPlaceWithIntersection(
        grid,
        word
      );

    if (crossed) {
      return crossed;
    }
  }

  return tryPlaceRandomly(
    grid,
    word
  );
}


function fillRandomLetters(grid) {
  return grid.map((row) =>
    row.map((cell) => {
      if (cell !== '') {
        return cell;
      }

      return RANDOM_LETTERS[
        randomNumber(
          RANDOM_LETTERS.length
        )
      ];
    })
  );
}


function selectWordsForGame(
  difficulty
) {
  const config =
    DIFFICULTIES[difficulty];

  const groups =
    shuffle(WORD_GROUPS).slice(
      0,
      2
    );

  const selectedWords = [];

  groups.forEach(
    (group, groupIndex) => {
      const amount =
        config.distribution[
          groupIndex
        ];

      const availableWords =
        shuffle(
          group.words.filter(
            (word) =>
              word.length <=
              config.gridSize
          )
        );

      availableWords
        .slice(0, amount)
        .forEach((word) => {
          selectedWords.push({
            word,
            groupId: group.id,
          });
        });
    }
  );

  return {
    groups,
    selectedWords:
      shuffle(selectedWords),
  };
}


function generatePuzzle(
  difficulty
) {
  const config =
    DIFFICULTIES[difficulty];

  for (
    let generationAttempt = 0;
    generationAttempt < 40;
    generationAttempt++
  ) {
    const grid =
      createEmptyGrid(
        config.gridSize
      );

    const {
      groups,
      selectedWords,
    } =
      selectWordsForGame(
        difficulty
      );

    const placedWords = [];

    let successful = true;

    for (
      let index = 0;
      index <
      selectedWords.length;
      index++
    ) {
      const item =
        selectedWords[index];

      const cells =
        placeWord(
          grid,
          item.word,
          index === 0
        );

      if (!cells) {
        successful = false;
        break;
      }

      placedWords.push({
        ...item,
        cells,
      });
    }

    if (successful) {
      return {
        grid:
          fillRandomLetters(grid),

        words:
          placedWords,

        groups,

        size:
          config.gridSize,
      };
    }
  }

  return {
    grid:
      fillRandomLetters(
        createEmptyGrid(
          config.gridSize
        )
      ),

    words: [],

    groups: [],

    size:
      config.gridSize,
  };
}


function sameCells(
  selectedCells,
  targetCells
) {
  if (
    selectedCells.length !==
    targetCells.length
  ) {
    return false;
  }

  const selectedKeys =
    new Set(
      selectedCells.map(
        (cell) =>
          cellKey(
            cell.row,
            cell.col
          )
      )
    );

  return targetCells.every(
    (cell) =>
      selectedKeys.has(
        cellKey(
          cell.row,
          cell.col
        )
      )
  );
}


export default function WordSearch() {
  const navigate =
    useNavigate();

  const [
    difficulty,
    setDifficulty,
  ] =
    useState('easy');

  const [
    puzzle,
    setPuzzle,
  ] =
    useState(() =>
      generatePuzzle('easy')
    );

  const [
    selectedCells,
    setSelectedCells,
  ] =
    useState([]);

  const [
    foundWords,
    setFoundWords,
  ] =
    useState([]);

  const [
    message,
    setMessage,
  ] =
    useState(
      'Seleccioná las letras que forman una palabra. Tocá nuevamente una letra para desmarcarla.'
    );


  const foundCellKeys =
    useMemo(() => {
      const keys = new Set();

      foundWords.forEach(
        (foundWord) => {
          foundWord.cells.forEach(
            (cell) => {
              keys.add(
                cellKey(
                  cell.row,
                  cell.col
                )
              );
            }
          );
        }
      );

      return keys;
    }, [foundWords]);


  const completed =
    puzzle.words.length > 0 &&
    foundWords.length ===
      puzzle.words.length;


  const handleCellClick = (
    row,
    col
  ) => {
    const key =
      cellKey(row, col);

    const alreadySelected =
      selectedCells.some(
        (cell) =>
          cellKey(
            cell.row,
            cell.col
          ) === key
      );

    if (alreadySelected) {
      setSelectedCells(
        selectedCells.filter(
          (cell) =>
            cellKey(
              cell.row,
              cell.col
            ) !== key
        )
      );

      setMessage(
        'Letra desmarcada.'
      );

      return;
    }

    setSelectedCells([
      ...selectedCells,
      {
        row,
        col,
      },
    ]);

    setMessage(
      'Letra seleccionada. Podés seguir marcando o presionar Comprobar.'
    );
  };


  const handleCheck = () => {
    if (
      selectedCells.length === 0
    ) {
      setMessage(
        'Primero seleccioná algunas letras.'
      );

      return;
    }

    const target =
      puzzle.words.find(
        (item) =>
          sameCells(
            selectedCells,
            item.cells
          )
      );

    if (!target) {
      setMessage(
        '❌ Esa selección no forma una palabra correcta. Revisá las letras marcadas.'
      );

      return;
    }

    const alreadyFound =
      foundWords.some(
        (item) =>
          item.word ===
          target.word
      );

    if (alreadyFound) {
      setMessage(
        'Esa palabra ya fue encontrada.'
      );

      return;
    }

    const updatedFoundWords = [
      ...foundWords,
      {
        word:
          target.word,

        groupId:
          target.groupId,

        cells:
          target.cells,
      },
    ];

    setFoundWords(
      updatedFoundWords
    );

    setSelectedCells([]);

    if (
      updatedFoundWords.length ===
      puzzle.words.length
    ) {
      setMessage(
        '🎉 ¡Excelente! Encontraste todas las palabras.'
      );
    } else {
      setMessage(
        `✅ ¡Muy bien! Encontraste ${target.word}.`
      );
    }
  };


  const handleClear = () => {
    setSelectedCells([]);

    setMessage(
      'Selección borrada.'
    );
  };


  const createNewPuzzle = (
    selectedDifficulty =
      difficulty
  ) => {
    setPuzzle(
      generatePuzzle(
        selectedDifficulty
      )
    );

    setFoundWords([]);
    setSelectedCells([]);

    setMessage(
      'Seleccioná las letras que forman una palabra. Tocá nuevamente una letra para desmarcarla.'
    );
  };


  const handleDifficultyChange =
    (event) => {
      const newDifficulty =
        event.target.value;

      setDifficulty(
        newDifficulty
      );

      createNewPuzzle(
        newDifficulty
      );
    };


  const getCellClassName = (
    row,
    col
  ) => {
    const key =
      cellKey(row, col);

    const selected =
      selectedCells.some(
        (cell) =>
          cellKey(
            cell.row,
            cell.col
          ) === key
      );

    const found =
      foundCellKeys.has(key);

    let className =
      'word-search-cell';

    if (selected) {
      className +=
        ' selected';
    }

    if (found) {
      className +=
        ' found-cell';
    }

    return className;
  };


  return (
    <Box className="word-search-page">

      <Box className="word-search-topbar">

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
          className="word-search-back"
        >
          Volver a Lengua
        </Button>


        <Box className="word-search-heading">

          <Typography
            component="h1"
            className="word-search-title"
          >
            Sopa de Letras
          </Typography>

          <Typography className="word-search-rule">
            Seleccioná las letras de una palabra y comprobá si la encontraste.
          </Typography>

        </Box>


        <Box className="word-search-controls">

          <label
            className="difficulty-label"
            htmlFor="difficulty"
          >
            Dificultad
          </label>

          <select
            id="difficulty"
            className="difficulty-select"
            value={difficulty}
            onChange={
              handleDifficultyChange
            }
          >
            <option value="easy">
              Fácil · 3 palabras
            </option>

            <option value="medium">
              Media · 6 palabras
            </option>

            <option value="hard">
              Alta · 9 palabras
            </option>
          </select>

          <Box className="word-search-score">
            ⭐ {foundWords.length}
            {' / '}
            {puzzle.words.length}
          </Box>

        </Box>

      </Box>


      <Box className="word-search-active-rules">

        {puzzle.groups.map(
          (group) => (
            <Box
              key={group.id}
              className="word-search-rule-card"
            >
              <strong>
                {group.title}
              </strong>

              <span>
                {group.rule}
              </span>
            </Box>
          )
        )}

      </Box>


      <Box className="word-search-scene">

        <Box className="word-search-game-panel">

          <Box
            className="word-search-grid"
            style={{
              gridTemplateColumns:
                `repeat(${puzzle.size}, 1fr)`,

              gridTemplateRows:
                `repeat(${puzzle.size}, 1fr)`,
            }}
          >

            {puzzle.grid.map(
              (
                row,
                rowIndex
              ) =>
                row.map(
                  (
                    letter,
                    colIndex
                  ) => (
                    <button
                      key={`${rowIndex}-${colIndex}`}
                      type="button"
                      className={
                        getCellClassName(
                          rowIndex,
                          colIndex
                        )
                      }
                      onClick={() =>
                        handleCellClick(
                          rowIndex,
                          colIndex
                        )
                      }
                    >
                      {letter}
                    </button>
                  )
                )
            )}

          </Box>

        </Box>


        <Box className="word-search-side-panel">

          <Typography className="word-search-side-title">
            Palabras a encontrar
          </Typography>


          <Box className="word-search-word-list">

            {puzzle.words.map(
              (item) => {
                const found =
                  foundWords.some(
                    (word) =>
                      word.word ===
                      item.word
                  );

                return (
                  <Box
                    key={
                      item.word
                    }
                    className={`
                      word-search-word
                      ${
                        found
                          ? 'found'
                          : ''
                      }
                    `}
                  >
                    {found
                      ? '✅'
                      : '🔎'}{' '}

                    {item.word}
                  </Box>
                );
              }
            )}

          </Box>


          <Box className="word-search-message">
            {message}
          </Box>


          <Box className="word-search-actions">

            <Button
              variant="contained"
              onClick={
                handleCheck
              }
              className="word-search-check"
            >
              Comprobar
            </Button>


            <Button
              variant="outlined"
              onClick={
                handleClear
              }
              className="word-search-clear"
            >
              Borrar selección
            </Button>


            <Button
              variant="outlined"
              startIcon={
                <RefreshIcon />
              }
              onClick={() =>
                createNewPuzzle()
              }
              className="word-search-new"
            >
              Nueva sopa
            </Button>

          </Box>


          {completed && (
            <Box className="word-search-complete">

              <Typography className="word-search-complete-title">
                ⭐⭐⭐
              </Typography>

              <Typography className="word-search-complete-text">
                ¡Nivel completado!
              </Typography>

              <Typography className="word-search-complete-subtitle">
                ¡Excelente trabajo!
              </Typography>

            </Box>
          )}

        </Box>

      </Box>

    </Box>
  );
}