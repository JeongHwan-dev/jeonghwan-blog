'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { use, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import type { GetPublishedArticleListResponse } from '@/domains/article/services';

import { renderTimes } from '@/shared/utils';

import { ArticleCard } from './article-card';
import { ArticleCardSkeleton } from './article-card-skeleton';

const LOADING_ARTICLE_CARD_SKELETON_COUNT = 2;

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
              <Link
                href={`/articles/${slug}`}
                aria-label={`${title} 글 읽기`}
                className="flex size-full"
              >
                <ArticleCard
                  title={title}
                  date={date}
                  description={description}
                  slug={slug}
                  tagList={tagList}
                  thumbnailImagePriority={index < 4}
                  thumbnailImageUrl={thumbnailImageUrl}
                />
              </Link>
            </li>
          ),
        )}
        {hasNextPage && !isFetchingNextPage && <div ref={ref} className="h-10" />}
        {isFetchingNextPage &&
          renderTimes(LOADING_ARTICLE_CARD_SKELETON_COUNT, (index) => (
            <li key={`loading-article-card-skeleton-${index}`}>
              <ArticleCardSkeleton />
            </li>
          ))}
      </ul>
    </div>
  );
}

export { ArticleList };
