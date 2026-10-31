import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { MysqlDatabaseService } from '../database/mysql-database.service';
import { hashWerkzeugPassword, verifyWerkzeugPassword } from './password-hash';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

interface UserRow extends RowDataPacket {
  id_usuario: number;
  nombre: string;
  apellido: string;
  fecha_nacimiento: string;
  colegio: string;
  email: string;
  password_hash: string;
}

type PublicUser = Omit<UserRow, 'password_hash'>;

@Injectable()
export class AuthService {
  constructor(private readonly database: MysqlDatabaseService) {}

  async register(dto: RegisterDto) {
    if (!this.isCalendarDate(dto.fecha_nacimiento)) {
      throw new HttpException(
        { error: 'La fecha de nacimiento no es válida' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const existing = await this.database.rows<UserRow>(
      'SELECT id_usuario FROM users WHERE email = ? LIMIT 1',
      [dto.email],
    );
    if (existing.length) {
      throw new ConflictException({ error: 'El email ya está registrado' });
    }

    const passwordHash = await hashWerkzeugPassword(dto.password);
    try {
      const result = (await this.database.execute(
        `INSERT INTO users
          (nombre, apellido, fecha_nacimiento, colegio, email, password_hash)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [dto.nombre, dto.apellido, dto.fecha_nacimiento, dto.colegio, dto.email, passwordHash],
      )) as ResultSetHeader;

      const users = await this.database.rows<UserRow>(
        `SELECT id_usuario, nombre, apellido,
                DATE_FORMAT(fecha_nacimiento, '%Y-%m-%d') AS fecha_nacimiento,
                colegio, email, password_hash
         FROM users WHERE id_usuario = ? LIMIT 1`,
        [result.insertId],
      );
      return {
        mensaje: 'Usuario registrado correctamente',
        usuario: this.toPublicUser(users[0]),
      };
    } catch (error) {
      if ((error as { code?: string })?.code === 'ER_DUP_ENTRY') {
        throw new ConflictException({ error: 'El email ya está registrado' });
      }
      throw error;
    }
  }

  async login(dto: LoginDto) {
    const users = await this.database.rows<UserRow>(
      `SELECT id_usuario, nombre, apellido,
              DATE_FORMAT(fecha_nacimiento, '%Y-%m-%d') AS fecha_nacimiento,
              colegio, email, password_hash
       FROM users WHERE email = ? LIMIT 1`,
      [dto.email],
    );
    const user = users[0];
    if (!user || !(await verifyWerkzeugPassword(dto.password, user.password_hash))) {
      throw new HttpException(
        { error: 'Email o contraseña incorrectos' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    return {
      mensaje: 'Inicio de sesión exitoso',
      usuario: this.toPublicUser(user),
    };
  }

  private isCalendarDate(value: string): boolean {
    const [year, month, day] = value.split('-').map(Number);
    const parsed = new Date(Date.UTC(year, month - 1, day));
    return parsed.getUTCFullYear() === year &&
      parsed.getUTCMonth() === month - 1 &&
      parsed.getUTCDate() === day;
  }

  private toPublicUser(user: UserRow): PublicUser {
    const { password_hash: _passwordHash, ...publicUser } = user;
    return publicUser;
  }
}
