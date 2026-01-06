import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { Content } from './content.entity';
import { LoanStatusEnum } from 'src/utils/enum/loan-status.enum';
import { User } from './user.entity';
import { Book } from './book.entity';

@Entity('loan')
export class Loan extends Content {
  @Column({ type: 'timestamp', nullable: false })
  loanDate: Date;

  @Column({ type: 'timestamp', nullable: false })
  dueDate: Date;

  //SEMPRE COMEÇA NULL -> É A DATA QUE O USER DEVOLVE O LIVRO
  @Column({ type: 'timestamp', nullable: true })
  returnDate: Date | null;

  @Column({
    type: 'enum',
    nullable: false,
    enum: LoanStatusEnum,
    default: LoanStatusEnum.ACTIVE,
  })
  status: LoanStatusEnum;

  //COMEÇA 0 E É CALCULADO NOVAMENTE NO DIA DE RETORNO DO LIVRO (RETURNDATE)
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    nullable: false,
  })
  fine: number;

  @UpdateDateColumn({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.loans)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'uuid', nullable: false, name: 'user_id' })
  userId: string;

  @ManyToOne(() => Book, (book) => book.loans)
  @JoinColumn({ name: 'book_id' })
  book: Book;

  @Column({ type: 'uuid', nullable: false, name: 'book_id' })
  bookId: string;
}
