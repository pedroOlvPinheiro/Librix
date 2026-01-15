import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { fakerPT_BR as faker } from '@faker-js/faker';
import { Auth } from 'src/entities/auth.entity';
import {
  HASH_SALT,
  USER_SEEDER_PASSWORD,
} from 'src/utils/constants/hash.constants';
import * as bcrypt from 'bcrypt';

export class UserSeeder {
  constructor(
    private readonly userRepository: Repository<User>,
    private readonly authRepository: Repository<Auth>,
  ) {}

  async seed(): Promise<User[]> {
    const userData: Partial<User>[] = [];
    const authData: Auth[] = [];
    const password = await bcrypt.hash(USER_SEEDER_PASSWORD, HASH_SALT);

    for (let i = 0; i < 10; i++) {
      const name = faker.helpers.slugify(faker.person.fullName());

      const partialAuth: Partial<Auth> = {
        email: faker.internet.email({
          firstName: name,
          allowSpecialCharacters: false,
        }),
        password,
      };

      const auth = this.authRepository.create(partialAuth);

      const newUser: Partial<User> = {
        name,
        auth,
      };
      authData.push(auth);
      userData.push(newUser);
    }

    const users = this.userRepository.create(userData);
    await this.userRepository.save(users);
    await this.authRepository.save(authData);

    return users;
  }
}
