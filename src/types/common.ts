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

export interface IndexResponse<T> {
  estimatedTotalHits: number;
  hits: T[];
  limit: number;
  offset: number;
  processingTimeMs: number;
  query: string;
}

export interface PageListResponse<T> {
  currrentPage: number;
  pageSize: number;
  data: T[];
  totalCounts: number;
  totalPage: number;
  [propname: string]: any;
}

export interface DetailResponse<T> {
  data: T;
}

export interface ListResponse<T> {
  data: T[];
}