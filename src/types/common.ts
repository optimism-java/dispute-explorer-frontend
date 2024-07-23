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
