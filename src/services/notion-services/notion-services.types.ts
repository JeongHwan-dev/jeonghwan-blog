export interface Article {
  id: string;
  title: string;
  description?: string;
  thumbnailImageUrl?: string;
  tagList?: string[];
  author?: string;
  date?: string;
  modifiedDate?: string;
  slug: string;
}

export interface ArticleTagFilterItem {
  id: string;
  name: string;
  count: number;
}
