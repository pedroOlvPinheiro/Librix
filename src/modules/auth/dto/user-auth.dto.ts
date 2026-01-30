import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { DecoratorMessage } from 'src/utils/decorator-message';

export class UserAuthDTO {
  @IsNotEmpty({ message: DecoratorMessage('email') })
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: DecoratorMessage('pasword') })
  @IsString()
  password: string;
}
