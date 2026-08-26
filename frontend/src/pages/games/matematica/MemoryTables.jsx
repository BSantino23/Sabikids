import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  MenuItem,
  Select,
  Typography
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReplayIcon from '@mui/icons-material/Replay';

import { useNavigate } from 'react-router-dom';

import '../../../styles/matematica/MemoryTables.css';

const levels = {
  1: {
    name: 'Nivel 1',
    tables: [2, 3, 4],
    pairCount: 8,
  },
  2: {
    name: 'Nivel 2',
    tables: [5, 6, 7],
    pairCount: 10,
  },
  3: {
    name: 'Nivel 3',
    tables: [8, 9, 10],
    pairCount: 12,
  },
  4: {
    name: 'Nivel 4',
    tables: [2, 3, 4, 5, 6, 7, 8, 9, 10],
    pairCount: 15,
  },
};

function shuffleCards(cards) {
  const shuffled = [...cards];

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    [shuffled[i], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[i],
    ];
  }

  return shuffled;
}

function createPairs(level) {
  const availableTables = levels[level].tables;
  const amountOfPairs = levels[level].pairCount;

  const possiblePairs = [];

  availableTables.forEach((table) => {
    for (let multiplier = 2; multiplier <= 10; multiplier += 1) {
      possiblePairs.push({
        operation: `${table} × ${multiplier}`,
        result: table * multiplier,
      });
    }
  });

  const shuffledPairs = shuffleCards(possiblePairs);

  const selectedPairs = [];
  const usedResults = new Set();

  for (const pair of shuffledPairs) {
    if (!usedResults.has(pair.result)) {
      selectedPairs.push(pair);
      usedResults.add(pair.result);
    }

    if (selectedPairs.length === amountOfPairs) {
      break;
    }
  }

  return selectedPairs;
}

function createDeck(level) {
  const pairs = createPairs(level);

  const cards = pairs.flatMap((pair, index) => [
    {
      id: `operation-${index}-${pair.operation}`,
      pairId: index,
      value: pair.operation,
      type: 'operation',
    },
    {
      id: `result-${index}-${pair.result}`,
      pairId: index,
      value: String(pair.result),
      type: 'result',
    },
  ]);

  return {
    cards: shuffleCards(cards),
    pairCount: pairs.length,
  };
}

function calculateScore(moves, pairCount) {
  const idealMoves = pairCount;
  const extraMoves = Math.max(0, moves - idealMoves);

  return Math.max(
    100,
    1000 - extraMoves * 40
  );
}

