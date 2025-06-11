export interface Article {
  author?: string;
  date?: string;
  description?: string;
  id: string;
  modifiedDate?: string;
  slug: string;
  tagList?: string[];
  thumbnailImageUrl?: string;
  title: string;
}

export type ArticleSort = 'latest' | 'oldest';

export interface ArticleTagFilterItem {
  count: number;
  id: string;
  name: string;
}

export interface GetPublishedArticleListRequestParams {
  pageSize?: number;
  sort?: string;
  startCursor?: string;
  tag?: string;
}

export interface GetPublishedArticleListResponse {
  articleList: Article[];
  hasMore: boolean;
  nextCursor: null | string;
}
