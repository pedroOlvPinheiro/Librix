import { IsUUID } from 'class-validator';

export class CreateLoanDTO {
  @IsUUID()
  idUser: string;

  @IsUUID()
  idBook: string;
}
