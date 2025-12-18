import { Book } from 'src/entities/book.entity';
import { Repository } from 'typeorm';

export class BookSeeder {
  constructor(private readonly bookRepository: Repository<Book>) {}

  async seed(): Promise<Book[]> {
    const bookData = [
      {
        title: 'Clean Code',
        author: 'Robert C. Martin',
        publishedYear: 2008,
        isbn: '9780132350884',
      },
      {
        title: 'Domain-Driven Design',
        author: 'Eric Evans',
        publishedYear: 2003,
        isbn: '9780321125217',
      },
      {
        title: 'Arquitetura Limpa',
        author: 'Robert C. Martin',
        publishedYear: 2017,
        isbn: '9788550804606',
      },
      {
        title: 'O Programador Pragmático',
        author: 'Andrew Hunt e David Thomas',
        publishedYear: 1999,
        isbn: '9788577807007',
      },
    ];

    const books = this.bookRepository.create(bookData);
    await this.bookRepository.save(books);

    return books;
  }
}
