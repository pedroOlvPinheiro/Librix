import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UserAuthDTO } from './dto/user-auth.dto';
import { Auth } from 'src/entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    private readonly jwtService: JwtService,
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
}
