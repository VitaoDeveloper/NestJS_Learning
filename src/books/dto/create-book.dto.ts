import { IsString, MinLength, MaxLength,
         IsOptional } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @MinLength(2)
  @MaxLength(80)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  genre?: string; // nome do gênero, não o id
}