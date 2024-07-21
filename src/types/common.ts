export interface Pager {
  page: number;
  size: number;
}

export interface SearchParams {
  q?: string;
  offset?: number;
  limit?: number;
  filter?: string[];
  sort?: string[];
}
