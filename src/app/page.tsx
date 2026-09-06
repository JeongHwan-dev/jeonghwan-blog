import { Suspense } from 'react';

import {
  ArticleList,
  ArticleListSkeleton,
  SortSelect,
  TagFilterCard,
} from '@/domains/article/components';
import { type ArticleSort, getPublishedArticleList } from '@/domains/article/services';
import { ProfileCard } from '@/domains/author/components';

interface HomePageProps {
  searchParams: Promise<{ sort?: ArticleSort; tag?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { sort = 'latest', tag = '전체' } = await searchParams;

  const articleListPromise = getPublishedArticleList({ sort, tag });

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-[200px_1fr_200px]">
      <aside className="order-2 md:order-none">
        <TagFilterCard selectedTag={tag} />
      </aside>

      <div className="order-3 space-y-6 md:order-none md:space-y-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            {tag === '전체' ? '전체 글' : `${tag} 관련 글`}
          </h1>
          <SortSelect className="w-full md:w-[180px]" />
        </div>
        <Suspense fallback={<ArticleListSkeleton />}>
          <ArticleList articleListPromise={articleListPromise} />
        </Suspense>
      </div>

      <aside className="order-1 md:order-none">
        <ProfileCard />
      </aside>
    </div>
  );
}
