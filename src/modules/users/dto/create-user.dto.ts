import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { DecoratorMessage } from '../../../utils/decorator-message';
import { Transform, TransformFnParams } from 'class-transformer';

function lowerCaseTransformer(params: TransformFnParams) {
  return params.value.toLowerCase();
}

export class CreateUserDTO {
  @IsEmail({}, { message: DecoratorMessage('email') })
  email: string;

  @IsString()
  @Transform(lowerCaseTransformer)
  @IsNotEmpty({ message: DecoratorMessage('name') })
  name: string;
}
