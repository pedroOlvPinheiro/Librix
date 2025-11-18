import { Body, Controller, Post } from '@nestjs/common';
import { LoanService } from './loan.service';
import { CreateLoanDTO } from './dto/create-loan.dto';
import { LoanResponseDTO } from './dto/loan-response.dto';

@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post()
  async create(@Body() createLoanDTO: CreateLoanDTO): Promise<LoanResponseDTO> {
    this.loanService.create(createLoanDTO);
  }
}
