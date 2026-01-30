import { IsNotEmpty, IsUUID } from 'class-validator';
import { DecoratorMessage } from 'src/utils/decorator-message';

export class CreateLoanDTO {
  @IsUUID()
  @IsNotEmpty({ message: DecoratorMessage('userId') })
  userId: string;

  @IsUUID()
  @IsNotEmpty({ message: DecoratorMessage('bookId') })
  bookId: string;
}
