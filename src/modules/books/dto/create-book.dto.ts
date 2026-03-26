import {
  IsNotEmpty,
  IsString,
  IsInt,
  Min,
  Max,
  IsArray,
  IsUUID,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { DecoratorMessage } from 'src/utils/decorator-message';

export class CreateBookDTO {
  @IsString()
  @IsNotEmpty({ message: DecoratorMessage('title') })
  title: string;

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

  @IsNumber()
  @IsOptional()
  quantity?: number;

  @IsArray()
  @IsString({ each: true })
  @IsUUID('4', { each: true })
  authorsIds: string[];
}
