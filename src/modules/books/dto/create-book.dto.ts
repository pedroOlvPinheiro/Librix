import { IsNotEmpty, IsString, IsInt, Min, Max } from 'class-validator';
import { DecoratorMessage } from 'src/utils/decorator-message';

export class CreateBookDTO {
  @IsString()
  @IsNotEmpty({ message: DecoratorMessage('title') })
  title: string;

  @IsString()
  @IsNotEmpty({ message: DecoratorMessage('author') })
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
  @IsNotEmpty({ message: DecoratorMessage('isbn') })
  isbn: string;
}
