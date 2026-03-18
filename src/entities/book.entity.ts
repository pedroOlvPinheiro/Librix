import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { Content } from './content.entity';
import { Loan } from './loan.entity';
import { Author } from './author.entity';

@Entity('book')
export class Book extends Content {
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ nullable: false, type: 'int' })
  publishedYear: number;

  @Column({ type: 'varchar', nullable: false, unique: true })
  isbn: string;

  @OneToMany(() => Loan, (loans) => loans.book)
  loans: Loan[];

  @ManyToMany(() => Author, (author) => author.books, {
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'author_book',
    joinColumn: {
      name: 'id_book',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'id_author',
      referencedColumnName: 'id',
    },
  })
  authors: Author[];
}
