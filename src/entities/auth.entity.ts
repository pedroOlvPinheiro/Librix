import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Content } from './content.entity';
import { User } from './user.entity';

@Entity('auth')
export class Auth extends Content {
  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  password: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
