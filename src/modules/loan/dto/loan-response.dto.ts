import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { LoanStatusEnum } from 'src/utils/enum/loan-status.enum';

export class LoanResponseDTO {
  @ApiProperty({
    example: 'bc2d0f53-5041-46e8-a14c-267875a49f0d',
    description: 'UUID da locação',
  })
  @Expose()
  id: string;

  @ApiProperty({
    example: 'bc2d0f53-5041-46e8-a14c-267875a49f0d',
    description: 'UUID do usuário relacionado com a locação',
  })
  @Expose()
  userId: string;

  @ApiProperty({
    example: 'bc2d0f53-5041-46e8-a14c-267875a49f0d',
    description: 'UUID do livro relacionado com a locação',
  })
  @Expose()
  bookId: string;

  @ApiProperty({
    example: '2024-03-25T12:00:00Z',
    description: 'Data da locação',
  })
  @Expose()
  loanDate: Date;

  @ApiProperty({
    example: '2024-03-25T12:00:00Z',
    description: 'Data da devolução do livro',
  })
  @Expose()
  dueDate: Date;

  @ApiProperty({
    example: '2024-03-25T12:00:00Z',
    description: 'Data que o livro foi devolvido',
  })
  @Expose()
  returnDate: Date;

  @ApiProperty({
    example: LoanStatusEnum.ACTIVE,
    description: 'Status da locação(ativa, atrasada, devolvida)',
  })
  @Expose()
  status: LoanStatusEnum;

  @ApiProperty({
    example: 14.0,
    description: 'Taxa cobrada pelo tempo de atraso na devolução do livro',
  })
  @Expose()
  fine: number;

  @ApiProperty({
    example: 7,
    description: 'Dias de atraso na devolução do livro',
  })
  @Expose()
  daysLate: number;
}
