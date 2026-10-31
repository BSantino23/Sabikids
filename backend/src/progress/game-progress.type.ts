import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GameProgressType {
  @Field(() => ID, { nullable: true })
  id_progress!: number | null;

  @Field(() => Int)
  user_id!: number;

  @Field()
  game_key!: string;

  @Field(() => Int)
  current_level!: number;

  @Field(() => Int)
  max_level!: number;

  @Field(() => Int)
  best_score!: number;

  @Field(() => Int, { nullable: true })
  best_moves!: number | null;

  @Field(() => String, { nullable: true })
  updated_at!: string | null;
}
