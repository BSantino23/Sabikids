import { HttpException, Inject, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { RowDataPacket } from 'mysql2/promise';
import { lastValueFrom, timeout } from 'rxjs';
import { MysqlDatabaseService } from '../database/mysql-database.service';
import { SaveProgressDto } from './dto/save-progress.dto';
import { GameProgressType } from './game-progress.type';

interface ProgressRow extends RowDataPacket {
  id_progress: number;
  user_id: number;
  game_key: string;
  current_level: number;
  max_level: number;
  best_score: number;
  best_moves: number | null;
  updated_at: string | null;
}

interface UserRow extends RowDataPacket {
  id_usuario: number;
}

interface SaveProgressResponse {
  ok: boolean;
  statusCode?: number;
  error?: string;
  mensaje?: string;
  progreso?: GameProgressType;
}

@Injectable()
export class ProgressService {
  constructor(
    private readonly database: MysqlDatabaseService,
    @Inject('PROGRESS_MICROSERVICE') private readonly microservice: ClientProxy,
  ) {}

  async getGameProgress(userId: number, gameKey: string): Promise<GameProgressType> {
    const users = await this.database.rows<UserRow>(
      'SELECT id_usuario FROM users WHERE id_usuario = ? LIMIT 1',
      [userId],
    );
    if (!users.length) {
      throw new HttpException({ error: 'Usuario no encontrado' }, 404);
    }

    const rows = await this.database.rows<ProgressRow>(
      `SELECT id_progress, user_id, game_key, current_level, max_level,
              best_score, best_moves,
              DATE_FORMAT(updated_at, '%Y-%m-%dT%H:%i:%s') AS updated_at
       FROM game_progress WHERE user_id = ? AND game_key = ? LIMIT 1`,
      [userId, gameKey],
    );

    return rows[0]
      ? this.toProgressType(rows[0])
      : {
          id_progress: null,
          user_id: userId,
          game_key: gameKey,
          current_level: 1,
          max_level: 1,
          best_score: 0,
          best_moves: null,
          updated_at: null,
        };
  }

  async saveGameProgress(dto: SaveProgressDto) {
    let response: SaveProgressResponse;
    try {
      response = await lastValueFrom(
        this.microservice
          .send<SaveProgressResponse, SaveProgressDto>({ cmd: 'progress.save' }, dto)
          .pipe(timeout(7000)),
      );
    } catch {
      throw new ServiceUnavailableException({
        error: 'El servicio de progreso no está disponible',
      });
    }

    if (!response.ok) {
      throw new HttpException(
        { error: response.error ?? 'No se pudo guardar el progreso' },
        response.statusCode ?? 500,
      );
    }

    return { mensaje: response.mensaje, progreso: response.progreso };
  }

  async getMicroserviceHealth() {
    try {
      return await lastValueFrom(
        this.microservice
          .send<{ status: string; service: string }, Record<string, never>>(
            { cmd: 'progress.health' },
            {},
          )
          .pipe(timeout(3000)),
      );
    } catch {
      throw new ServiceUnavailableException({
        error: 'El servicio de progreso no está disponible',
      });
    }
  }

  private toProgressType(row: ProgressRow): GameProgressType {
    return {
      id_progress: row.id_progress,
      user_id: row.user_id,
      game_key: row.game_key,
      current_level: row.current_level,
      max_level: row.max_level,
      best_score: row.best_score,
      best_moves: row.best_moves,
      updated_at: row.updated_at,
    };
  }
}
