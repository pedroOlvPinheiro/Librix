import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { DecoratorMessage } from 'src/utils/decorator-message';

export class CreateUserDTO {
  @ApiProperty({
    example: 'Pedro Oliveira da Silva',
    description: 'Nome do usuário que está se cadastrando',
  })
  @IsString()
  @IsNotEmpty({ message: DecoratorMessage('name') })
  name: string;

  @ApiProperty({
    example: 'exemplo@email.com',
    description: 'Email do usuário que está se cadastrando',
  })
  @IsEmail({}, { message: DecoratorMessage('email') })
  email: string;

  @ApiProperty({
    example: 'senha',
    description: 'Senha do usuário que está se cadastrando',
  })
  @IsString()
  @IsNotEmpty({ message: DecoratorMessage('password') })
  password: string;
}
