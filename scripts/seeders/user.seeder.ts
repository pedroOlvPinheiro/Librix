import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

export class UserSeeder {
  constructor(private readonly userRepository: Repository<User>) {}

  async seed(): Promise<User[]> {
    const userData = [
      { name: 'Admin Librix', email: 'admin@librix.com' },
      { name: 'João Pedro', email: 'joao@email.com' },
      { name: 'Maria Silva', email: 'maria@email.com' },
      { name: 'Carlos Santos', email: 'carlos@email.com' },
    ];

    const users = this.userRepository.create(userData);
    await this.userRepository.save(users);

    return users;
  }
}
