import { Suspense } from 'react';

import { ArticleList, ArticleListSkeleton } from '@/components';
import { type ArticleSort, getPublishedArticleList } from '@/services';

import { ProfileCard, SortSelect, TagFilterCard } from './_components';

interface HomePageProps {
  searchParams: Promise<{ sort?: ArticleSort; tag?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { sort = 'latest', tag = '전체' } = await searchParams;

  const articleListPromise = getPublishedArticleList({ sort, tag });

  return (
    <div className="grid grid-cols-[200px_1fr_200px] gap-6">
      <aside>
        <TagFilterCard selectedTag={tag} />
      </aside>

      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">
            {tag === '전체' ? '전체 글' : `${tag} 관련 글`}
          </h2>
          <SortSelect />
        </div>
        <Suspense fallback={<ArticleListSkeleton />}>
          <ArticleList articleListPromise={articleListPromise} />
        </Suspense>
      </div>

      <aside>
        <ProfileCard />
      </aside>
    </div>
  );
}
