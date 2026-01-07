import { Book } from 'src/entities/book.entity';
import { Loan } from 'src/entities/loan.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { fakerPT_BR as faker } from '@faker-js/faker';
import { LOAN_CONFIG } from 'src/utils/constants/loan.constants';
import { LoanStatusEnum } from 'src/utils/enum/loan-status.enum';

export class LoanSeeder {
  constructor(
    private readonly loanRepository: Repository<Loan>,
    private readonly users: User[],
    private readonly books: Book[],
  ) {}

  async seed(): Promise<Loan[]> {
    const loansData: Partial<Loan>[] = [];

    for (const user of this.users) {
      const quantity = faker.number.int({ min: 0, max: 3 });

      if (quantity === 0) continue; //se a quantidade for igual a 0, o usuário não tem locações pra fazer, por isso vamos pular para a próxima iteração

      for (let i = 0; i < quantity; i++) {
        const status = faker.helpers.arrayElement([
          LoanStatusEnum.ACTIVE,
          LoanStatusEnum.OVERDUE,
          LoanStatusEnum.RETURNED,
        ]);

        const { loanDate, dueDate, returnDate } = this.handleDateStatus(status);

        if (this.books.length !== 0) {
          const book = this.books.shift();
          if (book === undefined) break;

          const newLoan: Partial<Loan> = {
            loanDate,
            dueDate,
            status,
            returnDate: returnDate ?? null,
            user,
            userId: user.id,
            book,
            bookId: book?.id,
          };
          loansData.push(newLoan);
        }
      }
    }

    const loans = this.loanRepository.create(loansData);
    await this.loanRepository.save(loans);

    return loans;
  }

  private handleDateStatus(status: LoanStatusEnum): {
    loanDate: Date;
    dueDate: Date;
    returnDate?: Date;
  } {
    const anchorDate = new Date('2025-10-01T00:00:00.000Z');
    const pastAnchorDate = new Date('2025-09-01T00:00:00.000Z');

    if (status === LoanStatusEnum.ACTIVE) {
      const loanDate = faker.date.recent({
        days: 10,
        refDate: anchorDate,
      });

      const dueDate = new Date(loanDate);
      dueDate.setDate(loanDate.getDate() + LOAN_CONFIG.LOAN_DURATION_DAYS);

      return { loanDate, dueDate };
    } else {
      const loanDate = faker.date.recent({ days: 30, refDate: pastAnchorDate });
      const dueDate = new Date(loanDate);
      dueDate.setDate(loanDate.getDate() + LOAN_CONFIG.LOAN_DURATION_DAYS);

      if (status === LoanStatusEnum.RETURNED) {
        const returnDate = faker.date.between({ from: loanDate, to: dueDate });
        return { loanDate, dueDate, returnDate };
      }
      return { loanDate, dueDate };
    }
  }
}
