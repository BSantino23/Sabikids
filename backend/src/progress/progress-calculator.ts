export const MAX_LEVEL = 4;

export interface ProgressInput {
  level: number;
  score: number;
  moves?: number | null;
}

export interface ProgressSnapshot {
  current_level: number;
  max_level: number;
  best_score: number;
  best_moves: number | null;
}

export function calculateProgress(
  input: ProgressInput,
  previous?: ProgressSnapshot,
): ProgressSnapshot {
  const unlockedLevel = Math.min(input.level + 1, MAX_LEVEL);
  const bestMoves = input.moves == null
    ? previous?.best_moves ?? null
    : previous?.best_moves == null
      ? input.moves
      : Math.min(previous.best_moves, input.moves);

  return {
    current_level: Math.max(previous?.current_level ?? 1, unlockedLevel),
    max_level: Math.max(previous?.max_level ?? 1, unlockedLevel),
    best_score: Math.max(previous?.best_score ?? 0, input.score),
    best_moves: bestMoves,
  };
}

export function isValidProgressInput(
  input: Partial<ProgressInput> & { game_key?: unknown; user_id?: unknown },
): input is ProgressInput & { game_key: string; user_id: number } {
  return (
    Number.isInteger(input.user_id) &&
    (input.user_id as number) > 0 &&
    typeof input.game_key === 'string' &&
    input.game_key.trim().length > 0 &&
    input.game_key.length <= 100 &&
    Number.isInteger(input.level) &&
    (input.level as number) >= 1 &&
    (input.level as number) <= MAX_LEVEL &&
    Number.isInteger(input.score) &&
    (input.score as number) >= 0 &&
    (input.moves == null ||
      (Number.isInteger(input.moves) && (input.moves as number) >= 1))
  );
}
