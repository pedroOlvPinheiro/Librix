import { CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export abstract class Content {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;
}
