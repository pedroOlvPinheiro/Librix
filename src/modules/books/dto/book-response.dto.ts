import { Expose, Transform } from 'class-transformer';

export class BookResponseDTO {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  @Transform(({ obj }) => {
    return obj.authors?.map((author) => author.name);
  })
  authors: string[];

  @Expose()
  publishedYear: number;

  @Expose()
  isbn: string;
}
