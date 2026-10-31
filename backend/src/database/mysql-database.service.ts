import { Injectable, OnModuleDestroy } from '@nestjs/common';
import mysql, { Pool, RowDataPacket } from 'mysql2/promise';

@Injectable()
export class MysqlDatabaseService implements OnModuleDestroy {
  private pool?: Pool;

  private getPool(): Pool {
    if (this.pool) return this.pool;

    const required = ['MYSQL_USER', 'MYSQL_HOST', 'MYSQL_DB'];
    const missing = required.filter((key) => !process.env[key]);
    if (missing.length) {
      throw new Error(`Faltan variables de entorno: ${missing.join(', ')}`);
    }

    this.pool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT || 3306),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DB,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      dateStrings: true,
      charset: 'utf8mb4',
    });

    return this.pool;
  }

  async rows<T extends RowDataPacket>(
    sql: string,
    values: unknown[] = [],
  ): Promise<T[]> {
    const [result] = await this.getPool().execute(sql, values as any[]);
    return result as T[];
  }

  async execute(sql: string, values: unknown[] = []) {
    const [result] = await this.getPool().execute(sql, values as any[]);
    return result;
  }

  async ping(): Promise<void> {
    await this.getPool().query('SELECT 1');
  }

  async onModuleDestroy() {
    await this.pool?.end();
  }
}
