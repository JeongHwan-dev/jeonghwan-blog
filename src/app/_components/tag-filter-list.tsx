'use client';

import Link from 'next/link';
import { use } from 'react';

import type { ArticleTagFilterItem } from '@/services';

import { cn } from '@/lib/utils';

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
            className={cn(
              'hover:bg-muted-foreground/10 active:bg-muted-foreground/10 text-muted-foreground flex items-center justify-between rounded-md p-1.5 px-3 py-2 text-sm transition-colors',
              selectedTag === name &&
                'bg-primary-foreground dark:bg-primary/20 text-primary font-medium',
            )}
            href={{
              pathname: '/',
              query: {
                tag: name,
              },
            }}
            scroll={false}
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
