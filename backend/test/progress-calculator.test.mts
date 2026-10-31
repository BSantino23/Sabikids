import assert from 'node:assert/strict';
import test from 'node:test';
import {
  calculateProgress,
  isValidProgressInput,
} from '../src/progress/progress-calculator.ts';

test('desbloquea el nivel siguiente y conserva mejores resultados', () => {
  assert.deepEqual(
    calculateProgress(
      { level: 2, score: 8, moves: 7 },
      {
        current_level: 2,
        max_level: 2,
        best_score: 10,
        best_moves: 9,
      },
    ),
    {
      current_level: 3,
      max_level: 3,
      best_score: 10,
      best_moves: 7,
    },
  );
});

test('limita el desbloqueo y permite juegos sin contador de movimientos', () => {
  assert.deepEqual(calculateProgress({ level: 4, score: 12 }), {
    current_level: 4,
    max_level: 4,
    best_score: 12,
    best_moves: null,
  });
});

test('valida el mensaje que recibe el microservicio', () => {
  assert.equal(
    isValidProgressInput({ user_id: 2, game_key: 'sumas-restas', level: 1, score: 5 }),
    true,
  );
  assert.equal(
    isValidProgressInput({ user_id: 2, game_key: '', level: 1, score: 5 }),
    false,
  );
});
