import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { Content } from './content.entity';
import { Loan } from './loan.entity';
import { Auth } from './auth.entity';

@Entity('user')
export class User extends Content {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @OneToMany(() => Loan, (loan) => loan.user)
  loans: Loan[];

  @OneToOne(() => Auth)
  auth: Auth;
}
