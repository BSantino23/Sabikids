import { Injectable } from '@nestjs/common';
import { RowDataPacket } from 'mysql2/promise';
import { MysqlDatabaseService } from '../database/mysql-database.service';
import {
  calculateProgress,
  isValidProgressInput,
  ProgressSnapshot,
} from '../progress/progress-calculator';
import { SaveProgressDto } from '../progress/dto/save-progress.dto';

interface UserRow extends RowDataPacket {
  id_usuario: number;
}

interface ProgressRow extends RowDataPacket, ProgressSnapshot {
  id_progress: number;
  user_id: number;
  game_key: string;
  updated_at: string;
}

@Injectable()
export class ProgressMicroserviceService {
  constructor(private readonly database: MysqlDatabaseService) {}

  async save(input: SaveProgressDto) {
    if (!isValidProgressInput(input)) {
      return {
        ok: false,
        statusCode: 400,
        error: 'Los datos de progreso no son válidos',
      };
    }

    const users = await this.database.rows<UserRow>(
      'SELECT id_usuario FROM users WHERE id_usuario = ? LIMIT 1',
      [input.user_id],
    );
    if (!users.length) {
      return { ok: false, statusCode: 404, error: 'Usuario no encontrado' };
    }

    const currentRows = await this.database.rows<ProgressRow>(
      `SELECT id_progress, user_id, game_key, current_level, max_level,
              best_score, best_moves, updated_at
       FROM game_progress WHERE user_id = ? AND game_key = ? LIMIT 1`,
      [input.user_id, input.game_key],
    );
    const current = currentRows[0];
    const previous = current
      ? {
          current_level: current.current_level,
          max_level: current.max_level,
          best_score: current.best_score,
          best_moves: current.best_moves,
        }
      : undefined;
    const updated = calculateProgress(input, previous);

    await this.database.execute(
      `INSERT INTO game_progress
        (user_id, game_key, current_level, max_level, best_score, best_moves, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
       ON DUPLICATE KEY UPDATE
         current_level = GREATEST(current_level, ?),
         max_level = GREATEST(max_level, ?),
         best_score = GREATEST(best_score, ?),
         best_moves = CASE
           WHEN ? IS NULL THEN best_moves
           WHEN best_moves IS NULL OR ? < best_moves THEN ?
           ELSE best_moves
         END,
         updated_at = CURRENT_TIMESTAMP`,
      [
        input.user_id,
        input.game_key,
        updated.current_level,
        updated.max_level,
        updated.best_score,
        updated.best_moves,
        updated.current_level,
        updated.max_level,
        updated.best_score,
        updated.best_moves,
        updated.best_moves,
        updated.best_moves,
      ],
    );

    const rows = await this.database.rows<ProgressRow>(
      `SELECT id_progress, user_id, game_key, current_level, max_level,
              best_score, best_moves,
              DATE_FORMAT(updated_at, '%Y-%m-%dT%H:%i:%s') AS updated_at
       FROM game_progress WHERE user_id = ? AND game_key = ? LIMIT 1`,
      [input.user_id, input.game_key],
    );
    const progress = rows[0];
    if (!progress) {
      return {
        ok: false,
        statusCode: 500,
        error: 'No se pudo recuperar el progreso guardado',
      };
    }

    return {
      ok: true,
      mensaje: 'Progreso guardado correctamente',
      progreso: {
        id_progress: progress.id_progress,
        user_id: progress.user_id,
        game_key: progress.game_key,
        current_level: progress.current_level,
        max_level: progress.max_level,
        best_score: progress.best_score,
        best_moves: progress.best_moves,
        updated_at: progress.updated_at,
      },
    };
  }
}
