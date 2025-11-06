import { IsNotEmpty, IsString, IsInt, Min, Max } from 'class-validator';

export class CreateBookDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsInt()
  @Min(1500, {
    message: 'A data de publicação não pode ser de um ano inferior a 1500',
  })
  @Max(new Date().getFullYear(), {
    message: 'A data de publicação não pode ser de um ano futuro',
  })
  publishedYear: number;

  @IsString()
  @IsNotEmpty()
  isbn: string;
}
