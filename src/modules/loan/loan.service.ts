import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/entities/book.entity';
import { Loan } from 'src/entities/loan.entity';
import { User } from 'src/entities/user.entity';
import { In, Not, Repository } from 'typeorm';
import { CreateLoanDTO } from './dto/create-loan.dto';
import { LoanResponseDTO } from './dto/loan-response.dto';
import { LoanStatusEnum } from 'src/utils/enum/loan-status.enum';
import { plainToInstance } from 'class-transformer';
import { calculateDaysLate } from 'src/utils/calculate-days-late';

@Injectable()
export class LoanService {
  constructor(
    @InjectRepository(Loan)
    private readonly loanRepository: Repository<Loan>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async create(createLoanDTO: CreateLoanDTO): Promise<LoanResponseDTO> {
    try {
      const [user, book, activeLoansCount, isBookLoaned] = await Promise.all([
        this.userRepository.findOneByOrFail({ id: createLoanDTO.userId }),

        this.bookRepository.findOneByOrFail({ id: createLoanDTO.bookId }),

        this.loanRepository.count({
          where: {
            user: { id: createLoanDTO.userId },
            status: In([LoanStatusEnum.ACTIVE, LoanStatusEnum.OVERDUE]),
          },
        }),

        this.loanRepository.exists({
          where: {
            book: { id: createLoanDTO.bookId },
            status: In([LoanStatusEnum.ACTIVE, LoanStatusEnum.OVERDUE]),
          },
        }),
      ]);

      if (isBookLoaned) throw new BadRequestException(`Livro já locado`);
      if (activeLoansCount >= 3)
        throw new BadRequestException(
          `Usuário atingiu o número máximo de locações`,
        );

      const newLoan = await this.loanRepository.save(
        this.createLoanEntity(user, book),
      );

      const newLoanDTO = plainToInstance(LoanResponseDTO, newLoan, {
        excludeExtraneousValues: true,
      });
      newLoanDTO.daysLate = calculateDaysLate(
        newLoanDTO.dueDate,
        newLoanDTO.returnDate,
      );

      return newLoanDTO;
    } catch (error) {
      if (error.name === 'EntityNotFoundError') {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  private createLoanEntity(user: User, book: Book): Partial<Loan> {
    const loanDueDate = new Date();
    loanDueDate.setDate(loanDueDate.getDate() + 14);

    return {
      loanDate: new Date(),
      dueDate: loanDueDate,
      user,
      book,
    };
  }
}
