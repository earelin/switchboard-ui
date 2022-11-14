export type PageRequest = {
  page?: number;
  size?: number;
  sort?: Order;
};

export type Page<T> = {
  content: T[];
  total: number;
  request: PageRequest;
};

export type Order = {
  direction: SortDirection;
  property: string;
};

export enum SortDirection {
  ASC = 'asc',
  DESC = 'desc',
}
