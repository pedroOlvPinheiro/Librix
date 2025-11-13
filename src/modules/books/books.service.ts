import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDTO } from './dto/create-book.dto';
import { UpdateBookDTO } from './dto/update-book.dto';
import { BookResponseDTO } from './dto/book-response.dto';
import { plainToInstance } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/entities/book.entity';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async create(book: CreateBookDTO): Promise<void> {
    const newBook = this.bookRepository.create(book);
    await this.bookRepository.save(newBook);
  }

  async findAll(): Promise<BookResponseDTO[]> {
    const books = await this.bookRepository.find();
    return books.map((book) =>
      plainToInstance(BookResponseDTO, book, { excludeExtraneousValues: true }),
    );
  }

  async searchBy(title: string): Promise<BookResponseDTO[]> {
    if (!title) return [];

    const booksSearch = await this.bookRepository.find({
      where: { title: ILike(`%${title}%`) },
    });

    return booksSearch.map((book) =>
      plainToInstance(BookResponseDTO, book, { excludeExtraneousValues: true }),
    );
  }

  async findOne(id: string): Promise<BookResponseDTO> {
    const book = await this.bookRepository.findOneBy({ id });

    if (!book) throw new NotFoundException(`Livro não encontrado`);

    return plainToInstance(BookResponseDTO, book, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, updateBookDTO: UpdateBookDTO): Promise<void> {
    const bookToUpdate = await this.bookRepository.preload({
      id,
      ...updateBookDTO,
    });

    if (!bookToUpdate) throw new NotFoundException(`Livro não encontrado`);

    await this.bookRepository.save(bookToUpdate);
  }

  async delete(id: string): Promise<void> {
    const { affected } = await this.bookRepository.delete({ id });

    if (affected === 0) throw new NotFoundException(`Livro não encontrado`);
  }
}
