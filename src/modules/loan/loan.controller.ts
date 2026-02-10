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

@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post()
  @Role(RoleEnum.USER)
  async create(
    @Body() createLoanDTO: CreateLoanDTO,
    @User('sub') id: string,
  ): Promise<LoanResponseDTO> {
    return this.loanService.create(createLoanDTO, id);
  }

  @Get()
  @Role(RoleEnum.ADMIN)
  async findAll(
    @Query() paginationQueryDTO: PaginationQueryDTO,
  ): Promise<PaginatedResponseDTO<LoanResponseDTO>> {
    return this.loanService.findAll(paginationQueryDTO);
  }

  @Get('get-my-loans')
  @Role(RoleEnum.USER)
  async getMyLoans(
    @User('sub') id: string,
    @Query() userPaginationQueryDTO: UserPaginationQueryDTO,
  ): Promise<PaginatedResponseDTO<LoanResponseDTO>> {
    return this.loanService.getMyLoans(id, userPaginationQueryDTO);
  }

  @Post('return/:id')
  @Role(RoleEnum.USER)
  async returnLoan(
    @Param() findOneParams: FindOneParams,
    @User('sub') id: string,
  ): Promise<LoanResponseDTO> {
    return this.loanService.returnLoan(findOneParams.id, id);
  }

  @Get('user/:id/active')
  @Role(RoleEnum.ADMIN)
  async findActiveByUser(
    @Param() findOneParams: FindOneParams,
  ): Promise<LoanResponseDTO[]> {
    return this.loanService.findActiveByUser(findOneParams.id);
  }

  @Get('user/:id')
  @Role(RoleEnum.ADMIN)
  async findByUser(
    @Param() findOneParams: FindOneParams,
  ): Promise<LoanResponseDTO[]> {
    return this.loanService.findByUser(findOneParams.id);
  }

  @Get(':id')
  @Role(RoleEnum.ADMIN)
  async findOne(
    @Param() findOneParams: FindOneParams,
  ): Promise<LoanResponseDTO> {
    return this.loanService.findOne(findOneParams.id);
  }
}
