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
      const [user, book, userActiveLoansCount, isBookLoaned] =
        await Promise.all([
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
      if (userActiveLoansCount >= 3)
        throw new BadRequestException(
          `Usuário atingiu o número máximo de locações`,
        );

      const newLoan = await this.loanRepository.save(
        this.createLoanEntity(user, book),
      );

      return this.toResponseDTO(newLoan);
    } catch (error) {
      if (error.name === 'EntityNotFoundError') {
        throw new NotFoundException('Usuário ou Livro não encontrado');
      }
      throw error;
    }
  }

  async findAll(): Promise<LoanResponseDTO[]> {
    const loans = await this.loanRepository.find({
      relations: { user: true, book: true },
    });

    return loans.map((loan) => this.toResponseDTO(loan));
  }

  async findById(id: string): Promise<LoanResponseDTO> {
    const loan = await this.loanRepository.findOne({
      where: { id },
      relations: { user: true, book: true },
    });
    if (!loan) throw new NotFoundException(`Locação não encontrada`);

    return this.toResponseDTO(loan);
  }

  private createLoanEntity(user: User, book: Book): Partial<Loan> {
    const loanDueDate = new Date();
    loanDueDate.setDate(loanDueDate.getDate() + 14);

    return {
      loanDate: new Date(),
      dueDate: loanDueDate,
      status: LoanStatusEnum.ACTIVE,
      user,
      book,
    };
  }

  private toResponseDTO(plainLoan: Loan): LoanResponseDTO {
    const loanDTO = plainToInstance(LoanResponseDTO, plainLoan, {
      excludeExtraneousValues: true,
    });

    calculateDaysLate(loanDTO.dueDate, loanDTO.returnDate);
    return loanDTO;
  }
}
