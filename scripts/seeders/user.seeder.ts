import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { fakerPT_BR as faker } from '@faker-js/faker';
import { Auth } from 'src/entities/auth.entity';
import { HASH_SALT } from 'src/utils/constants/hash.constants';

export class UserSeeder {
  constructor(
    private readonly userRepository: Repository<User>,
    private readonly authRepository: Repository<Auth>,
  ) {}

  async seed(): Promise<User[]> {
    const userData: Partial<User>[] = [];
    const authData: Auth[] = [];
    const bcrypt = require('bcrypt');

    for (let i = 0; i < 10; i++) {
      const name = faker.helpers.slugify(faker.person.fullName());

      const newAuth: Partial<Auth> = {
        email: faker.internet.email({
          firstName: name,
          allowSpecialCharacters: false,
        }),
        password: await bcrypt.hash(name, HASH_SALT),
      };
      const auth = this.authRepository.create(newAuth);

      const newUser: Partial<User> = {
        name,
        auth,
      };
      userData.push(newUser);
      authData.push(auth);
    }

    await this.authRepository.save(authData);
    const users = this.userRepository.create(userData);
    await this.userRepository.save(users);

    return users;
  }
}
