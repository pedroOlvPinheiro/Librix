import { Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Loan } from 'src/entities/loan.entity';
import { Repository } from 'typeorm';

class LoanCronService {
  constructor(
    private readonly loanRepository: Repository<Loan>,
    private readonly logger = new Logger(LoanCronService.name),
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  private async setToLateRental() {
    //Pronto por enquanto
  }
}
