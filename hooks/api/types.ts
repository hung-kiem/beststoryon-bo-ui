export interface Page<Data> {
  totalElements: number;
  totalPages: number;
  size: number;
  content: Array<Data>;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
}
