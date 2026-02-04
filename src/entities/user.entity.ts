import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { Content } from './content.entity';
import { Loan } from './loan.entity';
import { Auth } from './auth.entity';
import { RoleEnum } from 'src/utils/enum/role.enum';

@Entity('user')
export class User extends Content {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({
    type: 'enum',
    enum: RoleEnum,
    nullable: false,
    default: RoleEnum.USER,
  })
  role: RoleEnum;

  @OneToMany(() => Loan, (loan) => loan.user)
  loans: Loan[];

  @OneToOne(() => Auth)
  auth: Auth;
}
