'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { use, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import type { GetPublishedArticleListResponse } from '@/services';

import { ArticleCard } from './article-card';

interface ArticleListProps {
  articleListPromise: Promise<GetPublishedArticleListResponse>;
}

interface FetchArticleListProps {
  pageParam?: string;
}

function ArticleList({ articleListPromise }: ArticleListProps) {
  const initialData = use(articleListPromise);
  const { inView, ref } = useInView({
    threshold: 0.5,
  });
  const searchParams = useSearchParams();

  const tag = searchParams.get('tag');
  const sort = searchParams.get('sort');

  const fetchArticleList = async ({ pageParam }: FetchArticleListProps) => {
    const params = new URLSearchParams();

    if (tag !== null) {
      params.set('tag', tag);
    }

    if (sort !== null) {
      params.set('sort', sort);
    }

    if (pageParam !== undefined) {
      params.set('startCursor', pageParam);
    }

    const response = await fetch(`/api/articles?${params.toString()}`);

    if (!response.ok) {
      throw new Error('Failed to fetch article list');
    }

    return response.json();
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    getNextPageParam: ({ nextCursor }) => nextCursor,
    initialData: {
      pageParams: [undefined],
      pages: [initialData],
    },
    initialPageParam: undefined,
    queryFn: fetchArticleList,
    queryKey: ['GET_ARTICLE_LIST', tag, sort],
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  const articleList = data?.pages.flatMap((page) => page.articleList) ?? [];

  return (
    <div className="space-y-6">
      <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {articleList.map(
          ({ date, description, id, slug, tagList, thumbnailImageUrl, title }, index) => (
            <li key={id}>
              <Link className="flex h-full w-full" href={`/articles/${slug}`}>
                <ArticleCard
                  date={date}
                  description={description}
                  slug={slug}
                  tagList={tagList}
                  thumbnailImagePriority={index < 4}
                  thumbnailImageUrl={thumbnailImageUrl}
                  title={title}
                />
              </Link>
            </li>
          ),
        )}
      </ul>

      {hasNextPage && !isFetchingNextPage && <div className="h-10" ref={ref} />}
      {isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <Loader2 className="text-muted-foreground h-6 w-6 animate-spin" />
        </div>
      )}
    </div>
  );
}

export { ArticleList };
