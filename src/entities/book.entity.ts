import { Column, Entity, OneToMany } from 'typeorm';
import { Content } from './content.entity';
import { Loan } from './loan.entity';

@Entity('book')
export class Book extends Content {
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: false })
  author: string;

  @Column({ nullable: false, type: 'int' })
  publishedYear: number;

  @Column({ type: 'varchar', nullable: false, unique: true })
  isbn: string;

  @OneToMany(() => Loan, (loans) => loans.book)
  loans: Loan[];
}
