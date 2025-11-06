import { Column, CreateDateColumn, Entity } from 'typeorm';
import { Content } from './content.entity';

@Entity()
export class User extends Content {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @CreateDateColumn()
  createdAt: Date;
}
