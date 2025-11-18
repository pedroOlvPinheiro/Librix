import { IsUUID } from 'class-validator';

export class CreateLoanDTO {
  @IsUUID()
  userId: string;

  @IsUUID()
  bookId: string;
}
