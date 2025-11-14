import { Column, Entity } from 'typeorm';
import { Content } from './content.entity';

@Entity()
export class Book extends Content {
  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  author: string;

  @Column({ nullable: false, type: 'int' })
  publishedYear: number;

  @Column({ nullable: false })
  isbn: string;
}
