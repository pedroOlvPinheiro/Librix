import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LoanService } from './loan.service';
import { CreateLoanDTO } from './dto/create-loan.dto';
import { LoanResponseDTO } from './dto/loan-response.dto';
import { FindOneParams } from 'src/utils/find-one-params';

@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post()
  async create(@Body() createLoanDTO: CreateLoanDTO): Promise<LoanResponseDTO> {
    return this.loanService.create(createLoanDTO);
  }

  @Get()
  async findAll(): Promise<LoanResponseDTO[]> {
    return this.loanService.findAll();
  }

  @Post('return/:id')
  async returnBook(
    @Param() findOneParams: FindOneParams,
  ): Promise<LoanResponseDTO> {
    return this.loanService.returnBook(findOneParams.id);
  }

  @Get(':id')
  async findOne(
    @Param() findOneParams: FindOneParams,
  ): Promise<LoanResponseDTO> {
    return this.loanService.findOne(findOneParams.id);
  }
}
