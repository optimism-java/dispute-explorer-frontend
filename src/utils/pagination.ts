import type { ParsedUrlQuery } from "querystring";

const DEFAULT_PAGE_SIZE = 25;

export function getPaginationParams(query: ParsedUrlQuery): {
  ps: number;
  p: number;
} {
  const page_ = parseInt(query.p as string);
  const pageSize_ = parseInt(query.ps as string);
  const page = isNaN(page_) ? 1 : page_;
  const pageSize = isNaN(pageSize_) ? DEFAULT_PAGE_SIZE : pageSize_;

  return { ps: pageSize, p: page };
}


export function getPaginationWithClaimParams(query: ParsedUrlQuery): { ps: number, p: number, len: number } {
  const page_ = parseInt(query.p as string);
  const len_ = parseInt(query.len as string);
  const pageSize_ = parseInt(query.ps as string);
  const page = isNaN(page_) ? 1 : page_;
  const len = isNaN(len_) ? 1 : len_;
  const pageSize = isNaN(pageSize_) ? DEFAULT_PAGE_SIZE : pageSize_;

  return { ps: pageSize, p: page, len };
}
