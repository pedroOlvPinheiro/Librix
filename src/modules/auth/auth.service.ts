import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { UserAuthDTO } from './dto/user-auth.dto';
import { Auth } from 'src/entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from './dto/create-user.dto';
import { HASH_SALT } from 'src/utils/constants/hash.constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    private readonly jwtService: JwtService,
    private readonly dataSource: DataSource,
  ) {}

  async signIn(userAuthDTO: UserAuthDTO) {
    const user = await this.authRepository.findOne({
      where: { email: userAuthDTO.email },
      relations: { user: true },
    });
    if (
      !user ||
      !(await bcrypt.compare(userAuthDTO.password, user?.password))
    ) {
      throw new UnauthorizedException(
        `Login ou senha incorreto ou usuário não existe`,
      );
    }
    return {
      access_token: await this.jwtService.signAsync({
        sub: user.id,
        username: user.user.name,
      }),
    };
  }

  async signUp(createUserDTO: CreateUserDTO): Promise<void> {
    const existing = await this.authRepository.exists({
      where: { email: createUserDTO.email },
    });

    if (existing) throw new ConflictException(`Email já existe`);

    const password = await bcrypt.hash(createUserDTO.password, HASH_SALT);

    await this.dataSource.transaction(async (entityManager: EntityManager) => {
      const userRepository = entityManager.getRepository(User);
      const authRepository = entityManager.getRepository(Auth);

      const userData = userRepository.create({ name: createUserDTO.name });
      const authData = authRepository.create({
        email: createUserDTO.email,
        password,
      });

      await userRepository.save(userData);
      await authRepository.save(authData);
    });
  }
}
