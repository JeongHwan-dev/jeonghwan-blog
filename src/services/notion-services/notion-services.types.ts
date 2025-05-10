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

export interface ArticleTagFilterItem {
  count: number;
  id: string;
  name: string;
}
