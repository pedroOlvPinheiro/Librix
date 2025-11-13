import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserResponseDTO } from './dto/user-response.dto';
import { plainToInstance } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDTO): Promise<void> {
    const newUser = this.userRepository.create(user);
    await this.userRepository.save(newUser);
  }

  async findAll(): Promise<UserResponseDTO[]> {
    const allUsers = await this.userRepository.find();

    return allUsers.map((user) =>
      plainToInstance(UserResponseDTO, user, {
        excludeExtraneousValues: true,
      }),
    );
  }

  async searchBy(name?: string, email?: string) {
    if (!name && !email) return;

    const where = [
      name && { name: ILike(`%${name}%`) },
      email && { email: ILike(`%${email}%`) },
    ].filter(Boolean) as FindOptionsWhere<User>[];

    const users = await this.userRepository.find({
      where: where.length ? where : undefined,
    });

    return users;
  }

  async findOne(id: string): Promise<UserResponseDTO> {
    const user = await this.userRepository.findOneBy({ id: id });

    if (!user) throw new NotFoundException(`Usuário não encontado`);

    return plainToInstance(UserResponseDTO, user, {
      excludeExtraneousValues: true,
    });
  }

  async update(id: string, user: UpdateUserDTO): Promise<void> {
    const userToUpdate = await this.userRepository.preload({
      id,
      ...user,
    });

    if (!userToUpdate) throw new NotFoundException(`Usuário não encontrado`);

    await this.userRepository.save(userToUpdate);
  }

  async delete(id: string): Promise<void> {
    const { affected } = await this.userRepository.delete({ id });

    if (affected === 0) throw new NotFoundException(`Usuário não encontrado`);
  }
}
