import { Column, Entity, OneToMany } from 'typeorm';
import { Content } from './content.entity';
import { Loan } from './loan.entity';

@Entity('book')
export class Book extends Content {
  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  author: string;

  @Column({ nullable: false, type: 'int' })
  publishedYear: number;

  @Column({ nullable: false })
  isbn: string;

  @OneToMany(() => Loan, (loan) => loan.book)
  loan: Loan;
}
