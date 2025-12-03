import { PaginationMetaDTO } from 'src/common/dto/pagination-meta.dto';

export function createPaginationMeta(
  total: number,
  page: number,
  limit: number,
): PaginationMetaDTO {
  const totalPages = Math.ceil(total / limit);

  return {
    total,
    page,
    limit,
    totalPages,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
}
