import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { fakerPT_BR as faker } from '@faker-js/faker';

export class UserSeeder {
  constructor(private readonly userRepository: Repository<User>) {}

  async seed(): Promise<User[]> {
    const userData: Partial<User>[] = [];

    for (let i = 0; i < 10; i++) {
      const name = faker.helpers.slugify(faker.person.fullName());
      const newUser: Partial<User> = {
        name,
        email: faker.internet.email({ firstName: name }),
      };
      userData.push(newUser);
    }

    const users = this.userRepository.create(userData);
    await this.userRepository.save(users);

    return users;
  }
}
