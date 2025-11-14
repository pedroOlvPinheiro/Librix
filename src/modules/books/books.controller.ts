import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDTO } from './dto/create-book.dto';
import { UpdateBookDTO } from './dto/update-book.dto';
import { FindOneParams } from 'src/utils/find-one-params';
import { BookResponseDTO } from './dto/book-response.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() book: CreateBookDTO): Promise<void> {
    await this.booksService.create(book);
  }

  @Get()
  async findAll(): Promise<BookResponseDTO[]> {
    return this.booksService.findAll();
  }

  @Get('search')
  async searchBy(@Query('title') title: string): Promise<BookResponseDTO[]> {
    return this.booksService.searchBy(title);
  }

  @Get(':id')
  async findOne(
    @Param() findOneParams: FindOneParams,
  ): Promise<BookResponseDTO> {
    return this.booksService.findOne(findOneParams.id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param() findOneParams: FindOneParams,
    @Body() updateBookDTO: UpdateBookDTO,
  ): Promise<void> {
    await this.booksService.update(findOneParams.id, updateBookDTO);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param() findOneParams: FindOneParams): Promise<void> {
    await this.booksService.delete(findOneParams.id);
  }
}
