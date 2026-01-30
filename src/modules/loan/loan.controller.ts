import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { LoanService } from './loan.service';
import { CreateLoanDTO } from './dto/create-loan.dto';
import { LoanResponseDTO } from './dto/loan-response.dto';
import { FindOneParams } from 'src/utils/find-one-params';
import { PaginationQueryDTO } from 'src/common/dto/pagination-query.dto';
import { PaginatedResponseDTO } from 'src/common/dto/paginated-response.dto';
import { User } from 'src/common/decorator/user.decorator';

@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post()
  async create(
    @Body() createLoanDTO: CreateLoanDTO,
    @User('sub') id: string,
  ): Promise<LoanResponseDTO> {
    return this.loanService.create(createLoanDTO, id);
  }

  @Get()
  async findAll(
    @Query() paginationQueryDTO: PaginationQueryDTO,
  ): Promise<PaginatedResponseDTO<LoanResponseDTO>> {
    return this.loanService.findAll(paginationQueryDTO);
  }

  @Post('return/:id')
  async returnBook(
    @Param() findOneParams: FindOneParams,
  ): Promise<LoanResponseDTO> {
    return this.loanService.returnBook(findOneParams.id);
  }

  @Get('user/:id/active')
  async findActiveByUser(
    @Param() findOneParams: FindOneParams,
  ): Promise<LoanResponseDTO[]> {
    return this.loanService.findActiveByUser(findOneParams.id);
  }

  @Get('user/:id')
  async findByUser(
    @Param() findOneParams: FindOneParams,
  ): Promise<LoanResponseDTO[]> {
    return this.loanService.findByUser(findOneParams.id);
  }

  @Get(':id')
  async findOne(
    @Param() findOneParams: FindOneParams,
  ): Promise<LoanResponseDTO> {
    return this.loanService.findOne(findOneParams.id);
  }
}
