import { Expose } from 'class-transformer';

export class BookResponseDTO {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  author: string;

  @Expose()
  publishedYear: number;

  @Expose()
  isbn: string;
}
