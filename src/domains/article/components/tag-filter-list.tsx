'use client';

import Link from 'next/link';
import { use } from 'react';

import type { ArticleTagFilterItem } from '@/domains/article/services';
import { cn } from '@/shared/utils';
import { TAG_FILTER_RAIL_CLASS_NAME } from './tag-filter-list-skeleton';

interface TagFilterListProps {
  selectedTag: string;
  tagFilterList: Promise<ArticleTagFilterItem[]>;
}

function scrollIntoInlineView(element: HTMLElement | null) {
  const list = element?.closest('ul');

  if (element === null || list === null || list === undefined) {
    return;
  }

  const { left, width } = element.getBoundingClientRect();
  const listRect = list.getBoundingClientRect();

  list.scrollLeft += left - listRect.left - (listRect.width - width) / 2;
}

function TagFilterList({ selectedTag, tagFilterList }: TagFilterListProps) {
  const tagList = use(tagFilterList);

  return (
    <ul className={cn(TAG_FILTER_RAIL_CLASS_NAME, '[scrollbar-width:none] overflow-x-auto')}>
      {tagList.map(({ count, id, name }) => (
        <li key={id} className="shrink-0">
          <Link
            ref={selectedTag === name ? scrollIntoInlineView : undefined}
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
              'bg-muted text-secondary-foreground hover:bg-border flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-[background-color,scale] focus-visible:outline-2 focus-visible:-outline-offset-2 motion-safe:active:scale-(--press-scale)',
              selectedTag === name && 'bg-foreground text-background hover:bg-foreground',
            )}
          >
            <span>{name}</span>
            <span className="opacity-60">{count}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export { TagFilterList };
