import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { ProgressService } from './progress.service';
import { GameProgressType } from './game-progress.type';

@Resolver(() => GameProgressType)
export class ProgressResolver {
  constructor(private readonly progressService: ProgressService) {}

  @Query(() => GameProgressType, {
    description: 'Consulta el progreso real de un juego para un usuario.',
  })
  gameProgress(
    @Args('userId', { type: () => Int }) userId: number,
    @Args('gameKey') gameKey: string,
  ) {
    return this.progressService.getGameProgress(userId, gameKey);
  }
}
