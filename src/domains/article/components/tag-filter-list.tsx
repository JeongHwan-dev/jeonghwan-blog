'use client';

import Link from 'next/link';
import { use } from 'react';

import type { ArticleTagFilterItem } from '@/domains/article/services';
import { cn } from '@/shared/utils';

interface TagFilterListProps {
  selectedTag: string;
  tagFilterList: Promise<ArticleTagFilterItem[]>;
}

function TagFilterList({ selectedTag, tagFilterList }: TagFilterListProps) {
  const tagList = use(tagFilterList);

  return (
    <ul className="flex flex-col gap-3">
      {tagList.map(({ count, id, name }) => (
        <li key={id}>
          <Link
            href={{
              pathname: '/',
              query: {
                tag: name,
              },
            }}
            scroll={false}
            aria-current={selectedTag === name ? 'page' : undefined}
            aria-label={`${name} 태그 글 보기 (${count}개)`}
            className={cn(
              'flex items-center justify-between rounded-md p-1.5 px-3 py-2 text-muted-foreground text-sm transition-colors hover:bg-muted-foreground/10 active:bg-muted-foreground/10',
              selectedTag === name &&
                'bg-primary-foreground font-medium text-primary dark:bg-primary/20',
            )}
          >
            <span>{name}</span>
            <span>{count}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export { TagFilterList };
