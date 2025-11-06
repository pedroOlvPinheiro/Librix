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
  findAll(): BookResponseDTO[] {
    return this.booksService.findAll();
  }

  @Get('find-one')
  findOne(
    @Query('id') id?: string,
    @Query('title') title?: string,
  ): BookResponseDTO | undefined {
    return this.booksService.findOne(id, title);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  Update(
    @Param() findOneParams: FindOneParams,
    @Body() updateBookDTO: UpdateBookDTO,
  ) {
    this.booksService.update(findOneParams.id, updateBookDTO);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  Delete(@Param() findOneParams: FindOneParams) {
    return this.booksService.delete(findOneParams.id);
  }
}
