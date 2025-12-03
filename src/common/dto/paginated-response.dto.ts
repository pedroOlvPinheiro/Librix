import { PaginationMetaDTO } from './pagination-meta.dto';

export class PaginatedResponseDTO<T> {
  data: T[];
  meta: PaginationMetaDTO;
}
