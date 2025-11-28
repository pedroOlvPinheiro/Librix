import {
  BadRequestException,
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
import { LOAN_CONFIG } from 'src/constants/loan.constants';

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
      if (userActiveLoansCount >= LOAN_CONFIG.MAX_ACTIVE_LOANS)
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

  async findOne(id: string): Promise<LoanResponseDTO> {
    const loan = await this.loanRepository.findOne({
      where: { id },
      relations: { user: true, book: true },
    });
    if (!loan) throw new NotFoundException(`Empréstimo não encontrada`);

    return this.toResponseDTO(loan);
  }

  async returnBook(id: string): Promise<LoanResponseDTO> {
    const loan = await this.loanRepository.findOne({
      where: { id },
      relations: { user: true, book: true },
    });

    if (!loan) {
      throw new NotFoundException(`Empréstimo não encontrado`);
    }
    if (loan.status === LoanStatusEnum.RETURNED) {
      throw new BadRequestException(`Empréstimo já devolvido`);
    }

    loan.returnDate = new Date();
    loan.fine =
      calculateDaysLate(loan.dueDate, loan.returnDate) *
      LOAN_CONFIG.FINE_PER_DAY;

    loan.status = LoanStatusEnum.RETURNED;

    await this.loanRepository.save(loan);
    return this.toResponseDTO(loan);
  }

  async findActiveByUser(id: string): Promise<LoanResponseDTO[]> {
    const loans = await this.loanRepository.find({
      where: {
        user: { id },
        status: In([LoanStatusEnum.ACTIVE, LoanStatusEnum.OVERDUE]),
      },
      order: { dueDate: 'ASC' },
      relations: { user: true, book: true },
    });

    return loans.map((loan) => this.toResponseDTO(loan));
  }

  async findByUser(id: string): Promise<LoanResponseDTO[]> {
    const loans = await this.loanRepository.find({
      where: { user: { id } },
      relations: { user: true, book: true },
      order: { loanDate: 'DESC' },
    });

    return loans.map((loan) => this.toResponseDTO(loan));
  }

  private createLoanEntity(user: User, book: Book): Partial<Loan> {
    const loanDueDate = new Date();
    loanDueDate.setDate(loanDueDate.getDate() + LOAN_CONFIG.LOAN_DURATION_DAYS);

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

    loanDTO.userId = plainLoan.user.id;
    loanDTO.bookId = plainLoan.book.id;

    calculateDaysLate(loanDTO.dueDate, loanDTO.returnDate);
    return loanDTO;
  }
}
