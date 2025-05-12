import {
  Client,
  type PageObjectResponse,
  type PersonUserObjectResponse,
  type RichTextItemResponse,
} from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

import type { Article, ArticleSort, ArticleTagFilterItem } from './notion-services.types';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

export const getArticleMetadata = ({
  cover,
  id,
  last_edited_time: modifiedDate,
  properties,
}: PageObjectResponse): Article => {
  const getTextContent = (items?: RichTextItemResponse[]): string => items?.[0]?.plain_text ?? '';

  const getThumbnailImageUrl = (cover: PageObjectResponse['cover']): string => {
    if (!cover) {
      return '';
    }

    switch (cover.type) {
      case 'external':
        return cover.external.url;
      case 'file':
        return cover.file.url;
      default:
        return '';
    }
  };

  const title = properties.Title.type === 'title' ? getTextContent(properties.Title.title) : '';
  const description =
    properties.Description.type === 'rich_text'
      ? getTextContent(properties.Description.rich_text)
      : '';
  const tagList =
    properties.Tags.type === 'multi_select'
      ? properties.Tags.multi_select.map(({ name }) => name)
      : [];
  const author =
    properties.Author.type === 'people'
      ? ((properties.Author.people[0] as PersonUserObjectResponse)?.name ?? '')
      : '';
  const date = properties.Date.type === 'date' ? (properties.Date.date?.start ?? '') : '';
  const slug =
    properties.Slug.type === 'rich_text' ? getTextContent(properties.Slug.rich_text) || id : id;
  const thumbnailImageUrl = getThumbnailImageUrl(cover);

  return {
    author,
    date,
    description,
    id,
    modifiedDate,
    slug,
    tagList,
    thumbnailImageUrl,
    title,
  };
};

export const getPublishedArticleList = async (
  tag?: string,
  sort?: ArticleSort,
): Promise<Article[]> => {
  const { results } = await notion.databases.query({
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
    sorts: [
      {
        direction: sort === 'latest' ? 'descending' : 'ascending',
        property: 'Date',
      },
    ],
  });

  return results
    .filter((page): page is PageObjectResponse => 'properties' in page)
    .map(getArticleMetadata);
};

export type ArticleWithMarkdown = {
  article: Article;
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
  const mdBlocks = await n2m.pageToMarkdown(results[0].id);
  const { parent } = n2m.toMarkdownString(mdBlocks);

  return {
    article: getArticleMetadata(results[0] as PageObjectResponse),
    markdown: parent,
  };
};

export const getArticleTagFilterList = async (): Promise<ArticleTagFilterItem[]> => {
  const articleList = await getPublishedArticleList();
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
