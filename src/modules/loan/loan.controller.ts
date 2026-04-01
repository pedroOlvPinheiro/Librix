import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { LoanService } from './loan.service';
import { CreateLoanDTO } from './dto/create-loan.dto';
import { LoanResponseDTO } from './dto/loan-response.dto';
import { FindOneParams } from 'src/utils/find-one-params';
import { PaginationQueryDTO } from 'src/common/dto/pagination-query.dto';
import { PaginatedResponseDTO } from 'src/common/dto/paginated-response.dto';
import { User } from 'src/common/decorator/user.decorator';
import { UserPaginationQueryDTO } from 'src/common/dto/user-pagination.query.dto';
import { RoleEnum } from 'src/utils/enum/role.enum';
import { Role } from 'src/common/decorator/role.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Loans')
@ApiBearerAuth()
@Controller('loans')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @ApiOperation({ summary: 'Cria uma locação no sistema' })
  @ApiResponse({
    status: 201,
    description: 'Locação criada com sucesso',
    type: LoanResponseDTO,
  })
  @ApiResponse({
    status: 401,
    description: 'Token expirado ou inexistente',
  })
  @ApiResponse({
    status: 400,
    description:
      'Todas as cópias do livro foram locadas ou o usuário atingiu o máximo de locações permitidas',
  })
  @Post()
  @Role(RoleEnum.USER)
  async create(
    @Body() createLoanDTO: CreateLoanDTO,
    @User('sub') id: string,
  ): Promise<LoanResponseDTO> {
    return this.loanService.create(createLoanDTO, id);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as locações no sistema' })
  @ApiResponse({
    status: 200,
    description: 'Locações retornadas com sucesso',
    type: LoanResponseDTO,
  })
  @ApiResponse({
    status: 401,
    description: 'Token expirado ou inexistente',
  })
  @ApiResponse({
    status: 403,
    description: 'Usuário não tem permissão para acessar essa rota',
  })
  @Role(RoleEnum.ADMIN)
  async findAll(
    @Query() paginationQueryDTO: PaginationQueryDTO,
  ): Promise<PaginatedResponseDTO<LoanResponseDTO>> {
    return this.loanService.findAll(paginationQueryDTO);
  }

  @ApiOperation({ summary: 'Lista todas as locações de um usuário no sistema' })
  @ApiResponse({
    status: 200,
    description: 'Locações do usuário retornadas com sucesso',
    type: LoanResponseDTO,
  })
  @ApiResponse({
    status: 401,
    description: 'Token expirado ou inexistente',
  })
  @Get('get-my-loans')
  @Role(RoleEnum.USER)
  async getMyLoans(
    @User('sub') id: string,
    @Query() userPaginationQueryDTO: UserPaginationQueryDTO,
  ): Promise<PaginatedResponseDTO<LoanResponseDTO>> {
    return this.loanService.getMyLoans(id, userPaginationQueryDTO);
  }

  @ApiOperation({ summary: 'Retorna a locação de um livro(Devolução)' })
  @ApiResponse({
    status: 200,
    description: 'Livro devolvido com sucesso',
    type: LoanResponseDTO,
  })
  @ApiResponse({
    status: 401,
    description: 'Token expirado ou inexistente',
  })
  @ApiResponse({
    status: 404,
    description: 'Empréstimo não encontrado ou livro já devolvido',
  })
  @Post('return/:id')
  @Role(RoleEnum.USER)
  async returnLoan(
    @Param() findOneParams: FindOneParams,
    @User('sub') id: string,
  ): Promise<LoanResponseDTO> {
    return this.loanService.returnLoan(findOneParams.id, id);
  }

  @ApiOperation({
    summary: 'Retorna as locações ativas ou atrasadas de um usuário',
  })
  @ApiResponse({
    status: 200,
    description: 'Locações retornadas com sucesso',
    type: LoanResponseDTO,
  })
  @ApiResponse({
    status: 401,
    description: 'Token expirado ou inexistente',
  })
  @ApiResponse({
    status: 403,
    description: 'Usuário não tem permissão para acessar essa rota',
  })
  @Get('user/:id/active')
  @Role(RoleEnum.ADMIN)
  async findActiveByUser(
    @Param() findOneParams: FindOneParams,
  ): Promise<LoanResponseDTO[]> {
    return this.loanService.findActiveByUser(findOneParams.id);
  }

  @ApiOperation({
    summary: 'Retorna as locações de um único usuário',
  })
  @ApiResponse({
    status: 200,
    description: 'Locações retornadas com sucesso',
    type: LoanResponseDTO,
  })
  @ApiResponse({
    status: 401,
    description: 'Token expirado ou inexistente',
  })
  @ApiResponse({
    status: 403,
    description: 'Usuário não tem permissão para acessar essa rota',
  })
  @Get('user/:id')
  @Role(RoleEnum.ADMIN)
  async findByUser(
    @Param() findOneParams: FindOneParams,
  ): Promise<LoanResponseDTO[]> {
    return this.loanService.findByUser(findOneParams.id);
  }

  @ApiOperation({
    summary: 'Retorna uma locação por ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Locação retornada com sucesso',
    type: LoanResponseDTO,
  })
  @ApiResponse({
    status: 401,
    description: 'Token expirado ou inexistente',
  })
  @ApiResponse({
    status: 403,
    description: 'Usuário não tem permissão para acessar essa rota',
  })
  @Get(':id')
  @Role(RoleEnum.ADMIN)
  async findOne(
    @Param() findOneParams: FindOneParams,
  ): Promise<LoanResponseDTO> {
    return this.loanService.findOne(findOneParams.id);
  }
}
