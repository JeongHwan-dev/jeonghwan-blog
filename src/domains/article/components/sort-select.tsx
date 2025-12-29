'use client';

import type { ComponentProps } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import type { ArticleSort } from '@/domains/article/services';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components';

interface SortSelectProps extends ComponentProps<typeof Select> {
  className?: string;
}

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

function SortSelect({ className, ...props }: SortSelectProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedSort: ArticleSort = (searchParams.get('sort') as ArticleSort) || 'latest';

  const handleSelectValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('sort', value);
    router.push(`?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <Select value={selectedSort} onValueChange={handleSelectValueChange} {...props}>
      <SelectTrigger aria-label="글 정렬 방식 선택" className={className}>
        <SelectValue placeholder="정렬 방식 선택" />
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
