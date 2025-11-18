import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/entities/book.entity';
import { Loan } from 'src/entities/loan.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateLoanDTO } from './dto/create-loan.dto';
import { LoanResponseDTO } from './dto/loan-response.dto';
import { NotFoundError } from 'rxjs';

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
    const user = await this.userRepository.findOneBy({
      id: createLoanDTO.userId,
    });

    const book = await this.bookRepository.findOneBy({
      id: createLoanDTO.bookId,
    });

    if (!book || !user)
      throw new NotFoundException(`Usuário ou livro não encontrados`);
  }
}
