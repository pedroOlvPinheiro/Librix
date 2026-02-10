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
import { PaginationQueryDTO } from 'src/common/dto/pagination-query.dto';
import { PaginatedResponseDTO } from 'src/common/dto/paginated-response.dto';
import { RoleEnum } from 'src/utils/enum/role.enum';
import { Role } from 'src/common/decorator/role.decorator';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @Role(RoleEnum.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() book: CreateBookDTO): Promise<void> {
    await this.booksService.create(book);
  }

  @Get()
  @Role(RoleEnum.USER)
  async findAll(
    @Query() paginationQueryDTO: PaginationQueryDTO,
  ): Promise<PaginatedResponseDTO<BookResponseDTO>> {
    return this.booksService.findAll(paginationQueryDTO);
  }

  @Get('search')
  @Role(RoleEnum.USER)
  async searchBy(@Query('title') title: string): Promise<BookResponseDTO[]> {
    return this.booksService.searchBy(title);
  }

  @Get(':id')
  @Role(RoleEnum.USER)
  async findOne(
    @Param() findOneParams: FindOneParams,
  ): Promise<BookResponseDTO> {
    return this.booksService.findOne(findOneParams.id);
  }

  @Patch(':id')
  @Role(RoleEnum.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param() findOneParams: FindOneParams,
    @Body() updateBookDTO: UpdateBookDTO,
  ): Promise<void> {
    await this.booksService.update(findOneParams.id, updateBookDTO);
  }

  @Delete(':id')
  @Role(RoleEnum.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param() findOneParams: FindOneParams): Promise<void> {
    await this.booksService.delete(findOneParams.id);
  }
}
