import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserAuthDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
