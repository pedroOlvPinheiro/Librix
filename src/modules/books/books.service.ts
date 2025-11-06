import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from 'src/entities/book.entity';
import { CreateBookDTO } from './dto/create-book.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateBookDTO } from './dto/update-book.dto';
import { BookResponseDTO } from './dto/book-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class BooksService {
  private readonly books: Book[] = [];

  create(book: CreateBookDTO) {
    const newBook = this.buildBook(book);
    this.books.push(newBook);
  }

  findAll(): BookResponseDTO[] {
    return this.books.map((book) =>
      plainToInstance(BookResponseDTO, book, { excludeExtraneousValues: true }),
    );
  }

  findOne(id?: string, title?: string): BookResponseDTO | undefined {
    const normalizedTitle = title?.toLowerCase();

    const book = this.books.find(
      (book) =>
        (id && book.id === id) ||
        (normalizedTitle && book.title.toLowerCase().includes(normalizedTitle)),
    );

    return plainToInstance(BookResponseDTO, book, {
      excludeExtraneousValues: true,
    });
  }

  update(id: string, updateBookDTO: UpdateBookDTO) {
    const currentBookIndex = this.books.findIndex((book) => book.id === id);

    if (currentBookIndex === -1) {
      throw new NotFoundException(`Livro não encontrado`);
    }

    this.books[currentBookIndex] = {
      ...this.books[currentBookIndex],
      ...updateBookDTO,
    };
  }

  delete(id: string) {
    const bookIndex = this.books.findIndex((book) => book.id === id);

    if (bookIndex === -1) {
      throw new NotFoundException(`Livro não encontrado`);
    }

    this.books.splice(bookIndex, 1);
  }

  buildBook(book: CreateBookDTO): Book {
    return {
      id: uuidv4(),

      title: book.title,

      author: book.author,

      publishedYear: book.publishedYear,

      isbn: book.isbn,

      createdAt: new Date(),
    };
  }
}
