import { Suspense } from 'react';

import {
  ArticleList,
  ArticleListSkeleton,
  FeaturedArticle,
  FeaturedArticleSkeleton,
  SortSelect,
  TagFilter,
} from '@/domains/article/components';
import {
  ALL_TAG_NAME,
  type ArticleSort,
  getFeaturedArticle,
  getPublishedArticleList,
} from '@/domains/article/services';

interface HomePageProps {
  searchParams: Promise<{ sort?: ArticleSort; tag?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { sort = 'latest', tag = ALL_TAG_NAME } = await searchParams;

  const hasFeatured = tag === ALL_TAG_NAME;
  const articleListPromise = getPublishedArticleList({
    excludeFeatured: hasFeatured,
    sort,
    tag,
  });

  return (
    <div className="space-y-8 md:space-y-12">
      <h1 className="sr-only">{hasFeatured ? '전체 글' : `${tag} 관련 글`}</h1>
      {hasFeatured && (
        <Suspense fallback={<FeaturedArticleSkeleton />}>
          <FeaturedArticle articlePromise={getFeaturedArticle()} />
        </Suspense>
      )}
      <div>
        <div className="flex items-center gap-2">
          <TagFilter selectedTag={tag} className="min-w-0 flex-1" />
          <SortSelect />
        </div>
        <Suspense fallback={<ArticleListSkeleton />}>
          <ArticleList articleListPromise={articleListPromise} excludeFeatured={hasFeatured} />
        </Suspense>
      </div>
    </div>
  );
}
