export class PaginationMetaDTO {
  total: number; // total de registros no banco
  page: number; // página atual
  limit: number; // registros por página
  totalPages: number; // total de páginas
  hasNextPage: boolean; // pode ir pra próxima?
  hasPreviousPage: boolean; // pode voltar?
}
