import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookDTO } from './dto/create-book.dto';
import { UpdateBookDTO } from './dto/update-book.dto';
import { BookResponseDTO } from './dto/book-response.dto';
import { plainToInstance } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/entities/book.entity';
import { ILike, Repository } from 'typeorm';
import { PaginationQueryDTO } from 'src/common/dto/pagination-query.dto';
import { PaginatedResponseDTO } from 'src/common/dto/paginated-response.dto';
import { createPaginationMeta } from 'src/utils/pagination.helper';

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

  async findAll(
    paginationQueryDTO: PaginationQueryDTO,
  ): Promise<PaginatedResponseDTO<BookResponseDTO>> {
    const { page, limit } = paginationQueryDTO;
    const skip = (page - 1) * limit;

    const [books, total] = await this.bookRepository.findAndCount({
      take: limit,
      skip,
      order: { createdAt: 'ASC' },
    });

    return {
      data: books.map((book) =>
        plainToInstance(BookResponseDTO, book, {
          excludeExtraneousValues: true,
        }),
      ),
      meta: createPaginationMeta(total, page, limit),
    };
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
