import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'node:path';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { HealthController } from './health.controller';
import { ProgressModule } from './progress/progress.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    ProgressModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      graphiql: process.env.NODE_ENV !== 'production',
    }),
  ],
  controllers: [HealthController],
})
export class AppModule {}
