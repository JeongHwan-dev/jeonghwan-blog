import { unstable_cache } from 'next/cache';

import { Client, type PageObjectResponse, type RichTextItemResponse } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

import { fetchWithRetry } from './fetch-with-retry';
import type {
  Article,
  ArticleTagFilterItem,
  GetPublishedArticleListRequestParams,
  GetPublishedArticleListResponse,
} from './notion-services.types';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
  fetch: fetchWithRetry,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

const isProductionEnv = process.env.VERCEL_ENV === 'production';

const createArticleStatusSelectFilter = (status: string) => ({
  property: 'Status',
  select: {
    equals: status,
  },
});

const getArticleStatusFilter = () => {
  const publishedFilter = createArticleStatusSelectFilter('Published');

  if (isProductionEnv) {
    return publishedFilter;
  }

  return {
    or: [publishedFilter, createArticleStatusSelectFilter('Pre-Published')],
  };
};

const getTextContent = (items?: RichTextItemResponse[]): string => items?.[0]?.plain_text ?? '';

const getArticleMetadata = ({ id, properties }: PageObjectResponse): Article => {
  const title = properties.Title.type === 'title' ? getTextContent(properties.Title.title) : '';
  const description =
    properties.Description.type === 'rich_text'
      ? getTextContent(properties.Description.rich_text)
      : '';
  const tagList =
    properties.Tags.type === 'multi_select'
      ? properties.Tags.multi_select.map(({ name }) => name)
      : [];
  const date = properties.Date.type === 'date' ? properties.Date.date?.start : undefined;
  const slug =
    properties.Slug.type === 'rich_text' ? getTextContent(properties.Slug.rich_text) || id : id;
  const thumbnailImageUrl =
    properties.ThumbnailImageUrl.type === 'url' ? (properties.ThumbnailImageUrl.url ?? '') : '';

  return {
    date,
    description,
    id,
    slug,
    tagList,
    thumbnailImageUrl,
    title,
  };
};

const getAllPublishedArticleList = unstable_cache(
  async (): Promise<Article[]> => {
    const articleList: Article[] = [];
    let startCursor: string | undefined;

    do {
      const response = await notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID!,
        filter: getArticleStatusFilter(),
        page_size: 100,
        sorts: [
          {
            direction: 'descending',
            property: 'Date',
          },
        ],
        start_cursor: startCursor,
      });

      articleList.push(
        ...response.results
          .filter((page): page is PageObjectResponse => 'properties' in page)
          .map(getArticleMetadata),
      );
      startCursor = response.next_cursor ?? undefined;
    } while (startCursor !== undefined);

    return articleList;
  },
  ['published-article-list', String(isProductionEnv)],
  { revalidate: 3600 },
);

export const getPublishedArticleList = async ({
  pageSize = 8,
  sort = 'latest',
  startCursor,
  tag = '전체',
}: GetPublishedArticleListRequestParams = {}): Promise<GetPublishedArticleListResponse> => {
  const allArticleList = await getAllPublishedArticleList();
  const filteredArticleList =
    !tag || tag === '전체'
      ? allArticleList
      : allArticleList.filter(({ tagList }) => tagList?.includes(tag));
  const sortedArticleList =
    sort === 'latest'
      ? filteredArticleList
      : filteredArticleList.toSorted((a, b) => (a.date ?? '').localeCompare(b.date ?? ''));
  const start = Number(startCursor) || 0;
  const end = start + pageSize;

  return {
    articleList: sortedArticleList.slice(start, end),
    nextCursor: end < sortedArticleList.length ? String(end) : null,
  };
};

export type ArticleWithMarkdown = {
  article: Article | null;
  markdown: string;
};

export const getArticleBySlug = async (slug: string): Promise<ArticleWithMarkdown> => {
  const { results } = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      and: [
        {
          property: 'Slug',
          rich_text: {
            equals: slug,
          },
        },
        getArticleStatusFilter(),
      ],
    },
  });

  if (results.length === 0) {
    return {
      article: null,
      markdown: '',
    };
  }

  const mdBlocks = await n2m.pageToMarkdown(results[0].id);
  const { parent } = n2m.toMarkdownString(mdBlocks);

  return {
    article: getArticleMetadata(results[0] as PageObjectResponse),
    markdown: parent,
  };
};

export const getArticleTagFilterList = async (): Promise<ArticleTagFilterItem[]> => {
  const { articleList } = await getPublishedArticleList({
    pageSize: 1000,
  });

  const tagCount = articleList.reduce(
    (acc, post) => {
      post.tagList?.forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
      });

      return acc;
    },
    {} as Record<string, number>,
  );
  const allTagFilterItem: ArticleTagFilterItem = {
    count: articleList.length,
    id: 'all',
    name: '전체',
  };
  const tagFilterList: ArticleTagFilterItem[] = Object.entries(tagCount).map(([name, count]) => ({
    count,
    id: name,
    name,
  }));
  const sortedTagFilterList = tagFilterList.toSorted((a, b) => a.name.localeCompare(b.name));

  return [allTagFilterItem, ...sortedTagFilterList];
};
