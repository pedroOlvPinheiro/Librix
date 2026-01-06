import { Book } from 'src/entities/book.entity';
import { Repository } from 'typeorm';
import { fakerPT_BR as faker } from '@faker-js/faker';

export class BookSeeder {
  constructor(private readonly bookRepository: Repository<Book>) {}

  async seed(): Promise<Book[]> {
    const bookData: Partial<Book>[] = [];
    const validIsbn: string[] = [];

    for (let i = 0; i < 10; i++) {
      const newBook: Partial<Book> = {
        title: faker.book.title(),
        author: faker.book.author(),
        publishedYear: new Date(
          faker.date.past({ refDate: new Date(), years: 100 }),
        ).getDate(),
        isbn: faker.string.numeric({
          length: 13,
          exclude: validIsbn,
        }),
      };

      validIsbn.push(String(newBook.isbn));
      bookData.push(newBook);
    }

    const books = this.bookRepository.create(bookData);
    await this.bookRepository.save(books);

    return books;
  }
}
