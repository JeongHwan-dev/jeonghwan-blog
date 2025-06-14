import type { MetadataRoute } from 'next';

import { getPublishedArticleList } from '@/services';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL as string;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    {
      changeFrequency: 'daily',
      lastModified: new Date(),
      priority: 1,
      url: BASE_URL,
    },
    {
      changeFrequency: 'weekly',
      lastModified: new Date(),
      priority: 0.8,
      url: `${BASE_URL}/about`,
    },
  ] as const;

  const { articleList } = await getPublishedArticleList({
    pageSize: 100,
  });

  const blogPosts = articleList.map(({ date, slug }) => ({
    changeFrequency: 'weekly' as const,
    lastModified: date === undefined ? new Date() : new Date(date),
    priority: 0.7,
    url: `${BASE_URL}/articles/${slug}`,
  }));

  return [...staticPages, ...blogPosts];
}
