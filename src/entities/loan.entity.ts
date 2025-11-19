import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Content } from './content.entity';
import { LoanStatusEnum } from 'src/utils/enum/loan-status.enum';
import { User } from './user.entity';
import { Book } from './book.entity';

@Entity('loan')
export class Loan extends Content {
  @Column({ nullable: false })
  loanDate: Date;

  @Column({ nullable: false })
  dueDate: Date;

  @Column({ nullable: true })
  returnDate: Date;

  @Column({
    nullable: false,
    enum: LoanStatusEnum,
    default: LoanStatusEnum.ACTIVE,
  })
  status: LoanStatusEnum;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    nullable: false,
  })
  fine: Number;

  @Column({ nullable: true })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.loans)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Book, (book) => book.loans)
  @JoinColumn({ name: 'book_id' })
  book: Book;
}
