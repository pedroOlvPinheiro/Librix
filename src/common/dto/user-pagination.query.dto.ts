import { IsEnum, IsOptional } from 'class-validator';
import { PaginationQueryDTO } from './pagination-query.dto';
import { LoanStatusEnum } from 'src/utils/enum/loan-status.enum';

export class UserPaginationQueryDTO extends PaginationQueryDTO {
  @IsOptional()
  @IsEnum(LoanStatusEnum)
  status?: LoanStatusEnum;
}
