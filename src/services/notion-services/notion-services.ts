import { Client } from '@notionhq/client';
import type {
  PageObjectResponse,
  PersonUserObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';
import type { Article, ArticleTagFilterItem } from './notion-services.types';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

export const getArticleMetadata = ({
  id,
  properties,
  cover,
  last_edited_time: modifiedDate,
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
    id,
    title,
    description,
    thumbnailImageUrl,
    tagList,
    author,
    date,
    modifiedDate,
    slug,
  };
};

export const getPublishedArticleList = async (tag?: string): Promise<Article[]> => {
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
                property: 'Tags',
                multi_select: {
                  contains: tag,
                },
              },
            ]
          : []),
      ],
    },
    sorts: [
      {
        property: 'Date',
        direction: 'descending',
      },
    ],
  });

  return results
    .filter((page): page is PageObjectResponse => 'properties' in page)
    .map(getArticleMetadata);
};

export const getArticleBySlug = async (
  slug: string,
): Promise<{
  markdown: string;
  article: Article;
}> => {
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
    markdown: parent,
    article: getArticleMetadata(results[0] as PageObjectResponse),
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
    id: 'all',
    name: '전체',
    count: articleList.length,
  };
  const tagFilterList: ArticleTagFilterItem[] = Object.entries(tagCount).map(([name, count]) => ({
    id: name,
    name,
    count,
  }));
  const sortedTagFilterList = tagFilterList.sort((a, b) => a.name.localeCompare(b.name));

  return [allTagFilterItem, ...sortedTagFilterList];
};
