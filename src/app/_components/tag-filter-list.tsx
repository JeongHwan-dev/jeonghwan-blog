'use client';

import Link from 'next/link';
import { use } from 'react';

import type { ArticleTagFilterItem } from '@/services';

import { cn } from '@/utils';

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
              'hover:bg-muted-foreground/10 active:bg-muted-foreground/10 text-muted-foreground flex items-center justify-between rounded-md p-1.5 px-3 py-2 text-sm transition-colors',
              selectedTag === name &&
                'bg-primary-foreground dark:bg-primary/20 text-primary font-medium',
            )}
          >
            <span>{name}</span>
            <span aria-label={`${count}개의 글`}>{count}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export { TagFilterList };
