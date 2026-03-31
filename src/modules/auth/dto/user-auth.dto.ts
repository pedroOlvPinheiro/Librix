import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { DecoratorMessage } from 'src/utils/decorator-message';

export class UserAuthDTO {
  @ApiProperty({
    example: 'Srta.-Maria-Eduarda-Batista.Santos51@yahoo.com',
    description: 'Email do usuário cadastrado',
  })
  @IsNotEmpty({ message: DecoratorMessage('email') })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'userseeder',
    description: 'Senha do usuário cadastrado',
  })
  @IsNotEmpty({ message: DecoratorMessage('password') })
  @IsString()
  password: string;
}
