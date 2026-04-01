import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';

export class BookResponseDTO {
  @ApiProperty({
    example: 'ed30de37-505a-4b59-82b0-93c2f1b31862',
    description: 'UUID do livro',
  })
  @Expose()
  id: string;

  @ApiProperty({
    example: 'Pedra Bonita',
    description: 'Titulo do livro',
  })
  @Expose()
  title: string;

  @ApiProperty({
    example: ['Raul Nogueira', 'Isaac Albuquerque'],
    description: 'Autor(es) relacionado(s) ao livro',
  })
  @Expose()
  @Transform(({ obj }) => {
    return obj.authors?.map((author) => author.name);
  })
  authors: string[];

  @ApiProperty({
    example: 1968,
    description: 'Ano de publicação do livro',
  })
  @Expose()
  publishedYear: number;

  @ApiProperty({
    example: '2186978865789',
    description: 'Identificador único do livro',
  })
  @Expose()
  isbn: string;

  @ApiProperty({
    example: 1,
    description: 'Quantidade total de exemplares no acervo',
  })
  @Expose()
  quantity: string;
}
