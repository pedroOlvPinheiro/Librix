import { Expose } from 'class-transformer';
import { LoanStatusEnum } from 'src/utils/enum/loan-status.enum';

export class LoanResponseDTO {
  @Expose()
  id: string;

  @Expose()
  userId: string;

  @Expose()
  bookId: string;

  @Expose()
  loanDate: Date;

  @Expose()
  dueDate: Date;

  @Expose()
  returnDate: Date;

  @Expose()
  status: LoanStatusEnum;

  @Expose()
  fine: number;

  @Expose()
  daysLate: number;
}
