import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { MysqlDatabaseService } from './database/mysql-database.service';

@Controller()
export class HealthController {
  constructor(private readonly database: MysqlDatabaseService) {}

  @Get()
  home() {
    return 'Backend de Sabikids funcionando';
  }

  @Get('test-db')
  async testDatabase() {
    try {
      await this.database.ping();
      return 'Conexion a MySQL exitosa';
    } catch {
      throw new HttpException(
        { error: 'Error de conexion con MySQL' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
