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
  create(@Body() book: CreateBookDTO) {
    this.booksService.create(book);
  }

  @Get()
  async findAll(): Promise<BookResponseDTO[]> {
    return this.booksService.findAll();
  }

  @Get('search')
  async searchBy(
    @Query('title') title: string,
  ): Promise<Partial<BookResponseDTO[]>> {
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
  async Update(
    @Param() findOneParams: FindOneParams,
    @Body() updateBookDTO: UpdateBookDTO,
  ) {
    await this.booksService.update(findOneParams.id, updateBookDTO);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async Delete(@Param() findOneParams: FindOneParams) {
    await this.booksService.delete(findOneParams.id);
  }
}
