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
    const user = await this.userRepository.findOneByOrFail({
      id: createLoanDTO.userId,
    });

    const book = await this.bookRepository.findOneOrFail({
      where: { id: createLoanDTO.bookId },
      relations: { loans: true },
    });

    const loansByUser = await this.loanRepository.findAndCount({
      where: { user: { id: user.id } },
      relations: { user: true },
    });

    if (
      book.loans.find(
        (loan) =>
          loan.status === LoanStatusEnum.ACTIVE ||
          loan.status === LoanStatusEnum.OVERDUE,
      )
    ) {
      throw new BadRequestException(`Livro já locado`);
    }

    if (loansByUser[1] > 3) {
      throw new BadRequestException(`Usuário atingiu o limite de locações`);
    }

    const partialLoan = this.buildLoan(user, book);
    const newLoan = await this.loanRepository.save(partialLoan);

    return plainToInstance(LoanResponseDTO, newLoan, {
      excludeExtraneousValues: true,
    });
  }

  private buildLoan(user: User, book: Book): Partial<Loan> {
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