export default function MemoryTables() {
  const navigate = useNavigate();

  const [level, setLevel] = useState(1);

  const [cards, setCards] = useState([]);
  const [pairCount, setPairCount] = useState(0);

  const [selectedCards, setSelectedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);

  const [moves, setMoves] = useState(0);

  const [locked, setLocked] = useState(false);

  const [incorrectCards, setIncorrectCards] = useState([]);

  const [feedback, setFeedback] = useState('');

  const startGame = (selectedLevel = level) => {
    const deck = createDeck(selectedLevel);

    setCards(deck.cards);
    setPairCount(deck.pairCount);

    setSelectedCards([]);
    setMatchedPairs([]);

    setMoves(0);

    setLocked(false);

    setIncorrectCards([]);

    setFeedback('');
  };

  useEffect(() => {
    startGame(level);
  }, [level]);

  const handleCardClick = (card) => {
    if (locked) return;

    if (matchedPairs.includes(card.pairId)) {
      return;
    }

    const alreadySelected = selectedCards.some(
      (selectedCard) =>
        selectedCard.id === card.id
    );

    if (alreadySelected) {
      return;
    }

    if (selectedCards.length >= 2) {
      return;
    }

    setSelectedCards((current) => [
      ...current,
      card,
    ]);
  };

  useEffect(() => {
    if (selectedCards.length !== 2) {
      return;
    }

    const [firstCard, secondCard] = selectedCards;

    setMoves((current) => current + 1);

    if (firstCard.pairId === secondCard.pairId) {
      setMatchedPairs((current) => [
        ...current,
        firstCard.pairId,
      ]);

      setFeedback('Pareja correcta');

      setSelectedCards([]);

      const feedbackTimer = setTimeout(() => {
        setFeedback('');
      }, 900);

      return () => clearTimeout(feedbackTimer);
    }

    setLocked(true);

    setIncorrectCards([
      firstCard.id,
      secondCard.id,
    ]);

    setFeedback('Intentá nuevamente');

    const timer = setTimeout(() => {
      setSelectedCards([]);
      setIncorrectCards([]);

      setLocked(false);

      setFeedback('');
    }, 1000);

    return () => clearTimeout(timer);
  }, [selectedCards]);

  const gameFinished =
    pairCount > 0 &&
    matchedPairs.length === pairCount;

  const score = gameFinished
    ? calculateScore(moves, pairCount)
    : 0;

  const handleLevelChange = (event) => {
    setLevel(Number(event.target.value));
  };

  const handleNextLevel = () => {
    if (level < 4) {
      setLevel((current) => current + 1);
    }
  };

  return (
    <Box className="memory-page">

      <Box className="memory-header">

        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/juegos/matematica')}
          className="memory-back-button"
        >
          Volver a Matemática
        </Button>

        <Box className="memory-heading">

          <Typography
            variant="h3"
            component="h1"
            className="memory-title"
          >
            Memotest de Tablas
          </Typography>

          <Typography className="memory-instructions">
            Encontrá cada multiplicación con su resultado
          </Typography>

        </Box>

        <Button
          variant="contained"
          startIcon={<ReplayIcon />}
          onClick={() => startGame()}
          className="restart-button"
        >
          Reiniciar
        </Button>

      </Box>

      <Box className="memory-controls">

        <Box className="level-control">

          <Typography
            component="label"
            htmlFor="level-select"
            className="level-label"
          >
            Dificultad
          </Typography>

          <Select
            id="level-select"
            value={level}
            onChange={handleLevelChange}
            size="small"
            className="level-select"
          >
            <MenuItem value={1}>
              Nivel 1 - 16 cartas
            </MenuItem>

            <MenuItem value={2}>
              Nivel 2 - 20 cartas
            </MenuItem>

            <MenuItem value={3}>
              Nivel 3 - 24 cartas
            </MenuItem>

            <MenuItem value={4}>
              Nivel 4 - 30 cartas
            </MenuItem>
          </Select>

        </Box>

        <Box className="memory-info">

          <Box className="info-pill">
            Movimientos: {moves}
          </Box>

          <Box className="info-pill">
            Parejas: {matchedPairs.length} / {pairCount}
          </Box>

        </Box>

      </Box>

      <Box
        className={`feedback-message ${
          feedback === 'Pareja correcta'
            ? 'feedback-correct'
            : feedback
              ? 'feedback-error'
              : ''
        }`}
        role="status"
        aria-live="polite"
      >
        {feedback}
      </Box>

      {gameFinished && (
        <Box
          className="win-message"
          role="status"
          aria-live="polite"
        >

          <Typography
            variant="h4"
            className="win-title"
          >
            Nivel completado
          </Typography>

          <Typography className="win-description">
            Terminaste el nivel en {moves} movimientos.
          </Typography>

          <Typography className="final-score">
            Puntaje: {score}
          </Typography>

          <Box className="win-actions">

            <Button
              variant="contained"
              onClick={() => startGame()}
              className="play-again-button"
            >
              Jugar otra vez
            </Button>

            {level < 4 && (
              <Button
                variant="contained"
                onClick={handleNextLevel}
                className="next-level-button"
              >
                Siguiente nivel
              </Button>
            )}

          </Box>

        </Box>
      )}

      <Box
        className={`memory-board level-${level}`}
      >

        {cards.map((card) => {
          const isSelected =
            selectedCards.some(
              (selectedCard) =>
                selectedCard.id === card.id
            );

          const isMatched =
            matchedPairs.includes(card.pairId);

          const isIncorrect =
            incorrectCards.includes(card.id);

          const isVisible =
            isSelected || isMatched;

          return (
            <button
              key={card.id}
              type="button"
              className={`
                memory-card
                ${isVisible ? 'memory-card-visible' : ''}
                ${isMatched ? 'memory-card-matched' : ''}
                ${isIncorrect ? 'memory-card-error' : ''}
                ${
                  card.type === 'operation'
                    ? 'operation-card'
                    : 'result-card'
                }
              `}
              onClick={() => handleCardClick(card)}
              disabled={isMatched}
              aria-label={
                isVisible
                  ? card.value
                  : 'Carta de memoria sin descubrir'
              }
            >

              <span className="memory-card-inner">

                <span className="memory-card-front">
                  ×
                </span>

                <span className="memory-card-back">
                  {card.value}
                </span>

              </span>

            </button>
          );
        })}

      </Box>

    </Box>
  );
}