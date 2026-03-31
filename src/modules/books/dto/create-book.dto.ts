import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsInt,
  Min,
  Max,
  IsArray,
  IsUUID,
  IsOptional,
} from 'class-validator';
import { DecoratorMessage } from 'src/utils/decorator-message';

export class CreateBookDTO {
  @ApiProperty({
    example: 'O senhor dos aneis',
    description: 'Titulo do livro',
  })
  @IsString()
  @IsNotEmpty({ message: DecoratorMessage('title') })
  title: string;

  @ApiProperty({
    example: '1592',
    description: 'Ano de publicação do livro',
    minimum: 1500,
    maximum: new Date().getFullYear(),
  })
  @IsInt()
  @Min(1500, {
    message: 'A data de publicação não pode ser de um ano inferior a 1500',
  })
  @Max(new Date().getFullYear(), {
    message: 'A data de publicação não pode ser de um ano futuro',
  })
  publishedYear: number;

  @ApiProperty({
    example: '9788535902778',
    description: 'Código identificador do livro',
  })
  @IsString()
  @IsNotEmpty({ message: DecoratorMessage('isbn') })
  isbn: string;

  @ApiProperty({
    example: 3,
    description:
      'Quantidade de exemplares de um livro disponíveis  para locação',
    default: 0,
    minimum: 0,
  })
  @IsInt({ message: 'A quantidade deve ser um número inteiro' })
  @Min(0, { message: 'A quantidade não pode ser negativa' })
  @IsOptional()
  quantity?: number;

  @ApiProperty({
    example: ['uuid-do-autor-1', 'uuid-do-autor-2'],
    description: 'Lista de IDs dos autores vinculados',
  })
  @IsArray()
  @IsString({ each: true })
  @IsUUID('4', { each: true })
  authorsIds: string[];
}
