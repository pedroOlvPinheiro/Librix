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
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Books')
@ApiBearerAuth()
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @ApiOperation({ summary: 'Cadastra um novo livro no acervo' })
  @ApiResponse({ status: 201, description: 'Livro criado com sucesso.' })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou ISBN duplicado.',
  })
  @ApiResponse({
    status: 403,
    description: 'Usuário não tem permissão para acessar essa rota',
  })
  @Post()
  @Role(RoleEnum.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() book: CreateBookDTO): Promise<void> {
    await this.booksService.create(book);
  }

  @ApiOperation({ summary: 'Retorna todos os livros no acervo' })
  @ApiResponse({
    status: 200,
    description: 'Livros retornados com sucesso',
    type: BookResponseDTO,
  })
  @ApiResponse({ status: 401, description: 'Token expirado ou inexistente' })
  @Get()
  @Role(RoleEnum.USER)
  async findAll(
    @Query() paginationQueryDTO: PaginationQueryDTO,
  ): Promise<PaginatedResponseDTO<BookResponseDTO>> {
    return this.booksService.findAll(paginationQueryDTO);
  }

  @ApiOperation({ summary: 'Busca um livro no acervo pelo titulo' })
  @ApiQuery({
    name: 'title',
    required: true,
    description: 'Titulo ou parte do titulo',
    isArray: false,
  })
  @ApiResponse({
    status: 200,
    description: 'Busca realizada com sucesso',
    type: BookResponseDTO,
  })
  @ApiResponse({ status: 401, description: 'Token expirado ou inexistente' })
  @Get('search')
  @Role(RoleEnum.USER)
  async searchBy(@Query('title') title: string): Promise<BookResponseDTO[]> {
    return this.booksService.searchBy(title);
  }

  @ApiOperation({ summary: 'Restaura um livro que sofreu soft delete' })
  @ApiResponse({ status: 204, description: 'Livro restaurado com sucesso' })
  @ApiResponse({ status: 401, description: 'Token expirado ou inexistente' })
  @ApiResponse({
    status: 403,
    description: 'Usuário não tem permissão para acessar essa rota',
  })
  @Patch('restore/:id')
  @Role(RoleEnum.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  async restore(@Param() param: FindOneParams): Promise<void> {
    await this.booksService.restore(param.id);
  }

  @ApiOperation({ summary: 'Busca um livro pelo id' })
  @ApiResponse({
    status: 200,
    description: 'Livro buscado com sucesso',
    type: BookResponseDTO,
  })
  @ApiResponse({ status: 401, description: 'Token expirado ou inexistente' })
  @Get(':id')
  @Role(RoleEnum.USER)
  async findOne(
    @Param() findOneParams: FindOneParams,
  ): Promise<BookResponseDTO> {
    return this.booksService.findOne(findOneParams.id);
  }

  @ApiOperation({ summary: 'Atualiza um livro pelo id' })
  @ApiResponse({ status: 204, description: 'Livro atualizado com sucesso' })
  @ApiResponse({ status: 401, description: 'Token expirado ou inexistente' })
  @ApiResponse({
    status: 403,
    description: 'Usuário não tem permissão para acessar essa rota',
  })
  @Patch(':id')
  @Role(RoleEnum.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(
    @Param() findOneParams: FindOneParams,
    @Body() updateBookDTO: UpdateBookDTO,
  ): Promise<void> {
    await this.booksService.update(findOneParams.id, updateBookDTO);
  }

  @ApiOperation({ summary: 'Aplica soft delete em um livro' })
  @ApiResponse({ status: 204, description: 'Livro removido com sucesso' })
  @ApiResponse({ status: 401, description: 'Token expirado ou inexistente' })
  @ApiResponse({
    status: 403,
    description: 'Usuário não tem permissão para acessar essa rota',
  })
  @Delete(':id')
  @Role(RoleEnum.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param() findOneParams: FindOneParams): Promise<void> {
    await this.booksService.delete(findOneParams.id);
  }
}
