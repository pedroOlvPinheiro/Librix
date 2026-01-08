import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Loan } from 'src/entities/loan.entity';
import { LoanStatusEnum } from 'src/utils/enum/loan-status.enum';
import { LessThan, Repository } from 'typeorm';

@Injectable()
export class LoanCronService {
  constructor(
    @InjectRepository(Loan)
    private readonly loanRepository: Repository<Loan>,
  ) {}

  private readonly logger = new Logger(LoanCronService.name);

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  public async setToLateRental() {
    const todayDate = new Date();
    this.logger.log(
      `Iniciando verificação de locações atrasadas para o dia ${todayDate}`,
    );

    const { affected } = await this.loanRepository.update(
      { dueDate: LessThan(todayDate), status: LoanStatusEnum.ACTIVE },
      { status: LoanStatusEnum.OVERDUE },
    );

    this.logger.log(
      `Encontradas ${affected} locações atrasadas para o dia ${todayDate}`,
    );
  }
}
