'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import type { ArticleSort } from '@/services';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';

function SortSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const selectedSort: ArticleSort = (searchParams.get('sort') as ArticleSort) || 'latest';

  const handleSelectValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set('sort', value);
    router.push(`?${params.toString()}`);
  };

  return (
    <Select onValueChange={handleSelectValueChange} value={selectedSort}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="정렬 방식 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="latest">최신순</SelectItem>
        <SelectItem value="oldest">오래된 순</SelectItem>
      </SelectContent>
    </Select>
  );
}

export { SortSelect };
