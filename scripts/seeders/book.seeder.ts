import { Book } from 'src/entities/book.entity';
import { Repository } from 'typeorm';
import { fakerPT_BR as faker } from '@faker-js/faker';
import { Author } from 'src/entities/author.entity';

export class BookSeeder {
  constructor(
    private readonly bookRepository: Repository<Book>,
    private readonly authors: Author[],
  ) {}

  async seed(): Promise<Book[]> {
    const bookData: Partial<Book>[] = [];
    const validIsbn: string[] = [];

    for (let i = 0; i < 10; i++) {
      const selectedAuthors = faker.helpers.arrayElements(this.authors, {
        min: 1,
        max: 2,
      });

      const newBook: Partial<Book> = {
        title: faker.book.title(),
        publishedYear: new Date(
          faker.date.past({ refDate: new Date(), years: 100 }),
        ).getFullYear(),
        isbn: faker.string.numeric({
          length: 13,
          exclude: validIsbn,
        }),
        authors: selectedAuthors,
      };

      validIsbn.push(String(newBook.isbn));
      bookData.push(newBook);
    }

    const books = this.bookRepository.create(bookData);
    await this.bookRepository.save(books);

    return books;
  }
}
