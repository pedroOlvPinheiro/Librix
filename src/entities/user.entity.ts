import { Column, Entity, OneToMany } from 'typeorm';
import { Content } from './content.entity';
import { Loan } from './loan.entity';

@Entity('user')
export class User extends Content {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @OneToMany(() => Loan, (loan) => loan.user)
  loans: Loan[];
}
