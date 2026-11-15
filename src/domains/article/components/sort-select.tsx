'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import type { ComponentProps } from 'react';

import type { ArticleSort } from '@/domains/article/services';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components';

type SortSelectProps = ComponentProps<typeof Select>;

interface SortOption {
  label: string;
  value: ArticleSort;
}

const SORT_OPTION_LIST: SortOption[] = [
  {
    label: '최신순',
    value: 'latest',
  },
  {
    label: '오래된 순',
    value: 'oldest',
  },
];

function SortSelect(props: SortSelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedSort: ArticleSort = (searchParams.get('sort') as ArticleSort) || 'latest';
  const selectedLabel = SORT_OPTION_LIST.find(({ value }) => value === selectedSort)?.label;

  const handleSelectValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('sort', value);
    router.push(`?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <Select value={selectedSort} onValueChange={handleSelectValueChange} {...props}>
      <SelectTrigger
        aria-label="글 정렬 방식 선택"
        className="text-muted-foreground shrink-0 border-0 px-2 dark:bg-transparent"
      >
        <SelectValue placeholder="정렬 방식 선택">{selectedLabel}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {SORT_OPTION_LIST.map(({ label, value }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export { SortSelect };
