import { Client, type PageObjectResponse, type RichTextItemResponse } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

import type {
  Article,
  ArticleTagFilterItem,
  GetPublishedArticleListRequestParams,
  GetPublishedArticleListResponse,
} from './notion-services.types';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

export const getArticleMetadata = ({ id, properties }: PageObjectResponse): Article => {
  const getTextContent = (items?: RichTextItemResponse[]): string => items?.[0]?.plain_text ?? '';

  const title = properties.Title.type === 'title' ? getTextContent(properties.Title.title) : '';
  const description =
    properties.Description.type === 'rich_text'
      ? getTextContent(properties.Description.rich_text)
      : '';
  const tagList =
    properties.Tags.type === 'multi_select'
      ? properties.Tags.multi_select.map(({ name }) => name)
      : [];
  const date = properties.Date.type === 'date' ? (properties.Date.date?.start ?? '') : '';
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

export const getPublishedArticleList = async ({
  pageSize = 8,
  sort = 'latest',
  startCursor,
  tag = '전체',
}: GetPublishedArticleListRequestParams = {}): Promise<GetPublishedArticleListResponse> => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      and: [
        {
          property: 'Status',
          select: {
            equals: 'Published',
          },
        },
        ...(!!tag && tag !== '전체'
          ? [
              {
                multi_select: {
                  contains: tag,
                },
                property: 'Tags',
              },
            ]
          : []),
      ],
    },
    page_size: pageSize,
    sorts: [
      {
        direction: sort === 'latest' ? 'descending' : 'ascending',
        property: 'Date',
      },
    ],
    start_cursor: startCursor,
  });

  const articleList = response.results
    .filter((page): page is PageObjectResponse => 'properties' in page)
    .map(getArticleMetadata);

  return {
    articleList,
    hasMore: response.has_more,
    nextCursor: response.next_cursor,
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
        {
          property: 'Status',
          select: {
            equals: 'Published',
          },
        },
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
  const sortedTagFilterList = tagFilterList.sort((a, b) => a.name.localeCompare(b.name));

  return [allTagFilterItem, ...sortedTagFilterList];
};
