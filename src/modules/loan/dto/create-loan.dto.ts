import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { DecoratorMessage } from 'src/utils/decorator-message';

export class CreateLoanDTO {
  @ApiProperty({
    example: 'bc2d0f53-5041-46e8-a14c-267875a49f0d',
    description: 'UUID do livro que está sendo locado',
  })
  @IsUUID()
  @IsNotEmpty({ message: DecoratorMessage('bookId') })
  bookId: string;
}
