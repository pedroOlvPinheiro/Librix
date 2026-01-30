import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { DecoratorMessage } from 'src/utils/decorator-message';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty({ message: DecoratorMessage('name') })
  name: string;

  @IsEmail({}, { message: DecoratorMessage('email') })
  email: string;

  @IsString()
  @IsNotEmpty({ message: DecoratorMessage('password') })
  password: string;
}
