import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDTO } from './dto/create-book.dto';
import { UpdateBookDTO } from './dto/update-book.dto';
import { BookResponseDTO } from './dto/book-response.dto';
import { plainToInstance } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  create(book: CreateBookDTO) {
    const newBook = this.bookRepository.create(book);
    this.bookRepository.save(newBook);
  }

  async findAll(): Promise<BookResponseDTO[]> {
    const books = await this.bookRepository.find();
    return books.map((book) =>
      plainToInstance(BookResponseDTO, book, { excludeExtraneousValues: true }),
    );
  }

  async findOne(id: string): Promise<BookResponseDTO> {
    const book = await this.bookRepository.findOneBy({ id });

    return plainToInstance(BookResponseDTO, book, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateBookDTO: UpdateBookDTO) {
    const existingBook = await this.bookRepository.findOneBy({ id });

    if (!existingBook) throw new NotFoundException(`Livro não encontrado`);

    await this.bookRepository.save({
      id,
      ...updateBookDTO,
    });
  }

  async delete(id: string) {
    const { affected } = await this.bookRepository.delete({ id });

    if (affected === 0) throw new NotFoundException(`Livro não encontrado`);
  }
}
