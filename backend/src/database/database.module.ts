import { Global, Module } from '@nestjs/common';
import { MysqlDatabaseService } from './mysql-database.service';

@Global()
@Module({ providers: [MysqlDatabaseService], exports: [MysqlDatabaseService] })
export class DatabaseModule {}
