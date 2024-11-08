export default class PaginationResponse<T> {
  data!: T[];
  total!: number;
}
