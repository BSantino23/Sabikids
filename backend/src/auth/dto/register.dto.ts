import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';

const trim = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() : value;

export class RegisterDto {
  @Transform(trim)
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  nombre!: string;

  @Transform(trim)
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  apellido!: string;

  @Transform(trim)
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  fecha_nacimiento!: string;

  @Transform(trim)
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  colegio!: string;

  @Transform(trim)
  @IsEmail()
  @MaxLength(120)
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(256)
  password!: string;
}
