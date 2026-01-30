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
    const userData: User[] = [];
    const authData: Partial<Auth>[] = [];
    const password = await bcrypt.hash(USER_SEEDER_PASSWORD, HASH_SALT);

    for (let i = 0; i < 10; i++) {
      const name = faker.helpers.slugify(faker.person.fullName());

      const newUser: Partial<User> = {
        name,
      };
      const user = this.userRepository.create(newUser);

      const partialAuth: Partial<Auth> = {
        email: faker.internet.email({
          firstName: name,
          allowSpecialCharacters: false,
        }),
        password,
        user,
      };

      authData.push(partialAuth);
      userData.push(user);
    }

    await this.userRepository.save(userData);
    const auth = this.authRepository.create(authData);
    await this.authRepository.save(auth);

    return userData;
  }
}
