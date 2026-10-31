import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';
import { MAX_LEVEL } from '../progress-calculator';

export class SaveProgressDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  user_id!: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  game_key!: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(MAX_LEVEL)
  level!: number;

  @Type(() => Number)
  @IsInt()
  @Min(0)
  score!: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  moves?: number;
}
