import { Column, Entity, ManyToMany } from 'typeorm';
import { Content } from './content.entity';
import { Book } from './book.entity';

@Entity('author')
export class Author extends Content {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: true, default: null })
  bio?: string;

  @Column({ type: 'date', nullable: true, default: null })
  birthDate?: Date;

  @ManyToMany(() => Book, (book) => book.authors, { nullable: true })
  books?: Book[];
}
